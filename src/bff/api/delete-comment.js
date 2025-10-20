export const deleteComment = (commentId) =>
	fetch(`http://localhost:3008/comments/${commentId}`, {
		method: 'DELETE',
	});
