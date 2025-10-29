import { useSelector } from 'react-redux';
import { selectCartTotalPrice } from '../../../../../src/selectore';
import styles from './action-box.module.css';
import { Button } from '../../../../components';
import { useNavigate } from 'react-router-dom';

export const ActionBox = () => {
	const navigate = useNavigate();
	const totalPrise = useSelector(selectCartTotalPrice);
	const onToBuy = () => {
		// TODO удалять все из корзины
		navigate('/order');
	};

	return (
		<div className={styles.container}>
			<h3>Итого к оплате:</h3>
			<div className={styles.price}>{totalPrise} ₽</div>
			<Button onClick={onToBuy}>Оформить заказ</Button>
		</div>
	);
};
