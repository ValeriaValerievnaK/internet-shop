import type { TAppThunk } from '../../store';
import type { IComment, TApiError } from '../../types';
import { request } from '../../utils';
import { setProductError, setProductLoading } from '../products';
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

			dispatch(setProductError(error.error));

			throw e;
		}
	};
