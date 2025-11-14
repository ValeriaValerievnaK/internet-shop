import { ACTION_TYPE } from '../actions';

const initialAppState = {
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

export const appReducer = (state = initialAppState, action) => {
	switch (action.type) {
		case ACTION_TYPE.LOGOUT:
			return {
				...state,
				wasLogout: !state.wasLogout,
			};

		case ACTION_TYPE.OPEN_MODAL:
			return {
				...state,
				modal: {
					...state.modal,
					...action.payload,
					isOpen: true,
				},
			};

		case ACTION_TYPE.CLOSE_MODAL:
			return initialAppState;

		case ACTION_TYPE.UPDATE_PRODUCT_LIST:
			return {
				...state,
				shouldUpdateProductList: !state.shouldUpdateProductList,
			};

		case ACTION_TYPE.UPDATE_IS_LOADING:
			return {
				...state,
				isLoading: !state.isLoading,
			};

		default:
			return state;
	}
};
