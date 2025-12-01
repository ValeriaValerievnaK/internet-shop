import { useEffect } from 'react';
import type { UseFormReset } from 'react-hook-form';
import { useStore } from 'react-redux';
import type { TRootState } from '../store';

interface IResetForm {
	login: string;
	password: string;
	passwordchek: string;
}

export const useResetForm = (reset: UseFormReset<IResetForm>) => {
	const store = useStore<TRootState>();

	useEffect(() => {
		let currentWasLogout = store.getState().app.wasLogout;

		return store.subscribe(() => {
			let previousWasLogout = currentWasLogout;
			currentWasLogout = store.getState().app.wasLogout;

			if (currentWasLogout !== previousWasLogout) {
				reset();
			}
		});
	}, [reset, store]);
};
