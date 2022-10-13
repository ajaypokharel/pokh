const moo = require("moo");

let lexer = moo.compile({
  white_space: /[ \t]+/,
  comment: /\/\/.*?$/,
  number: /0|[1-9][0-9]*/,
  string: /"(?:\\["\\]|[^\n"\\])*"/,
  lparen: "(",
  rparen: ")",
  lbrace: "{",
  rbrace: "}",
  keyword: ["while", "if", "else"],
  identifier: /[a-zA-Z][a-zA-Z_0-9]*/,
  lambdaArrow: "=>",
  assignment_operator: ":=",
  comma: ",",
  NL: { match: /\n/, lineBreaks: true },
});

module.exports = lexer;
