import type { TRootState } from '../store';

export const selectCartData = ({ cart }: TRootState) => cart.cartData;

export const selectCartTotalPrice = ({ cart }: TRootState) => cart.totalPrice;
