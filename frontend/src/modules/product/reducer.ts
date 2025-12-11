import type { ICategoriesData, IComment, IProduct } from '../../types';
import { EProductActionTypes } from './types';

export interface IInitialProductState {
	productData: IProduct;
	categories: ICategoriesData[];
	products: IProduct[];
	error: string | null;
	isLoading: boolean;
	lastPage: number;
}

type TProductAction =
	| { type: EProductActionTypes.SET_PRODUCT_LOADING; payload: boolean }
	| { type: EProductActionTypes.SET_PRODUCT_ERROR; payload: string | null }
	| { type: EProductActionTypes.SET_PRODUCT_CATEGORIES; payload: ICategoriesData[] }
	| { type: EProductActionTypes.SET_PRODUCTS; payload: IProduct[] }
	| { type: EProductActionTypes.ADD_COMMENT; payload: IComment }
	| { type: EProductActionTypes.REMOVE_COMMENT; payload: string }
	| { type: EProductActionTypes.SET_PRODUCT_DATA; payload: IProduct }
	| { type: EProductActionTypes.SET_LAST_PAGE; payload: number };

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
	products: [],
	error: null,
	isLoading: false,
	lastPage: 1,
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
						(comment) => comment.id !== action.payload,
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

		case EProductActionTypes.SET_PRODUCTS:
			return {
				...state,
				products: action.payload,
			};

		case EProductActionTypes.SET_LAST_PAGE:
			return {
				...state,
				lastPage: action.payload,
			};
		default:
			return state;
	}
};
