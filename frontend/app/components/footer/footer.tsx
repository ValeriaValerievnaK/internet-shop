import { useEffect, useState } from 'react';
import styles from './footer.module.css';

export const Footer = () => {
	const [city, setCity] = useState('');
	const [temperature, setTemperature] = useState(0);
	const [weather, setWeather] = useState('');

	useEffect(() => {
		fetch(
			'https://api.openweathermap.org/data/2.5/weather?lat=51.661535&lon=39.200287&lang=ru&units=metric&appid=321d71b35f34a7714ff230a884fd5aea',
		)
			.then((response) => response.json())
			.then(({ name, main, weather }) => {
				setCity(name);
				setTemperature(Math.round(main.temp));
				setWeather(weather[0].description);
			});
	}, []);

	const currentDate = new Date().toLocaleString('ru', {
		day: 'numeric',
		month: 'long',
	});

	return (
		<div className={styles.footer}>
			<div className={styles.contacts}>
				<div>Связаться с разработчиком</div>

				<a href="mailto:valeriakartaseva39@gmail.com?subject=Вопрос об интеренет-магазине&body=Здравствуйте! У мення есть вопрос...">
					Valeriakartaseva39@gmail.com
				</a>
			</div>

			<div className={styles.weather}>
				<div>
					В городе {city}, {currentDate}
				</div>

				<div>
					Погода за окном {temperature} °C, {weather}
				</div>
			</div>
		</div>
	);
};
