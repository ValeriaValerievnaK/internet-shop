import { useState, type FC } from 'react';
import { useSelector } from 'react-redux';
import type { IComment } from '../../../../../src/types';
import { Icon } from '../../../../components';
import { Comment } from './comment/comment';
import { ROLE } from '../../../../../src/constants';
import { formatDate } from '../../../../../src/utils';
import { useAppDispatch } from '../../../../../src/hooks';
import { selectUserRole } from '../../../../../src/modules/user';
import { addCommentAsync } from '../../../../../src/modules/product';
import styles from './comments.module.css';

interface IParam {
	comments: IComment[];
	productId: string;
}

export const Comments: FC<IParam> = ({ comments, productId }) => {
	const [newComment, setNewComment] = useState('');

	const dispatch = useAppDispatch();

	const userRole = useSelector(selectUserRole);

	const onNewCommentAdd = (productId: string, content: string) => {
		dispatch(addCommentAsync(productId, content));

		setNewComment('');
	};

	const isGuest = userRole === ROLE.GUEST;

	const checkDisplayOfReviews = !(isGuest && comments.length === 0);

	return (
		<div className={styles.container}>
			{checkDisplayOfReviews && <h2>Отзывы</h2>}

			{!isGuest && (
				<div className={styles.newComment}>
					<textarea
						name="comment"
						value={newComment}
						placeholder="Поделитесь своим мнением о товаре..."
						onChange={({ target }) => setNewComment(target.value)}
					/>

					<Icon
						id="fa-arrow-circle-right"
						size="19px"
						margin="0 0 0 10px"
						onClick={() => {
							onNewCommentAdd(productId, newComment);
						}}
					/>
				</div>
			)}

			<div className={styles.comments}>
				{comments.map(({ id, author, content, publishedAt }) => (
					<Comment
						key={id}
						id={id}
						productId={productId}
						author={author}
						publishedAt={formatDate(publishedAt)}
						content={content}
					/>
				))}
			</div>
		</div>
	);
};
