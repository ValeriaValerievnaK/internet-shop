import { request } from '../../utils';

interface IResponse {
	error?: string | null;
}

export const removeProductAsync = (id: string) => () =>
	request<IResponse>(`/api/products/${id}`, 'DELETE');
