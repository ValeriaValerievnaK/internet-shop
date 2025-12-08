import type { TAppThunk } from '../../store';
import type { TApiError } from '../../types';
import { request } from '../../utils';
import { getApiErrorMessage } from '../../utils/apiError';
import { removeProductToCart } from './remove-product-to-cart';
import { setProductError } from './set-product-error';
import { setProductLoading } from './set-product-loading';

interface IResponse {
	error?: string | null;
}

export const removeProductToCartAsync =
	(id: string): TAppThunk =>
	async (dispatch) => {
		dispatch(setProductLoading(true));
		dispatch(setProductError(null));

		try {
			const response = await request<IResponse>(`/api/cart/${id}`, 'DELETE');

			if (!response.error) {
				dispatch(removeProductToCart(id));
			}

			if (response.error) {
				dispatch(setProductError(response.error));
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
