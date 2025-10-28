import { useDispatch } from 'react-redux';
import { Icon } from '../../../../components';
import styles from './cart-row.module.css';
import { updateCountData } from '../../../../../src/utils';
import { updateProductCartAsync } from '../../../../../src/actions';
import { useServerRequest } from '../../../../../src/hooks';

export const CartRow = ({
	productId,
	productImageUrl,
	productTitle,
	price,
	userId,
	count,
	id,
}) => {
	const dispatch = useDispatch();
	const requestServer = useServerRequest();

	const onIncrease = async () => {
		const { newCount, newPrice } = updateCountData(price, count, 'increase');

		dispatch(updateProductCartAsync(requestServer, id, newCount, newPrice));
	};

	const onDecrease = async () => {
		const { newCount, newPrice } = updateCountData(price, count, 'decrease');

		dispatch(updateProductCartAsync(requestServer, id, newCount, newPrice));
	};

	console.log(productImageUrl);

	return (
		<div className={styles.productItem}>
			<img src={productImageUrl} alt={productTitle} />
			<div className={styles.title}>{productTitle}</div>
			<div className={styles.countControl}>
				<Icon id="fa fa-minus" size="16px" onClick={onDecrease} />
				<div className={styles.count}>{count} шт</div>
				<Icon id="fa fa-plus" size="16px" onClick={onIncrease} />
			</div>
			<div className={styles.price}>{price} ₽</div>
			{/* <button className={styles.deleteButton}> */}
			<Icon id="fa fa-times" size="16px" className={styles.deleteButton} />
			{/* </button> */}
		</div>
	);
};
