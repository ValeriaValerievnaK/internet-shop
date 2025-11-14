export const deleteCart = (userId) =>
	fetch(`http://localhost:3008/cart?user_id=${userId}`)
		.then((response) => response.json())
		.then((carts) => {
			const deletePromises = carts.map((cart) =>
				fetch(`http://localhost:3008/cart/${cart.id}`, {
					method: 'DELETE',
				}),
			);
			return Promise.all(deletePromises);
		})
		.catch(console.error);
