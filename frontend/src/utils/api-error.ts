export const getApiErrorMessage = (status: number) => {
	switch (status) {
		case 400:
			return 'Неверный запрос.';
		case 401:
			return 'Не авторизован.';
		case 403:
			return 'Доступ запрещен';
		case 404:
			return 'Не найдено';
		case 500:
			return 'Ошибка сервера';

		default:
			return 'Произошла непредвиденная ошибка';
	}
};
