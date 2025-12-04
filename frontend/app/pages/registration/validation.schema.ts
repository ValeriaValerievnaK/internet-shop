import { object, string, ref, type InferType } from 'yup';

export const regFormSchema = object().shape({
	login: string()
		.required('Придумайте логин')
		.matches(/^\w+$/, 'Неверно заполнен логин. Допускаются только буквы и цифры.')
		.min(3, 'Неверно заполнен логин. Минимум 3 символа')
		.max(15, 'Неверно заполнен логин. Максимум 15 символов'),
	password: string()
		.required('Заполните пароль')
		.matches(
			/^[\w#%]+$/,
			'Неверно заполнен пароль. Допускаются только буквы, цифры и знаки # %',
		)
		.min(6, 'Неверно заполнен парол. Минимум 6 символа')
		.max(30, 'Неверно заполнен парол. Максимум 30 символов'),
	passwordchek: string()
		.required('Повторите пароль')
		.oneOf([ref('password')], 'Пароли не совпадают'),
});

export type TRegFormSchema = InferType<typeof regFormSchema>;
