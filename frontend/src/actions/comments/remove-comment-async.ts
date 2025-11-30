import type { TAppDispatch, TAppThunk } from '../../store';
import { request } from '../../utils';
import { removeComment } from './remove-comment';

interface IResponse {
	error?: string | null;
}

// TODO посмтореть типы
export const removeCommentAsync =
	(productId: string, commentId: string) => (dispatch: TAppDispatch) => {
		request<IResponse>(
			`/api/products/${productId}/comments/${commentId}`,
			'DELETE',
		).then(() => {
			dispatch(removeComment(commentId));
		});
	};
