import { useLayoutEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Header, Footer } from './components';
import { setUser } from '../src/actions';
import { Authorization, Registration } from './pages';
import '../index.css';
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
					<Route path="/" element={<div>Главная</div>} />
					<Route
						path="/products/:productId"
						element={<div>Страница отдельного товара </div>}
					/>
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<Registration />} />
					<Route path="/count" element={<div>Корзина</div>} />
					<Route
						path="/products/edit"
						element={<div>Добаление и редактирование</div>}
					/>
					<Route path="*" element={<div>Ошибка</div>} />
				</Routes>
			</div>
			<Footer />
		</div>
	);
};
