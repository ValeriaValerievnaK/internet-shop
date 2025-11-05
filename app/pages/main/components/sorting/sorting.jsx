import { Icon } from '../../../../components';
import styles from './sorting.module.css';

export const Sorting = ({ onSort, sortValue }) => {
	return (
		<div className={styles.sortContainer}>
			<button className={styles.sortButton} onClick={onSort}>
				<Icon
					id={
						sortValue === 'asc' ? 'fa-sort-amount-desc' : 'fa-sort-amount-asc'
					}
					size="18px"
				/>
				<div>
					{sortValue === 'asc'
						? 'От дорогих к дешевым'
						: 'От дешевых к дорогим'}
				</div>
			</button>
		</div>
	);
};
