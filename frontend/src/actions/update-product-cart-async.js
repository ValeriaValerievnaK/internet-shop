import { updateCart } from './update-cart';

export const updateProductCartAsync =
	(requestServer, id, newCount, newPrice) => (dispatch) =>
		requestServer('updateCart', id, newCount, newPrice).then((updatedCart) => {
			dispatch(updateCart(updatedCart.res));

			return updatedCart.res;
		});
