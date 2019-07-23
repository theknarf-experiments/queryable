import parser from '../src/parser';

describe('parser', () => {
	test('select query with where clause', () => {
		const query = `select * from Customers where City="Berlin" or City='München';`;
		
		const newParser = parser();
		expect(() => {
			newParser.feed(query);
		}).not.toThrow();
		//expect( newParser.results ).toEqual([ { a: 'b' } ] );
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
