import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../components';
import { selectCartTotalPrice } from '../../../../../src/selectors';
import { removeCartAsync } from '../../../../../src/actions';
import { useAppDispatch } from '../../../../../src/hooks';
import styles from './action-box.module.css';

export const ActionBox = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const totalPrise = useSelector(selectCartTotalPrice);

	const onToBuy = () => {
		dispatch(removeCartAsync());
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
