import { useSelector } from 'react-redux';
import { ERROR } from '../../../src/constans';
import { selectUserRole } from '../../../src/selectore';
import { Error } from '../error/error';
import { checkAccess } from '../../../src/utils';

export const PrivateContent = ({ children, access, serverError = null }) => {
	const userRole = useSelector(selectUserRole);

	const accessError = checkAccess(access, userRole) ? null : ERROR.ACCESS_DENIED;

	const error = serverError || accessError;

	if (error) {
		return <Error error={error} />;
	}

	return children;
};
