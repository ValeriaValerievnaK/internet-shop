import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { Shop } from './app/Shop';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<Shop />
			</Provider>
		</BrowserRouter>
	</React.StrictMode>,
);
