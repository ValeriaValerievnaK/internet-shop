import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectIsLoading,
	selectShouldUpdateProductList,
	selectUserRole,
} from '../../../src/selectore';
import { updateIsLoading } from '../../../src/actions';
import { TableRow, ProductRow, CreatingNewProduct } from './components';
import { H2, Loader } from '../../components';
import { useServerRequest } from '../../../src/hooks';
import styles from './products-edit.module.css';

export const ProductsEdit = () => {
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const shouldUpdateProductList = useSelector(selectShouldUpdateProductList);
	const userRole = useSelector(selectUserRole);
	const isLoading = useSelector(selectIsLoading);
	const dispatch = useDispatch();
	const requestServer = useServerRequest();

	useEffect(() => {
		dispatch(updateIsLoading());
		Promise.all([requestServer('fetchProducts'), requestServer('fetchCategories')])
			.then(([productsRes, categoriesRes]) => {
				if (productsRes.error || categoriesRes.error) {
					// setErrorMessage(productsRes.error || categoriesRes.error);
					return;
				}
				setProducts(productsRes.res.products);
				setCategories(categoriesRes.res);
			})
			.finally(() => {
				dispatch(updateIsLoading());
			});
	}, [requestServer, shouldUpdateProductList, userRole, dispatch]);

	return (
		<div className={styles.appСontainer}>
			<H2>Панель управления товарами</H2>
			<div className={styles.content}>
				<CreatingNewProduct categories={categories} />
				<div className={styles.productsList}>
					{isLoading && <Loader />}

					{!isLoading && (
						<>
							<TableRow>
								<div className="title-column">Наименование</div>
								<div className="category-column">Категория</div>
								<div className="price-column">Стоимость</div>
								<div className="count-column">Остаток</div>
								<div className="imageUrl-column">Фото</div>
							</TableRow>
							{products.map(
								({ id, title, imageUrl, category, price, count }) => (
									<ProductRow
										key={id}
										id={id}
										title={title}
										imageUrl={imageUrl}
										category={category}
										price={price}
										count={count}
										categories={categories}
									/>
								),
							)}
						</>
					)}
				</div>
			</div>
		</div>
	);
};
