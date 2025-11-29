import { request } from '../../utils';
import { setCartData } from './set-cart-data';
import type { TAppDispatch, TAppThunk } from '../../store';

interface IData {
	count: number;
	id: string;
	price: number;
	productId: string;
	productImageUrl: string;
	productTitle: string;
	totalCount: number;
	userId: string;
}

interface IResponse {
	data?: IData[];
	error?: string;
}

export const loadCartAsync = ():TAppThunk<Promise<IResponse>> => (dispatch: TAppDispatch) =>
	request<IResponse>(`/api/cart`).then((cartData) => {
		if (cartData.data) {
			dispatch(setCartData(cartData.data));
		}

		return cartData;
	});
