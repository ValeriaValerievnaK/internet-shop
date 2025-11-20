import { useDispatch } from 'react-redux';
import {
	CLOSE_MODAL,
	openModal,
	removeProductAsync,
	updateProductList,
} from '../../../../../../src/actions';
import { Icon } from '../../../../../components';

export const SpecialPanel = ({ id, editButton }) => {
	const dispatch = useDispatch();

	const onProductRemove = (id) => {
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
