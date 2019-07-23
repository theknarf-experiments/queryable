import { backend } from '../src';

const data = {
	Customers: [
		{ CustomerName: 'Dave', City: 'Oslo' },
		{ CustomerName: 'Bob', City: 'Bergen' },
		{ CustomerName: 'Hanna', City: 'Bergen' },
	],
	Cities: [
		{ City: 'Oslo' },
		{ City: 'Bergen' },
	],
};

describe('backend', () => {
	test('Simple selects', () => {
		expect(() => {
			const result = backend(`SELECT * FROM Customers;`, data);

			expect(result).toEqual([
				{ CustomerName: 'Dave', City: 'Oslo' },
				{ CustomerName: 'Bob', City: 'Bergen' },
				{ CustomerName: 'Hanna', City: 'Bergen' },
			]);
		}).not.toThrow();

		expect(() => {
			const result = backend(`SELECT CustomerName FROM Customers;`, data);

			expect(result).toEqual([
				{ CustomerName: 'Dave' },
				{ CustomerName: 'Bob' },
				{ CustomerName: 'Hanna' },
			]);
		}).not.toThrow();

		expect(() => {
			const result = backend(`SELECT City FROM Customers;`, data);

			expect(result).toEqual([
				{ City: 'Oslo' },
				{ City: 'Bergen' },
				{ City: 'Bergen' },
			]);
		}).not.toThrow();

		expect(() => {
			const result = backend(`SELECT City FROM Cities;`, data);

			expect(result).toEqual([
				{ City: 'Oslo' },
				{ City: 'Bergen' },
			]);
		}).not.toThrow();
	});
	test('select query with where clause', () => {
		expect(() => {
			const query = `select CustomerName from Customers where City="Oslo";`;
			const result = backend(query, data);

			expect(result).toEqual([
				{ CustomerName: 'Dave' },
			]);
		}).not.toThrow();
		expect(() => {
			const query = `select CustomerName from Customers where City="Bergen";`;
			const result = backend(query, data);

			expect(result).toEqual([
				{ CustomerName: 'Bob' },
				{ CustomerName: 'Hanna' },
			]);
		}).not.toThrow();
		expect(() => {
			const query = `select CustomerName from Customers where City=City;`; // TODO: is this even legal SQL?
			const result = backend(query, data);

			expect(result).toEqual([
				{ CustomerName: 'Dave' },
				{ CustomerName: 'Bob' },
				{ CustomerName: 'Hanna' },
			]);
		}).not.toThrow();
	});
});
