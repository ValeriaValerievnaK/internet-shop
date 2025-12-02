import type { TAppThunk } from '../../store';
import type { ICartData } from '../../types';
import { request } from '../../utils';
import { updateCart } from './update-cart';

export const updateProductCartAsync =
	(id: string, newCount: number, newPrice: number): TAppThunk<Promise<ICartData>> =>
	(dispatch) =>
		request<{ data: ICartData }>(`/api/cart/${id}`, 'PATCH', {
			newCount,
			newPrice,
		}).then((updatedCart) => {
			dispatch(updateCart(updatedCart.data));

			return updatedCart.data;
		});
