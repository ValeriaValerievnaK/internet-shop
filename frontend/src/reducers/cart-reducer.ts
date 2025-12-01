import { ECartActionTypes } from '../actions';

export interface ICartData {
	count: number;
	id: string;
	price: number;
	productId: string;
	productImageUrl: string;
	productTitle: string;
	totalCount: number;
	userId: string;
}

export interface IInitialCartState {
	cartData: ICartData[];
	totalPrice: number;
}

type TCartAction =
	| { type: ECartActionTypes.SET_CART_DATA; payload: ICartData[] }
	| { type: ECartActionTypes.UPDATE_CART; payload: ICartData }
	| { type: ECartActionTypes.REMOVE_PRODUCT_TO_CART; payload: string }
	| { type: ECartActionTypes.RESET_DATA };

const initialCartState: IInitialCartState = { cartData: [], totalPrice: 0 };

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

		default:
			return state;
	}
};
