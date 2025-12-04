import type { FC, HTMLAttributes } from 'react';
import type { ICategoriesData } from '../../../../../src/types';
import styles from './select-with-group.module.css';

interface IProps extends HTMLAttributes<HTMLSelectElement> {
	allCategories?: ICategoriesData[];
	error?: string;
}

export const SelectWithGroup: FC<IProps> = ({ allCategories, ...props }) => (
	<select className={styles.container} {...props}>
		<option value="" disabled hidden>
			Категория
		</option>

		{allCategories?.map(({ id, categoriesName, subCategories }) => (
			<optgroup label={categoriesName} key={id}>
				{subCategories.map(({ id, name }) => (
					<option key={id}>{name}</option>
				))}
			</optgroup>
		))}
	</select>
);
