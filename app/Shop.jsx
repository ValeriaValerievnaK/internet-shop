import { Routes, Route } from 'react-router-dom';
import { Header, Footer } from './components';
import '../index.css';
import styles from './shop.module.css';

export const Shop = () => {
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
					<Route path="/login" element={<div>Вход</div>} />
					<Route path="/register" element={<div>Регистрация</div>} />
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
