import {
	createStore,
	combineReducers,
	applyMiddleware,
	compose,
	type AnyAction,
} from 'redux';
import { thunk, type ThunkAction, type ThunkDispatch } from 'redux-thunk';
import { userReducer, appReducer, productReducer, cartReducer } from './reducers';

const reducer = combineReducers({
	app: appReducer,
	cart: cartReducer,
	user: userReducer,
	product: productReducer,
});

export type TRootState = ReturnType<typeof reducer>;

export type TAppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	TRootState,
	unknown,
	AnyAction
>;

export type TAppDispatch = ThunkDispatch<TRootState, unknown, AnyAction>;

const composeEnhancers = (window as any).REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
