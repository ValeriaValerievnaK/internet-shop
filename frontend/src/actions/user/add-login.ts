import type { TAuthFormSchema } from '../../../app/pages/authorization/validation.schema';
import type { TAppThunk } from '../../store';
import { request } from '../../utils';
import { setUser } from '../app';
import { setUserError } from './set-user-error';

interface ILoginResponse {
	error?: string;
	user?: string;
}

export const addlogin =
	({ login, password }: TAuthFormSchema): TAppThunk<Promise<ILoginResponse>> =>
	async (dispatch) => {
		dispatch(setUserError(null));

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

			if (response.error) {
				dispatch(setUserError(response.error));
			}

			return response;
		} catch (e) {
			throw e;
		}
	};
