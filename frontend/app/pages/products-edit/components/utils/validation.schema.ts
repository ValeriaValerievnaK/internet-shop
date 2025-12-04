import { string, number, object, type InferType } from 'yup';

export const validationSchema = object().shape({
	title: string()
		.required('Введите наименование товара')
		.matches(
			/^[a-zA-Zа-яА-ЯёЁ\s]+$/,
			'Неверное наименование. Допускаются только буквы.',
		)
		.min(2, 'Неверное наименование. Минимум 2 символа.')
		.max(20, 'Неверное наименование. Максимум 20 символов.'),
	category: string().required('Выберете категорю'),
	price: number()
		.typeError('Стоимость должна быть числом')
		.required('Введите стоимость товара')
		.positive('Стоимость не может быть меньше 0')
		.integer('Стоимость должна быть целым числом')
		.min(1, 'Стоимость не может быть меньше 1')
		.max(9999999999, 'Неверная стоимость. Максимум 10 цифр.')
		.nullable(),
	count: number()
		.typeError('Остаток должен быть числом')
		.required('Введите остаток товара')
		.positive('Остаток не может быть меньше 0')
		.integer('Остаток должен быть целым числом')
		.min(0, 'Остаток не может быть меньше 0')
		.max(9999999999, 'Неверный остаток. Максимум 10 цифр.')
		.nullable(),
	imageUrl: string()
		.required('Введите ссылку на изображение')
		.url('Введите корректный URL'),
});

export type TFormSchema = InferType<typeof validationSchema>;
