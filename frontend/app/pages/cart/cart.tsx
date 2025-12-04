import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ActionBox, CartRow } from './components';
import {
	selectCartData,
	selectCartError,
	selectCartIsLoading,
	selectUserRole,
} from '../../../src/selectors';
import { loadCartAsync } from '../../../src/actions';
import { Loader, PrivateContent } from '../../components';
import { ROLE } from '../../../src/constans';
import { checkAccess } from '../../../src/utils';
import { useAppDispatch } from '../../../src/hooks';
import styles from './cart.module.css';

export const Cart = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const carts = useSelector(selectCartData);
	const userRole = useSelector(selectUserRole);
	const isLoading = useSelector(selectCartIsLoading);
	const errorMessage = useSelector(selectCartError);

	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN, ROLE.BUYER], userRole)) {
			return;
		}

		dispatch(loadCartAsync());
	}, [dispatch, userRole]);

	const onShoping = () => {
		navigate('/');
	};

	if (checkAccess([ROLE.ADMIN, ROLE.BUYER], userRole) && isLoading) {
		return <Loader />;
	}

	return (
		<PrivateContent access={[ROLE.ADMIN, ROLE.BUYER]} serverError={errorMessage}>
			{carts.length > 0 ? (
				<>
					<h2 className={styles.title}>Корзина</h2>

					<div className={styles.container}>
						<div className={styles.allCart}>
							{carts.map((cart) => {
								return <CartRow key={cart.id} cart={cart} />;
							})}
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
			)}
		</PrivateContent>
	);
};
