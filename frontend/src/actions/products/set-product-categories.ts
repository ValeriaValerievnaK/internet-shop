import type { ICategoriesData } from '../../types';
import { ACTION_TYPE } from '../types';

export const setProductCategories = (categories: ICategoriesData[]) => ({
	type: ACTION_TYPE.SET_PRODUCT_CATEGORIES,
	payload: categories,
});
