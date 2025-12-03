import type { TAppThunk } from '../../store';
import { request } from '../../utils';

interface IResponse {
	error?: string | null;
}

export const removeProductAsync =
	(id: string): TAppThunk<Promise<IResponse>> =>
	() =>
		request<IResponse>(`/api/products/${id}`, 'DELETE');
