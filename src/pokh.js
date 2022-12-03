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
    {"name": "statement", "symbols": ["if_statement"], "postprocess": id},
    {"name": "statement", "symbols": ["for_loop"], "postprocess": id},
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
    {"name": "expression", "symbols": ["alpha_operations"], "postprocess": id},
    {"name": "non_data_expression", "symbols": ["alpha_num"], "postprocess": id},
    {"name": "non_data_expression", "symbols": [(myLexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": id},
    {"name": "non_data_expression", "symbols": ["fun_call"], "postprocess": id},
    {"name": "data_expression", "symbols": ["list_literal"], "postprocess": id},
    {"name": "data_expression", "symbols": ["dictionary_literal"], "postprocess": id},
    {"name": "alpha_num", "symbols": [(myLexer.has("string") ? {type: "string"} : string)], "postprocess": id},
    {"name": "alpha_num", "symbols": ["number"], "postprocess": id},
    {"name": "alpha_num", "symbols": ["boolean_literal"], "postprocess": id},
    {"name": "for_loop", "symbols": [{"literal":"for"}, "__", (myLexer.has("identifier") ? {type: "identifier"} : identifier), "__", {"literal":"in"}, "__", "expression", "_", (myLexer.has("lbrace") ? {type: "lbrace"} : lbrace), "_", "statements", "_", (myLexer.has("rbrace") ? {type: "rbrace"} : rbrace)], "postprocess": 
        d => {
            return{
            type: "for_loop",
            loop_variable: d[2],
            iterable: d[6],
            body: d[10],
        }}
                },
    {"name": "if_statement", "symbols": [{"literal":"if"}, "__", "boolean_expression", "__", (myLexer.has("lbrace") ? {type: "lbrace"} : lbrace), "_", "statements", "_", (myLexer.has("rbrace") ? {type: "rbrace"} : rbrace)], "postprocess": 
        d => ({
            type: "if_statement",
            condition: d[2],
            statement: d[6],
        })
                },
    {"name": "if_statement", "symbols": [{"literal":"if"}, "__", "boolean_expression", "__", (myLexer.has("lbrace") ? {type: "lbrace"} : lbrace), "_", "statements", "_", (myLexer.has("rbrace") ? {type: "rbrace"} : rbrace), "_ml", {"literal":"else"}, "__", (myLexer.has("lbrace") ? {type: "lbrace"} : lbrace), "_", "statements", "_", (myLexer.has("rbrace") ? {type: "rbrace"} : rbrace)], "postprocess": 
        d => ({
            type: "if_statement",
            condition: d[2],
            statement: d[6],
            alternate: d[14],
        })
                },
    {"name": "if_statement", "symbols": [{"literal":"if"}, "__", "boolean_expression", "__", (myLexer.has("lbrace") ? {type: "lbrace"} : lbrace), "_", "statements", "_", (myLexer.has("rbrace") ? {type: "rbrace"} : rbrace), "_ml", {"literal":"else"}, "__", "if_statement"], "postprocess": 
        d => ({
            type: "if_statement",
            condition: d[2],
            statement: d[6],
            alternate: d[12],
        })
               },
    {"name": "alpha_operations", "symbols": ["alpha_num", "_", (myLexer.has("multiplicative_operator") ? {type: "multiplicative_operator"} : multiplicative_operator), "_", "alpha_num"], "postprocess":  
        data => {
            return {
                type: "numerical_operations",
                operator: data[1],
                left: data[0],
                right: data[4]            
                }
        }
            },
    {"name": "alpha_operations", "symbols": ["alpha_num", "_", (myLexer.has("additive_operator") ? {type: "additive_operator"} : additive_operator), "_", "alpha_num"], "postprocess":  
        data => {
            return {
                type: "numerical_operations",
                operator: data[1],
                left: data[0],
                right: data[4]            
                }
        }
            },
    {"name": "boolean_expression", "symbols": ["comparison_expression"], "postprocess": id},
    {"name": "boolean_expression", "symbols": ["comparison_expression", "_", "boolean_operator", "_", "boolean_expression"], "postprocess": 
        d => {
            return  {
            type: "binary_operation",
            left: d[0],
            right: d[4]
        }}
                },
    {"name": "boolean_operator", "symbols": [(myLexer.has("bool_and") ? {type: "bool_and"} : bool_and)], "postprocess": id},
    {"name": "boolean_operator", "symbols": [(myLexer.has("bool_or") ? {type: "bool_or"} : bool_or)], "postprocess": id},
    {"name": "comparison_expression", "symbols": ["additive_expression"], "postprocess": id},
    {"name": "comparison_expression", "symbols": ["additive_expression", "_", "comparison_operator", "_", "comparison_expression"], "postprocess": 
        d => {
           return { 
            type: "binary_operation",
            operator: d[2],
            left: d[0],
            right: d[4]
            }
        }
                },
    {"name": "additive_expression", "symbols": ["multiplicative_expression"], "postprocess": id},
    {"name": "additive_expression", "symbols": ["multiplicative_expression", "_", (myLexer.has("additive_operator") ? {type: "additive_operator"} : additive_operator), "_", "additive_expression"], "postprocess": 
        data => {
            return {
            type: "binary_operation",
            operator: data[2],
            left: data[0],
            right: data[4]
        }}
                },
    {"name": "multiplicative_expression", "symbols": ["unary_expression"], "postprocess": id},
    {"name": "multiplicative_expression", "symbols": ["unary_expression", "_", (myLexer.has("multiplicative_operator") ? {type: "multiplicative_operator"} : multiplicative_operator), "_", "multiplicative_expression"], "postprocess": 
        data => {                
            return{
            type: "binary_operation",
            operator: data[2],
            left: data[0],
            right: data[4]            
            }}
                },
    {"name": "multiplicative_expression", "symbols": ["unary_expression", "_", (myLexer.has("multiplicative_operator") ? {type: "multiplicative_operator"} : multiplicative_operator), "_", "multiplicative_expression"], "postprocess": 
        data => {
            return{
            type: "binary_operation",
            operator: data[2],
            left: data[0],
            right: data[4]            
            }
        }
                },
    {"name": "unary_expression", "symbols": ["number"], "postprocess": id},
    {"name": "unary_expression", "symbols": [(myLexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": id},
    {"name": "unary_expression", "symbols": [(myLexer.has("string") ? {type: "string"} : string)], "postprocess": id},
    {"name": "unary_expression", "symbols": ["list_literal"], "postprocess": id},
    {"name": "unary_expression", "symbols": ["dictionary_literal"], "postprocess": id},
    {"name": "unary_expression", "symbols": ["boolean_literal"], "postprocess": id},
    {"name": "comparison_operator", "symbols": [(myLexer.has("gt") ? {type: "gt"} : gt)], "postprocess": id},
    {"name": "comparison_operator", "symbols": [(myLexer.has("gteq") ? {type: "gteq"} : gteq)], "postprocess": id},
    {"name": "comparison_operator", "symbols": [(myLexer.has("lt") ? {type: "lt"} : lt)], "postprocess": id},
    {"name": "comparison_operator", "symbols": [(myLexer.has("lteq") ? {type: "lteq"} : lteq)], "postprocess": id},
    {"name": "comparison_operator", "symbols": [(myLexer.has("eq") ? {type: "eq"} : eq)], "postprocess": id},
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
    {"name": "dictionary_entry", "symbols": ["non_data_expression", "_", (myLexer.has("colon") ? {type: "colon"} : colon), "_", "non_data_expression"], "postprocess": 
        data=> [data[0], data[4]]
                },
    {"name": "dictionary_entry", "symbols": ["non_data_expression", "_", (myLexer.has("colon") ? {type: "colon"} : colon), "_", "list_literal"], "postprocess": 
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
