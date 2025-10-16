import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TableRow } from '../table-row/table-row';
import { useServerRequest } from '../../../../../src/hooks';
import { SelectWithGrop } from '../utils';
import { SpecialPanel } from '../components';
import { Icon, Input } from '../../../../components';
import { saveProductAsync } from '../../../../../src/actions';
import styles from './product-row.module.css';

export const ProductRow = ({
	id,
	title,
	imageUrl,
	category: productCategory,
	price,
	count,
	categories: allCategories,
	setShouldUpdateProductList,
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [titleValue, setTitleValue] = useState(title);
	const [categoryValue, setCategoryValue] = useState(productCategory);
	const [priceValue, setPriceValue] = useState(price);
	const [countValue, setCountValue] = useState(count);
	const [imageUrlValue, setImageUrlValue] = useState(imageUrl);

	const dispatch = useDispatch();
	const requestServer = useServerRequest();

	const onTitleChange = ({ target }) => setTitleValue(target.value);
	const onCategoryChange = ({ target }) => setCategoryValue(target.value);
	const onPriceChange = ({ target }) => setPriceValue(target.value);
	const onCountChange = ({ target }) => setCountValue(target.value);
	const onImageChange = ({ target }) => setImageUrlValue(target.value);

	const onHandelEdit = () => {
		setIsEditing((prev) => !prev);
	};

	const onSave = () => {
		dispatch(
			saveProductAsync(requestServer, {
				id,
				title: titleValue,
				imageUrl: imageUrlValue,
				category: categoryValue,
				price: priceValue,
				count: countValue,
			}),
		).then(() => {
			setIsEditing(false);
			setShouldUpdateProductList((prev) => !prev);
		});
	};

	const renderContent = () => {
		if (isEditing) {
			return (
				<>
					<TableRow border={true}>
						<Input
							className="title-column"
							min="2"
							max="20"
							value={titleValue}
							placeholder="Наименование..."
							onChange={onTitleChange}
						/>
						<SelectWithGrop
							allCategories={allCategories}
							value={categoryValue}
							onChange={onCategoryChange}
						/>
						<Input
							className="price-column"
							value={priceValue}
							placeholder="Стоимость..."
							onChange={onPriceChange}
						/>
						<Input
							className="count-column"
							type="number"
							min="0"
							value={countValue}
							placeholder="Остаток..."
							onChange={onCountChange}
						/>
						<Input
							className="imageUrl-column"
							value={imageUrlValue}
							placeholder="Фото..."
							onChange={onImageChange}
						/>
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
