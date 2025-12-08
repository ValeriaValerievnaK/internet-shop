export const request = async <TResponse = unknown, TRequest = unknown>(
	url: string,
	method?: string,
	data?: TRequest,
): Promise<TResponse> => {
	const response = await fetch(url, {
		method,
		headers: {
			'content-type': 'application/json',
		},
		body: data ? JSON.stringify(data) : undefined,
	});

	const json = await response.json().catch(() => null);

	if (!response.ok) {
		throw {
			status: response.status,
			message: json?.error || json?.message || 'Error',
		};
	}

	return json;
};
