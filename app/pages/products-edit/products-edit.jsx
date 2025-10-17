import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { H2 } from '../../components';
import { TableRow, ProductRow, CreatingNewProduct } from './components';
import { useServerRequest } from '../../../src/hooks';
import { selectUserRole } from '../../../src/selectore';
import styles from './products-edit.module.css';

export const ProductsEdit = () => {
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	// TODO: перенести shouldUpdateProductList в redax
	const [shouldUpdateProductList, setShouldUpdateProductList] = useState(false);
	const userRole = useSelector(selectUserRole);
	const requestServer = useServerRequest();

	

	useEffect(() => {
		Promise.all([
			requestServer('fetchProducts'),
			requestServer('fetchCategories'),
		]).then(([productsRes, categoriesRes]) => {
			if (productsRes.error || categoriesRes.error) {
				// setErrorMessage(productsRes.error || categoriesRes.error);
				return;
			}
			setProducts(productsRes.res);
			setCategories(categoriesRes.res);
		});
	}, [requestServer, shouldUpdateProductList, userRole]);

	return (
		<div className={styles.container}>
			<H2>Панель управления товарами</H2>
			<div className={styles.content}>
				<CreatingNewProduct
					categories={categories}
					setShouldUpdateProductList={setShouldUpdateProductList}
				/>
				<div className={styles.productsList}>
					<TableRow>
						<div className="title-column">Наименование</div>
						<div className="category-column">Категория</div>
						<div className="price-column">Стоимость</div>
						<div className="count-column">Остаток</div>
						<div className="imageUrl-column">Фото</div>
					</TableRow>
					{products.map(({ id, title, imageUrl, category, price, count }) => (
						<ProductRow
							key={id}
							id={id}
							title={title}
							imageUrl={imageUrl}
							category={category}
							price={price}
							count={count}
							categories={categories}
							setShouldUpdateProductList={setShouldUpdateProductList}
						/>
					))}
				</div>
			</div>
		</div>
	);
};
