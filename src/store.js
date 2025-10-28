import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import {
	userReducer,
	appReducer,
	productsReducer,
	productReducer,
	cartReducer,
} from './reducers';

const reducer = combineReducers({
	app: appReducer,
	cart: cartReducer,
	user: userReducer,
	products: productsReducer,
	product: productReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
