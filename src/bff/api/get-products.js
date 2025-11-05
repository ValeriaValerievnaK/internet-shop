import { transformProduct } from '../transformers';

export const getProducts = (searchPhrase, page, limit, category) => {
	let url = 'http://localhost:3008/products?';
	const params = [];

	if (searchPhrase !== undefined) {
		params.push(`title_like=${searchPhrase}`);
	}

	if (page !== undefined) {
		params.push(`_page=${page}`);
	}

	if (limit !== undefined) {
		params.push(`_limit=${limit}`);
	}
	// if (limit !== category) {
	// 	params.push(`title_like=${category}`);
	// }

	if (params.length > 0) {
		url += params.join('&');
	} else {
		url = 'http://localhost:3008/products';
	}

	return fetch(url)
		.then((loadedProducts) => {
			return Promise.all([
				loadedProducts.json(),
				loadedProducts.headers.get('Link'),
			]);
		})
		.then(([loadedProducts, links]) => ({
			products: loadedProducts && loadedProducts.map(transformProduct),
			links,
		}));
};
