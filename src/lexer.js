const moo = require("moo");

let lexer = moo.compile({
  white_space: /[ \t]+/,
  comment: /\/\/.*?$/,
  digits: /0|[1-9][0-9]*/,
  string: /"(?:\\["\\]|[^\n"\\])*"/,
  lparen: "(",
  rparen: ")",
  lbrace: "{",
  rbrace: "}",
  lbigBrac: "[",
  rbigBrac: "]",
  keyword: ["for", "if", "else"],
  identifier: /[a-zA-Z][a-zA-Z_0-9]*/,
  lambdaArrow: "=>",
  assignment_operator: ":=",
  additive_operator: /[+-]/,
  multiplicative_operator: /[*/%]/,
  colon: ":",
  dot: ".",
  comma: ",",
  NL: { match: /\n/, lineBreaks: true },
  true: "true",
  false: "false",
  eq: "==",
  gt: ">",
  gteq: ">=",
  lt: "<",
  lteq: "<=",
  bool_and: "and",
  bool_or: "or",
});

module.exports = lexer;
