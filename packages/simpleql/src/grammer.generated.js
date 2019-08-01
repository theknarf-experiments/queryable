// Generated automatically by nearley, version 2.16.0
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

const { lexer } = require('./lexer.js');
const first = d => d[0];
const second = d => d[1];
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "main", "symbols": ["statements"], "postprocess": ([ statements ]) => ({ statements })},
    {"name": "statements$ebnf$1", "symbols": ["statement"]},
    {"name": "statements$ebnf$1", "symbols": ["statements$ebnf$1", "statement"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "statements", "symbols": ["statements$ebnf$1"], "postprocess": first},
    {"name": "statement$ebnf$1", "symbols": [(lexer.has("statementEnd") ? {type: "statementEnd"} : statementEnd)], "postprocess": id},
    {"name": "statement$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "statement", "symbols": ["selectStatement", "statement$ebnf$1"], "postprocess": first},
    {"name": "selectStatement$ebnf$1", "symbols": ["where"], "postprocess": id},
    {"name": "selectStatement$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "selectStatement$ebnf$2", "symbols": ["orderBy"], "postprocess": id},
    {"name": "selectStatement$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "selectStatement", "symbols": ["select", "from", "selectStatement$ebnf$1", "selectStatement$ebnf$2"], "postprocess": ([ select, from, where, orderBy]) => ({ select, from, where, orderBy })},
    {"name": "from", "symbols": [(lexer.has("from") ? {type: "from"} : from), "fieldList"], "postprocess": second},
    {"name": "select", "symbols": [(lexer.has("select") ? {type: "select"} : select), (lexer.has("wildcard") ? {type: "wildcard"} : wildcard)], "postprocess": ([ _, wildcard]) => [ wildcard ]},
    {"name": "select", "symbols": [(lexer.has("select") ? {type: "select"} : select), "fieldList"], "postprocess": second},
    {"name": "fieldList", "symbols": ["fieldList", (lexer.has("comma") ? {type: "comma"} : comma), "fieldOptionalRename"], "postprocess": ([ fieldList, _, field ]) => [ ...fieldList, field]},
    {"name": "fieldList", "symbols": ["fieldOptionalRename"], "postprocess": ([ field ]) => [ field ]},
    {"name": "fieldOptionalRename", "symbols": ["field", (lexer.has("as") ? {type: "as"} : as), "field"], "postprocess": ([ field, _, field2 ]) => ({ field, as: field })},
    {"name": "fieldOptionalRename", "symbols": ["field"], "postprocess": ([ field ]) => field},
    {"name": "where", "symbols": [(lexer.has("where") ? {type: "where"} : where), "matchExpression"], "postprocess": second},
    {"name": "orderBy", "symbols": [(lexer.has("orderBy") ? {type: "orderBy"} : orderBy), "field", (lexer.has("asc") ? {type: "asc"} : asc)], "postprocess": ([ _, field, asc ])    => ({ op: 'orderBy', field, asc })},
    {"name": "orderBy", "symbols": [(lexer.has("orderBy") ? {type: "orderBy"} : orderBy), "field", (lexer.has("desc") ? {type: "desc"} : desc)], "postprocess": ([ _, field, desc ])   => ({ op: 'orderBy', field, desc })},
    {"name": "orderBy", "symbols": [(lexer.has("orderBy") ? {type: "orderBy"} : orderBy), "field"], "postprocess": ([ _, field ])         => ({ op: 'orderBy', field })},
    {"name": "matchExpression", "symbols": [(lexer.has("not") ? {type: "not"} : not), "matchExpression"], "postprocess": ([ _,    expr ])       => ({ op: 'not', expr })},
    {"name": "matchExpression", "symbols": ["matchExpression", (lexer.has("and") ? {type: "and"} : and), "matchExpression"], "postprocess": ([ expr, _, expr2 ])   => ({ op: 'and', expr, expr2 })},
    {"name": "matchExpression", "symbols": ["matchExpression", (lexer.has("or") ? {type: "or"} : or), "matchExpression"], "postprocess": ([ expr, _, expr2 ])   => ({ op: 'or', expr, expr2 })},
    {"name": "matchExpression", "symbols": ["fieldEqual"], "postprocess": first},
    {"name": "fieldEqual", "symbols": ["field", (lexer.has("equal") ? {type: "equal"} : equal), "expr"], "postprocess": ([expr,  _, expr2])    => ({ op: 'eq', expr, expr2 })},
    {"name": "expr", "symbols": [(lexer.has("string") ? {type: "string"} : string)], "postprocess": first},
    {"name": "expr", "symbols": [(lexer.has("number") ? {type: "number"} : number)], "postprocess": first},
    {"name": "expr", "symbols": ["field"], "postprocess": first},
    {"name": "field", "symbols": [(lexer.has("field") ? {type: "field"} : field), (lexer.has("dot") ? {type: "dot"} : dot), (lexer.has("field") ? {type: "field"} : field)], "postprocess": ([ field, _, field2 ]) => ({ field, dot: field2 })},
    {"name": "field", "symbols": [(lexer.has("field") ? {type: "field"} : field)], "postprocess": ([ field ]) => field}
]
  , ParserStart: "main"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
