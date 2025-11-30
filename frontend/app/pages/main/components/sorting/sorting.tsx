import type { FC, MouseEventHandler } from 'react';
import { Icon } from '../../../../components';
import styles from './sorting.module.css';

interface IParam {
	onSort: MouseEventHandler<HTMLButtonElement>;
	sortValue: 'asc' | 'desc';
}

export const Sorting: FC<IParam> = ({ onSort, sortValue }) => (
	<div className={styles.sortContainer}>
		<button className={styles.sortButton} onClick={onSort}>
			<Icon
				id={sortValue === 'asc' ? 'fa-sort-amount-desc' : 'fa-sort-amount-asc'}
				size="18px"
			/>

			<div>
				{sortValue === 'asc' ? 'От дорогих к дешевым' : 'От дешевых к дорогим'}
			</div>
		</button>
	</div>
);
