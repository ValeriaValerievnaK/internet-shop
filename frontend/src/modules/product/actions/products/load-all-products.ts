import type { TAppThunk } from '../../../../store';
import type { IProduct, TApiError } from '../../../../types';
import { getApiErrorMessage, request } from '../../../../utils';
import { setProductError } from './set-product-error';
import { setProductLoading } from './set-product-loading';
import { setProducts } from './set-products';

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
				dispatch(setProducts(response.data));
			}

			return response;
		} catch (e) {
			const error = e as TApiError;
			const message = getApiErrorMessage(error.status);

			dispatch(setProductError(error.message || message));

			throw e;
		} finally {
			dispatch(setProductLoading(false));
		}
	};
