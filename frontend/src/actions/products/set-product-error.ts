import { ACTION_TYPE } from '../types';

export const setProductError = (error: string | null) => ({
	type: ACTION_TYPE.SET_PRODUCT_ERROR,
	payload: error,
});
