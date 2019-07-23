import React, { useState } from 'react';
import * as L from 'partial.lenses';
import { backendOptic } from 'backend-simple-sql';

export default ({ initialData, initialQuery=null }) => {
	const [ query, setQuery ] = useState(initialQuery);
	const [ data, setData ] = useState(initialData);

	return <div>
		<input
			value={query}
			onChange={e => setQuery(e.target.value)}
			style={{ padding: '1.1em 2em', minWidth: '20em' }}
			/>	
		<TableRenderer query={query} data={data} setData={setData} />
	</div>;
}

const TableRenderer = ({ query, data, setData }) => {
	try {
		const optic = backendOptic(query);

		const getHeaders = data =>
			L.collect([L.limit(1, optic), L.keys], data);

		const onChange = (i, key) => {
			return e => {
				const updateDataOptic = [
					optic,
					L.when((_, index) => index === i),
					L.prop(key)
				];
				const updatedData = L.set(updateDataOptic, e.target.value, data);
				setData(updatedData);
			};
		}

		return <table>
			<thead>
				<tr>
				{getHeaders(data).map(key =>
					<th key={key}>{ key }</th>
				)}
				</tr>
			</thead>
			<tbody>
			{L.collect(optic, data).map((datum, i) =>
				<tr key={`datum-${i}`}>
				{L.collect([L.keys], datum).map(key =>
					<td key={key}>
						<input
							value={ datum[key] }
							onChange={onChange(i, key)}
							/>
					</td>
				)}
				</tr>
			)}
			</tbody>
		</table>;

	} catch(e) {
		return <div>{ e.toString() }</div>;
	}
}


