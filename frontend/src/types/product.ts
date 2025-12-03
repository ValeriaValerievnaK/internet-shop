export interface IComment {
	author: string;
	content: string;
	id: string;
	publishedAt: string;
}
export interface IProduct {
	category: string;
	comments?: IComment[];
	count: number;
	id?: string;
	imageUrl: string;
	price: number;
	title: string;
}
