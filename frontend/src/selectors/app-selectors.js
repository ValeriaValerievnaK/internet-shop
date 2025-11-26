export const selectIsLoading = ({ app }) => app.isLoading;

export const selectModalIsOpen = ({ app }) => app.modal.isOpen;

export const selectModalOnCancel = ({ app }) => app.modal.onCancel;

export const selectModalOnConfirm = ({ app }) => app.modal.onConfirm;

export const selectModalText = ({ app }) => app.modal.text;

export const selectShouldUpdateProductList = ({ app }) => app.shouldUpdateProductList;
