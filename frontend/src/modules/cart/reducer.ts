import type { ICartData } from '../../types';
import { ECartActionTypes } from './types';

export interface IInitialCartState {
	cartData: ICartData[];
	totalPrice: number;
	error: string | null;
	isLoading: boolean;
}

type TCartAction =
	| { type: ECartActionTypes.SET_CART_LOADING; payload: boolean }
	| { type: ECartActionTypes.SET_CART_ERROR; payload: string | null }
	| { type: ECartActionTypes.SET_CART_DATA; payload: ICartData[] }
	| { type: ECartActionTypes.UPDATE_CART; payload: ICartData }
	| { type: ECartActionTypes.REMOVE_PRODUCT_TO_CART; payload: string }
	| { type: ECartActionTypes.RESET_DATA };

const initialCartState: IInitialCartState = {
	cartData: [],
	totalPrice: 0,
	error: null,
	isLoading: false,
};

const calculateTotalPrice = (cartItems: ICartData[]) => {
	if (!cartItems) {
		return 0;
	}

	return cartItems.reduce((total, item) => {
		return total + (item.price || 0);
	}, 0);
};

export const cartReducer = (
	state: IInitialCartState = initialCartState,
	action: TCartAction,
) => {
	switch (action.type) {
		case ECartActionTypes.SET_CART_DATA:
			return {
				...state,
				cartData: action.payload,
				totalPrice: calculateTotalPrice(action.payload),
			};

		case ECartActionTypes.UPDATE_CART: {
			const updatedCartData = state.cartData.map((item) =>
				item.id === action.payload.id ? action.payload : item,
			);

			return {
				...state,
				cartData: updatedCartData,
				totalPrice: calculateTotalPrice(updatedCartData),
			};
		}

		case ECartActionTypes.REMOVE_PRODUCT_TO_CART: {
			const updatedCartData = state.cartData.filter(
				(product) => product.id != action.payload,
			);

			return {
				...state,
				cartData: updatedCartData,
				totalPrice: calculateTotalPrice(updatedCartData),
			};
		}

		case ECartActionTypes.RESET_DATA:
			return initialCartState;

		case ECartActionTypes.SET_CART_LOADING:
			return {
				...state,
				isLoading: action.payload,
			};

		case ECartActionTypes.SET_CART_ERROR:
			return {
				...state,
				error: action.payload,
			};

		default:
			return state;
	}
};
