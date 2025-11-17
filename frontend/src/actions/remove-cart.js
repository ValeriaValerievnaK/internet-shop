import { ACTION_TYPE } from './action-type';

export const removeCart = () => {
	return {
		type: ACTION_TYPE.RESET_DATA,
	};
};
