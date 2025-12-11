import { ACTION_TYPE } from '../../../../constants';
import type { ICategoriesData } from '../../../../types';

export const setProductCategories = (categories: ICategoriesData[]) => ({
	type: ACTION_TYPE.SET_PRODUCT_CATEGORIES,
	payload: categories,
});
