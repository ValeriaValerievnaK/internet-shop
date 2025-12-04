import type { TRootState } from '../store';

export const selectModalIsOpen = ({ app }: TRootState) => app.modal.isOpen;

export const selectModalOnCancel = ({ app }: TRootState) => app.modal.onCancel;

export const selectModalOnConfirm = ({ app }: TRootState) => app.modal.onConfirm;

export const selectModalText = ({ app }: TRootState) => app.modal.text;

export const selectShouldUpdateProductList = ({ app }: TRootState) =>
	app.shouldUpdateProductList;
