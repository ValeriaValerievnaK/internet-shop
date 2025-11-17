import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CategoryMenu, Pagination, ProdCard, Search, Sorting } from './components';
import { selectIsLoading } from '../../../src/selectore';
import { updateIsLoading } from '../../../src/actions';
import { Loader } from '../../components';
import { useServerRequest } from '../../../src/hooks';
import { PAGINATION_LIMIT } from '../../../src/constans';
import { debounce, getLastPageFormLins } from './utils';
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
	const requestServer = useServerRequest();
	const isLoading = useSelector(selectIsLoading);

	useEffect(() => {
		dispatch(updateIsLoading());
		requestServer(
			'fetchProducts',
			searchPhrase,
			page,
			PAGINATION_LIMIT,
			categorySearch,
		)
			.then(({ res: { products, links } }) => {
				setProducts(products);
				setLastPage(getLastPageFormLins(links));
			})
			.finally(() => {
				dispatch(updateIsLoading());
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [requestServer, dispatch, page, shoudlSearch]);

	useEffect(() => {
		requestServer('fetchCategories').then((categoriesRes) => {
			setCategorys(categoriesRes.res);
		});
	}, [requestServer]);

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
		setSortValue(sortValue === 'asc' ? 'desc' : 'asc');
	};

	const sortedProducts = useMemo(() => {
		return [...products].sort((a, b) => {
			if (sortValue === 'asc') {
				return a.price - b.price;
			} else {
				return b.price - a.price;
			}
		});
	}, [products, sortValue]);

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
						{sortedProducts.length > 0 ? (
							<div className={styles.prodList}>
								{sortedProducts.map(({ id, title, imageUrl, price }) => (
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
			{lastPage > 1 && sortedProducts.length > 0 && (
				<div className={styles.paginationContainer}>
					<Pagination page={page} lastPage={lastPage} setPage={setPage} />
				</div>
			)}
		</div>
	);
};
