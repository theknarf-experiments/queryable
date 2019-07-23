import React from 'react';
import Queryable from './queryable';
import { backendOptic } from 'backend-simple-sql';
import * as L from 'partial.lenses';

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

const TableRenderer = ({ data }) =>
	<table>
		<thead>
			{data.length > 0 ?
				<tr>
				{Object.keys(data[0]).map(key =>
					<th key={key}>{ key }</th>
				)}
				</tr>
			: <></>}
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

const lensBackend = (query, data) =>
	L.collect(backendOptic(query), data);

export default () => <>
	<h1> Queryable </h1>
	<Queryable
		backend={lensBackend}
		data={exampleData}
		initialQuery='SELECT * FROM users;'
		render={data => <TableRenderer data={data} />}
		/>
</>;
