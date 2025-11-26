import { ACTION_TYPE } from '../types';

export const setCartData = (updatedCart) => ({
	type: ACTION_TYPE.SET_CART_DATA,
	payload: updatedCart,
});
