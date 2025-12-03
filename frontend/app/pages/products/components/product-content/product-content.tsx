import { useEffect, useState, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { ICategories, IProduct } from '../../../../../src/types';
import { selectUserId, selectUserRole } from '../../../../../src/selectors';
import { Button, H2 } from '../../../../components';
import { getCategoryPath } from './utils/get-category-path';
import { checkAccess, request } from '../../../../../src/utils';
import { ROLE } from '../../../../../src/constans';
import styles from './product-content.module.css';

interface IParam {
	product: IProduct;
}

interface IResponse {
	data?: string;
}

interface IRequest {
	productId: string;
	userId: string;
	imageUrl: string;
	title: string;
	price: number;
}

export const ProductContent: FC<IParam> = ({ product }) => {
	const { id, title, imageUrl, category, price, count } = product;

	const [allCategories, setAllCategories] = useState([]);
	const [categoryPath, setCategoryPath] = useState('');

	const navigate = useNavigate();

	const userId = useSelector(selectUserId);
	const roleId = useSelector(selectUserRole);

	useEffect(() => {
		request<ICategories>(`/api/products/categories`).then((categoriesRes) => {
			setAllCategories(categoriesRes.data);
		});
	}, []);

	useEffect(() => {
		if (allCategories.length) {
			const path = getCategoryPath(allCategories, category);
			setCategoryPath(path);
		}
	}, [allCategories, category]);

	const onBuyProduct = (productId: string, userId: string, navigateAfter?: boolean) => {
		request<IResponse, IRequest>('/api/cart', 'POST', {
			productId,
			userId,
			imageUrl,
			title: title.trim(),
			price,
		});

		if (navigateAfter) {
			navigate('/cart');
		}
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
						<Button onClick={() => onBuyProduct(id, userId, true)}>
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
