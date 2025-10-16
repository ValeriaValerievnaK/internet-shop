import { ACTION_TYPE } from './action-type';

export const setProductData = (updatedPost) => {
	return {
		type: ACTION_TYPE.SET_PRODUCT_DATA,
		payload: updatedPost,
	};
};
