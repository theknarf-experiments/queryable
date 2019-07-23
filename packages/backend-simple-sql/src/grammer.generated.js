// Generated automatically by nearley, version 2.16.0
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

const { lexer } = require('./lexer.js');
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "statement", "symbols": ["selectStatement", (lexer.has("statementEnd") ? {type: "statementEnd"} : statementEnd)]},
    {"name": "selectStatement", "symbols": [(lexer.has("keyword") ? {type: "keyword"} : keyword), (lexer.has("all") ? {type: "all"} : all), "from", "where"]},
    {"name": "from", "symbols": [(lexer.has("keyword") ? {type: "keyword"} : keyword), (lexer.has("field") ? {type: "field"} : field)]},
    {"name": "where", "symbols": [(lexer.has("keyword") ? {type: "keyword"} : keyword), "fieldEqual", (lexer.has("keyword") ? {type: "keyword"} : keyword), "fieldEqual"]},
    {"name": "fieldEqual", "symbols": [(lexer.has("field") ? {type: "field"} : field), (lexer.has("equal") ? {type: "equal"} : equal), (lexer.has("string") ? {type: "string"} : string)]}
]
  , ParserStart: "statement"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
