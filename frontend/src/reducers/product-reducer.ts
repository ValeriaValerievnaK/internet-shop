import { EProductActionTypes } from '../actions';
import type { IComment } from '../types/product';

export interface IInitialProductState {
	id: string;
	title: string;
	imageUrl: string;
	category: string;
	price: string;
	count: string;
	comments: IComment[];
}

type TProductAction =
	| { type: EProductActionTypes.ADD_COMMENT; payload: IComment }
	| { type: EProductActionTypes.REMOVE_COMMENT; payload: string }
	| { type: EProductActionTypes.SET_PRODUCT_DATA; payload: IInitialProductState };

const initialProductState: IInitialProductState = {
	id: '',
	title: '',
	imageUrl: '',
	category: '',
	price: '',
	count: '',
	comments: [],
};

export const productReducer = (
	state: IInitialProductState = initialProductState,
	action: TProductAction,
) => {
	switch (action.type) {
		case EProductActionTypes.ADD_COMMENT:
			return {
				...state,
				comments: [...state.comments, action.payload],
			};
		case EProductActionTypes.REMOVE_COMMENT:
			return {
				...state,
				comments: state.comments.filter(
					(comment) => comment.id != action.payload,
				),
			};
		case EProductActionTypes.SET_PRODUCT_DATA:
			return {
				...state,
				...action.payload,
			};
		default:
			return state;
	}
};
