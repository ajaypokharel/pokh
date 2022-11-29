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
  } else {
    throw new Error(`Unhandled AST node type ${node.type}`)
  }
};

main().catch((err) => console.log(err.stack));
