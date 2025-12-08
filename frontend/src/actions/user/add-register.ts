import type { TAppThunk } from '../../store';
import type { TRegFormSchema } from '../../../app/pages/registration/validation.schema';
import { request } from '../../utils';
import { setUserError } from './set-user-error';
import { setUser } from '../app';
import type { TApiError } from '../../types';
import { getApiErrorMessage } from '../../utils/apiError';

interface IRegisterResponse {
	error?: string;
	user?: string;
}

type TRegister = Omit<TRegFormSchema, 'passwordchek'>;

export const addRegister =
	({ login, password }: TRegister): TAppThunk<Promise<IRegisterResponse>> =>
	async (dispatch) => {
		dispatch(setUserError(null));

		try {
			const response = await request<IRegisterResponse, TRegister>(
				'/api/register',
				'POST',
				{
					login,
					password,
				},
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
		}
	};
