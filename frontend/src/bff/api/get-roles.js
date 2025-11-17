export const getRoles = () =>
	fetch('http://localhost:3008/roles').then((loadedRoles) => loadedRoles.json());
