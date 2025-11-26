import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import { userReducer, appReducer, productReducer, cartReducer } from './reducers';

const reducer = combineReducers({
	app: appReducer,
	cart: cartReducer,
	user: userReducer,
	product: productReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
