import { useEffect, useMemo, useState, type ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { CategoryMenu, Pagination, ProdCard, Search, Sorting } from './components';
import { Loader } from '../../components';
import { debounce } from './utils';
import { useAppDispatch } from '../../../src/hooks';
import {
	loadProductCategories,
	loadProducts,
	selectProductCategories,
	selectProductIsLoading,
	selectProductLastPage,
	selectProducts,
} from '../../../src/modules/product';
import styles from './main.module.css';

export const Main = () => {
	const [page, setPage] = useState(1);
	const [shoudlSearch, setShoudlSearch] = useState(false);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [categorySearch, setCategorySearch] = useState('');
	const [sortValue, setSortValue] = useState<'asc' | 'desc'>('asc');

	const dispatch = useAppDispatch();

	const categories = useSelector(selectProductCategories);
	const products = useSelector(selectProducts);
	const isLoading = useSelector(selectProductIsLoading);
	const lastPage = useSelector(selectProductLastPage);

	useEffect(() => {
		dispatch(loadProducts(searchPhrase, page, categorySearch, sortValue));
	}, [dispatch, page, shoudlSearch, sortValue]);

	useEffect(() => {
		dispatch(loadProductCategories());
	}, []);

	const startDelayedSearch = useMemo(() => debounce(setShoudlSearch, 800), []);

	const onSearch = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;

		setSearchPhrase(value);
		setPage(1);
		startDelayedSearch(!shoudlSearch);
	};

	const onCategory = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;

		setCategorySearch(value);
		setPage(1);
		setShoudlSearch(!shoudlSearch);
	};

	const onCategoryClear = () => {
		setCategorySearch('');
		setPage(1);
		setShoudlSearch(!shoudlSearch);
	};

	const onSort = () => {
		const newSortValue = sortValue === 'asc' ? 'desc' : 'asc';

		setSortValue(newSortValue);
		setPage(1);
	};

	return (
		<div className={styles.container}>
			<div className={styles.searchSortContainer}>
				<Search onChange={onSearch} searchPhrase={searchPhrase} />

				<Sorting onSort={onSort} sortValue={sortValue} />
			</div>

			<div className={styles.mainContent}>
				<div className={styles.category}>
					<CategoryMenu
						searchPhrase={categorySearch}
						onChange={onCategory}
						onClear={onCategoryClear}
						categories={categories}
					/>
				</div>

				{isLoading && <Loader />}

				{!isLoading && (
					<div className={styles.productsSection}>
						{products.length > 0 ? (
							<div className={styles.prodList}>
								{products.map(({ id, title, imageUrl, price }) => (
									<ProdCard
										key={id}
										id={id!}
										title={title}
										imageUrl={imageUrl}
										price={price!}
									/>
								))}
							</div>
						) : (
							<div className={styles.noProdFound}>Товары не найдены</div>
						)}
					</div>
				)}
			</div>

			{lastPage > 1 && products.length > 0 && (
				<div className={styles.paginationContainer}>
					<Pagination page={page} lastPage={lastPage} setPage={setPage} />
				</div>
			)}
		</div>
	);
};
