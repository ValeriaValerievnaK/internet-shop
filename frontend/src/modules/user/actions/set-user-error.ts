import { ACTION_TYPE } from '../../../constants';

export const setUserError = (error: string | null) => ({
	type: ACTION_TYPE.SET_USER_ERROR,
	payload: error,
});
