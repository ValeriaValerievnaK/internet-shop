import type { TAppThunk } from '../../store';
import type { TApiError } from '../../types';
import { request } from '../../utils';
import { getApiErrorMessage } from '../../utils/apiError';
import { removeCart } from './remove-cart';
import { setCartError } from './set-cart-error';
import { setCartLoading } from './set-cart-loading';

interface IResponse {
	error?: string | null;
}

export const addOrderCartAsync = (): TAppThunk => async (dispatch) => {
	dispatch(setCartLoading(true));
	dispatch(setCartError(null));

	try {
		const response = await request<IResponse>(`/api/cart/order`, 'POST');

		if (!response.error) {
			dispatch(removeCart());
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
