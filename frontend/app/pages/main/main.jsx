import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CategoryMenu, Pagination, ProdCard, Search, Sorting } from './components';
import { selectIsLoading } from '../../../src/selectors';
import { updateIsLoadingEnd, updateIsLoadingStart } from '../../../src/actions';
import { Loader } from '../../components';
import { PAGINATION_LIMIT } from '../../../src/constans';
import { debounce } from './utils';
import { request } from '../../../src/utils';
import styles from './main.module.css';

export const Main = () => {
	const [products, setProducts] = useState([]);
	const [categorys, setCategorys] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [shoudlSearch, setShoudlSearch] = useState(false);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [categorySearch, setCategorySearch] = useState('');
	const [sortValue, setSortValue] = useState('asc');

	const dispatch = useDispatch();

	const isLoading = useSelector(selectIsLoading);

	useEffect(() => {
		dispatch(updateIsLoadingStart());

		request(
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
		request(`/api/products/categories`).then((categoriesRes) => {
			setCategorys(categoriesRes.data);
		});
	}, []);

	const startDelayedSearch = useMemo(() => debounce(setShoudlSearch, 800), []);

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		setPage(1);
		startDelayedSearch(!shoudlSearch);
	};

	const onCategory = ({ target }) => {
		setCategorySearch(target.value);
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
						onChange={onCategory}
						searchPhrase={categorySearch}
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
