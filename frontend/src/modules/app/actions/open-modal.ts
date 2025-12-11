import type { IInitialAppState } from '../reducer';
import { ACTION_TYPE } from '../../../constants';

type TOpenModalPayload = Partial<IInitialAppState['modal']>;

export const openModal = (modalParams: TOpenModalPayload) => ({
	type: ACTION_TYPE.OPEN_MODAL,
	payload: modalParams,
});
