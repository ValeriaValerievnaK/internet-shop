import type { TRootState } from '../../store';

export const selectUserId = ({ user }: TRootState) => user.id;

export const selectUserLogin = ({ user }: TRootState) => user.login;

export const selectUserRole = ({ user }: TRootState) => user.roleId;

export const selectUserSession = ({ user }: TRootState) => user.session;

export const selectUserError = ({ user }: TRootState) => user.error;

export const selectUserIsLoading = ({ user }: TRootState) => user.isLoading;
