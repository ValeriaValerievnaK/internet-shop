import { ACTION_TYPE } from '../../../../constants';

export const removeComment = (commentId: string) => ({
	type: ACTION_TYPE.REMOVE_COMMENT,
	payload: commentId,
});
