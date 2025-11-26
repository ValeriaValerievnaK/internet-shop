import { request } from '../../utils';
import { updateCart } from './update-cart';

export const updateProductCartAsync = (id, newCount, newPrice) => (dispatch) =>
	request(`/api/cart/${id}`, 'PATCH', { newCount, newPrice }).then((updatedCart) => {
		dispatch(updateCart(updatedCart.data));

		return updatedCart.data;
	});
