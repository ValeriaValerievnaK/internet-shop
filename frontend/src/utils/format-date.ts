export const formatDate = (date: string): string => {
	if (!date) return '';

	const newDate = new Date(date).toISOString().split('T')[0];

	return newDate || '';
};
