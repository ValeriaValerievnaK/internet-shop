import { useLayoutEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import type { IUser } from '../src/types';
import { Header, Footer, Modal, Error } from './components';
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
import { ERROR } from '../src/constants';
import { useAppDispatch } from '../src/hooks';
import { setUser } from '../src/modules/app';
import styles from './shop.module.css';

export const Shop = () => {
	const dispatch = useAppDispatch();

	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem('userData');

		if (!currentUserDataJSON) {
			return;
		}

		const currentUserData: IUser = JSON.parse(currentUserDataJSON);

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
