import { removeCart } from './remove-cart';

export const removeCartAsync = (requestServer, userId) => (dispatch) =>
	requestServer('removeCart', userId).then((cartData) => {
		if (cartData.res) {
			dispatch(removeCart);
		}
	});
