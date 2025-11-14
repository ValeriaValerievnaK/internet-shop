export const getCategoryPath = (allCategories, currentCategory) => {
	const currentPath = allCategories.find((category) =>
		category.subCategories?.find((subCat) => subCat.name === currentCategory),
	);

	return currentPath
		? `${currentPath.categoriesName} > ${currentCategory}`
		: currentCategory;
};
