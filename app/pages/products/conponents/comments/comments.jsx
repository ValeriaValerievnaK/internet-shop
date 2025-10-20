import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserId } from '../../../../../src/selectore';
import { useServerRequest } from '../../../../../src/hooks';
import { addCommentAsync } from '../../../../../src/actions';
import { H2, Icon } from '../../../../components';
import { Comment } from './components';
import styles from './comments.module.css';

export const Comments = ({ comments, productId }) => {
	const [newComment, setNewComment] = useState('');
	const userId = useSelector(selectUserId);
	const dispatch = useDispatch();
	const requestServer = useServerRequest();

	const onNewCommentAdd = (requestServer, userId, productId, content) => {
		dispatch(addCommentAsync(requestServer, userId, productId, content));
		setNewComment('');
	};

	return (
		<div className={styles.container}>
			<h2>Отзывы</h2>
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
						onNewCommentAdd(requestServer, userId, productId, newComment);
					}}
				/>
			</div>
			<div className={styles.comments}>
				{comments.map(({ id, author, content, publishedAt }) => (
					<Comment
						key={id}
						id={id}
						productId={productId}
						author={author}
						publishedAt={publishedAt}
						content={content}
					/>
				))}
			</div>
		</div>
	);
};
