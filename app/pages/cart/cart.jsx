import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useServerRequest } from '../../../src/hooks';
import { selectCart, selectUserId } from '../../../src/selectore';
import styles from './cart.module.css';
import { CartRow } from './components';
import { loadCartAsync } from '../../../src/actions';

export const Cart = () => {
	const dispatch = useDispatch();
	const cart = useSelector(selectCart);
	const userId = useSelector(selectUserId);
	const requestServer = useServerRequest();

	useEffect(() => {
		dispatch(loadCartAsync(requestServer, userId));
	}, [dispatch, requestServer, userId]);

	// console.log('cart', cart);

	return (
		<>
			<h2 className={styles.title}>Корзина</h2>
			<div className={styles.container}>
				<div className={styles.allCart}>
					{cart.cartData.map(
						({
							productId,
							productImageUrl,
							productTitle,
							price,
							userId,
							count,
							id,
						}) => {
							return (
								<CartRow
									key={id}
									productId={productId}
									userId={userId}
									productImageUrl={productImageUrl}
									productTitle={productTitle}
									price={price}
									count={count}
									id={id}
								/>
							);
						},
					)}
				</div>
				<div className={styles.action}>
					<p>Блок действий</p>
					{/* Контент блока действий будет добавлен позже */}
				</div>
			</div>
		</>
	);
};
