import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActionBox, CartRow } from './components';
import { useServerRequest } from '../../../src/hooks';
import { selectCartData, selectUserId } from '../../../src/selectore';
import { loadCartAsync } from '../../../src/actions';
import styles from './cart.module.css';

export const Cart = () => {
	const dispatch = useDispatch();
	const cart = useSelector(selectCartData);
	const userId = useSelector(selectUserId);
	const requestServer = useServerRequest();

	useEffect(() => {
		dispatch(loadCartAsync(requestServer, userId));
	}, [dispatch, requestServer, userId]);

	return (
		<>
			<h2 className={styles.title}>Корзина</h2>
			<div className={styles.container}>
				<div className={styles.allCart}>
					{cart.map(
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
					<ActionBox />
				</div>
			</div>
		</>
	);
};
