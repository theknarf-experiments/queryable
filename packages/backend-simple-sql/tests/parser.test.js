import { parser } from '../src/parser';

describe('parser', () => {
	test('empty', () => {
		const newParser = parser();
		expect(() => {
			newParser.feed('');	
		}).not.toThrow();
		expect( newParser.results ).toEqual([ ]);
	});
	test('select from', () => {
		const query = `SELECT CustomerName, City FROM Customers;`;
		const query2 = `SELECT * FROM Customers;`
	
		const newParser = parser();
		expect(() => {
			newParser.feed(query);
			newParser.feed(query2);
		}).not.toThrow();

		expect( newParser.results.length ).toEqual(1);
		expect( newParser.results[0] ).toHaveProperty('statements');
		expect( newParser.results[0].statements.length ).toEqual(2);

		newParser.results[0].statements.forEach(statement => {
			expect(statement).toHaveProperty('select');
			expect(statement).toHaveProperty('from');
			expect(statement).toHaveProperty('where');
			expect(statement).toHaveProperty('orderBy');
		});

		const statement = newParser.results[0].statements[0];
		expect(statement.select).toHaveLength(2);
		expect(statement.select[0]).toMatchObject({ type: 'field', text: 'CustomerName' });
		expect(statement.select[1]).toMatchObject({ type: 'field', text: 'City' });

		expect(statement.from).toHaveLength(1);
		expect(statement.from[0]).toMatchObject({ type: 'field', text: 'Customers' });

		const statement2 = newParser.results[0].statements[1];
		expect(statement2.select).toHaveLength(1);
		expect(statement2.select[0]).toMatchObject({ type: 'wildcard' });

		expect(statement2.from).toHaveLength(1);
		expect(statement2.from[0]).toMatchObject({ type: 'field', text: 'Customers' });
	});
	test('select query with where clause', () => {
		const query = `select * from Customers where City="Berlin" or City='München';`;
		
		const newParser = parser();
		expect(() => {
			newParser.feed(query);
		}).not.toThrow();

		const statement = newParser.results[0].statements[0];
		expect(statement).toHaveProperty('where');
		expect(statement.where).toMatchObject({ op: 'or' });
		expect(statement.where.expr).toMatchObject({ op: 'eq' });
		expect(statement.where.expr2).toMatchObject({ op: 'eq' });
	});
	test('select query with where not clause', () => {
		const query = `select * from Customers where not Country='Germany';`;
		
		const newParser = parser();
		expect(() => {
			newParser.feed(query);
		}).not.toThrow();
	});
	test('select query with where and clause', () => {
		const query = `SELECT * FROM Customers WHERE Country='Germany' AND City='Berlin';`;
		const newParser = parser();
		expect(() => {
			newParser.feed(query);
		}).not.toThrow();
	});
	test('select query with order by', () => {
		const query = `select * from Customers order by CustomerName ASC;`;
		const newParser = parser();
		expect(() => {
			newParser.feed(query);
		}).not.toThrow();
	});
	test('select query with alias', () => {
		const query = `SELECT CustomerID AS ID, CustomerName AS Customer FROM Customers;`;
		const newParser = parser();
		expect(() => {
			newParser.feed(query);
		}).not.toThrow();
	});
	test('alias for tables', () => {
		const query = `SELECT o.OrderID, o.OrderDate, c.CustomerName
		FROM Customers AS c, Orders AS o
		WHERE c.CustomerName="Around the Horn" AND c.CustomerID=o.CustomerID;`;

		const newParser = parser();
		expect(() => {
			newParser.feed(query);
		}).not.toThrow();
	});
});
