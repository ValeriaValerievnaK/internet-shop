import type { IInitialAppState } from '../../reducers';
import { ACTION_TYPE } from '../types';

type TOpenModalPayload = Partial<IInitialAppState['modal']>;

export const openModal = (modalParams: TOpenModalPayload) => ({
	type: ACTION_TYPE.OPEN_MODAL,
	payload: modalParams,
});
