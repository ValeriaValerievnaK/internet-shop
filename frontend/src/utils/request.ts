export const request = async <TResponse = unknown, TRequest = unknown>(
	url: string,
	method?: string,
	data?: TRequest,
): Promise<TResponse> => {
	return fetch(url, {
		headers: {
			'content-type': 'application/json',
		},
		method: method || 'GET',
		body: data ? JSON.stringify(data) : undefined,
	}).then((res) => res.json());
};
