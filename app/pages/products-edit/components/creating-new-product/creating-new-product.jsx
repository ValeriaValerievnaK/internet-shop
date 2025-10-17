import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SelectWithGroup, validationSchema } from '../utils';
import { Button, Input, ErrorMessage } from '../../../../components';
import { saveProductAsync } from '../../../../../src/actions';
import { useServerRequest } from '../../../../../src/hooks';
import styles from './creating-new-product.module.css';

export const CreatingNewProduct = ({
	categories: allCategories,
	setShouldUpdateProductList,
}) => {
	const dispatch = useDispatch();
	const requestServer = useServerRequest();

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
			saveProductAsync(requestServer, {
				title,
				imageUrl,
				category,
				price,
				count,
			}),
		).then(() => {
			setShouldUpdateProductList((prev) => !prev);
			reset();
		});
	};

	const formError =
		errors?.title?.message ||
		errors?.category?.message ||
		errors?.price?.message ||
		errors?.count?.message ||
		errors?.imageUrl?.message;

	return (
		<div className={styles.container}>
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
