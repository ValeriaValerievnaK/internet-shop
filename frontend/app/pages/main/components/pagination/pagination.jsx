import { Button } from '../../../../components';
import styles from './pagination.module.css';

export const Pagination = ({ page, lastPage, setPage }) => {
	return (
		<div className={styles.paginationBox}>
			<Button disabled={page === 1} onClick={() => setPage(1)}>
				В начало
			</Button>

			<div className={styles.pageButton}>
				{page !== 1 && (
					<Button onClick={() => setPage(page - 1)}>{page - 1}</Button>
				)}

				<div className={styles.currentPage}>{page}</div>

				{page !== lastPage && (
					<Button onClick={() => setPage(page + 1)}>{page + 1}</Button>
				)}
			</div>

			<Button disabled={page === lastPage} onClick={() => setPage(lastPage)}>
				В конец
			</Button>
		</div>
	);
};
