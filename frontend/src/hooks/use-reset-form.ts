import { useEffect } from 'react';
import type { FieldValues, UseFormReset } from 'react-hook-form';
import { useStore } from 'react-redux';
import type { TRootState } from '../store';

export const useResetForm = <T extends FieldValues>(reset: UseFormReset<T>) => {
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
