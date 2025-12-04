import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
	selectProducts,
	selectProductCategories,
	selectProductError,
	selectProductIsLoading,
	selectShouldUpdateProductList,
	selectUserRole,
} from '../../../src/selectors';
import { loadAllProducts, loadProductCategories } from '../../../src/actions';
import { TableRow, ProductRow, CreatingNewProduct } from './components';
import { H2, Loader, PrivateContent } from '../../components';
import { ROLE } from '../../../src/constans';
import { checkAccess } from '../../../src/utils';
import { useAppDispatch } from '../../../src/hooks';
import styles from './products-edit.module.css';

export const ProductsEdit = () => {
	const shouldUpdateProductList = useSelector(selectShouldUpdateProductList);
	const categories = useSelector(selectProductCategories);
	const products = useSelector(selectProducts);
	const errorMessage = useSelector(selectProductError);
	const userRole = useSelector(selectUserRole);
	const isLoading = useSelector(selectProductIsLoading);

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return;
		}

		Promise.all([dispatch(loadAllProducts()), dispatch(loadProductCategories())]);
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
