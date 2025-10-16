export const addProduct = ({ title, imageUrl, category, price, count }) =>
	fetch('http://localhost:3008/products', {
		method: 'POST',
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
	}).then((createdProduct) => createdProduct.json());
