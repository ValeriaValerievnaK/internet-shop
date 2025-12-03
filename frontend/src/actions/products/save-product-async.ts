import type { IProduct } from '../../types';
import type { TAppThunk } from '../../store';
import { request } from '../../utils';
import { setProductData } from './set-product-data';

export const saveProductAsync =
	(newProductData: IProduct, id?: string): TAppThunk<Promise<IProduct>> =>
	(dispatch) => {
		const saveRequest = id
			? request<{ data: IProduct }>(`/api/products/${id}`, 'PATCH', newProductData)
			: request<{ data: IProduct }>(`/api/products`, 'POST', newProductData);

		return saveRequest.then((updatedProduct) => {
			dispatch(setProductData(updatedProduct.data));

			return updatedProduct.data;
		});
	};
