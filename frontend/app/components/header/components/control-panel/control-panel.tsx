import type { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Icon, Button } from '../../..';
import { ROLE } from '../../../../../src/constans';
import { selectUserRole, selectUserLogin } from '../../../../../src/selectors';
import { logout } from '../../../../../src/actions';
import { checkAccess } from '../../../../../src/utils';
import styles from './control-panel.module.css';
import { useAppDispatch } from '../../../../../src/hooks';

interface IProps {
	className?: string;
}

export const ControlPanel: FC<IProps> = ({ className }) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const roleId = useSelector(selectUserRole);
	const login = useSelector(selectUserLogin);

	const onLogout = () => {
		dispatch(logout());

		sessionStorage.removeItem('userData');

		navigate('/');
	};

	const isAdmin = checkAccess([ROLE.ADMIN], roleId);
	const isBuyerOrAdmin = checkAccess([ROLE.ADMIN, ROLE.BUYER], roleId);

	return (
		<div className={className}>
			<div className={styles.rightAligned}>
				{roleId === ROLE.GUEST ? (
					<Button>
						<Link to="/login">Войти</Link>
					</Button>
				) : (
					<>
						<div className={styles.userName}>Привет, {login}!</div>

						<Icon id="fa-sign-out" margin="0 0 0 10px" onClick={onLogout} />
					</>
				)}
			</div>

			<div className={styles.rightAligned}>
				<Icon
					id="fa-arrow-left"
					margin="10px 0 0 0"
					onClick={() => navigate(-1)}
				/>

				{isBuyerOrAdmin && (
					<Link to="/cart">
						<Icon id="fa-shopping-basket" margin="10px 0 0 16px" />
					</Link>
				)}

				{isAdmin && (
					<Link to="/products-edit">
						<Icon id="fa-cogs" margin="10px 0 0 16px" />
					</Link>
				)}
			</div>
		</div>
	);
};
