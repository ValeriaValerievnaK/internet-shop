import type { TAppThunk } from '../../../../store';
import type { TApiError } from '../../../../types';
import { request, getApiErrorMessage } from '../../../../utils';
import { setProductError } from '../products';
import { removeComment } from './remove-comment';

interface IResponse {
	error?: string | null;
}

export const removeCommentAsync =
	(productId: string, commentId: string): TAppThunk =>
	async (dispatch) => {
		dispatch(setProductError(null));

		try {
			const response = await request<IResponse>(
				`/api/products/${productId}/comments/${commentId}`,
				'DELETE',
			);

			if (!response.error) {
				dispatch(removeComment(commentId));
			}

			return response;
		} catch (e) {
			const error = e as TApiError;
			const message = getApiErrorMessage(error.status);

			dispatch(setProductError(error.message || message));

			throw e;
		}
	};
