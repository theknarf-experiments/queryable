# Queryable React

React frontend for Queryable.

```
npm install --save queryable-core queryable-react
```

## Usage

```JSX
import React from 'react';
import Queryable from 'queryable-react';
import simpleSqlBackend from 'backend-simple-sql';

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
		<tr>
		{Object.keys(data[0]).map(key =>
			<th>{ key }</th>
		)}
		</tr>
		{data.map(datum =>
		<tr>
		{Object.keys(datum).map(key =>
			<td>{ datum[key] }</td>
		)}
		</tr>
		)}
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
```

## Queryable properties

Prop         | Optional | Description
----         | -------- | -----------
backend      | false    | The backend for queryable to hand queries off to
data         | false    | The data to hand over to the backend
initialQuery | true     | Any starting / prefilled query, this can be left blank
render       | false    | The render function of the resulting data
