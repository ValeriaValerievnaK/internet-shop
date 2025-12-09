import type { TAppThunk } from '../../store';
import type { IProduct, TApiError } from '../../types';
import { request } from '../../utils';
import { setProducts } from './set-products';
import { setProductError } from './set-product-error';
import { setProductLoading } from './set-product-loading';
import { PAGINATION_LIMIT } from '../../constans';
import { setLastPage } from './set-last-page';
import { getApiErrorMessage } from '../../utils/apiError';

interface IResponse {
	data?: {
		products: IProduct[];
		lastPage: number;
	};
	error?: string;
}

export const loadProducts =
	(
		searchPhrase?: string,
		page?: number,
		categorySearch?: string,
		sortValue?: string,
	): TAppThunk<Promise<IResponse>> =>
	async (dispatch) => {
		dispatch(setProductLoading(true));
		dispatch(setProductError(null));

		try {
			const response = await request<IResponse>(
				`/api/products?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}&category=${categorySearch}&sort=${sortValue}`,
			);

			if (response.data) {
				dispatch(setProducts(response.data.products));
				dispatch(setLastPage(response.data.lastPage));
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
