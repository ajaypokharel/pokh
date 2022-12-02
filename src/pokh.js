// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

    const myLexer = require("./lexer");
var grammar = {
    Lexer: myLexer,
    ParserRules: [
    {"name": "statements$ebnf$1", "symbols": []},
    {"name": "statements$ebnf$1$subexpression$1", "symbols": ["__lb_", "statement"]},
    {"name": "statements$ebnf$1", "symbols": ["statements$ebnf$1", "statements$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "statements", "symbols": ["_ml", "statement", "statements$ebnf$1", "_ml"], "postprocess":  
        data => {
            const repeated = data[2];
            const restStatements = repeated.map(chunks => chunks[1]);
            return [data[1], ...restStatements];
        }
                },
    {"name": "statement$ebnf$1", "symbols": []},
    {"name": "statement$ebnf$1$subexpression$1", "symbols": ["__", (myLexer.has("comment") ? {type: "comment"} : comment)]},
    {"name": "statement$ebnf$1", "symbols": ["statement$ebnf$1", "statement$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "statement", "symbols": ["var_assignment", "statement$ebnf$1"], "postprocess": id},
    {"name": "statement$ebnf$2", "symbols": []},
    {"name": "statement$ebnf$2$subexpression$1", "symbols": ["__", (myLexer.has("comment") ? {type: "comment"} : comment)]},
    {"name": "statement$ebnf$2", "symbols": ["statement$ebnf$2", "statement$ebnf$2$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "statement", "symbols": ["fun_call", "statement$ebnf$2"], "postprocess": id},
    {"name": "statement", "symbols": [(myLexer.has("comment") ? {type: "comment"} : comment)], "postprocess": id},
    {"name": "statement", "symbols": ["function_definition"], "postprocess": id},
    {"name": "fun_call", "symbols": [(myLexer.has("identifier") ? {type: "identifier"} : identifier), "_", (myLexer.has("lparen") ? {type: "lparen"} : lparen), "_", "param_list", "_", (myLexer.has("rparen") ? {type: "rparen"} : rparen)], "postprocess": 
        data => {
            return {
                type: "function_call",
                function_name: data[0],
                arguments: data[4],
            }
        }
                },
    {"name": "fun_call", "symbols": [(myLexer.has("identifier") ? {type: "identifier"} : identifier), "_", (myLexer.has("lparen") ? {type: "lparen"} : lparen), "_", (myLexer.has("rparen") ? {type: "rparen"} : rparen)], "postprocess":  
        data => {
            return {
                type: "function_call",
                function_name: data[0],
                arguments: [],
            }
        }
                },
    {"name": "function_definition", "symbols": [(myLexer.has("identifier") ? {type: "identifier"} : identifier), "_", (myLexer.has("lparen") ? {type: "lparen"} : lparen), "_", "param_list", "_", (myLexer.has("rparen") ? {type: "rparen"} : rparen), "_", (myLexer.has("lbrace") ? {type: "lbrace"} : lbrace), "_", "statements", "_", (myLexer.has("rbrace") ? {type: "rbrace"} : rbrace)], "postprocess": 
        (data) => {
            return {
                type: "function_definition",
                function_name: data[0],
                arguments: data[4],
                body: data[10]
            }
        }
            },
    {"name": "param_list", "symbols": ["expression"], "postprocess":  
        data => {
            return [data[0]];
        }
                },
    {"name": "param_list", "symbols": ["param_list", (myLexer.has("comma") ? {type: "comma"} : comma), "_ml", "expression"], "postprocess":  
        data => {
            return [...data[0], data[3]]
        }
                },
    {"name": "var_assignment", "symbols": [(myLexer.has("identifier") ? {type: "identifier"} : identifier), "_", (myLexer.has("assignment_operator") ? {type: "assignment_operator"} : assignment_operator), "_", "expression"], "postprocess":  
        data => {
            return {
                type: "var_assignment",
                var_name: data[0],
                value: data[4],
            }
        }
            },
    {"name": "expression", "symbols": ["data_expression"], "postprocess": id},
    {"name": "expression", "symbols": ["non_data_expression"], "postprocess": id},
    {"name": "non_data_expression", "symbols": [(myLexer.has("string") ? {type: "string"} : string)], "postprocess": id},
    {"name": "non_data_expression", "symbols": ["number"], "postprocess": id},
    {"name": "non_data_expression", "symbols": [(myLexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": id},
    {"name": "non_data_expression", "symbols": ["fun_call"], "postprocess": id},
    {"name": "non_data_expression", "symbols": ["boolean_literal"], "postprocess": id},
    {"name": "data_expression", "symbols": ["list_literal"], "postprocess": id},
    {"name": "data_expression", "symbols": ["dictionary_literal"], "postprocess": id},
    {"name": "list_literal", "symbols": [(myLexer.has("lbigBrac") ? {type: "lbigBrac"} : lbigBrac), "list_items", (myLexer.has("rbigBrac") ? {type: "rbigBrac"} : rbigBrac)], "postprocess": 
        data=> {
             return {
                 type: "list_literal",
                 items: data[1],
             }
         }
                },
    {"name": "list_items", "symbols": [], "postprocess": () => []},
    {"name": "list_items", "symbols": ["_ml", "expression", "_ml"], "postprocess": data=> [data[1]]},
    {"name": "list_items", "symbols": ["_ml", "expression", "_ml", {"literal":","}, "list_items"], "postprocess": 
        data=> [data[1], ...data[4]]
                },
    {"name": "dictionary_literal", "symbols": [{"literal":"{"}, "dictionary_entries", {"literal":"}"}], "postprocess": 
        data=> {
         return {
             type: "dictionary_literal",
             entries: data[1],
             }
         }
                },
    {"name": "dictionary_entries", "symbols": [], "postprocess": () => []},
    {"name": "dictionary_entries", "symbols": ["_ml", "dictionary_entry", "_ml"], "postprocess": 
        data=> [data[1]]
                },
    {"name": "dictionary_entries", "symbols": ["_ml", "dictionary_entry", "_ml", {"literal":","}, "dictionary_entries"], "postprocess": 
        data=> [data[1], ...data[4]]
                },
    {"name": "dictionary_entry", "symbols": ["expression", "_", (myLexer.has("colon") ? {type: "colon"} : colon), "_", "expression"], "postprocess": 
        data=> [data[0], data[4]]
                },
    {"name": "boolean_literal", "symbols": [(myLexer.has("true") ? {type: "true"} : true)], "postprocess": 
        (data) => {
            return {
                type: "boolean_literal",
                value: data[0],
            }
        }
            },
    {"name": "boolean_literal", "symbols": [(myLexer.has("false") ? {type: "false"} : false)], "postprocess": 
        data=> {
            return { 
             type: "boolean_literal",
             value: data[0],
             }
        }
                },
    {"name": "number", "symbols": [(myLexer.has("digits") ? {type: "digits"} : digits)], "postprocess": id},
    {"name": "number", "symbols": [(myLexer.has("digits") ? {type: "digits"} : digits), (myLexer.has("dot") ? {type: "dot"} : dot), (myLexer.has("digits") ? {type: "digits"} : digits)], "postprocess":  data => 
        {return {
                    type: "number",
                    value: data.join(""),
                } }
            },
    {"name": "_ml$ebnf$1", "symbols": []},
    {"name": "_ml$ebnf$1$subexpression$1", "symbols": [(myLexer.has("white_space") ? {type: "white_space"} : white_space)]},
    {"name": "_ml$ebnf$1$subexpression$1", "symbols": [(myLexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "_ml$ebnf$1", "symbols": ["_ml$ebnf$1", "_ml$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_ml", "symbols": ["_ml$ebnf$1"]},
    {"name": "__ml$ebnf$1$subexpression$1", "symbols": [(myLexer.has("white_space") ? {type: "white_space"} : white_space)]},
    {"name": "__ml$ebnf$1$subexpression$1", "symbols": [(myLexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "__ml$ebnf$1", "symbols": ["__ml$ebnf$1$subexpression$1"]},
    {"name": "__ml$ebnf$1$subexpression$2", "symbols": [(myLexer.has("white_space") ? {type: "white_space"} : white_space)]},
    {"name": "__ml$ebnf$1$subexpression$2", "symbols": [(myLexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "__ml$ebnf$1", "symbols": ["__ml$ebnf$1", "__ml$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__ml", "symbols": ["__ml$ebnf$1"]},
    {"name": "__lb_$ebnf$1$subexpression$1", "symbols": ["_", (myLexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "__lb_$ebnf$1", "symbols": ["__lb_$ebnf$1$subexpression$1"]},
    {"name": "__lb_$ebnf$1$subexpression$2", "symbols": ["_", (myLexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "__lb_$ebnf$1", "symbols": ["__lb_$ebnf$1", "__lb_$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__lb_", "symbols": ["__lb_$ebnf$1", "_"]},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", (myLexer.has("white_space") ? {type: "white_space"} : white_space)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"]},
    {"name": "__$ebnf$1", "symbols": [(myLexer.has("white_space") ? {type: "white_space"} : white_space)]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", (myLexer.has("white_space") ? {type: "white_space"} : white_space)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"]}
]
  , ParserStart: "statements"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
