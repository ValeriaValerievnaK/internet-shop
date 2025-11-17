export const addComment = (userId, productId, content) =>
	fetch('http://localhost:3008/comments', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			product_id: productId,
			author_id: userId,
			published_at: new Date().toISOString().replace('T', '-').substring(0, 10),
			content: content,
		}),
	});
