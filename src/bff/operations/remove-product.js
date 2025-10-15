import { deleteProduct } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../constans';

export const removeProduct = async (hash, productId) => {
	const accessRoles = [ROLE.ADMIN];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Усп... Недостаточно прав. Обратитесь к разработчику.',
			res: null,
		};
	}

	deleteProduct(productId);

	return {
		error: null,
		res: true,
	};
};
