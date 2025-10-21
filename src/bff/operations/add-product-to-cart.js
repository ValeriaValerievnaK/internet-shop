import { addProductToUserCart } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../constans';

export const addProductToCart = async (hash, productId, userId) => {
	const accessRoles = [ROLE.ADMIN, ROLE.BUYER];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Авторизуйтесь, что бы купить товар',
			res: null,
		};
	}

	await addProductToUserCart(productId, userId);

	return {
		error: null,
		res: true,
	};
};
