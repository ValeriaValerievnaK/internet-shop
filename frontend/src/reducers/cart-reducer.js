import { ACTION_TYPE } from '../actions';
const initialCartState = { cartData: [], totalPrice: 0 };

const calculateTotalPrice = (cartItems) => {
	if (!cartItems) {
		return 0;
	}
	return cartItems.reduce((total, item) => {
		return total + (item.price || 0);
	}, 0);
};

export const cartReducer = (state = initialCartState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_CART_DATA:
			return {
				...state,
				cartData: action.payload,
				totalPrice: calculateTotalPrice(action.payload),
			};

		case ACTION_TYPE.UPDATE_CART: {
			const updatedCartData = state.cartData.map((item) =>
				item.id === action.payload.id ? action.payload : item,
			);

			return {
				...state,
				cartData: updatedCartData,
				totalPrice: calculateTotalPrice(updatedCartData),
			};
		}

		case ACTION_TYPE.REMOVE_PRODUCT_TO_CART: {
			const updatedCartData = state.cartData.filter(
				(product) => product.id != action.payload,
			);

			return {
				...state,
				cartData: updatedCartData,
				totalPrice: calculateTotalPrice(updatedCartData),
			};
		}

		case ACTION_TYPE.RESET_DATA:
			return initialCartState;

		default:
			return state;
	}
};
