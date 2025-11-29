import type { TAppDispatch, TAppThunk } from '../../store';
import { request } from '../../utils';
import { removeCart } from './remove-cart';

interface IResponse {
	error?: string | null;
}

export const removeCartAsync = ():TAppThunk<Promise<void>> => (dispatch: TAppDispatch) =>
	request<IResponse>(`/api/cart/`, 'DELETE').then((cartData) => {
		if (!cartData.error) {
			dispatch(removeCart());
		}
	});
