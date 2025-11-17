export const addUser = (login, password) =>
	fetch('http://localhost:3008/users', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			login,
			password,
			role_id: 1,
		}),
	}).then((createdUser) => createdUser.json());
