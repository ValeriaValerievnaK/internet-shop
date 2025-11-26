import { request } from '../../utils';
import { removeComment } from './remove-comment';

export const removeCommentAsync = (productId, commentId) => (dispatch) => {
	request(`/api/products/${productId}/comments/${commentId}`, 'DELETE').then(() => {
		dispatch(removeComment(commentId));
	});
};
