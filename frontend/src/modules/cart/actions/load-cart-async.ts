import type { TAppThunk } from '../../../store';
import type { ICartData, TApiError } from '../../../types';
import { request, getApiErrorMessage } from '../../../utils';
import { setCartData } from './set-cart-data';
import { setCartError } from './set-cart-error';
import { setCartLoading } from './set-cart-loading';

interface IResponse {
	data?: ICartData[];
	error?: string;
}

export const loadCartAsync = (): TAppThunk<Promise<IResponse>> => async (dispatch) => {
	dispatch(setCartLoading(true));
	dispatch(setCartError(null));

	try {
		const response = await request<IResponse>('/api/cart');

		if (response.data) {
			dispatch(setCartData(response.data));
		}

		return response;
	} catch (e) {
		const error = e as TApiError;

		const message = getApiErrorMessage(error.status);

		dispatch(setCartError(error.message || message));

		throw e;
	} finally {
		dispatch(setCartLoading(false));
	}
};
