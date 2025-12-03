import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
	selectIsLoading,
	selectShouldUpdateProductList,
	selectUserRole,
} from '../../../src/selectors';
import { updateIsLoadingEnd, updateIsLoadingStart } from '../../../src/actions';
import { TableRow, ProductRow, CreatingNewProduct } from './components';
import { H2, Loader, PrivateContent } from '../../components';
import { ROLE } from '../../../src/constans';
import { checkAccess, request } from '../../../src/utils';
import { useAppDispatch } from '../../../src/hooks';
import styles from './products-edit.module.css';
import type { ICategories, IProduct } from '../../../src/types';

interface IProductsResponse {
	data?: IProduct[];
	error?: string;
}

export const ProductsEdit = () => {
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const shouldUpdateProductList = useSelector(selectShouldUpdateProductList);
	const userRole = useSelector(selectUserRole);
	const isLoading = useSelector(selectIsLoading);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(updateIsLoadingStart());

		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return;
		}

		Promise.all([
			request<IProductsResponse>(`/api/products/all`),
			request<ICategories>(`/api/products/categories`),
		])
			.then(([productsRes, categoriesRes]) => {
				if (productsRes.error || categoriesRes.error) {
					setErrorMessage(productsRes.error || categoriesRes.error);
					return;
				}
				setProducts(productsRes.data);
				setCategories(categoriesRes.data);
			})
			.finally(() => {
				dispatch(updateIsLoadingEnd());
			});
	}, [shouldUpdateProductList, userRole, dispatch]);

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
									products.map((product) => (
										<ProductRow
											key={product.id}
											product={product}
											categories={categories}
										/>
									))
								) : (
									<div className={styles.noProdFound}>
										Добавьте ваш первый товар!
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
