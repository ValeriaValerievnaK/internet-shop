export const checkAccess = (access, userRole) => {
	console.log('access, userRole', access, userRole);
	return access.includes(userRole);
};
