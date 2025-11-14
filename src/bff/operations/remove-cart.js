import { deleteCart } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../constans';

export const removeCart = async (hash, userId) => {
	const accessRoles = [ROLE.ADMIN, ROLE.BUYER];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Авторизуйтесь, что бы оформить заказ!',
			res: null,
		};
	}

	await deleteCart(userId);

	return {
		error: null,
		res: true,
	};
};
