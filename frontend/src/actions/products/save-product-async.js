import { request } from '../../utils';
import { setProductData } from './set-product-data';

export const saveProductAsync = (id, newProductData) => (dispatch) => {
	const saveRequest = id
		? request(`/api/products/${id}`, 'PATCH', newProductData)
		: request(`/api/products`, 'POST', newProductData);

	return saveRequest.then((updatedProduct) => {
		dispatch(setProductData(updatedProduct.data));

		return updatedProduct.data;
	});
};
