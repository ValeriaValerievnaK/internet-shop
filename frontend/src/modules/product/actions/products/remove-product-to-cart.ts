import { ACTION_TYPE } from '../../../../constants';

export const removeProductToCart = (prodId: string) => ({
	type: ACTION_TYPE.REMOVE_PRODUCT_TO_CART,
	payload: prodId,
});
