import { ACTION_TYPE } from '../actions';
const initialProductState = {
	id: '',
	title: '',
	imageUrl: '',
	category: '',
	price: '',
	count: '',
	comments: [],
};

export const productReducer = (state = initialProductState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_PRODUCT_DATA:
			return {
				...state,
				...action.payload,
			};
		default:
			return state;
	}
};
