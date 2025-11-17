export const transformProduct = (dbProduct) => {
	if (!dbProduct) {
		return null;
	}

	return {
		id: dbProduct.id,
		title: dbProduct.title,
		imageUrl: dbProduct.image_url,
		category: dbProduct.category,
		price: dbProduct.price,
		count: dbProduct.count,
	};
};
