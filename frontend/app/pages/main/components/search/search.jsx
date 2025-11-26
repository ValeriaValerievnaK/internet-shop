import { Icon, Input } from '../../../../components';
import styles from './search.module.css';

export const Search = ({ searchPhrase, onChange }) => (
	<div className={styles.container}>
		<Input
			value={searchPhrase}
			margin="0"
			placeholder="Искать товар"
			onChange={onChange}
		/>

		<div className={styles.iconWrapper}>
			<Icon inactive={true} id="fa-search" size="18px" />
		</div>
	</div>
);
