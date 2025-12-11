import type { IUser } from '../../../types';
import { ACTION_TYPE } from '../../../constants';

export const setUser = (user: IUser) => ({
	type: ACTION_TYPE.SET_USER,
	payload: user,
});
