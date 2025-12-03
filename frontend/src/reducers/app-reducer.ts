import { EAppActionTypes } from '../actions';

export interface IInitialAppState {
	wasLogout: boolean;
	modal: {
		isOpen: boolean;
		text: string;
		onConfirm: () => void;
		onCancel: () => void;
	};
	shouldUpdateProductList: boolean;
	isLoading: boolean;
}

type TOpenModalPayload = Partial<IInitialAppState['modal']>;

type TAppAction =
	| { type: EAppActionTypes.LOGOUT }
	| { type: EAppActionTypes.OPEN_MODAL; payload: TOpenModalPayload }
	| { type: EAppActionTypes.CLOSE_MODAL }
	| { type: EAppActionTypes.UPDATE_PRODUCT_LIST }
	| { type: EAppActionTypes.SET_LOADING_START }
	| { type: EAppActionTypes.SET_LOADING_END };

const initialAppState: IInitialAppState = {
	wasLogout: false,
	modal: {
		isOpen: false,
		text: '',
		onConfirm: () => {},
		onCancel: () => {},
	},
	shouldUpdateProductList: false,
	isLoading: false,
};

export const appReducer = (
	state: IInitialAppState = initialAppState,
	action: TAppAction,
) => {
	switch (action.type) {
		case EAppActionTypes.LOGOUT:
			return {
				...state,
				wasLogout: !state.wasLogout,
			};

		case EAppActionTypes.OPEN_MODAL:
			return {
				...state,
				modal: {
					...state.modal,
					...action.payload,
					isOpen: true,
				},
			};

		case EAppActionTypes.CLOSE_MODAL:
			return initialAppState;

		case EAppActionTypes.UPDATE_PRODUCT_LIST:
			return {
				...state,
				shouldUpdateProductList: !state.shouldUpdateProductList,
			};

		case EAppActionTypes.SET_LOADING_START:
			return {
				...state,
				isLoading: true,
			};

		case EAppActionTypes.SET_LOADING_END:
			return {
				...state,
				isLoading: false,
			};

		default:
			return state;
	}
};
