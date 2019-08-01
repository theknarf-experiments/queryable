import React from 'react';
import Queryable from './queryable';

const exampleData = {
	users: [
		{ id: 1, name: 'Bob' },
		{ id: 2, name: 'Jen' },
		{ id: 3, name: 'Robin' },
	],
	depth: [
		{ user: 1, owes: 2, amount: 10 /* dollars */ },
		{ user: 1, owes: 3, amount: 20 /* dollars */ },
		{ user: 2, owes: 3, amount: 15 /* dollars */ },
	],
	tables: [
		{ name: 'users' },
		{ name: 'depth' },
	]
};

console.log('exampleData', exampleData);

export default () => <>
	<h1> Queryable </h1>
	<Queryable
		initialData={exampleData}
		initialQuery='SELECT * FROM users;'
		/>
</>;
