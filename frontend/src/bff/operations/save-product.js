import { addProduct, updateProduct } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../constans';

export const saveProduct = async (hash, newProductData) => {
	const accessRoles = [ROLE.ADMIN];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Усп... Недостаточно прав. Обратитесь к разработчику. ',
			res: null,
		};
	}

	const savedProduct = newProductData.id
		? await updateProduct(newProductData)
		: await addProduct(newProductData);

	return {
		error: null,
		res: savedProduct,
	};
};
