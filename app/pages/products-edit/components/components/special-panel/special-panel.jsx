import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useServerRequest } from '../../../../../../src/hooks';
import {
	CLOSE_MODAL,
	openModal,
	removeProductAsync,
} from '../../../../../../src/actions';
import { Icon } from '../../../../../components';

export const SpecialPanel = ({ id, editButton }) => {
	const dispatch = useDispatch();
	const requestServer = useServerRequest();
	const navigate = useNavigate();

	const onProductRemove = (requestServer, id) => {
		dispatch(
			openModal({
				text: 'Вы действительно хотите удалить этот товар?',
				onConfirm: () => {
					dispatch(removeProductAsync(id, requestServer)).then(() =>
						navigate('/'),
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
