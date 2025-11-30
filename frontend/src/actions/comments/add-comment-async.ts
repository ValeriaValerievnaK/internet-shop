import type { TAppDispatch, TAppThunk } from '../../store';
import type { IComment } from '../../types';
import { request } from '../../utils';
import { addComment } from './add-comment';

interface IResponse {
	data?: IComment;
	error?: string;
}

// TODO: посмотреть типы
export const addCommentAsync =
	(productId: string, content: string) => (dispatch: TAppDispatch) => {
		request<IResponse>(`/api/products/${productId}/comments`, 'POST', {
			content,
		}).then((commentData) => {
			dispatch(addComment(commentData.data));
		});
	};
