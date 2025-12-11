import type { FC } from 'react';
import { useSelector } from 'react-redux';
import { Icon } from '../../../../../components';
import { checkAccess } from '../../../../../../src/utils';
import { ROLE } from '../../../../../../src/constants';
import { useAppDispatch } from '../../../../../../src/hooks';
import { selectUserRole } from '../../../../../../src/modules/user';
import { CLOSE_MODAL, openModal } from '../../../../../../src/modules/app';
import { removeCommentAsync } from '../../../../../../src/modules/product';
import styles from './comment.module.css';
interface IParam {
	productId: string;
	id: string;
	author: string;
	content: string;
	publishedAt: string;
}

export const Comment: FC<IParam> = ({ productId, id, author, content, publishedAt }) => {
	const dispatch = useAppDispatch();

	const roleId = useSelector(selectUserRole);

	const onCommentRemove = (commentId: string, productId: string) => {
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
						/>

						{author}
					</div>

					<div className={styles.publishedAt}>
						<Icon
							inactive={true}
							id="fa-calendar-o"
							size="18px"
							margin="0 10px 0 0"
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
