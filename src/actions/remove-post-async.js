export const removePostAsync = (requestServer, productId) => () =>
	requestServer('removeProduct', productId);
