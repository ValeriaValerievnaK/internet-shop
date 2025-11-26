import { request } from '../../utils';
import { addComment } from './add-comment';

export const addCommentAsync = (productId, content) => (dispatch) => {
	request(`/api/products/${productId}/comments`, 'POST', { content }).then(
		(commentData) => {
			dispatch(addComment(commentData.data));
		},
	);
};
