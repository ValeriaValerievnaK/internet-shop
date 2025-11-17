import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectUserSession } from '../selectore';
import { server } from '../bff';

export const useServerRequest = () => {
	const session = useSelector(selectUserSession);

	return useCallback(
		(operation, ...params) => {
			const request = [
				'register',
				'authorize',
				'fetchProduct',
				'fetchProducts',
				'fetchCategories',
			].includes(operation)
				? params
				: [session, ...params];

			return server[operation](...request);
		},
		[session],
	);
};
