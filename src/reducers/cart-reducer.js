import { ACTION_TYPE } from '../actions';
const initialCartState = { cartData: [] };

export const cartReducer = (state = initialCartState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_CART_DATA:
			return { ...state, cartData: action.payload };
		case ACTION_TYPE.UPDATE_CART:
			return {
				...state,
				cartData: state.cartData.map((item) =>
					item.id === action.payload.id ? action.payload : item,
				),
			};
		default:
			return state;
	}
};
