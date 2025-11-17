import { ACTION_TYPE } from './action-type';

export const setProductData = (updatedProduct) => {
	return {
		type: ACTION_TYPE.SET_PRODUCT_DATA,
		payload: updatedProduct,
	};
};
