const nearley = require('nearley'),
		grammar = require('./grammer.generated.js');

const parser = () => new nearley.Parser(
	nearley.Grammar.fromCompiled(grammar)
);

module.exports = {
	parser,
};
