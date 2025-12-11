import type { FC } from 'react';
import { Button } from '../../../../components';
import styles from './pagination.module.css';

interface IProps {
	page?: number;
	lastPage: number;
	setPage: (i: number) => void;
}

export const Pagination: FC<IProps> = ({ page = 1, lastPage, setPage }) => (
	<div className={styles.paginationBox}>
		<Button disabled={page === 1} onClick={() => setPage(1)}>
			В начало
		</Button>

		<div className={styles.pageButton}>
			{page !== 1 && <Button onClick={() => setPage(page - 1)}>{page - 1}</Button>}

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
