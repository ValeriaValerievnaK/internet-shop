import { request } from '../../utils';
import { removeProductToCart } from './remove-product-to-cart';

export const removeProductToCartAsync = (id) => (dispatch) => {
	request(`/api/cart/${id}`, 'DELETE').then(() => {
		dispatch(removeProductToCart(id));
	});
};
