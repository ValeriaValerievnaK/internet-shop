import { addProductToUserCart, getCart, updateProductToUserCart } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../constans';
import { updateCountData } from '../utils';

export const addProductToCart = async (
	hash,
	productId,
	userId,
	imageUrl,
	title,
	price,
	count,
) => {
	const accessRoles = [ROLE.ADMIN, ROLE.BUYER];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Авторизуйтесь, что бы купить товар',
			res: null,
		};
	}

	if (count < 1) {
		return {
			error: 'Товара нет в наличии',
			res: null,
		};
	}

	const allCartToUser = await getCart(userId);

	const currentProduct = allCartToUser.find(
		({ productId: productIdAtCart }) => productIdAtCart == String(productId),
	);

	if (!currentProduct) {
		await addProductToUserCart(productId, userId, imageUrl, title, price, count);
	} else {
		const { newCount, newPrice } = updateCountData(
			price,
			currentProduct.count,
			'increase',
		);

		await updateProductToUserCart(
			currentProduct.id,
			String(newCount),
			String(newPrice),
		);
	}

	return {
		error: null,
		res: true,
	};
};
