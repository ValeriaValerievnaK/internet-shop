import type { TAppThunk } from '../../store';
import type { IComment } from '../../types';
import { request } from '../../utils';
import { addComment } from './add-comment';

interface IResponse {
	data?: IComment;
	error?: string;
}

export const addCommentAsync =
	(productId: string, content: string): TAppThunk =>
	(dispatch) => {
		request<IResponse>(`/api/products/${productId}/comments`, 'POST', {
			content,
		}).then((commentData) => {
			dispatch(addComment(commentData.data));
		});
	};
