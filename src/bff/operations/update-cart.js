import { updateProductToUserCart } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../constans';

export const updateCart = async (hash, id, newCount, newPrice) => {
	const accessRoles = [ROLE.ADMIN, ROLE.BUYER];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Пожалуйста, авторизуйтесь!',
			res: null,
		};
	}

	const updateCart = await updateProductToUserCart(id, newCount, newPrice);

	return {
		error: null,
		res: updateCart,
	};
};
