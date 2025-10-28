import { addProductToUserCart, getCart, updateProductToUserCart } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../constans';

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

	// console.log('fcf', currentProduct);

	if (!currentProduct) {
		await addProductToUserCart(productId, userId, imageUrl, title, price);
	} else {
		const initialPrice = price;
		const newCount = Number(currentProduct.count) + 1;
		const newPrice = newCount * Number(initialPrice);

		// console.log('currentProduct', currentProduct.count, currentProduct.price);

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
