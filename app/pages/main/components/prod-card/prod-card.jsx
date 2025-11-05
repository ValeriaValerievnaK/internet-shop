import { Link } from 'react-router-dom';
import { Icon } from '../../../../components';
import styles from './prod-card.module.css';

export const ProdCard = ({ id, title, imageUrl, price }) => {
	return (
		<div className={styles.allContainer}>
			<Link to={`/products/${id}`}>
				<img src={imageUrl} alt={title} />
				<div className={styles.prodCardFooter}>
					<h4>{title}</h4>
					<div className={styles.prodCardPrice}>
						{price}
						<Icon
							inactive={true}
							id="fa-rub"
							size="16px"
							margin="0 0 0 5px"
						/>
					</div>
				</div>
			</Link>
		</div>
	);
};
