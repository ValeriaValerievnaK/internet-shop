import { transformCart } from '../transformers';

export const updateProductToUserCart = (id, newCount, newPrice) =>
	fetch(`http://localhost:3008/cart/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			count: newCount,
			price: newPrice,
		}),
	})
		.then((loadedCart) => loadedCart.json())
		.then((loadedCart) => transformCart(loadedCart));
