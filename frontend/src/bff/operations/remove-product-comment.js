import { deleteComment, getProduct } from '../api';
import { sessions } from '../sessions';
import { getProductCommentsWithAuthor } from '../utils';
import { ROLE } from '../constans';

export const removeProductComment = async (hash, id, productId) => {
	const accessRoles = [ROLE.ADMIN];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Усп... Недостаточно прав. Обратитесь к разработчику.',
			res: null,
		};
	}

	await deleteComment(id);

	const product = await getProduct(productId);

	const commentsWithAuthor = await getProductCommentsWithAuthor(productId);

	return {
		error: null,
		res: { ...product, comments: commentsWithAuthor },
	};
};
