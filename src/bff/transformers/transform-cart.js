export const transformCart = (dbCart) => {
	if (!dbCart) {
		return null;
	}

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
