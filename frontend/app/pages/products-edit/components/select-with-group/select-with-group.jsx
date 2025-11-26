import styles from './select-with-group.module.css';

export const SelectWithGroup = ({ allCategories, ...props }) => (
	<select className={styles.container} {...props}>
		<option value="" disabled hidden>
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
