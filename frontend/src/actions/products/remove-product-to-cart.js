import { ACTION_TYPE } from '../types';

export const removeProductToCart = (prodId) => ({
	type: ACTION_TYPE.REMOVE_PRODUCT_TO_CART,
	payload: prodId,
});
