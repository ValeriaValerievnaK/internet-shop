import type { ICartData } from '../../types';
import { ACTION_TYPE } from '../types';

export const updateCart = (updatedCart: ICartData) => ({
	type: ACTION_TYPE.UPDATE_CART,
	payload: updatedCart,
});
