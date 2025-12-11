import type { FC } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../components';
import { useAppDispatch } from '../../../../../src/hooks';
import { addOrderCartAsync, selectCartTotalPrice } from '../../../../../src/modules/cart';
import styles from './action-box.module.css';

export const ActionBox: FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const totalPrise = useSelector(selectCartTotalPrice);

	const onToBuy = () => {
		dispatch(addOrderCartAsync());
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
