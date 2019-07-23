// Generated automatically by nearley, version 2.16.0
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

const { lexer } = require('./lexer.js');
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "statement", "symbols": ["selectStatement", (lexer.has("statementEnd") ? {type: "statementEnd"} : statementEnd)]},
    {"name": "selectStatement$ebnf$1", "symbols": ["where"], "postprocess": id},
    {"name": "selectStatement$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "selectStatement$ebnf$2", "symbols": ["orderBy"], "postprocess": id},
    {"name": "selectStatement$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "selectStatement", "symbols": ["select", "from", "selectStatement$ebnf$1", "selectStatement$ebnf$2"]},
    {"name": "from", "symbols": [(lexer.has("from") ? {type: "from"} : from), "fieldList"]},
    {"name": "select", "symbols": [(lexer.has("select") ? {type: "select"} : select), (lexer.has("all") ? {type: "all"} : all)]},
    {"name": "select", "symbols": [(lexer.has("select") ? {type: "select"} : select), "fieldList"]},
    {"name": "fieldList", "symbols": ["fieldList", (lexer.has("comma") ? {type: "comma"} : comma), "fieldOptionalRename"]},
    {"name": "fieldList", "symbols": ["fieldOptionalRename"]},
    {"name": "fieldOptionalRename", "symbols": ["fieldOptionalRename", (lexer.has("as") ? {type: "as"} : as), "field"]},
    {"name": "fieldOptionalRename", "symbols": ["field"]},
    {"name": "field", "symbols": [(lexer.has("field") ? {type: "field"} : field), (lexer.has("dot") ? {type: "dot"} : dot), (lexer.has("field") ? {type: "field"} : field)]},
    {"name": "field", "symbols": [(lexer.has("field") ? {type: "field"} : field)]},
    {"name": "where", "symbols": [(lexer.has("where") ? {type: "where"} : where), "matchExpression"]},
    {"name": "matchExpression", "symbols": [(lexer.has("not") ? {type: "not"} : not), "matchExpression"]},
    {"name": "matchExpression", "symbols": ["matchExpression", (lexer.has("and") ? {type: "and"} : and), "matchExpression"]},
    {"name": "matchExpression", "symbols": ["matchExpression", (lexer.has("or") ? {type: "or"} : or), "matchExpression"]},
    {"name": "matchExpression", "symbols": ["fieldEqual"]},
    {"name": "fieldEqual", "symbols": ["field", (lexer.has("equal") ? {type: "equal"} : equal), (lexer.has("string") ? {type: "string"} : string)]},
    {"name": "fieldEqual", "symbols": ["field", (lexer.has("equal") ? {type: "equal"} : equal), (lexer.has("number") ? {type: "number"} : number)]},
    {"name": "fieldEqual", "symbols": ["field", (lexer.has("equal") ? {type: "equal"} : equal), "field"]},
    {"name": "orderBy$ebnf$1", "symbols": ["orderAscOrDesc"], "postprocess": id},
    {"name": "orderBy$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "orderBy", "symbols": [(lexer.has("orderBy") ? {type: "orderBy"} : orderBy), (lexer.has("field") ? {type: "field"} : field), "orderBy$ebnf$1"]},
    {"name": "orderAscOrDesc", "symbols": [(lexer.has("asc") ? {type: "asc"} : asc)]},
    {"name": "orderAscOrDesc", "symbols": [(lexer.has("desc") ? {type: "desc"} : desc)]}
]
  , ParserStart: "statement"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
