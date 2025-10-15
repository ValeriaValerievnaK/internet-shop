import { useState } from 'react';
import { Icon } from '../../../../components';
import { TableRow } from '../table-row/table-row';
// import { useServerRequest } from '../../../../../src/hooks';
import styles from './product-row.module.css';
import { SpecialPanel } from '../special-panel/special-panel';

export const ProductRow = ({
	id,
	title,
	imageUrl,
	category: productCategory,
	price,
	count,
	categories: allCategories,
}) => {
	const [isEditing, setIsEditing] = useState(false);

	const onHandelEdit = () => {
		setIsEditing((prev) => !prev);
	};

	const onSave = () => {
		setIsEditing(false);
	};

	const renderContent = () => {
		if (isEditing) {
			return (
				<>
					<TableRow border={true}>
						<div className="title-column">редактировать</div>
						<div className="category-column">редактировать</div>
						<div className="price-column">редактировать</div>
						<div className="count-column">редактировать</div>
						<div className="imageUrl-column">редактировать</div>
					</TableRow>
					<SpecialPanel
						id={id}
						editButton={
							<Icon
								id="fa-floppy-o"
								size="21px"
								margin="0 0 0 10px"
								onClick={onSave}
							/>
						}
					/>
				</>
			);
		}

		return (
			<>
				<TableRow border={true}>
					<div className="title-column">{title}</div>
					<div className="category-column">{productCategory}</div>
					<div className="price-column">{price} ₽</div>
					<div className="count-column">{count} шт</div>
					<div className="imageUrl-column">
						<img src={imageUrl} alt={title} className={styles.productImage} />
					</div>
				</TableRow>
				<SpecialPanel
					id={id}
					editButton={
						<Icon
							id="fa-pencil"
							size="21px"
							margin="0 0 0 10px"
							onClick={onHandelEdit}
						/>
					}
				/>
			</>
		);
	};

	return <div className={styles.container}>{renderContent()}</div>;
};
