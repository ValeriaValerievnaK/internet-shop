export const transformSession = (dbSession) => {
	if (!dbSession) {
		return null;
	}

	return {
		id: dbSession.id,
		hash: dbSession.hash,
		user: dbSession.user,
	};
};
