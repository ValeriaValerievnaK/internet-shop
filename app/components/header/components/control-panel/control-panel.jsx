import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Icon, Button } from '../../../../components';
import { ROLE } from '../../../../../src/constans';
import {
	selectUserRole,
	selectUserLogin,
	selectUserSession,
} from '../../../../../src/selectore';
import { logout } from '../../../../../src/actions';
import styles from './control-panel.module.css';
import { checkAccess } from '../../../../../src/utils';

export const ControlPanel = ({ className }) => {
	const navigate = useNavigate();
	const roleId = useSelector(selectUserRole);
	const login = useSelector(selectUserLogin);
	const dispatch = useDispatch();
	const session = useSelector(selectUserSession);

	const onLogout = () => {
		dispatch(logout(session));
		sessionStorage.removeItem('userData');
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
