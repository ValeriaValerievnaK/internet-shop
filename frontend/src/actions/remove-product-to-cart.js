import { ACTION_TYPE } from './action-type';

export const removeProductToCart = (prodId) => {
	return {
		type: ACTION_TYPE.REMOVE_PRODUCT_TO_CART,
		payload: prodId,
	};
};
