import { addComment, getProduct } from '../api';
import { sessions } from '../sessions';
import { getProductCommentsWithAuthor } from '../utils';
import { ROLE } from '../constans';

export const addProductComment = async (hash, userId, productId, content) => {
	const accessRoles = [ROLE.ADMIN, ROLE.BUYER];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Авторизуйтесь, что бы написать комментарий',
			res: null,
		};
	}

	await addComment(userId, productId, content);

	const product = await getProduct(productId);

	const commentsWithAuthor = await getProductCommentsWithAuthor(productId);

	return {
		error: null,
		res: { ...product, comments: commentsWithAuthor },
	};
};
