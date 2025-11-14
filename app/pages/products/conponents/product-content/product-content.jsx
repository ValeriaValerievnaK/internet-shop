import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserId } from '../../../../../src/selectore';
import { Button, H2 } from '../../../../components';
import { useServerRequest } from '../../../../../src/hooks';
import { getCategoryPath } from './utils/get-category-path';
import styles from './product-content.module.css';

export const ProductContent = ({
	product: { id, title, imageUrl, category, price, count },
}) => {
	const [allCategories, setAllCategories] = useState([]);
	const [categoryPath, setCategoryPath] = useState('');
	const navigate = useNavigate();
	const requestServer = useServerRequest();
	const userId = useSelector(selectUserId);

	useEffect(() => {
		requestServer('fetchCategories').then((categoriesRes) => {
			setAllCategories(categoriesRes.res);
		});
	}, [requestServer]);

	useEffect(() => {
		if (allCategories.length) {
			const path = getCategoryPath(allCategories, category);
			setCategoryPath(path);
		}
	}, [allCategories, category]);

	const onBuyProductNow = (requestServer, productId, userId) => {
		requestServer(
			'addProductToCart',
			productId,
			userId,
			imageUrl,
			title,
			price,
			count,
		).then((res) => {
			if (res.res) {
				navigate('/cart');
			}
		});
	};

	const onBuyProduct = (requestServer, productId, userId) => {
		requestServer(
			'addProductToCart',
			productId,
			userId,
			imageUrl,
			title,
			price,
			count,
		);
	};

	const onClickPath = () => navigate('/');

	return (
		<div className={styles.conteiner}>
			<div className={styles.category} onClick={onClickPath}>
				{categoryPath}
			</div>
			{imageUrl && <img src={imageUrl} alt={title} />}
			<div className={styles.content}>
				<H2>{title}</H2>
				<div className={styles.price}>{price} рублей</div>
				<div className={styles.count}>Осталось {count} шт</div>
			</div>
			<div className={styles.actions}>
				<Button onClick={() => onBuyProductNow(requestServer, id, userId)}>
					Купить сейчас
				</Button>
				<Button onClick={() => onBuyProduct(requestServer, id, userId)}>
					Добавить в корзину
				</Button>
			</div>
		</div>
	);
};
