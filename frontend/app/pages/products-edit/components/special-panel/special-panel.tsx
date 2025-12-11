import type { FC, ReactNode } from 'react';
import { Icon } from '../../../../components';
import { useAppDispatch } from '../../../../../src/hooks';
import { CLOSE_MODAL, openModal } from '../../../../../src/modules/app';
import {
	removeProductAsync,
	updateProductList,
} from '../../../../../src/modules/product';

interface IProps {
	id: string;
	editButton: ReactNode;
}

export const SpecialPanel: FC<IProps> = ({ id, editButton }) => {
	const dispatch = useAppDispatch();

	const onProductRemove = (id: string) => {
		dispatch(
			openModal({
				text: 'Вы действительно хотите удалить этот товар?',
				onConfirm: () => {
					dispatch(removeProductAsync(id)).then(() =>
						dispatch(updateProductList()),
					);
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	return (
		<div className="actions-column">
			{editButton}

			<Icon
				id="fa-trash-o"
				margin="0 0 0 10px"
				onClick={() => onProductRemove(id)}
			/>
		</div>
	);
};
