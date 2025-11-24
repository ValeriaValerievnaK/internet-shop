import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input, ErrorMessage } from '../../../../components';
import { saveProductAsync, updateProductList } from '../../../../../src/actions';
import { validationSchema } from '../utils';
import { SelectWithGroup } from '../select-with-group/select-with-group';
import styles from './creating-new-product.module.css';

export const CreatingNewProduct = ({ categories: allCategories }) => {
	const dispatch = useDispatch();

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			title: '',
			category: '',
			price: '',
			count: '',
			imageUrl: '',
		},
		resolver: yupResolver(validationSchema),
	});

	const onSubmit = ({ title, category, price, count, imageUrl }) => {
		dispatch(
			saveProductAsync(null, {
				title: title.trim(),
				imageUrl: imageUrl.trim(),
				category,
				price,
				count,
			}),
		)
			.then(() => {
				dispatch(updateProductList());
				reset();
			})
			.catch(console.error);
	};

	const formError =
		errors?.title?.message ||
		errors?.category?.message ||
		errors?.price?.message ||
		errors?.count?.message ||
		errors?.imageUrl?.message;

	return (
		<div className={styles.sidebar}>
			<h3>Создайте новый товар</h3>

			<form onSubmit={handleSubmit(onSubmit)}>
				<Input type="text" placeholder="Наименование..." {...register('title')} />

				<SelectWithGroup
					allCategories={allCategories}
					{...register('category')}
				/>

				<Input type="number" placeholder="Стоимость..." {...register('price')} />

				<Input type="number" placeholder="Остаток..." {...register('count')} />

				<Input type="text" placeholder="Фото..." {...register('imageUrl')} />

				<Button type="submit" disabled={!!formError}>
					Сохранить
				</Button>

				{formError && <ErrorMessage>{formError}</ErrorMessage>}
			</form>
		</div>
	);
};
