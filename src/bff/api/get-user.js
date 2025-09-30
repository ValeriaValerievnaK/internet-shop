import { transformUser } from '../transformers';

export const getUser = async (loginToFind) =>
	fetch(`http://localhost:3008/users?login=${loginToFind}`)
		.then((loadedUsers) => loadedUsers.json())
		.then(([loadedUsers]) => transformUser(loadedUsers));
