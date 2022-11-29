@{%
    const myLexer = require("./lexer");
%}

@lexer myLexer

statements
    -> _ml statement (__lb_  statement):* _ml
        {% 
            data => {
                const repeated = data[2];
                const restStatements = repeated.map(chunks => chunks[1]);
                return [data[1], ...restStatements];
            }
        %}

statement
    -> var_assignment (__ %comment):*   {% id %}
    | fun_call (__ %comment):*          {% id %}
    | %comment                          {% id %}
    | function_definition               {% id %}

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



function_definition
    -> %identifier _ %lparen _ param_list _ %rparen _ %lbrace _ statements _ %rbrace
    {%
        (data) => {
            return {
                type: "function_definition",
                function_name: data[0],
                arguments: data[4],
                body: data[10]
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
    | number       {% id %}
    | %identifier   {% id %}
    | fun_call      {% id %}


number
    -> %digits   {% id %}
    | %digits %dot %digits    {% data => 
        {return {
                    type: "number",
                    value: data.join(""),
                } }
    %}


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