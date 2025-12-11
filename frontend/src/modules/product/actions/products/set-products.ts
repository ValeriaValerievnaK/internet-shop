import { ACTION_TYPE } from '../../../../constants';
import type { IProduct } from '../../../../types';

export const setProducts = (products: IProduct[]) => ({
	type: ACTION_TYPE.SET_PRODUCTS,
	payload: products,
});
