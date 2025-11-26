import { ACTION_TYPE } from '../types';

export const setProductData = (updatedProduct) => ({
	type: ACTION_TYPE.SET_PRODUCT_DATA,
	payload: updatedProduct,
});
