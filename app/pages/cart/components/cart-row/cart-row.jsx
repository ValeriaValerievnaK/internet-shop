import { Icon } from '../../../../components';
import styles from './cart-row.module.css';

export const CartRow = ({
	productId,
	productImageUrl,
	productTitle,
	price,
	userId,
	count,
	id,
}) => {

	return (
		<div className={styles.productItem}>
			<img src={productImageUrl} alt={productTitle} />
			<div className={styles.title}>{productTitle}</div>
			<div className={styles.countControl}>
				<Icon id="fa fa-minus" size="16px" />
				<div className={styles.count}>{count} шт</div>
				<Icon id="fa fa-plus" size="16px" />
			</div>
			<div className={styles.price}>{price} ₽</div>
			{/* <button className={styles.deleteButton}> */}
			<Icon id="fa fa-times" size="16px" className={styles.deleteButton} />
			{/* </button> */}
		</div>
	);
};
