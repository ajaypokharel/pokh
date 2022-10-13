const util = require("util");
const fs = require("mz/fs");
const exec = util.promisify(require("child_process").exec);

async function main() {
  const filePath = process.argv[2];
  if (!filePath) {
    console.log("Please provide a file name.");
    return;
  }

  const astFilename = filePath.replace(".pokh", ".ast");
  const jsFilename = filePath.replace(".pokh", ".js");
  const output = await myExec(`node src/parse.js ${filePath}`);
  await myExec(`node src/generate.js ${astFilename}`);
  await myExec(`node ${jsFilename}`);
}

async function myExec(command) {
  const output = await exec(command);

  process.stdout.write(output.stdout);
  process.stderr.write(output.stderr);
}

main().catch((err) => console.log(err.stack));
