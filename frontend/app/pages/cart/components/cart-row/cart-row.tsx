import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ICartData } from '../../../../../src/types';
import { Icon } from '../../../../components';
import { updateCountData } from '../../../../../src/utils';
import { useAppDispatch } from '../../../../../src/hooks';
import { updateProductCartAsync } from '../../../../../src/modules/cart';
import { removeProductToCartAsync } from '../../../../../src/modules/product';
import styles from './cart-row.module.css';

export const CartRow: FC<{ cart: ICartData }> = ({
	cart: { productId, productImageUrl, productTitle, price, count, id, totalCount },
}) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const onIncrease = () => {
		const { newCount, newPrice } = updateCountData(price, count, 'increase');

		if (newCount <= totalCount) {
			dispatch(updateProductCartAsync(id, newCount, newPrice));
		}
	};

	const onDecrease = () => {
		const { newCount, newPrice } = updateCountData(price, count, 'decrease');

		if (newCount == 0) {
			dispatch(removeProductToCartAsync(id));
		} else {
			dispatch(updateProductCartAsync(id, newCount, newPrice));
		}
	};

	const onRemove = () => {
		dispatch(removeProductToCartAsync(id));
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

				<Icon
					id="fa fa-plus"
					size="16px"
					onClick={onIncrease}
					disabled={count === totalCount}
				/>
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
