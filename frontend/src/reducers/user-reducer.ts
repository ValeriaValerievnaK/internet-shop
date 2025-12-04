import { EUserActionTypes } from '../actions';
import { ROLE } from '../constans';

export interface IInitialUserState {
	id: string | null;
	login: string | null;
	roleId: number;
	session: string | null;
	error: string | null;
}

type TUserAction =
	| { type: EUserActionTypes.SET_USER; payload: IInitialUserState }
	| { type: EUserActionTypes.LOGOUT }
	| { type: EUserActionTypes.SET_USER_ERROR; payload: string | null };

const initialUserState: IInitialUserState = {
	id: null,
	login: null,
	roleId: ROLE.GUEST,
	session: null,
	error: null,
};

export const userReducer = (
	state: IInitialUserState = initialUserState,
	action: TUserAction,
) => {
	switch (action.type) {
		case EUserActionTypes.SET_USER:
			return {
				...state,
				...action.payload,
			};
		case EUserActionTypes.LOGOUT:
			return initialUserState;

		case EUserActionTypes.SET_USER_ERROR:
			return {
				...state,
				error: action.payload,
			};

		default:
			return state;
	}
};
