import React from 'react';
import Queryable from './queryable';
import { backend as simpleSqlBackend } from 'backend-simple-sql';

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
	]
};

const TableRenderer = ({ data }) =>
	<table>
		<thead>
			<tr>
			{Object.keys(data[0]).map(key =>
				<th key={key}>{ key }</th>
			)}
			</tr>
		</thead>
		<tbody>
		{data.map((datum, i) =>
			<tr key={`datum-${i}`}>
			{Object.keys(datum).map(key =>
				<td key={key}>{ datum[key] }</td>
			)}
			</tr>
		)}
		</tbody>
	</table>;

export default () => <>
	<h1> Queryable </h1>
	<Queryable
		backend={simpleSqlBackend}
		data={exampleData}
		initialQuery='SELECT * FROM users;'
		render={data => <TableRenderer data={data} />}
		/>
</>;
