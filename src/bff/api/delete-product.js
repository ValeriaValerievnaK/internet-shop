export const deleteProduct = (productId) =>
	fetch(`http://localhost:3008/products/${productId}`, {
		method: 'DELETE',
	});
