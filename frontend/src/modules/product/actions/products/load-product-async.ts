import type { TAppThunk } from '../../../../store';
import type { IProduct, TApiError } from '../../../../types';
import { getApiErrorMessage, request } from '../../../../utils';
import { setProductData } from './set-product-data';
import { setProductError } from './set-product-error';
import { setProductLoading } from './set-product-loading';

interface IResponse {
	data?: IProduct;
}

export const loadProductAsync =
	(productId?: string): TAppThunk<Promise<IResponse>> =>
	async (dispatch) => {
		dispatch(setProductLoading(true));
		dispatch(setProductError(null));

		try {
			const response = await request<IResponse>(`/api/products/${productId}`);

			if (response.data) {
				dispatch(setProductData(response.data));
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
