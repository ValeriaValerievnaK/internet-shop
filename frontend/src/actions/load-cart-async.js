import { request } from '../utils';
import { setCartData } from './set-cart-data';

export const loadCartAsync = () => (dispatch) =>
	request(`/api/cart`).then((cartData) => {
		if (cartData.data) {
			dispatch(setCartData(cartData.data));
		}

		return cartData;
	});
