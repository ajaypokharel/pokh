const fs = require("mz/fs");

async function main() {
  const filename = process.argv[2];
  if (!filename) {
    console.log("Please provide a .ast file");
    return;
  }

  // Read the Ast file
  const astJson = (await fs.readFile(filename)).toString();
  const statements = JSON.parse(astJson);
  // Read Runtime file
  const runTimeJs = (await fs.readFile("src/runtime.js")).toString();
  const jsCode = generateJsForStatements(statements) + "\n" + runTimeJs;
  const outputFilename = filename.replace(".ast", ".js");

  await fs.writeFile(outputFilename, jsCode);
  console.log(`Wrote ${outputFilename}`);
}

generateJsForStatements = (statements) => {
  const lines = [];

  for (let statement of statements) {
    const line = generateJsForStatement(statement);
    lines.push(line);
  }
  return lines.join("\n");
};

generateJsForStatement = (node) => {
  if (node.type === "var_assignment") {
    const varName = node.var_name.value;
    const jsExpression = generateJsForStatement(node.value);
    const js = `let ${varName} = ${jsExpression};`;
    return js;
  } else if (node.type === "function_call") {
    const func_name = node.function_name.value;
    const argList = node.arguments
      .map((arg) => {
        return generateJsForStatement(arg);
      })
      .join(", ");
    return `${func_name}(${argList})`;
  } else if (node.type === "string") {
    return node.value;
  } else if (node.type === "number" || node.type === "digits") {
    return node.value;
  } else if (node.type === "identifier") {
    return node.value;
  } else if (node.type === "comment") {
    return "";
  } else if (node.type === "function_definition") {
    const funcName = node.function_name.value;
    const argList = node.arguments
      .map((arg) => {
        return generateJsForStatement(arg);
      })
      .join(", ");
    const body = node.body
      .map((content) => {
        return generateJsForStatement(content);
      })
      .join("\n");
    const indentBody = body
      .split("\n")
      .map((line) => "\t" + line)
      .join("\n");

    return `function ${funcName}(${argList}) {\n${indentBody}\n}`;
  } else if (node.type === "boolean_literal") {
    return node.value;
  } else if (node.type === "dictionary_literal") {
    const dictLiteral =
      "{" +
      node.entries
        .map((entry) => {
          return entry[0].value + ":" + generateJsForStatement(entry[1]);
        })
        .join(", ") +
      " }";
    return dictLiteral;
  } else if (node.type == "list_literal") {
    const listLiteral =
      "[" +
      node.items
        .map((item) => {
          return generateJsForStatement(item);
        })
        .join(", ") +
      "]";
    return listLiteral;
  } else if (node.type === "binary_operation") {
    const right = generateJsForStatement(node.right);

    const left = generateJsForStatement(node.left);
    const operator = node.operator.value;
    if (!operator) {
      throw new Error("Unknown operator " + operator.value);
    }
    return `${left} ${operator} ${right}`;
  } else if (node.type === "for_loop") {
    const loopVar = node.loop_variable.value;
    const ret = indent(
      node.body
        .map((statement) => {
          return generateJsForStatement(statement);
        })
        .join("\n")
    );
    return [
      `for (let ${loopVar} of ${generateJsForStatement(node.iterable)}) {`,
      ret,
      "}",
    ].join("\n");
  } else if (node.type === "if_statement") {
    const condition = generateJsForStatement(node.condition);
    const alternate = node.alternate
      ? generateCodeForIfAlternate(node.alternate)
      : "";
    const stmnt = node.statement
      .map((statement) => {
        return generateJsForStatement(statement);
      })
      .join("\n");
    return [`if (${condition}) {`, indent(stmnt), "}", alternate].join("\n");
  } else {
    throw new Error(`Unhandled AST node type ${node.type}`);
  }
};

main().catch((err) => console.log(err.stack));

function generateCodeForCodeBlock(codeBlock) {
  return indent(
    codeBlock.map((statement) => generateJsForStatement(statement)).join("\n")
  );
}

function indent(str) {
  return str
    .split("\n")
    .map((line) => "    " + line)
    .join("\n");
}

function generateCodeForIfAlternate(alternate) {
  if (alternate.type === "if_statement") {
    return "else " + generateJsForStatement(alternate);
  } else {
    return (
      "else {\n" +
      indent(
        alternate
          .map((statement) => {
            return generateJsForStatement(statement);
          })
          .join("\n")
      ) +
      "\n}"
    );
  }
}