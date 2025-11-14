import { Icon } from '../icon/icon';
import styles from './loader.module.css';

export const Loader = () => {
	return (
		<div className={styles.loaderContainer}>
			<Icon id="fa-spinner" size="50px" className={styles.loader} />;
		</div>
	);
};
