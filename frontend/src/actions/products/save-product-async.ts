import type { IProduct } from '../../types';
import type { TAppDispatch } from '../../store';
import { request } from '../../utils';
import { setProductData } from './set-product-data';

export const saveProductAsync =
	(newProductData: IProduct, id?: string) => (dispatch: TAppDispatch) => {
		const saveRequest = id
			? request<{ data: IProduct }>(`/api/products/${id}`, 'PATCH', newProductData)
			: request<{ data: IProduct }>(`/api/products`, 'POST', newProductData);

		return saveRequest.then((updatedProduct) => {
			dispatch(setProductData(updatedProduct.data));

			return updatedProduct.data;
		});
	};
