import type { TAppThunk } from '../../store';
import { request } from '../../utils';
import { removeProductToCart } from './remove-product-to-cart';

interface IResponse {
	error?: string | null;
}

export const removeProductToCartAsync =
	(id: string): TAppThunk =>
	(dispatch) => {
		request<IResponse>(`/api/cart/${id}`, 'DELETE').then(() => {
			dispatch(removeProductToCart(id));
		});
	};
