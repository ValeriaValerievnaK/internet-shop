import type { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { ERROR } from '../../../src/constants';
import { Error } from '../error/error';
import { checkAccess } from '../../../src/utils';
import { selectUserRole } from '../../../src/modules/user';

interface IProps {
	children: ReactNode;
	access: number[];
	serverError?: string | null;
}

export const PrivateContent: FC<IProps> = ({ children, access, serverError = null }) => {
	const userRole = useSelector(selectUserRole);

	const accessError = checkAccess(access, userRole) ? null : ERROR.ACCESS_DENIED;

	const error = serverError || accessError;

	if (error) {
		return <Error error={error} />;
	}

	return children;
};
