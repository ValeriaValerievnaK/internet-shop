// import { useNavigate } from 'react-router-dom';
import { Button, H2 } from '../../../../components';
import styles from './product-content.module.css';

export const ProductContent = ({
	product: { id, title, imageUrl, category, price, count },
}) => {
	// const navigate = useNavigate();

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
				<Button>Купить сейчас</Button>
				<Button>Добавить в корзину</Button>
			</div>
		</div>
	);
};
