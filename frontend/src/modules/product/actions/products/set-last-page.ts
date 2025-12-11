import { ACTION_TYPE } from '../../../../constants';

export const setLastPage = (lastPage: number) => ({
	type: ACTION_TYPE.SET_LAST_PAGE,
	payload: lastPage,
});
