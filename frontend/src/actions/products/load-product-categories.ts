import type { TAppThunk } from '../../store';
import type { ICategories, TApiError } from '../../types';
import { request } from '../../utils';
import { setProductCategories } from './set-product-categories';
import { setProductError } from './set-product-error';
import { setProductLoading } from './set-product-loading';

export const loadProductCategories =
	(): TAppThunk<Promise<ICategories>> => async (dispatch) => {
		dispatch(setProductLoading(true));
		dispatch(setProductError(null));

		try {
			const response = await request<ICategories>(`/api/products/categories`);

			if (response.data) {
				dispatch(setProductCategories(response.data));
			}

			return response;
		} catch (e) {
			const error = e as TApiError;

			dispatch(setProductError(error.error));

			throw e;
		} finally {
			dispatch(setProductLoading(false));
		}
	};
