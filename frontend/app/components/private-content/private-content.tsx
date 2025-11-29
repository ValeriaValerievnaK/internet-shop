import type { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { ERROR } from '../../../src/constans';
import { selectUserRole } from '../../../src/selectors';
import { Error } from '../error/error';
import { checkAccess } from '../../../src/utils';

interface IProps {
  children: ReactNode;
  access: number[];
  serverError: string | null;
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
