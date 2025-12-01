export const checkAccess = (access: number[], userRole: number) => {
	return access.includes(userRole);
};
