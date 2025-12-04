import { ACTION_TYPE } from '../types';

export const setLastPage = (lastPage: number) => ({
	type: ACTION_TYPE.SET_LAST_PAGE,
	payload: lastPage,
});
