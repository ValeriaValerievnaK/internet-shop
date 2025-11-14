import { useDispatch } from 'react-redux';
import {
	CLOSE_MODAL,
	openModal,
	removeCommentAsync,
} from '../../../../../../../src/actions';
import { Icon } from '../../../../../../components';
import { useServerRequest } from '../../../../../../../src/hooks';
import styles from './comment.module.css';

export const Comment = ({ productId, id, author, content, publishedAt }) => {
	const dispatch = useDispatch();
	const requestServer = useServerRequest();

	const onCommentRemove = (requestServer, id, productId) => {
		dispatch(
			openModal({
				text: 'Действительно хотите удалить отзыв?',
				onConfirm: () => {
					dispatch(removeCommentAsync(requestServer, id, productId));
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	return (
		<div className={styles.conteiner}>
			<div className={styles.comment}>
				<div className={styles.informationPanel}>
					<div className={styles.author}>
						<Icon
							inactive={true}
							id="fa-user-o"
							size="18px"
							margin="0 10px 0 0"
							onClick={() => {}}
						/>
						{author}
					</div>
					<div className={styles.publishedAt}>
						<Icon
							inactive={true}
							id="fa-calendar-o"
							size="18px"
							margin="0 10px 0 0"
							onClick={() => {}}
						/>
						{publishedAt}
					</div>
				</div>
				<div className={styles.commentText}>{content}</div>
			</div>
			<Icon
				id="fa-times"
				size="21px"
				margin="0 0 0 10px"
				onClick={() => onCommentRemove(requestServer, id, productId)}
			/>
		</div>
	);
};
