import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ActionBox, CartRow } from './components';
import { selectCartData, selectIsLoading, selectUserId } from '../../../src/selectore';
import { loadCartAsync, updateIsLoading } from '../../../src/actions';
import { Loader } from '../../components';
import { useServerRequest } from '../../../src/hooks';
import styles from './cart.module.css';

export const Cart = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const cart = useSelector(selectCartData);
	const userId = useSelector(selectUserId);
	const isLoading = useSelector(selectIsLoading);
	const requestServer = useServerRequest();

	useEffect(() => {
		dispatch(updateIsLoading());
		dispatch(loadCartAsync(requestServer, userId)).finally(() => {
			dispatch(updateIsLoading());
		});
	}, [dispatch, requestServer, userId]);

	const onShoping = () => {
		navigate('/');
	};

	return (
		<>
			{isLoading && <Loader />}

			{!isLoading &&
				(cart.length > 0 ? (
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
										totalCount,
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
												totalCount={totalCount}
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
				) : (
					<div className={styles.emptyCart} onClick={onShoping}>
						<p>У вас еще нет товаров в корзине =(</p>
						<p>Перейти к покупкам!</p>
					</div>
				))}
		</>
	);
};
