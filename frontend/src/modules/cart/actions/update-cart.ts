import type { ICartData } from '../../../types';
import { ACTION_TYPE } from '../../../constants';

export const updateCart = (updatedCart: ICartData) => ({
	type: ACTION_TYPE.UPDATE_CART,
	payload: updatedCart,
});
