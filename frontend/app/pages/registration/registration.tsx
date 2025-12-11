import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { regFormSchema, type TRegFormSchema } from './validation.schema';
import { Input, Button, H2, ErrorMessage, Loader } from '../../components';
import { useAppDispatch, useResetForm } from '../../../src/hooks';
import {
	addRegister,
	selectUserError,
	selectUserIsLoading,
	selectUserRole,
	setUserError,
} from '../../../src/modules/user';
import { ROLE } from '../../../src/constants';
import styles from './registration.module.css';

export const Registration = () => {
	const dispatch = useAppDispatch();

	const roleId = useSelector(selectUserRole);
	const serverError = useSelector(selectUserError);
	const isLoading = useSelector(selectUserIsLoading);

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm<TRegFormSchema>({
		defaultValues: {
			login: '',
			password: '',
			passwordchek: '',
		},
		resolver: yupResolver(regFormSchema),
	});

	useResetForm(reset);

	const onSubmit = ({ login, password }: TRegFormSchema) => {
		dispatch(addRegister({ login, password }));
	};

	const formError =
		errors?.login?.message ||
		errors?.password?.message ||
		errors?.passwordchek?.message;

	const errorMassage = formError || serverError;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	if (isLoading) {
		return <Loader />;
	}

	return (
		<div className={styles.container}>
			<H2>Регистрация</H2>

			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type="text"
					placeholder="Логин..."
					{...register('login', {
						onChange: () => dispatch(setUserError(null)),
					})}
				/>

				<Input
					type="password"
					placeholder="И пароль..."
					{...register('password', {
						onChange: () => dispatch(setUserError(null)),
					})}
				/>

				<Input
					type="password"
					placeholder="Повторите пароль..."
					{...register('passwordchek', {
						onChange: () => dispatch(setUserError(null)),
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
