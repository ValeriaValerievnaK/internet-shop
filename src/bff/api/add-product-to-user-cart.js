export const addProductToUserCart = (userId, productId) =>
	fetch('http://localhost:3008/cart', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			product_id: productId,
			user_id: userId,
			count: '1',
		}),
	});
