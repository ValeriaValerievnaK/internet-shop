import { Logo, ControlPanel } from './components';
import styles from './header.module.css';

export const Header = () => (
	<div className={styles.header}>
		<Logo />

		<div className={styles.discription}>
			Выгода!
			<br />
			Качество!
			<br />
			Удобстово!
		</div>

		<ControlPanel />
	</div>
);
