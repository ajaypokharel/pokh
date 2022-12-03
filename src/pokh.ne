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
    | if_statement                      {% id %}
    | for_loop                          {% id %}


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

# expressions

expression
    -> data_expression  {% id %}
    | non_data_expression {% id %}
    | alpha_operations {% id %}


non_data_expression
    -> alpha_num    {% id %}
    | %identifier   {% id %}
    | fun_call      {% id %}

data_expression
    -> list_literal  {% id %}
    | dictionary_literal    {% id %}

alpha_num
    -> %string  {% id %}
    | number    {% id %}
    | boolean_literal   {% id %}

for_loop
    -> "for" __ %identifier __ "in" __ expression _ %lbrace _ statements _ %rbrace
        {%
            d => {
                return{
                type: "for_loop",
                loop_variable: d[2],
                iterable: d[6],
                body: d[10],
            }}
        %}


if_statement
    -> "if" __ boolean_expression __ %lbrace _ statements _ %rbrace
        {%
            d => ({
                type: "if_statement",
                condition: d[2],
                statement: d[6],
            })
        %}
    |  "if" __ boolean_expression __ %lbrace _ statements _ %rbrace _ml
       "else" __ %lbrace _ statements _ %rbrace
        {%
            d => ({
                type: "if_statement",
                condition: d[2],
                statement: d[6],
                alternate: d[14],
            })
        %}
    |  "if" __ boolean_expression __ %lbrace _ statements _ %rbrace _ml
       "else" __ if_statement
       {%
            d => ({
                type: "if_statement",
                condition: d[2],
                statement: d[6],
                alternate: d[12],
            })
       %}

alpha_operations
    -> alpha_num _ %multiplicative_operator _ alpha_num {% 
        data => {
            return {
                type: "numerical_operations",
                operator: data[1],
                left: data[0],
                right: data[4]            
                }
        }
    %}
   | alpha_num _ %additive_operator _ alpha_num {% 
        data => {
            return {
                type: "numerical_operations",
                operator: data[1],
                left: data[0],
                right: data[4]            
                }
        }
    %}

boolean_expression
    -> comparison_expression     {% id %}
    |  comparison_expression _ boolean_operator _ boolean_expression
        {%
            d => {
                return  {
                type: "binary_operation",
                left: d[0],
                right: d[4]
            }}
        %}

boolean_operator
    -> %bool_and {% id %}
    | %bool_or    {% id %}

comparison_expression
    -> additive_expression    {% id %}
    |  additive_expression _ comparison_operator _ comparison_expression
        {%
            d => {
               return { 
                type: "binary_operation",
                operator: d[2],
                left: d[0],
                right: d[4]
                }
            }
        %}

additive_expression
    -> multiplicative_expression    {% id %}
    |  multiplicative_expression _ %additive_operator _ additive_expression
        {%
            data => {
                return {
                type: "binary_operation",
                operator: data[2],
                left: data[0],
                right: data[4]
            }}
        %}

multiplicative_expression
    -> unary_expression    {% id %}
    | unary_expression _ %multiplicative_operator _ multiplicative_expression
        {%
            data => {                
                return{
                type: "binary_operation",
                operator: data[2],
                left: data[0],
                right: data[4]            
                }}
        %}
    | unary_expression _ %multiplicative_operator _ multiplicative_expression
        {%
            data => {
                return{
                type: "binary_operation",
                operator: data[2],
                left: data[0],
                right: data[4]            
                }
            }
        %}

unary_expression
    -> number               {% id %}
    |  %identifier          {% id %}
    |  %string       {% id %}
    |  list_literal         {% id %}
    |  dictionary_literal   {% id %}
    |  boolean_literal      {% id %}


comparison_operator
    -> %gt  {% id %}
    | %gteq {% id %}
    | %lt   {% id %}
    | %lteq {% id %}
    | %eq   {% id %}

# Data Structures/Type

list_literal
    -> %lbigBrac list_items %rbigBrac
        {%
           data=> {
                return {
                    type: "list_literal",
                    items: data[1],
                }
            }
        %}

list_items
    -> null
        {% () => [] %}
    |  _ml expression _ml
        {% data=> [data[1]] %}
    |  _ml expression _ml "," list_items
        {%
           data=> [data[1], ...data[4]]
        %}

dictionary_literal
    -> "{" dictionary_entries "}"
        {%
           data=> {
            return {
                type: "dictionary_literal",
                entries: data[1],
                }
            }
        %}

dictionary_entries
    -> null  {% () => [] %}
    |  _ml dictionary_entry _ml
        {%
           data=> [data[1]]
        %}
    |  _ml dictionary_entry _ml "," dictionary_entries
        {%
           data=> [data[1], ...data[4]]
        %}

dictionary_entry
    -> non_data_expression _ %colon _ non_data_expression
        {%
           data=> [data[0], data[4]]
        %}
    | non_data_expression _ %colon _ list_literal
        {%
           data=> [data[0], data[4]]
        %}

boolean_literal
    -> %true
         {%
        (data) => {
            return {
                type: "boolean_literal",
                value: data[0],
            }
        }
    %}
    |  %false
        {%
           data=> {
               return { 
                type: "boolean_literal",
                value: data[0],
                }
           }
        %}

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