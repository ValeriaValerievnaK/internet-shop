import { useEffect, useMemo, useState, type ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import type { ICategories, IProduct } from '../../../src/types';
import { CategoryMenu, Pagination, ProdCard, Search, Sorting } from './components';
import { selectIsLoading } from '../../../src/selectors';
import { updateIsLoadingEnd, updateIsLoadingStart } from '../../../src/actions';
import { Loader } from '../../components';
import { PAGINATION_LIMIT } from '../../../src/constans';
import { debounce } from './utils';
import { request } from '../../../src/utils';
import { useAppDispatch } from '../../../src/hooks';
import styles from './main.module.css';

interface IResponse {
	data?: {
		products: IProduct[];
		lastPage: number;
	}
}

export const Main = () => {
	const [products, setProducts] = useState([]);
	const [categorys, setCategorys] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [shoudlSearch, setShoudlSearch] = useState(false);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [categorySearch, setCategorySearch] = useState('');
	const [sortValue, setSortValue] = useState<'asc' | 'desc'>('asc');

	const dispatch = useAppDispatch();

	const isLoading = useSelector(selectIsLoading);

	useEffect(() => {
		dispatch(updateIsLoadingStart());

		request<IResponse>(
			`/api/products?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}&category=${categorySearch}&sort=${sortValue}`,
		)
			.then(({ data: { products, lastPage } }) => {
				setProducts(products);

				setLastPage(lastPage);
			})
			.finally(() => {
				dispatch(updateIsLoadingEnd());
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, page, shoudlSearch, sortValue]);

	useEffect(() => {
		request<ICategories>(`/api/products/categories`).then((categoriesRes) => {
			setCategorys(categoriesRes.data);
		});
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
						categorys={categorys}
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
										id={id}
										title={title}
										imageUrl={imageUrl}
										price={price}
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
