import type { TAppThunk } from '../../store';
import type { TApiError } from '../../types';
import { request } from '../../utils';
import { removeCart } from './remove-cart';
import { setCartError } from './set-cart-error';
import { setCartLoading } from './set-cart-loading';

interface IResponse {
	error?: string | null;
}

export const removeCartAsync = (): TAppThunk => async (dispatch) => {
	dispatch(setCartLoading(true));
	dispatch(setCartError(null));

	try {
		const response = await request<IResponse>(`/api/cart/`, 'DELETE');

		if (!response.error) {
			dispatch(removeCart());
		}

		if (response.error) {
			dispatch(setCartError(response.error));
		}

		return response;
	} catch (e) {
		const error = e as TApiError;

		dispatch(setCartError(error.error));

		throw e;
	} finally {
		dispatch(setCartLoading(false));
	}
};
