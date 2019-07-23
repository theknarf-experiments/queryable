import React, { useState, useEffect } from 'react';

export default ({ backend, data, render, initialQuery=null }) => {
	const [ query, setQuery ] = useState(initialQuery);
	const [ result, setResult ] = useState();
	const [ error, setError ] = useState();

	useEffect(() => {
		try {
			const r = backend( query, data );
			setResult(r);
			setError();
		} catch(e) {
			// TODO: add some kind of set timout here so that we don't show errors while people is typing
			console.error(e);
			setError(e.toString());
		};
	}, [ query, data, backend ]);

	return <div>
		<input
			value={query}
			onChange={e => setQuery(e.target.value)}
			style={{ padding: '1.1em 2em', minWidth: '20em' }}
			/>	
		<div>{ error }</div>
		{ !!result ? render(result) : [] }
	</div>;
}
