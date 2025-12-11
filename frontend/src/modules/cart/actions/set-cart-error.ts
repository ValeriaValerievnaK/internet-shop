import { ACTION_TYPE } from '../../../constants';

export const setCartError = (error: string | null) => ({
	type: ACTION_TYPE.SET_CART_ERROR,
	payload: error,
});
