import { ACTION_TYPE } from '../../../../constants';

export const setProductLoading = (isLoading: boolean) => ({
	type: ACTION_TYPE.SET_PRODUCT_LOADING,
	payload: isLoading,
});
