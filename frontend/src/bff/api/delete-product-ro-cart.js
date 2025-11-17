export const deleteProductToCart = (id) =>
	fetch(`http://localhost:3008/cart/${id}`, {
		method: 'DELETE',
	});
