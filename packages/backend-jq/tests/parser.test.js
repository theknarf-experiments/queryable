import { parser } from '../src/parser';

describe('parser', () => {
	test('empty', () => {
		const query = '';
		expect(() => parser().feed('')).not.toThrow();
	});

	test('indentiy: .', () => {
		const query = '.';
		expect(() => parser().feed(query)).not.toThrow();
	});

	test('object identifier-index: .foo, .foo.bar', () => {
		const query1 = '.foo',
				query2 = '.foo.bar';

		expect(() => parser().feed(query1)).not.toThrow();
		expect(() => parser().feed(query2)).not.toThrow();
	});

	test('object identifier-index: .foo|.bar', () => {
		const query = '.foo|.bar';

		expect(() => parser().feed(query)).not.toThrow();
	});

	test('object identifier-index: ."foo$", .["foo$"]', () => {
		const query1 = '."foo$"',
				query2 = '.["foo$"]';

		expect(() => parser().feed(query1)).not.toThrow();
		expect(() => parser().feed(query2)).not.toThrow();
	});

	test('object identifier-index: .["foo::bar"], .["foo.bar"]', () => {
		const query1 = '.["foo::bar"]',
				query2 = '.["foo.bar"]';

		expect(() => parser().feed(query1)).not.toThrow();
		expect(() => parser().feed(query2)).not.toThrow();
	});
	
	test('Unvalid object-identifier-index: .foo::bar', () => {
		const query = '.foo::bar';
		expect(() => parser().feed(query1)).toThrow();
	});


	test('Optional Object Identifier-Index: .foo?', () => {
		const query = '.foo?';
		expect(() => parser().feed(query)).not.toThrow();
	});

	test('Array index: .[2], .[-1]', () => {
		const query1 = '.[2]',
				query2 = '.[-1]';

		expect(() => parser().feed(query1)).not.toThrow();
		expect(() => parser().feed(query2)).not.toThrow();
	});

	test('Array / String Slice: .[10:15]', () => {
		const query = '.[10:15]';
		expect(() => parser().feed(query)).not.toThrow();
	});

	test('Comma: .foo, .bar', () => {
		const query = '.foo, .bar';
		expect(() => parser().feed(query)).not.toThrow();
	});
	
	test('Pipe: .[] | .foo, .a | .b | .c', () => {
		const query1 = '.[] | .foo',
				query2 = '.a | .b | .c';

		expect(() => parser().feed(query1)).not.toThrow();
		expect(() => parser().feed(query2)).not.toThrow();
	});

	test('Parenthesis: (. + 2) * 5', () => {
		const query = '(. + 2) * 5';
		expect(() => parser().feed(query)).not.toThrow();
	});

	test('Array construction: [.foo, .bar, .baz], [.items[].name]', () => {
		const query1 = '[.foo, .bar, .baz]',
				query2 = '[.items[].name]';

		expect(() => parser().feed(query1)).not.toThrow();
		expect(() => parser().feed(query2)).not.toThrow();
	});

	test('Object Construction: {foo: .bar}', () => {
		const query = '{foo: .bar}';
		expect(() => parser().feed(query)).not.toThrow();
	});
	
	test('Recursive Descent: ..|.a?', () => {
		const query = '..|.a?';
		expect(() => parser().feed(query)).not.toThrow();
	});
	
	test('Addition: .a + 1, .a + .b, .a + null', () => {
		const query1 = '.a + 1',
				query2 = '.a + .b',
				query3 = '.a + null';

		expect(() => parser().feed(query1)).not.toThrow();
		expect(() => parser().feed(query2)).not.toThrow();
		expect(() => parser().feed(query3)).not.toThrow();
	});

	test('Subtraction: 4 - .a, . - ["xml", "yaml"]', () => {
		const query1 = '4 - .a',
				query2 = '. - ["xml", "yaml"]';

		expect(() => parser().feed(query1)).not.toThrow();
		//expect(() => parser().feed(query2)).not.toThrow(); // TODO: fix this
	});

	test('Multiplication, division: 10 / . * 3, . / ", "', () => {
		const query = '10 / . * 3';
		expect(() => parser().feed(query)).not.toThrow();
	});

	test('Length: .[] | length', () => {
		const query = '.[] | length';
		expect(() => parser().feed(query)).not.toThrow();
	});

	test('utf8bytelength: utf8bytelength', () => {
		const query = 'utf8bytelength';
		expect(() => parser().feed(query)).not.toThrow();
	});
	
	test('keys: keys', () => {
		const query = 'keys';
		expect(() => parser().feed(query)).not.toThrow();
	});
});
