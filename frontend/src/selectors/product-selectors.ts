import type { TRootState } from '../store';

export const selectProduct = ({ product }: TRootState) => product.productData;

export const selectProductIsLoading = ({ product }: TRootState) => product.isLoading;

export const selectProductError = ({ product }: TRootState) => product.error;

export const selectProductCategories = ({ product }: TRootState) => product.categories;

export const selectAllProducts = ({ product }: TRootState) => product.allProduct;
