import { useDispatch, useSelector } from 'react-redux';
import {
	CLOSE_MODAL,
	openModal,
	removeCommentAsync,
} from '../../../../../../../src/actions';
import { selectUserRole } from '../../../../../../../src/selectore';
import { Icon } from '../../../../../../components';
import { checkAccess } from '../../../../../../../src/utils';
import { ROLE } from '../../../../../../../src/constans';
import styles from './comment.module.css';

export const Comment = ({ productId, id, author, content, publishedAt }) => {
	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRole);

	const onCommentRemove = (commentId, productId) => {
		dispatch(
			openModal({
				text: 'Действительно хотите удалить отзыв?',
				onConfirm: () => {
					dispatch(removeCommentAsync(productId, commentId));
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	const isAdmin = checkAccess([ROLE.ADMIN], roleId);

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
			{isAdmin && (
				<Icon
					id="fa-times"
					size="21px"
					margin="0 0 0 10px"
					onClick={() => onCommentRemove(id, productId)}
				/>
			)}
		</div>
	);
};
