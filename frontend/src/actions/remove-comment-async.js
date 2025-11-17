import { setProductData } from './set-product-data';

export const removeCommentAsync = (requestServer, id, productId) => (dispatch) => {
	requestServer('removeProductComment', id, productId).then((productData) => {
		dispatch(setProductData(productData.res));
	});
};
