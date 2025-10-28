import { setCartData } from './set-cart-data';

export const loadCartAsync = (requestServer, userId) => (dispatch) =>
	requestServer('fetchProductCart', userId).then((cartData) => {
		if (cartData.res) {
			console.log('cartData.res', cartData.res);

			dispatch(setCartData(cartData.res));
		}
		return cartData;
	});
