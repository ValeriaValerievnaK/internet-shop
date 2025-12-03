import type { ChangeEvent, FC } from 'react';
import { Icon, Input } from '../../../../components';
import styles from './search.module.css';

interface IParam {
	searchPhrase: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Search: FC<IParam> = ({ searchPhrase, onChange }) => (
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
