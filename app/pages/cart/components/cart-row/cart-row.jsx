import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../../../components';
import {
	removeProductToCartAsync,
	updateProductCartAsync,
} from '../../../../../src/actions';
import { useServerRequest } from '../../../../../src/hooks';
import { updateCountData } from '../../../../../src/bff/utils';
import styles from './cart-row.module.css';

export const CartRow = ({
	productId,
	productImageUrl,
	productTitle,
	price,
	userId,
	count,
	id,
	totalCount,
}) => {
	const dispatch = useDispatch();
	const requestServer = useServerRequest();
	const navigate = useNavigate();

	const onIncrease = async () => {
		const { newCount, newPrice } = updateCountData(price, count, 'increase');
		if (newCount <= totalCount) {
			dispatch(updateProductCartAsync(requestServer, id, newCount, newPrice));
		}
	};

	const onDecrease = async () => {
		const { newCount, newPrice } = updateCountData(price, count, 'decrease');
		if (newCount == 0) {
			dispatch(removeProductToCartAsync(requestServer, id, userId));
		}
		dispatch(updateProductCartAsync(requestServer, id, newCount, newPrice));
	};

	const onRemove = async () => {
		dispatch(removeProductToCartAsync(requestServer, id, userId));
	};

	const onProduct = () => navigate(`/products/${productId}`);

	return (
		<div className={styles.productItem}>
			<div className={styles.imageTitleContainer} onClick={onProduct}>
				<img src={productImageUrl} alt={productTitle} />
				<div className={styles.title}>{productTitle}</div>
			</div>
			<div className={styles.countControl}>
				<Icon
					id="fa fa-minus"
					size="16px"
					onClick={onDecrease}
					disabled={count === 1}
				/>
				<div className={styles.count}>{count} шт</div>
				<Icon id="fa fa-plus" size="16px" onClick={onIncrease} />
			</div>
			<div className={styles.price}>{price} ₽</div>
			<Icon
				id="fa fa-times"
				size="16px"
				className={styles.deleteButton}
				onClick={onRemove}
			/>
		</div>
	);
};
