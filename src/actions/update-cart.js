import { ACTION_TYPE } from './action-type';

export const updateCart = (updatedCart) => {
	return {
		type: ACTION_TYPE.UPDATE_CART,
		payload: updatedCart,
	};
};
