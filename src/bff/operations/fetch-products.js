import { getProducts } from '../api';

export const fetchProducts = async (searchPhrase, page, limit, category) => {
	const productsRes = await getProducts(searchPhrase, page, limit, category);

	return {
		error: null,
		res: productsRes,
	};
};
