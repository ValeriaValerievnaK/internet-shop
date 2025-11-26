import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { regFormSchema } from './validation.schema';
import { Input, Button, H2, ErrorMessage } from '../../components';
import { setUser } from '../../../src/actions';
import { selectUserRole } from '../../../src/selectors';
import { ROLE } from '../../../src/constans';
import { useResetForm } from '../../../src/hooks';
import { request } from '../../../src/utils';
import styles from './registration.module.css';

export const Registration = () => {
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
			passwordchek: '',
		},
		resolver: yupResolver(regFormSchema),
	});

	useResetForm(reset);

	const onSubmit = ({ login, password }) => {
		request('/api/register', 'POST', { login, password }).then(({ error, user }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);

				return;
			}

			dispatch(setUser(user));

			sessionStorage.setItem('userData', JSON.stringify(user));
		});
	};

	const formError =
		errors?.login?.message ||
		errors?.password?.message ||
		errors?.passwordchek?.message;

	const errorMassage = formError || serverError;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<div className={styles.container}>
			<H2>Регистрация</H2>

			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type="text"
					placeholder="Логин..."
					{...register('login', {
						onChange: () => setServerError(null),
					})}
				/>

				<Input
					type="password"
					placeholder="И пароль..."
					{...register('password', {
						onChange: () => setServerError(null),
					})}
				/>

				<Input
					type="password"
					placeholder="Повторите пароль..."
					{...register('passwordchek', {
						onChange: () => setServerError(null),
					})}
				/>

				<Button type="submit" disabled={!!formError}>
					Зарегистироваться
				</Button>

				{errorMassage && <ErrorMessage>{errorMassage}</ErrorMessage>}
			</form>
		</div>
	);
};
