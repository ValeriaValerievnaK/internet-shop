import type { IProduct } from '../../types';
import { ACTION_TYPE } from '../types';

export const setProducts = (products: IProduct[]) => ({
	type: ACTION_TYPE.SET_PRODUCTS,
	payload: products,
});
