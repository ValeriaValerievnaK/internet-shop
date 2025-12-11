import { ACTION_TYPE } from '../../../../constants';
import type { IProduct } from '../../../../types';

export const setProductData = (updatedProduct: IProduct) => ({
	type: ACTION_TYPE.SET_PRODUCT_DATA,
	payload: updatedProduct,
});
