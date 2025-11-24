import { useLayoutEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Header, Footer, Modal, Error } from './components';
import { setUser } from '../src/actions';
import {
	Authorization,
	Registration,
	ProductsEdit,
	Products,
	Cart,
	Order,
	Main,
} from './pages';
import '../index.css';
import { ERROR } from '../src/constans';
import styles from './shop.module.css';

export const Shop = () => {
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem('userData');

		if (!currentUserDataJSON) {
			return;
		}

		const currentUserData = JSON.parse(currentUserDataJSON);

		dispatch(
			setUser({
				...currentUserData,
				roleId: Number(currentUserData.roleId),
			}),
		);
	}, [dispatch]);

	return (
		<div className={styles.appColumn}>
			<Header />

			<div className={styles.page}>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/products/:productId" element={<Products />} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<Registration />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="/order" element={<Order />} />
					<Route path="/products-edit" element={<ProductsEdit />} />
					<Route path="*" element={<Error error={ERROR.PAGE_NOT_EXIST} />} />
				</Routes>
			</div>

			<Footer />

			<Modal />
		</div>
	);
};
