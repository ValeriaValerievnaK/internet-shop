import { transformCart } from '../transformers';

const ALL_CART_URL = 'http://localhost:3008/cart';
const PRODUCT_CART_URL = 'http://localhost:3008/cart?user_id=';

// TODO проверить использование ALL_CART_URL

export const getCart = async (userId) => {
	const url = userId === undefined ? ALL_CART_URL : PRODUCT_CART_URL + userId;

	return fetch(url)
		.then((loadedCart) => loadedCart.json())
		.then((loadedCart) => loadedCart.map(transformCart));
};
