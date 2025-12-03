import { EUserActionTypes } from '../actions';
import { ROLE } from '../constans';

export interface IInitialUserState {
	id: string | null;
	login: string | null;
	roleId: number;
	session: string | null;
}

type TUserAction =
	| { type: EUserActionTypes.SET_USER; payload: IInitialUserState }
	| { type: EUserActionTypes.LOGOUT };

const initialUserState: IInitialUserState = {
	id: null,
	login: null,
	roleId: ROLE.GUEST,
	session: null,
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

		default:
			return state;
	}
};
