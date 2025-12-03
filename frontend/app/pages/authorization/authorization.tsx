import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { authFormSchema, type TAuthFormSchema } from './validation.schema';
import { ROLE } from '../../../src/constans';
import { Button, ErrorMessage, H2, Input } from '../../components';
import { selectUserRole } from '../../../src/selectors';
import { setUser } from '../../../src/actions';
import { useAppDispatch, useResetForm } from '../../../src/hooks';
import { request } from '../../../src/utils';
import styles from './authorization.module.css';

interface ILoginResponse {
	error?: string;
	user?: string;
}

export const Authorization = () => {
	const dispatch = useAppDispatch();

	const roleId = useSelector(selectUserRole);

	const [serverError, setServerError] = useState<string | null>(null);

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

	const onSubmit = ({ login, password }: TAuthFormSchema) => {
		request<ILoginResponse, TAuthFormSchema>('/api/login', 'POST', {
			login,
			password,
		}).then(({ error, user }) => {
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
