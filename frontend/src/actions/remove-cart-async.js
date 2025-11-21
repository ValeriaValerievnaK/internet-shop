import { request } from '../utils';
import { removeCart } from './remove-cart';

export const removeCartAsync = () => (dispatch) =>
	request(`/api/cart/`, 'DELETE').then((cartData) => {
		if (!cartData.error) {
			dispatch(removeCart());
		}
	});
