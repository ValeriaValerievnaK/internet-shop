import type { TAppThunk } from '../../store';
import type { IProduct, TApiError } from '../../types';
import { request } from '../../utils';
import { setAllProducts } from './set-all-products';
import { setProductError } from './set-product-error';
import { setProductLoading } from './set-product-loading';

interface IProductsResponse {
	data?: IProduct[];
	error?: string;
}

export const loadAllProducts =
	(): TAppThunk<Promise<IProductsResponse>> => async (dispatch) => {
		dispatch(setProductLoading(true));
		dispatch(setProductError(null));

		try {
			const response = await request<IProductsResponse>(`/api/products/all`);

			if (response.data) {
				dispatch(setAllProducts(response.data));
			}

			if (response.error) {
				dispatch(setProductError(response.error));
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
