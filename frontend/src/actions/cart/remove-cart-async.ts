import type { TAppThunk } from '../../store';
import { request } from '../../utils';
import { removeCart } from './remove-cart';

interface IResponse {
	error?: string | null;
}

export const removeCartAsync = (): TAppThunk => (dispatch) =>
	request<IResponse>(`/api/cart/`, 'DELETE').then((cartData) => {
		if (!cartData.error) {
			dispatch(removeCart());
		}
	});
