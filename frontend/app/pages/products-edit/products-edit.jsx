import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectIsLoading,
	selectShouldUpdateProductList,
	selectUserRole,
} from '../../../src/selectore';
import { updateIsLoading } from '../../../src/actions';
import { TableRow, ProductRow, CreatingNewProduct } from './components';
import { H2, Loader, PrivateContent } from '../../components';
import { useServerRequest } from '../../../src/hooks';
import styles from './products-edit.module.css';
import { ROLE } from '../../../src/constans';
import { checkAccess, request } from '../../../src/utils';

export const ProductsEdit = () => {
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const shouldUpdateProductList = useSelector(selectShouldUpdateProductList);
	const userRole = useSelector(selectUserRole);
	const isLoading = useSelector(selectIsLoading);
	const dispatch = useDispatch();
	const requestServer = useServerRequest();

	useEffect(() => {
		dispatch(updateIsLoading());

		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return;
		}

		Promise.all([request(`/api/products/all`), request(`/api/products/categories`)])
			.then(([productsRes, categoriesRes]) => {
				if (productsRes.error || categoriesRes.error) {
					setErrorMessage(productsRes.error || categoriesRes.error);
					return;
				}
				setProducts(productsRes.data);
				setCategories(categoriesRes.data);
			})
			.finally(() => {
				dispatch(updateIsLoading());
			});
	}, [requestServer, shouldUpdateProductList, userRole, dispatch]);

	return (
		<PrivateContent access={[ROLE.ADMIN]} serverError={errorMessage}>
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
								{products.length > 0 ? (
									products.map(
										({
											id,
											title,
											imageUrl,
											category,
											price,
											count,
										}) => (
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
									)
								) : (
									<div className={styles.noProdFound}>
										Добавьте ваш первый товар.
									</div>
								)}
							</>
						)}
					</div>
				</div>
			</div>
		</PrivateContent>
	);
};
