import { ACTION_TYPE } from './action-type';

export const setCartData = (updatedCart) => {
	// console.log('cartData.res', cartData.res);
	return {
		type: ACTION_TYPE.SET_CART_DATA,
		payload: updatedCart,
	};
};
