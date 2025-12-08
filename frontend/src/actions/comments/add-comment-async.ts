import type { TAppThunk } from '../../store';
import type { IComment, TApiError } from '../../types';
import { request } from '../../utils';
import { getApiErrorMessage } from '../../utils/apiError';
import { setProductError } from '../products';
import { addComment } from './add-comment';

interface IResponse {
	data?: IComment;
	error?: string;
}

export const addCommentAsync =
	(productId: string, content: string): TAppThunk =>
	async (dispatch) => {
		dispatch(setProductError(null));

		try {
			const response = await request<IResponse>(
				`/api/products/${productId}/comments`,
				'POST',
				{
					content,
				},
			);

			if (response.data) {
				dispatch(addComment(response.data));
			}

			return response;
		} catch (e) {
			const error = e as TApiError;
			const message = getApiErrorMessage(error.status);

			dispatch(setProductError(error.message || message));

			throw e;
		}
	};
