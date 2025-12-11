import { ACTION_TYPE } from '../../../constants';

export const setUserLoading = (isLoading: boolean) => ({
	type: ACTION_TYPE.SET_USER_LOADING,
	payload: isLoading,
});
