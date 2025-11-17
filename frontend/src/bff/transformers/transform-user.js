export const transformUser = (dbUser) => {
	if (!dbUser) {
		return null;
	}

	return {
		id: dbUser.id,
		login: dbUser.login,
		password: dbUser.password,
		roleId: dbUser.role_id,
	};
};
