import { ACTION_TYPE } from '../types';

export const setUserLoading = (isLoading: boolean) => ({
	type: ACTION_TYPE.SET_USER_LOADING,
	payload: isLoading,
});
