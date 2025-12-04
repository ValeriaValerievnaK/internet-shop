import type { IProduct } from '../../types';
import { ACTION_TYPE } from '../types';

export const setAllProducts = (products: IProduct[]) => ({
	type: ACTION_TYPE.SET_ALL_PRODUCT,
	payload: products,
});
