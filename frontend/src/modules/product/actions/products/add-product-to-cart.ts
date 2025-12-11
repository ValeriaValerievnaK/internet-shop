import type { TAppThunk } from '../../../../store';
import type { TApiError } from '../../../../types';
import { request, getApiErrorMessage } from '../../../../utils';
import { setProductError } from './set-product-error';
import { setProductLoading } from './set-product-loading';

interface IRequest {
	productId: string;
	userId: string;
	imageUrl: string;
	title: string;
	price: number | null;
}

interface IResponse {
	data?: string;
}

export const addProductToCart =
	({
		productId,
		userId,
		imageUrl,
		title,
		price,
	}: IRequest): TAppThunk<Promise<IResponse>> =>
	async (dispatch) => {
		dispatch(setProductLoading(true));
		dispatch(setProductError(null));

		try {
			const response = await request<IResponse, IRequest>('/api/cart', 'POST', {
				productId,
				userId,
				imageUrl,
				title: title.trim(),
				price,
			});

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
