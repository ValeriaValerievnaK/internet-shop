export const updateProduct = ({ id, title, imageUrl, category, price, count }) =>
	fetch(`http://localhost:3008/products/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			title,
			image_url: imageUrl,
			category,
			price,
			count,
		}),
	}).then((loadedProduct) => loadedProduct.json());
