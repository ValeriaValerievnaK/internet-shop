export const addProductToUserCart = (productId, userId, imageUrl, title, price) =>
	fetch('http://localhost:3008/cart', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			product_id: productId,
			user_id: userId,
			image_url: imageUrl,
			title,
			price,
			count: '1',
		}),
	});
