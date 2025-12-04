import type { TAppThunk } from '../../store';
import type { ICartData, TApiError } from '../../types';
import { request } from '../../utils';
import { setCartError } from './set-cart-error';
import { updateCart } from './update-cart';

interface IUpdatedProduct {
	data: ICartData;
}

export const updateProductCartAsync =
	(
		id: string,
		newCount: number,
		newPrice: number,
	): TAppThunk<Promise<IUpdatedProduct>> =>
	async (dispatch) => {
		dispatch(setCartError(null));

		try {
			const response = await request<IUpdatedProduct>(`/api/cart/${id}`, 'PATCH', {
				newCount,
				newPrice,
			});

			if (response.data) {
				dispatch(updateCart(response.data));
			}

			return response;
		} catch (e) {
			const error = e as TApiError;

			dispatch(setCartError(error.error));

			throw e;
		}
	};
