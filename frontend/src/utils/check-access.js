export const checkAccess = (access, userRole) => {
	return access.includes(userRole);
};
