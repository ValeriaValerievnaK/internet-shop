import { useNavigate } from 'react-router-dom';
import { Button, H2 } from '../../../../components';
import styles from './product-content.module.css';
import { useSelector } from 'react-redux';
import { selectUserId } from '../../../../../src/selectore';
import { useServerRequest } from '../../../../../src/hooks';

export const ProductContent = ({
	product: { id, title, imageUrl, category, price, count },
}) => {
	const navigate = useNavigate();
	const requestServer = useServerRequest();
	const userId = useSelector(selectUserId);

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
				navigate('/count');
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

	// TODO реализовать путь к товару ссылками с navigate('/') и фильту по категории

	return (
		<div className={styles.conteiner}>
			<div className={styles.category}>Путь {category}</div>
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
