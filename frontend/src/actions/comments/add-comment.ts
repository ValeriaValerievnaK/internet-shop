import type { IComment } from '../../types';
import { ACTION_TYPE } from '../types';

export const addComment = (comment: IComment) => ({
	type: ACTION_TYPE.ADD_COMMENT,
	payload: comment,
});
