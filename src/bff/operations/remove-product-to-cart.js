import { deleteProductToCart, getCart } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../constans';

export const removeProductToCart = async (hash, id, userId) => {
	const accessRoles = [ROLE.ADMIN, ROLE.BUYER];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Необходимо авторизоваться!',
			res: null,
		};
	}

	await deleteProductToCart(id);

	const productsInCart = await getCart(userId);

	return {
		error: null,
		res: productsInCart,
	};
};
