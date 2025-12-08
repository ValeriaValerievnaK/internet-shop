import type { FC } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../components';
import { selectCartTotalPrice, selectUserId } from '../../../../../src/selectors';
import { addOrderCartAsync } from '../../../../../src/actions';
import { useAppDispatch } from '../../../../../src/hooks';
import styles from './action-box.module.css';

export const ActionBox: FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const totalPrise = useSelector(selectCartTotalPrice);
	const userId = useSelector(selectUserId);

	const onToBuy = () => {
		dispatch(addOrderCartAsync(userId!));
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
