import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Icon, Button } from '../../../../components';
import { ROLE } from '../../../../../src/constans';
import {
	selectUserRole,
	selectUserLogin,
	selectUserSession,
} from '../../../../../src/selectore';
import { logout } from '../../../../../src/actions';
import styles from './control-panel.module.css';

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
				<Link to="/count">
					<Icon id="fa-shopping-basket" margin="10px 0 0 16px" />
				</Link>
				<Link to="/products/edit">
					<Icon id="fa-cogs" margin="10px 0 0 16px" />
				</Link>
			</div>
		</div>
	);
};
