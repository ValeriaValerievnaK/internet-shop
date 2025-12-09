import type { TAuthFormSchema } from '../../../app/pages/authorization/validation.schema';
import type { TAppThunk } from '../../store';
import type { IUser, TApiError } from '../../types';
import { request } from '../../utils';
import { getApiErrorMessage } from '../../utils/apiError';
import { setUser } from '../app';
import { setUserError } from './set-user-error';
import { setUserLoading } from './set-user-loading';

interface ILoginResponse {
	error?: string;
	user?: IUser;
}

export const addlogin =
	({ login, password }: TAuthFormSchema): TAppThunk<Promise<ILoginResponse>> =>
	async (dispatch) => {
		dispatch(setUserError(null));
		dispatch(setUserLoading(true));

		try {
			const response = await request<ILoginResponse, TAuthFormSchema>(
				'/api/login',
				'POST',
				{ login: login, password: password },
			);

			if (response.user) {
				dispatch(setUser(response.user));

				sessionStorage.setItem('userData', JSON.stringify(response.user));
			}

			return response;
		} catch (e) {
			const error = e as TApiError;
			const message = getApiErrorMessage(error.status);

			dispatch(setUserError(error.message || message));

			throw e;
		} finally {
			dispatch(setUserLoading(false));
		}
	};
