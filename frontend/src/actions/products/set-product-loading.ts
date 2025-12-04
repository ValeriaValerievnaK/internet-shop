import { ACTION_TYPE } from '../types';

export const setProductLoading = (isLoading: boolean) => ({
	type: ACTION_TYPE.SET_PRODUCT_LOADING,
	payload: isLoading,
});
