import { ACTION_TYPE } from '../types';

export const updateCart = (updatedCart) => ({
	type: ACTION_TYPE.UPDATE_CART,
	payload: updatedCart,
});
