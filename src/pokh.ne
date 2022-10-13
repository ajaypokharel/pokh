@{%
    const myLexer = require("./lexer");
%}

@lexer myLexer

statements
    -> _ml statement (__lb_  statement):*
        {% 
            data => {
                const repeated = data[2];
                const restStatements = repeated.map(chunks => chunks[2]);
                return [data[1], ...restStatements];
            }
        %}

statement
    -> var_assignment   {% id %}
    | fun_call          {% id %}

fun_call
    -> %identifier _ %lparen _ param_list _ %rparen
        {%
            data => {
                return {
                    type: "function_call",
                    function_name: data[0],
                    arguments: data[4],
                }
            }
        %}
    | %identifier _ %lparen _ %rparen
        {% 
            data => {
                return {
                    type: "function_call",
                    function_name: data[0],
                    arguments: [],
                }
            }
        %}


param_list
    -> expression
        {% 
            data => {
                return [data[0]];
            }
        %}
    | param_list %comma _ml expression   
        {% 
            data => {
                return [...data[0], data[3]]
            }
        %}


var_assignment
    -> %identifier _ %assignment_operator _ expression
    {% 
        data => {
            return {
                type: "var_assignment",
                var_name: data[0],
                value: data[4],
            }
        }
    %}

expression
    -> %string      {% id %}
    | %number       {% id %}
    | %identifier   {% id %}
    | fun_call      {% id %}


# multiline whitespace, optional
_ml -> (%white_space | %NL):*

# multiline whitespace, mandatory
__ml -> (%white_space | %NL):+

# Mandatory line-break with optional whitespace around it
__lb_ -> (_ %NL):+ _

# optional white_space
_ -> %white_space:*

# mandatory white_space
__ -> %white_space:+