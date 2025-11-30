import type { TAppDispatch, TAppThunk } from '../../store';
import type { IProduct } from '../../types';
import { request } from '../../utils';
import { setProductData } from './set-product-data';

interface IResponse {
	data?: IProduct;
}

export const loadProductAsync =
	(productId: string): TAppThunk<Promise<IResponse>> =>
	(dispatch: TAppDispatch) =>
		request<IResponse>(`/api/products/${productId}`).then((productData) => {
			if (productData.data) {
				dispatch(setProductData(productData.data));
			}
			return productData;
		});
