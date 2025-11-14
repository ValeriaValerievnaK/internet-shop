import { transformCart } from '../transformers';

export const getCart = async (userId) =>
	fetch(`http://localhost:3008/cart?user_id=${userId}`)
		.then((loadedCart) => loadedCart.json())
		.then((loadedCart) => loadedCart.map(transformCart));
