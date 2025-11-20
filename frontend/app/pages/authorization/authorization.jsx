import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ROLE } from '../../../src/constans';
import { Button, ErrorMessage, H2, Input } from '../../components';
import { selectUserRole } from '../../../src/selectore';
import { setUser } from '../../../src/actions';
import { useResetForm } from '../../../src/hooks';
import { request } from '../../../src/utils';
import styles from './authorization.module.css';

const authFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Введите логин')
		.matches(/^\w+$/, 'Неверно заполнен логин. Допускаются только буквы и цифры.')
		.min(3, 'Неверно заполнен логин. Минимум 3 символа.')
		.max(15, 'Неверно заполнен логин. Максимум 15 символов.'),
	password: yup
		.string()
		.required('Введите пароль')
		.matches(
			/^[\w#%]+$/,
			'Неверно заполнен пароль. Допускаются только буквы, цифры и знаки #,%',
		)
		.min(6, 'Неверно заполнен пароль. Минимум 6 символа')
		.max(30, 'Неверно заполнен пароль. Максимум 30 символов'),
});

export const Authorization = () => {
	const [serverError, setServerError] = useState(null);
	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRole);

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
		},
		resolver: yupResolver(authFormSchema),
	});

	useResetForm(reset);

	const onSubmit = ({ login, password }) => {
		request('/api/login', 'POST', { login, password }).then(({ error, user }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}

			dispatch(setUser(user));
			sessionStorage.setItem('userData', JSON.stringify(user));
		});
	};

	const formError = errors?.login?.message || errors?.password?.message;

	const errorMassage = formError || serverError;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<div className={styles.container}>
			<H2>Вход</H2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type="text"
					placeholder="Ваш логин..."
					{...register('login', {
						onChange: () => setServerError(null),
					})}
				/>
				<Input
					type="password"
					placeholder="Пароль..."
					{...register('password', {
						onChange: () => setServerError(null),
					})}
				/>
				<Button type="submit" disabled={!!formError}>
					Войти
				</Button>
				{errorMassage && <ErrorMessage>{errorMassage}</ErrorMessage>}
				<Link className={styles.styledLink} to="/register">
					Регистрация
				</Link>
			</form>
		</div>
	);
};
