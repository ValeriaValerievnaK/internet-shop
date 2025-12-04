import type { IComment, IProduct } from '../types/product';
import { EProductActionTypes } from '../actions';
import type { ICategoriesData } from '../types';

export interface IInitialProductState {
	productData: IProduct;
	categories: ICategoriesData[];
	allProduct: IProduct[];
	error: string | null;
	isLoading: boolean;
}

type TProductAction =
	| { type: EProductActionTypes.SET_PRODUCT_LOADING; payload: boolean }
	| { type: EProductActionTypes.SET_PRODUCT_ERROR; payload: string | null }
	| { type: EProductActionTypes.SET_PRODUCT_CATEGORIES; payload: ICategoriesData[] }
	| { type: EProductActionTypes.SET_ALL_PRODUCT; payload: IProduct[] }
	| { type: EProductActionTypes.ADD_COMMENT; payload: IComment }
	| { type: EProductActionTypes.REMOVE_COMMENT; payload: string }
	| { type: EProductActionTypes.SET_PRODUCT_DATA; payload: IProduct };

const initialProductState: IInitialProductState = {
	productData: {
		id: '',
		title: '',
		imageUrl: '',
		category: '',
		price: null,
		count: null,
		comments: [],
	},
	categories: [],
	allProduct: [],
	error: null,
	isLoading: false,
};

export const productReducer = (
	state: IInitialProductState = initialProductState,
	action: TProductAction,
) => {
	switch (action.type) {
		case EProductActionTypes.ADD_COMMENT:
			return {
				...state,
				productData: {
					...state.productData,
					comments: [...(state.productData.comments || []), action.payload],
				},
			};
		case EProductActionTypes.REMOVE_COMMENT:
			return {
				...state,
				productData: {
					...state.productData,
					comments: (state.productData.comments || []).filter(
						(comment) => comment.id != action.payload,
					),
				},
			};
		case EProductActionTypes.SET_PRODUCT_DATA:
			return {
				...state,
				productData: action.payload,
			};

		case EProductActionTypes.SET_PRODUCT_LOADING:
			return {
				...state,
				isLoading: action.payload,
			};

		case EProductActionTypes.SET_PRODUCT_ERROR:
			return {
				...state,
				error: action.payload,
			};

		case EProductActionTypes.SET_PRODUCT_CATEGORIES:
			return {
				...state,
				categories: action.payload,
			};

		case EProductActionTypes.SET_ALL_PRODUCT:
			return {
				...state,
				allProduct: action.payload,
			};
		default:
			return state;
	}
};
