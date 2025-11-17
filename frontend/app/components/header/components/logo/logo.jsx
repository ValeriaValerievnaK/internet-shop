import { Link } from 'react-router-dom';
import { Icon } from '../../../../components';
import styles from './logo.module.css';


export const Logo = () => (
	<Link className={styles.linkLogo} to="/">
		<Icon id="fa-shopping-bag" size="70px" margin="0 10px 0 0 " />
		<div>
			<div className={styles.largeText}>The best</div>
			<div className={styles.smallText}>online-store for you</div>
		</div>
	</Link>
);

