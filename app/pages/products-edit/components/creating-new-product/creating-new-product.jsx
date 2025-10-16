import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { SelectWithGrop } from '../utils';
import { Button, Input } from '../../../../components';
import { saveProductAsync } from '../../../../../src/actions';
import { useServerRequest } from '../../../../../src/hooks';
import styles from './creating-new-product.module.css';

export const CreatingNewProduct = ({
	categories: allCategories,
	setShouldUpdateProductList,
}) => {
	const [titleValue, setTitleValue] = useState('');
	const [categoryValue, setCategoryValue] = useState('');
	const [priceValue, setPriceValue] = useState('');
	const [countValue, setCountValue] = useState('');
	const [imageUrlValue, setImageUrlValue] = useState('');

	const dispatch = useDispatch();
	const requestServer = useServerRequest();

	const onTitleChange = ({ target }) => setTitleValue(target.value);
	const onCategoryChange = ({ target }) => setCategoryValue(target.value);
	const onPriceChange = ({ target }) => setPriceValue(target.value);
	const onCountChange = ({ target }) => setCountValue(target.value);
	const onImageChange = ({ target }) => setImageUrlValue(target.value);

	const onSave = () => {
		dispatch(
			saveProductAsync(requestServer, {
				title: titleValue,
				imageUrl: imageUrlValue,
				category: categoryValue,
				price: priceValue,
				count: countValue,
			}),
		).then(() => {
			setShouldUpdateProductList((prev) => !prev);
		});
	};

	return (
		<div className={styles.container}>
			<h3>Создайте новый товар</h3>
			<Input
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
				value={priceValue}
				type="number"
				min="0"
				placeholder="Стоимость..."
				onChange={onPriceChange}
			/>
			<Input
				type="number"
				min="0"
				value={countValue}
				placeholder="Остаток..."
				onChange={onCountChange}
			/>
			<Input value={imageUrlValue} placeholder="Фото..." onChange={onImageChange} />
			<Button onClick={onSave}>Сохранить</Button>
		</div>
	);
};
