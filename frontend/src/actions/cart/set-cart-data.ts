import type { ICartData } from '../../types';
import { ACTION_TYPE } from '../types';

export const setCartData = (updatedCart: ICartData[]) => ({
	type: ACTION_TYPE.SET_CART_DATA,
	payload: updatedCart,
});
