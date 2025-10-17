import { useDispatch } from 'react-redux';
import { useServerRequest } from '../../../../../../src/hooks';
import {
	CLOSE_MODAL,
	openModal,
	removeProductAsync,
} from '../../../../../../src/actions';
import { Icon } from '../../../../../components';

export const SpecialPanel = ({ id, editButton, setShouldUpdateProductList }) => {
	const dispatch = useDispatch();
	const requestServer = useServerRequest();

	const onProductRemove = (requestServer, id) => {
		dispatch(
			openModal({
				text: 'Вы действительно хотите удалить этот товар?',
				onConfirm: () => {
					dispatch(removeProductAsync(id, requestServer)).then(() =>
						setShouldUpdateProductList((prev) => !prev),
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
				onClick={() => onProductRemove(id, requestServer)}
			/>
		</div>
	);
};
