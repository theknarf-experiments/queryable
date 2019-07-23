const { parser } = require('./parser');
const L = require('partial.lenses');
const R = require('ramda');

const getTableName = (statement) => {
	if(typeof statement.from == 'undefined' || statement.from.length < 1)
		throw new Error('Statement is missing from clause');

	if(statement.from.length > 1)
		throw new Error('Mulitple from fields not supported yet');

	if(statement.from[0].type !== 'field')
		throw new Error(`Only fields are currently supported in from clauses. (Not '${statement.from.type}')`);

	return statement.from[0].text;
};

const findReturnFields = (statement, data) =>
	statement.select.flatMap(field => {
		switch(field.type) {
			case 'field':
				return field.value;
			case 'wildcard':
				const tableName = getTableName(statement);
				if(typeof data[tableName] == 'undefined')
					throw new Error(`Can't find table with name "${tableName}"`);
				if(data[tableName].length == 0)
					return [];
				if(typeof data[tableName][0] !== 'object')
					throw new Error(`A table should be an array of object, not "${typeof data[tableName][0]}"`);
				
				return Object.keys(data[tableName][0]);
		}
	});

const exprToValue = (expr, row) => {
	switch(expr.type) {
		case 'string':
		case 'number':
			return expr.value;

		case 'field':
			return row[ expr.value ];

		default:
			throw new Error(`Expression of type '${expr.type}' don't have a toValue implementation yet`);
	}
}

const evalExpr = (expr, row) => {
	switch(expr.op) {
		case 'or':
			return evalExpr(expr.expr, row) || evalExpr(expr.expr2, row);

		case 'and':
			return evalExpr(expr.expr, row) && evalExpr(expr.expr2, row);

		case 'not':
			return !( evalExpr(expr.expr, row) );

		case 'eq':
			return exprToValue(expr.expr, row) == exprToValue(expr.expr2, row);
			return evalEq(expr, row);

		default:
			throw new Error(`Op '${expr.op}' not implemented yet`);
	};
};

const evalStatement = (statement, data) => {
	if(typeof statement.select == 'undefined')
		throw new Error(`Can't parse statement, must be select statement`);

	if(typeof statement.where == 'array')
		throw new Error('Multiple where clauses not supported, try using AND');
	
	// TODO: since this function depend on data; I should rewrite it into a part of the lens
	const returnFields = findReturnFields(statement, data);

	const tableName = getTableName(statement),
			whereFilter = row => evalExpr(statement.where, row),
			hasWhereStatement = (typeof statement.where !== 'undefined' && statement.where !== null);

	if(hasWhereStatement) {
		return L.collect([ tableName, L.elems, L.when(whereFilter), L.props(...returnFields) ], data);
	} else {
		return L.collect([ tableName, L.elems, L.props(...returnFields) ], data);
	}
};

const backend = (query, data) => {
	try {
		const newParser = parser();
		newParser.feed(query);

		if(newParser.results.length !== 1)
			throw new Error('No parse results');

		const { statements } = newParser.results[0];
		return evalStatement(statements[0], data);
	} catch(e) {
		throw e;
	}
};

module.exports = {
	backend,
};
