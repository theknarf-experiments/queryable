import { lexer } from '../src/lexer';

describe('lexer', () => {
	test('select query with where clause', () => {
		const query = `select * from Customers where City="Berlin" or City='München';`;

		lexer.reset(query);
		expect(lexer.next()).toMatchObject({ type: 'select' });
		expect(lexer.next()).toMatchObject({ type: 'all' });
		expect(lexer.next()).toMatchObject({ type: 'from' });
		expect(lexer.next()).toMatchObject({ type: 'field',   value: 'Customers' });
		expect(lexer.next()).toMatchObject({ type: 'where' });
		expect(lexer.next()).toMatchObject({ type: 'field',   value: 'City' });
		expect(lexer.next()).toMatchObject({ type: 'equal' });
		expect(lexer.next()).toMatchObject({ type: 'string',  value: 'Berlin' });
		expect(lexer.next()).toMatchObject({ type: 'or' });
		expect(lexer.next()).toMatchObject({ type: 'field',   value: 'City' });
		expect(lexer.next()).toMatchObject({ type: 'equal' });
		expect(lexer.next()).toMatchObject({ type: 'string',  value: 'München' });
		expect(lexer.next()).toMatchObject({ type: 'statementEnd' });
	});

	test('select query with where not clause', () => {
		const query = `select * from Customers where not Country='Germany';`;

		lexer.reset(query);
		expect(lexer.next()).toMatchObject({ type: 'select' });
		expect(lexer.next()).toMatchObject({ type: 'all' });
		expect(lexer.next()).toMatchObject({ type: 'from' });
		expect(lexer.next()).toMatchObject({ type: 'field',   value: 'Customers' });
		expect(lexer.next()).toMatchObject({ type: 'where' });
		expect(lexer.next()).toMatchObject({ type: 'not' });
		expect(lexer.next()).toMatchObject({ type: 'field',   value: 'Country' });
		expect(lexer.next()).toMatchObject({ type: 'equal' });
		expect(lexer.next()).toMatchObject({ type: 'string',  value: 'Germany' });
	});
});
