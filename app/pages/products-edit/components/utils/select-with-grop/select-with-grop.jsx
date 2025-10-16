import styles from './select-with-grop.module.css';

export const SelectWithGrop = ({ allCategories, ...props }) => {
	return (
		<select className={styles.container} {...props}>
			<option value="" disabled selected hidden>
				Категория
			</option>
			{allCategories.map(({ id, categoriesName, subCategories }) => (
				<optgroup label={categoriesName} key={id}>
					{subCategories.map(({ id, name }) => (
						<option key={id}>{name}</option>
					))}
				</optgroup>
			))}
		</select>
	);
};

// в консоль приходит ошибка про value="", подумать что делать
