import type { TRootState } from '../store';

export const selectProduct = ({ product }: TRootState) => product.productData;

export const selectProductIsLoading = ({ product }: TRootState) => product.isLoading;

export const selectProductError = ({ product }: TRootState) => product.error;

export const selectProductCategories = ({ product }: TRootState) => product.categories;

export const selectProducts = ({ product }: TRootState) => product.products;

export const selectProductLastPage = ({ product }: TRootState) => product.lastPage;
