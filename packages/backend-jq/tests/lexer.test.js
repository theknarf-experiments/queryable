import { lexer } from '../src/lexer';

// Tests based on: https://stedolan.github.io/jq/manual/#Basicfilters
describe('lexer', () => {
	test('identity: .', () => {
		lexer.reset('.');
		expect(lexer.next()).toMatchObject({ type: 'identity' });
		expect(lexer.next()).toBeUndefined();
	});

	test('object identifier-index: .foo, .foo.bar', () => {
		lexer.reset('.foo');
		expect(lexer.next()).toMatchObject({ type: 'identity' });
		expect(lexer.next()).toMatchObject({ type: 'field', value: 'foo' })
		expect(lexer.next()).toBeUndefined();

		lexer.reset('.foo.bar');
		expect(lexer.next()).toMatchObject({ type: 'identity' });
		expect(lexer.next()).toMatchObject({ type: 'field', value: 'foo' })
		expect(lexer.next()).toMatchObject({ type: 'identity' });
		expect(lexer.next()).toMatchObject({ type: 'field', value: 'bar' })
		expect(lexer.next()).toBeUndefined();
	});

	test('object identifier-index: .foo|.bar', () => {
		lexer.reset('.foo|.bar');
		expect(lexer.next()).toMatchObject({ type: 'identity' });
		expect(lexer.next()).toMatchObject({ type: 'field', value: 'foo' })
		expect(lexer.next()).toMatchObject({ type: 'pipe' })
		expect(lexer.next()).toMatchObject({ type: 'identity' });
		expect(lexer.next()).toMatchObject({ type: 'field', value: 'bar' })
		expect(lexer.next()).toBeUndefined();
	});

	test('object identifier-index: ."foo$", .["foo$"]', () => {
		lexer.reset('."foo$"');
		expect(lexer.next()).toMatchObject({ type: 'identity' });
		expect(lexer.next()).toMatchObject({ type: 'string', value: 'foo$' })
		expect(lexer.next()).toBeUndefined();

		lexer.reset('.["foo$"]');
		expect(lexer.next()).toMatchObject({ type: 'identity' });
		expect(lexer.next()).toMatchObject({ type: 'lbracket' });
		expect(lexer.next()).toMatchObject({ type: 'string', value: 'foo$' })
		expect(lexer.next()).toMatchObject({ type: 'rbracket' });
		expect(lexer.next()).toBeUndefined();
	});

	test('object identifier-index: .["foo::bar"], .["foo.bar"]', () => {
		lexer.reset('.["foo::bar"]');
		expect(lexer.next()).toMatchObject({ type: 'identity' });
		expect(lexer.next()).toMatchObject({ type: 'lbracket' });
		expect(lexer.next()).toMatchObject({ type: 'string', value: 'foo::bar' })
		expect(lexer.next()).toMatchObject({ type: 'rbracket' });
		expect(lexer.next()).toBeUndefined();

		lexer.reset('.["foo.bar"]');
		expect(lexer.next()).toMatchObject({ type: 'identity' });
		expect(lexer.next()).toMatchObject({ type: 'lbracket' });
		expect(lexer.next()).toMatchObject({ type: 'string', value: 'foo.bar' })
		expect(lexer.next()).toMatchObject({ type: 'rbracket' });
		expect(lexer.next()).toBeUndefined();
	});

	test('Optional Object Identifier-Index: .foo?', () => {
		lexer.reset('.foo?');
		expect(lexer.next()).toMatchObject({ type: 'identity' });
		expect(lexer.next()).toMatchObject({ type: 'field', value: 'foo' });
		expect(lexer.next()).toMatchObject({ type: 'optional' });
		expect(lexer.next()).toBeUndefined();
	});

	test('Array index: .[2], .[-1]', () => {
		lexer.reset('.[2]');
		expect(lexer.next()).toMatchObject({ type: 'identity' });
		expect(lexer.next()).toMatchObject({ type: 'lbracket' });
		expect(lexer.next()).toMatchObject({ type: 'number', value: '2' })
		expect(lexer.next()).toMatchObject({ type: 'rbracket' });
		expect(lexer.next()).toBeUndefined();

		lexer.reset('.[-1]');
		expect(lexer.next()).toMatchObject({ type: 'identity' });
		expect(lexer.next()).toMatchObject({ type: 'lbracket' });
		expect(lexer.next()).toMatchObject({ type: 'number', value: '-1' })
		expect(lexer.next()).toMatchObject({ type: 'rbracket' });
		expect(lexer.next()).toBeUndefined();
	});

	test('Array / String Slice: .[10:15]', () => {
		lexer.reset('.[10:15]');
		expect(lexer.next()).toMatchObject({ type: 'identity' });
		expect(lexer.next()).toMatchObject({ type: 'lbracket' });
		expect(lexer.next()).toMatchObject({ type: 'number', value: '10' })
		expect(lexer.next()).toMatchObject({ type: 'colon' });
		expect(lexer.next()).toMatchObject({ type: 'number', value: '15' })
		expect(lexer.next()).toMatchObject({ type: 'rbracket' });
		expect(lexer.next()).toBeUndefined();
	});

	test('Comma: .foo, .bar', () => {
		lexer.reset('.foo, .bar');
		expect(lexer.next()).toMatchObject({ type: 'identity' });
		expect(lexer.next()).toMatchObject({ type: 'field', value: 'foo' });
		expect(lexer.next()).toMatchObject({ type: 'comma' });
		expect(lexer.next()).toMatchObject({ type: 'identity' });
		expect(lexer.next()).toMatchObject({ type: 'field', value: 'bar' });
		expect(lexer.next()).toBeUndefined();
	});

	test('Pipe: .[] | .foo, .a | .b | .c', () => {
		lexer.reset('.[] | .foo');
		expect(lexer.next()).toMatchObject({ type: 'identity' });
		expect(lexer.next()).toMatchObject({ type: 'lbracket' });
		expect(lexer.next()).toMatchObject({ type: 'rbracket' });
		expect(lexer.next()).toMatchObject({ type: 'pipe' });
		expect(lexer.next()).toMatchObject({ type: 'identity' });
		expect(lexer.next()).toMatchObject({ type: 'field', value: 'foo' });
		expect(lexer.next()).toBeUndefined();

		lexer.reset('.a | .b | .c');
		expect(lexer.next()).toMatchObject({ type: 'identity' });
		expect(lexer.next()).toMatchObject({ type: 'field', value: 'a' });
		expect(lexer.next()).toMatchObject({ type: 'pipe' });
		expect(lexer.next()).toMatchObject({ type: 'identity' });
		expect(lexer.next()).toMatchObject({ type: 'field', value: 'b' });
		expect(lexer.next()).toMatchObject({ type: 'pipe' });
		expect(lexer.next()).toMatchObject({ type: 'identity' });
		expect(lexer.next()).toMatchObject({ type: 'field', value: 'c' });
		expect(lexer.next()).toBeUndefined();
	});

	test('Parenthesis: (. + 2) * 5', () => {
		lexer.reset('(. + 2) * 5');
		expect(lexer.next()).toMatchObject({ type: 'lparen' });
		expect(lexer.next()).toMatchObject({ type: 'identity' });
		expect(lexer.next()).toMatchObject({ type: 'addition' });
		expect(lexer.next()).toMatchObject({ type: 'number', value: '2' });
		expect(lexer.next()).toMatchObject({ type: 'rparen' });
		expect(lexer.next()).toMatchObject({ type: 'multiplication' });
		expect(lexer.next()).toMatchObject({ type: 'number', value: '5' });
		expect(lexer.next()).toBeUndefined();
	});

	test('Array construction: [.foo, .bar, .baz], [.items[].name]', () => {
		lexer.reset('[.foo, .bar, .baz]');
		expect(lexer.next()).toMatchObject({ type: 'lbracket' });
		expect(lexer.next()).toMatchObject({ type: 'identity' });
		expect(lexer.next()).toMatchObject({ type: 'field', value: 'foo' });
		expect(lexer.next()).toMatchObject({ type: 'comma' });
		expect(lexer.next()).toMatchObject({ type: 'identity' });
		expect(lexer.next()).toMatchObject({ type: 'field', value: 'bar' });
		expect(lexer.next()).toMatchObject({ type: 'comma' });
		expect(lexer.next()).toMatchObject({ type: 'identity' });
		expect(lexer.next()).toMatchObject({ type: 'field', value: 'baz' });
		expect(lexer.next()).toMatchObject({ type: 'rbracket' });
		expect(lexer.next()).toBeUndefined();

		lexer.reset('[.items[].name]');
		expect(lexer.next()).toMatchObject({ type: 'lbracket' });
		expect(lexer.next()).toMatchObject({ type: 'identity' });
		expect(lexer.next()).toMatchObject({ type: 'field', value: 'items' });
		expect(lexer.next()).toMatchObject({ type: 'lbracket' });
		expect(lexer.next()).toMatchObject({ type: 'rbracket' });
		expect(lexer.next()).toMatchObject({ type: 'identity' });
		expect(lexer.next()).toMatchObject({ type: 'field', value: 'name' });
		expect(lexer.next()).toMatchObject({ type: 'rbracket' });
		expect(lexer.next()).toBeUndefined();
	});

	test('Object Construction: {foo: .bar}', () => {
		lexer.reset('{foo: .bar}');
		expect(lexer.next()).toMatchObject({ type: 'lcurly' });
		expect(lexer.next()).toMatchObject({ type: 'field', value: 'foo' });
		expect(lexer.next()).toMatchObject({ type: 'colon' });
		expect(lexer.next()).toMatchObject({ type: 'identity' });
		expect(lexer.next()).toMatchObject({ type: 'field', value: 'bar' })
		expect(lexer.next()).toMatchObject({ type: 'rcurly' });
		expect(lexer.next()).toBeUndefined();
	});

	test('Recursive Descent: ..|.a?', () => {
		lexer.reset('..|.a?');
		expect(lexer.next()).toMatchObject({ type: 'descend' });
		expect(lexer.next()).toMatchObject({ type: 'pipe' });
		expect(lexer.next()).toMatchObject({ type: 'identity' });
		expect(lexer.next()).toMatchObject({ type: 'field', value: 'a' });
		expect(lexer.next()).toMatchObject({ type: 'optional' });
		expect(lexer.next()).toBeUndefined();
	});

	test('Addition: .a + 1, .a + .b, .a + null', () => {
		lexer.reset('.a + 1');
		expect(lexer.next()).toMatchObject({ type: 'identity' });
		expect(lexer.next()).toMatchObject({ type: 'field', value: 'a' });
		expect(lexer.next()).toMatchObject({ type: 'addition' });
		expect(lexer.next()).toMatchObject({ type: 'number', value: '1' });
		expect(lexer.next()).toBeUndefined();

		lexer.reset('.a + .b');
		expect(lexer.next()).toMatchObject({ type: 'identity' });
		expect(lexer.next()).toMatchObject({ type: 'field', value: 'a' });
		expect(lexer.next()).toMatchObject({ type: 'addition' });
		expect(lexer.next()).toMatchObject({ type: 'identity' });
		expect(lexer.next()).toMatchObject({ type: 'field', value: 'b' });
		expect(lexer.next()).toBeUndefined();

		lexer.reset('.a + null');
		expect(lexer.next()).toMatchObject({ type: 'identity' });
		expect(lexer.next()).toMatchObject({ type: 'field', value: 'a' });
		expect(lexer.next()).toMatchObject({ type: 'addition' });
		expect(lexer.next()).toMatchObject({ type: 'null' });
		expect(lexer.next()).toBeUndefined();
	});

	test('Subtraction: 4 - .a, . - ["xml", "yaml"]', () => {
		lexer.reset('4 - .a');
		expect(lexer.next()).toMatchObject({ type: 'number', value: '4' });
		expect(lexer.next()).toMatchObject({ type: 'subtraction' });
		expect(lexer.next()).toMatchObject({ type: 'identity' });
		expect(lexer.next()).toMatchObject({ type: 'field', value: 'a' });
		expect(lexer.next()).toBeUndefined();

		lexer.reset('. - ["xml", "yaml"]');
		expect(lexer.next()).toMatchObject({ type: 'identity' });
		expect(lexer.next()).toMatchObject({ type: 'subtraction' });
		expect(lexer.next()).toMatchObject({ type: 'lbracket' });
		expect(lexer.next()).toMatchObject({ type: 'string', value: 'xml' })
		expect(lexer.next()).toMatchObject({ type: 'comma' });
		expect(lexer.next()).toMatchObject({ type: 'string', value: 'yaml' })
		expect(lexer.next()).toMatchObject({ type: 'rbracket' });
		expect(lexer.next()).toBeUndefined();
	});

	test('Multiplication, division: 10 / . * 3, . / ", "', () => {
		lexer.reset('10 / . * 3');
		expect(lexer.next()).toMatchObject({ type: 'number', value: '10' });
		expect(lexer.next()).toMatchObject({ type: 'division' });
		expect(lexer.next()).toMatchObject({ type: 'identity' });
		expect(lexer.next()).toMatchObject({ type: 'multiplication' });
		expect(lexer.next()).toMatchObject({ type: 'number', value: '3' });
		expect(lexer.next()).toBeUndefined();
	});

	test('Length: .[] | length', () => {
		lexer.reset('.[] | length');
		expect(lexer.next()).toMatchObject({ type: 'identity' });
		expect(lexer.next()).toMatchObject({ type: 'lbracket' });
		expect(lexer.next()).toMatchObject({ type: 'rbracket' });
		expect(lexer.next()).toMatchObject({ type: 'pipe' });
		expect(lexer.next()).toMatchObject({ type: 'length' });
		expect(lexer.next()).toBeUndefined();
	});

	test('utf8bytelength: utf8bytelength', () => {
		lexer.reset('utf8bytelength');
		expect(lexer.next()).toMatchObject({ type: 'utf8bytelength' });
		expect(lexer.next()).toBeUndefined();
	});

	test('keys: keys', () => {
		lexer.reset('keys');
		expect(lexer.next()).toMatchObject({ type: 'keys' });
		expect(lexer.next()).toBeUndefined();
	});

	// TODO: go through all of "Bultin operators and functions" and the following sections
	// https://stedolan.github.io/jq/manual/#Builtinoperatorsandfunctions
});
