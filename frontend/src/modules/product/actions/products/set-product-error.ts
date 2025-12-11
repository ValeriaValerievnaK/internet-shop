import { ACTION_TYPE } from '../../../../constants';

export const setProductError = (error: string | null) => ({
	type: ACTION_TYPE.SET_PRODUCT_ERROR,
	payload: error,
});
