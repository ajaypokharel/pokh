const nearley = require("nearley");
const grammar = require("./pokh.js");
const fs = require("mz/fs");

async function main() {
  const filename = process.argv[2];
  if (!filename) {
    console.log("No file name provided. Please provide one!");
    return;
  }
  const code = (await fs.readFile(filename)).toString();
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
  parser.feed(code);

  if (parser.results.length > 1) {
    console.log("Error: Ambigous grammar detected");
  } else if (parser.results.length == 1) {
    const ast = parser.results[0];
    const outputFileName = filename.replace(".pokh", ".ast");
    await fs.writeFile(outputFileName, JSON.stringify(ast, null, " "));
    console.log(`Wrote ${outputFileName}`);
  } else {
    console.log("Error: no parse found");
  }
}

main();
