import parser from '../src/parser';

describe('parser', () => {
	test('select query with where clause', () => {
		const query = `select * from Customers where City="Berlin" or City='München';`;
		
		const newParser = parser();
		newParser.feed(query);
		expect( newParser.results ).toEqual([ { a: 'b' } ] );
		//*/
	});
});
