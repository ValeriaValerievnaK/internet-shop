import type { TAppThunk } from '../../store';
import { request } from '../../utils';
import { removeComment } from './remove-comment';

interface IResponse {
	error?: string | null;
}

export const removeCommentAsync =
	(productId: string, commentId: string): TAppThunk =>
	(dispatch) => {
		request<IResponse>(
			`/api/products/${productId}/comments/${commentId}`,
			'DELETE',
		).then(() => {
			dispatch(removeComment(commentId));
		});
	};
