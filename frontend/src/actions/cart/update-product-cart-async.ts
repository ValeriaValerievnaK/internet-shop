import type { TAppDispatch, TAppThunk } from '../../store';
import { request } from '../../utils';
import { updateCart } from './update-cart';

interface IData {
	count: number;
	id: string;
	price: number;
	productId: string;
	productImageUrl: string;
	productTitle: string;
	totalCount: number;
	userId: string;
}

export const updateProductCartAsync = (id: string, newCount: number, newPrice: number):TAppThunk<Promise<IResponse>> => (dispatch: TAppDispatch) =>
	request<{ data: IData }>(`/api/cart/${id}`, 'PATCH', { newCount, newPrice }).then((updatedCart) => {
		dispatch(updateCart(updatedCart.data));

		return updatedCart.data;
	});
