export const getCategories = () =>
	fetch('http://localhost:3008/categories').then((loadedCategorys) =>
		loadedCategorys.json(),
	);
