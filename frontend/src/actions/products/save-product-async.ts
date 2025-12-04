import type { IProduct, TApiError } from '../../types';
import type { TAppThunk } from '../../store';
import { request } from '../../utils';
import { setProductData } from './set-product-data';
import { setProductLoading } from './set-product-loading';
import { setProductError } from './set-product-error';

export const saveProductAsync =
	(newProductData: IProduct, id?: string): TAppThunk<Promise<IProduct>> =>
	async (dispatch) => {
		dispatch(setProductLoading(true));
		dispatch(setProductError(null));

		const saveRequest = id
			? request<{ data: IProduct }>(`/api/products/${id}`, 'PATCH', newProductData)
			: request<{ data: IProduct }>(`/api/products`, 'POST', newProductData);

		try {
			const response = await saveRequest;

			if (response.data) {
				dispatch(setProductData(response.data));
			}

			return response.data;
		} catch (e) {
			const error = e as TApiError;

			dispatch(setProductError(error.error));

			throw e;
		} finally {
			dispatch(setProductLoading(false));
		}
	};
