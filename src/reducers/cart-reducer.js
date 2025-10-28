import { ACTION_TYPE } from '../actions';
const initialCartState = [];

export const cartReducer = (state = initialCartState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_CART_DATA:
			return [...state, ...action.payload];
		default:
			return state;
	}
};
