import type { TAppThunk } from '../../../store';
import type { TApiError } from '../../../types';
import { ACTION_TYPE } from '../../../constants';
import { request, getApiErrorMessage } from '../../../utils';
import { setUserError } from '../../user';

export const logout = (): TAppThunk => async (dispatch) => {
	try {
		await request<void>('/api/logout', 'POST');

		dispatch({
			type: ACTION_TYPE.LOGOUT,
		});
	} catch (e) {
		const error = e as TApiError;
		const message = getApiErrorMessage(error.status);

		dispatch(setUserError(message));

		throw e;
	}
};
