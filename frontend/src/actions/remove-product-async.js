import { request } from '../utils';

export const removeProductAsync = (id) => () => request(`/api/products/${id}`, 'DELETE');
