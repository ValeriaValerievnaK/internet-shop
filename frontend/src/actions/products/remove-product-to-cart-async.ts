import type { TAppDispatch, TAppThunk } from '../../store';
import { request } from '../../utils';
import { removeProductToCart } from './remove-product-to-cart';

interface IResponse {
	error?: string | null;
}

// TODO поправить типизацию

export const removeProductToCartAsync = (id: string) => (dispatch: TAppDispatch) => {
	request<IResponse>(`/api/cart/${id}`, 'DELETE').then(() => {
		dispatch(removeProductToCart(id));
	});
};
