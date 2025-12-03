import type { IProduct } from '../../types';
import { ACTION_TYPE } from '../types';

export const setProductData = (updatedProduct: IProduct) => ({
	type: ACTION_TYPE.SET_PRODUCT_DATA,
	payload: updatedProduct,
});
