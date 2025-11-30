interface ISubCategories {
	id: string;
	name: string;
}

export interface ICategoriesData {
	categoriesName: string;
	id: string;
	subCategories: ISubCategories[];
}

export interface ICategories {
	data: ICategoriesData[];
}
