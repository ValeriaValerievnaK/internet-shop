import type { ICategoriesData } from '../../../../../../src/types';

export const getCategoryPath = (
	allCategories: ICategoriesData[],
	currentCategory: string,
) => {
	const currentPath = allCategories.find((category) =>
		category.subCategories?.find((subCat) => subCat.name === currentCategory),
	);

	return currentPath
		? `${currentPath.categoriesName} > ${currentCategory}`
		: currentCategory;
};
