export const transformCart = (dbCart) => {
	if (!dbCart) {
		return null;
	}
	// console.log('db', dbCart);

	return {
		productId: dbCart.product_id,
		productImageUrl: dbCart.image_url,
		productTitle: dbCart.title,
		price: dbCart.price,
		userId: dbCart.user_id,
		count: dbCart.count,
		id: dbCart.id,
	};
};
