import type { TRegFormSchema } from '../../../../app/pages/registration/validation.schema';
import type { TAppThunk } from '../../../store';
import type { IUser, TApiError } from '../../../types';
import { getApiErrorMessage, request } from '../../../utils';
import { setUser } from '../../app';
import { setUserError } from './set-user-error';
import { setUserLoading } from './set-user-loading';

interface IRegisterResponse {
	error?: string;
	user?: IUser;
}

type TRegister = Omit<TRegFormSchema, 'passwordchek'>;

export const addRegister =
	({ login, password }: TRegister): TAppThunk<Promise<IRegisterResponse>> =>
	async (dispatch) => {
		dispatch(setUserError(null));
		dispatch(setUserLoading(true));

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
		} finally {
			dispatch(setUserLoading(false));
		}
	};
