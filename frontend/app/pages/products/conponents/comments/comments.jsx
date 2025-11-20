import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserRole } from '../../../../../src/selectore';
import { addCommentAsync } from '../../../../../src/actions';
import { Icon } from '../../../../components';
import { Comment } from './components';
import { ROLE } from '../../../../../src/constans';
import styles from './comments.module.css';
import { formatDate } from '../../../../../src/utils';

export const Comments = ({ comments, productId }) => {
	const [newComment, setNewComment] = useState('');
	const dispatch = useDispatch();
	const userRole = useSelector(selectUserRole);

	const onNewCommentAdd = (productId, content) => {
		dispatch(addCommentAsync(productId, content));
		setNewComment('');
	};

	const isGuest = userRole === ROLE.GUEST;
	const checkH2 = !(isGuest && comments.length === 0);

	return (
		<div className={styles.container}>
			{checkH2 && <h2>Отзывы</h2>}
			{!isGuest && (
				<div className={styles.newComment}>
					<textarea
						name="comment"
						value={newComment}
						placeholder="Поделитесь своим мнением о товаре..."
						onChange={({ target }) => setNewComment(target.value)}
					></textarea>
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
