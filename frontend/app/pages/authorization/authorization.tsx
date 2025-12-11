import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { authFormSchema, type TAuthFormSchema } from './validation.schema';
import { ROLE } from '../../../src/constants';
import { Button, ErrorMessage, H2, Input, Loader } from '../../components';
import { useAppDispatch, useResetForm } from '../../../src/hooks';
import {
	addlogin,
	selectUserError,
	selectUserIsLoading,
	selectUserRole,
	setUserError,
} from '../../../src/modules/user';
import styles from './authorization.module.css';

export const Authorization = () => {
	const dispatch = useAppDispatch();

	const roleId = useSelector(selectUserRole);
	const serverError = useSelector(selectUserError);
	const isLoading = useSelector(selectUserIsLoading);

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm<TAuthFormSchema>({
		defaultValues: {
			login: '',
			password: '',
		},
		resolver: yupResolver(authFormSchema),
	});

	useResetForm(reset);

	const onSubmit = ({ login, password }: TAuthFormSchema) => {
		dispatch(addlogin({ login, password }));
	};

	const formError = errors?.login?.message || errors?.password?.message;

	const errorMassage = formError || serverError;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	if (isLoading) {
		return <Loader />;
	}

	return (
		<div className={styles.container}>
			<H2>Вход</H2>

			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type="text"
					placeholder="Ваш логин..."
					{...register('login', {
						onChange: () => dispatch(setUserError(null)),
					})}
				/>

				<Input
					type="password"
					placeholder="Пароль..."
					{...register('password', {
						onChange: () => dispatch(setUserError(null)),
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
