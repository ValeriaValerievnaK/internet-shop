import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserId, selectUserRole } from '../../../../../src/selectore';
import { Button, H2 } from '../../../../components';
import { getCategoryPath } from './utils/get-category-path';
import styles from './product-content.module.css';
import { checkAccess, request } from '../../../../../src/utils';
import { ROLE } from '../../../../../src/constans';

export const ProductContent = ({
	product: { id, title, imageUrl, category, price, count },
}) => {
	const [allCategories, setAllCategories] = useState([]);
	const [categoryPath, setCategoryPath] = useState('');
	const navigate = useNavigate();
	const userId = useSelector(selectUserId);
	const roleId = useSelector(selectUserRole);

	useEffect(() => {
		request(`/api/products/categories`).then((categoriesRes) => {
			setAllCategories(categoriesRes.data);
		});
	}, []);

	
	useEffect(() => {
		if (allCategories.length) {
			const path = getCategoryPath(allCategories, category);
			setCategoryPath(path);
		}
	}, [allCategories, category]);

	const onBuyProductNow = (productId, userId) => {
		request('/api/cart', 'POST', {
			productId,
			userId,
			imageUrl,
			title: title.trim(),
			price,
		}).then((res) => {
			if (res.data) {
				navigate('/cart');
			}
		});
	};

	const onBuyProduct = (productId, userId) => {
		request('/api/cart', 'POST', {
			productId,
			userId,
			imageUrl,
			title,
			price,
			count,
		});
	};

	const onClickPath = () => navigate('/');

	const isBuyerOrAdmin = checkAccess([ROLE.ADMIN, ROLE.BUYER], roleId);

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
				{isBuyerOrAdmin && (
					<>
						<Button onClick={() => onBuyProductNow(id, userId)}>
							Купить сейчас
						</Button>
						<Button onClick={() => onBuyProduct(id, userId)}>
							Добавить в корзину
						</Button>
					</>
				)}
			</div>
		</div>
	);
};
