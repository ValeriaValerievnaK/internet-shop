import { ACTION_TYPE } from '../../../constants';

export const updateIsLoadingStart = () => ({
	type: ACTION_TYPE.SET_LOADING_START,
});

export const updateIsLoadingEnd = () => ({
	type: ACTION_TYPE.SET_LOADING_END,
});
