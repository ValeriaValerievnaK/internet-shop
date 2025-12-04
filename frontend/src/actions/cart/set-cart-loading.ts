import { ACTION_TYPE } from '../types';

export const setCartLoading = (isLoading: boolean) => ({
	type: ACTION_TYPE.SET_CART_LOADING,
	payload: isLoading,
});
