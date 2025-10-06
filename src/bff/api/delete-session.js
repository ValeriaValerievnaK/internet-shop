export const deleteSession = async (sessionId) => {
	fetch(`http://localhost:3008/sessions/${sessionId}`, {
		method: 'DELETE',
	});
};
