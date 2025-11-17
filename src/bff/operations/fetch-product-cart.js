import { getCart } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../constans';

export const fetchProductCart = async (hash, userId) => {
	const accessRoles = [ROLE.ADMIN, ROLE.BUYER];
	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Авторизуйтесь, что бы посмотреть корзину',
			res: null,
		};
	}

	const productsInCart = await getCart(userId);

	return {
		error: null,
		res: productsInCart,
	};
};
