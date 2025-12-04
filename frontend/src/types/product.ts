export interface IComment {
	author: string;
	content: string;
	id: string;
	publishedAt: string;
}
export interface IProduct {
	category: string;
	count: number | null;
	id?: string;
	imageUrl: string;
	price: number | null;
	title: string;
	comments?: IComment[];
}
