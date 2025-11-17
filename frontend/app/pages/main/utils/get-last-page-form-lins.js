export const getLastPageFormLins = (links) => {
	if (!links) return 1;

	try {
		const linksArray = links.split(',');
		const lastLink = linksArray.find((link) => link.includes('rel="last"'));
		if (!lastLink) {
			return 1;
		}

		const urlMatch = lastLink.match(/<([^>]+)>/);
		if (!urlMatch) {
			return 1;
		}

		const url = urlMatch[1];

		const urlParams = new URLSearchParams(url.split('?')[1]);
		const page = urlParams.get('_page');

		return page ? Number(page) : 1;
	} catch (error) {
		console.error('Error parsing links:', error);
		return 1;
	}
};
