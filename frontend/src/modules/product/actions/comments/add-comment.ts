import type { IComment } from '../../../../types';
import { ACTION_TYPE } from '../../../../constants';

export const addComment = (comment: IComment) => ({
	type: ACTION_TYPE.ADD_COMMENT,
	payload: comment,
});
