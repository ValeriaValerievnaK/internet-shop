import { request } from '../../utils';
import { setCartData } from './set-cart-data';
import type { TAppThunk } from '../../store';
import type { ICartData } from '../../types';

interface IResponse {
	data?: ICartData[];
	error?: string;
}

export const loadCartAsync = (): TAppThunk<Promise<IResponse>> => (dispatch) =>
	request<IResponse>(`/api/cart`).then((cartData) => {
		if (cartData.data) {
			dispatch(setCartData(cartData.data));
		}

		return cartData;
	});
