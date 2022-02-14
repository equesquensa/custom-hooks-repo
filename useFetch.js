import { useState, useEffect, useRef } from 'react';

export const useFetch = (url) => {
	const isCreated = useRef(true);

	useEffect(() => {
		return () => {
			isCreated.current = false;
		};
	}, []);

	const [state, setState] = useState({
		data: null,
		loading: true,
		error: null,
	});

	useEffect(() => {
		setState({ data: null, loading: true, error: null });

		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				if (isCreated.current) {
					setState({
						loading: false,
						error: null,
						data,
					});
				}
			})
			.catch(() => {
				setState({
					data: null,
					loading: false,
					error: 'No se pudo cargar la info',
				});
			});
	}, [url]);

	return state;
};
