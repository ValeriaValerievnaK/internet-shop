import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TableRow } from '../table-row/table-row';
import { Icon, Input } from '../../../../components';
import { saveProductAsync, updateProductList } from '../../../../../src/actions';
import { SelectWithGroup, validationSchema } from '../utils';
import { SpecialPanel } from '../special-panel/special-panel';
import styles from './product-row.module.css';

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

	const dispatch = useDispatch();

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			title: title,
			category: productCategory,
			price: price,
			count: count,
			imageUrl: imageUrl,
		},
		resolver: yupResolver(validationSchema),
	});

	const onHandelEdit = () => {
		setIsEditing((prev) => !prev);
	};

	const onSubmit = ({ title, category, price, count, imageUrl }) => {
		dispatch(
			saveProductAsync(id, {
				id,
				title: title.trim(),
				imageUrl: imageUrl.trim(),
				category,
				price,
				count,
			}),
		).then(() => {
			dispatch(updateProductList());
			reset();
			setIsEditing(false);
		});
	};

	const titleError = errors?.title?.message;
	const categoryError = errors?.category?.message;
	const priceError = errors?.price?.message;
	const countError = errors?.count?.message;
	const imageUrlError = errors?.imageUrl?.message;

	const formError =
		errors?.title?.message ||
		errors?.category?.message ||
		errors?.price?.message ||
		errors?.count?.message ||
		errors?.imageUrl?.message;

	const renderContent = () => {
		if (isEditing) {
			return (
				<form onSubmit={handleSubmit(onSubmit)}>
					<TableRow border={true}>
						<Input
							className="title-column"
							type="text"
							placeholder="Наименование..."
							error={titleError}
							{...register('title')}
						/>

						<SelectWithGroup
							allCategories={allCategories}
							error={categoryError}
							{...register('category')}
						/>

						<Input
							className="price-column"
							type="number"
							placeholder="Стоимость..."
							error={priceError}
							{...register('price')}
						/>

						<Input
							className="count-column"
							type="number"
							placeholder="Остаток..."
							error={countError}
							{...register('count')}
						/>

						<Input
							className="imageUrl-column"
							type="text"
							placeholder="Фото..."
							error={imageUrlError}
							{...register('imageUrl')}
						/>
					</TableRow>

					<SpecialPanel
						id={id}
						editButton={
							<button
								className={styles.saveButton}
								type="submit"
								disabled={!!formError}
							>
								<Icon
									id="fa-floppy-o"
									size="21px"
									margin="0 0 0 10px"
									disabled={!!formError}
								/>
							</button>
						}
					/>
				</form>
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
