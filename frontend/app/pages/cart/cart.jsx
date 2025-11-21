import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ActionBox, CartRow } from './components';
import {
	selectCartData,
	selectIsLoading,
	selectUserRole,
} from '../../../src/selectore';
import { loadCartAsync, updateIsLoading } from '../../../src/actions';
import { Loader, PrivateContent } from '../../components';
import styles from './cart.module.css';
import { ROLE } from '../../../src/constans';
import { checkAccess } from '../../../src/utils';

export const Cart = () => {
	const [errorMessage, setErrorMessage] = useState(null);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const cart = useSelector(selectCartData);
	const userRole = useSelector(selectUserRole);
	const isLoading = useSelector(selectIsLoading);

	useEffect(() => {
		dispatch(updateIsLoading());

		if (!checkAccess([ROLE.ADMIN, ROLE.BUYER], userRole)) {
			return;
		}

		dispatch(loadCartAsync())
			.then((res) => {
				if (res.error) {
					setErrorMessage(res.error);
					return;
				}
			})
			.finally(() => {
				dispatch(updateIsLoading());
			});
	}, [dispatch, userRole]);

	const onShoping = () => {
		navigate('/');
	};

	return (
		<PrivateContent access={[ROLE.ADMIN, ROLE.BUYER]} serverError={errorMessage}>
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
		</PrivateContent>
	);
};
