import type { TAppThunk } from '../../store';
import type { TApiError } from '../../types';
import { request } from '../../utils';
import { setProductError } from './set-product-error';
import { setProductLoading } from './set-product-loading';

interface IResponse {
	error?: string | null;
}

export const removeProductAsync =
	(id: string): TAppThunk<Promise<IResponse>> =>
	async (dispatch) => {
		dispatch(setProductLoading(true));
		dispatch(setProductError(null));

		try {
			const response = await request<IResponse>(`/api/products/${id}`, 'DELETE');

			return response;
		} catch (e) {
			const error = e as TApiError;

			dispatch(setProductError(error.error));

			throw e;
		} finally {
			dispatch(setProductLoading(false));
		}
	};
