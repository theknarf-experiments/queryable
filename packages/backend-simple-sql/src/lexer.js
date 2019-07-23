const moo = require('moo')

const lexer = moo.compile({
	WS:       /[ \t]+/,
	comment:  /\/\/.*?$/,
	number:   /0|[1-9][0-9]*/,
	string:   {
		match: [/"(?:\\["\\]|[^\n"\\])*"/, /'(?:\\['\\]|[^\n'\\])*'/],
		value: s => s.slice(1, -1),
	},
	lparen:   '(',
	rparen:   ')',
	comma:    ',',
	all:      '*',
	dot:      '.',
	statementEnd: ';',
	equal:    '=',
	select:   [ 'select', 'SELECT' ],
	from:     [ 'from', 'FROM' ],
	where:    [ 'where', 'WHERE' ],
	limit:    [ 'limit', 'LIMIT' ],
	orderBy:  [ 'order by', 'ORDER BY' ],
	asc:      [ 'asc', 'ASC' ],
	desc:     [ 'desc', 'DESC' ],
	or:       [ 'or', 'OR' ],
	and:      [ 'and', 'AND' ],
	not:      [ 'not', 'NOT' ],
	as:       [ 'as', 'AS' ],
	field:    /[A-Za-z0-9]+/,
	NL:       { match: /\n/, lineBreaks: true },
});

// Taken from: https://github.com/no-context/moo/issues/81#issuecomment-337582515
// this allows you to skip whitespace and comment tokens
// that way we wont need to bother about theese in the parser, nor in tests
lexer.next = (next => () => {
	let tok;
	while((tok = next.call(lexer)) && (tok.type === 'comment' || tok.type === 'WS' || tok.type === 'NL'));
	return tok;
})(lexer.next);

module.exports = {
	lexer
};
