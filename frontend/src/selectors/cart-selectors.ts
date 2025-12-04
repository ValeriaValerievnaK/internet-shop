import type { TRootState } from '../store';

export const selectCartData = ({ cart }: TRootState) => cart.cartData;

export const selectCartTotalPrice = ({ cart }: TRootState) => cart.totalPrice;

export const selectCartIsLoading = ({ cart }: TRootState) => cart.isLoading;

export const selectCartError = ({ cart }: TRootState) => cart.error;
