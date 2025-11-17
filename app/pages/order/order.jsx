import { useNavigate } from 'react-router-dom';
import { generateRandomOrderNumber } from './utils/generate-random-order-number';
import { ROLE } from '../../../src/constans';
import styles from './order.module.css';
import { PrivateContent } from '../../components';

export const Order = () => {
	const navigate = useNavigate();
	const onGoBack = () => navigate('/');
	const randomNumber = generateRandomOrderNumber();

	return (
		<PrivateContent access={[ROLE.ADMIN, ROLE.BUYER]}>
			<div className={styles.container}>
				<h3 className={styles.title}>Заказ оформлен!</h3>
				<div className={styles.number}>Номер заказа: {randomNumber}</div>
				<div className={styles.goBack} onClick={onGoBack}>
					Вернуться к покупкам
				</div>
			</div>
		</PrivateContent>
	);
};
