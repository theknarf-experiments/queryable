const { parser } = require('./parser');

const getTableName = (statement) => {
	if(typeof statement.from == 'undefined' || statement.from.length < 1)
		throw new Error('Statement is missing from clause');

	if(statement.from.length > 1)
		throw new Error('Mulitple from fields not supported yet');

	if(statement.from[0].type !== 'field')
		throw new Error(`Only fields are currently supported in from clauses. (Not '${statement.from.type}')`);

	return statement.from[0].text;
};

const evalStatement = (statement, data) => {
	if(typeof statement.select == 'undefined')
		throw new Error(`Can't parse statement, must be select statement`);

	const returnFields = statement.select.flatMap(field => {
		switch(field.type) {
			case 'field':
				return field;
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

	return data[getTableName(statement)].map(row => {
		const returnRow = {};
		returnFields.forEach(name => {
			if(typeof row[name] == 'undefined')
				throw new Error(`No column with name '${name}' in current row`);
			returnRow[name] = row[name];
		});
		return returnRow;
	});
};

const backend = (query, data) => {
	try {
		const newParser = parser();
		newParser.feed(query);

		if(newParser.results.length !== 1)
			throw new Error('No parse results');

		const { statements } = newParser.results[0];

		let working_data = data;
		statements.forEach(statement => {
			working_data = evalStatement(statement, working_data);
		});

		return working_data;
	} catch(e) {
		throw e;
	}
};

module.exports = {
	backend,
};
