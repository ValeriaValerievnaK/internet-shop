import { setCartData } from './set-cart-data';

export const removeProductToCartAsync = (requestServer, id, userId) => (dispatch) => {
	requestServer('removeProductToCart', id, userId).then((cartData) => {
		dispatch(setCartData(cartData.res));
	});
};
