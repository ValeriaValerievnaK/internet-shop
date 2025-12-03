import type { ChangeEvent, FC } from 'react';
import type { ICategoriesData } from '../../../../../src/types';
import styles from './category-menu.module.css';

interface IParam {
	searchPhrase?: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	onClear: () => void;
	categorys: ICategoriesData[]
}

export const CategoryMenu: FC<IParam> = ({ searchPhrase, onChange, onClear, categorys }) => (
	<div className={styles.container}>
		{categorys.map((mainCategory) => (
			<div key={mainCategory.id} className={styles.mainCategory}>
				<div className={styles.mainCategoryName}>
					{mainCategory.categoriesName}
				</div>

				<div className={styles.subCategories}>
					{mainCategory.subCategories.map((subCategory) => (
						<label key={subCategory.id} className={styles.subCategoryItem}>
							<input
								type="radio"
								name="category"
								value={subCategory.name}
								checked={searchPhrase === subCategory.name}
								onChange={onChange}
								className={styles.radioInput}
							/>

							<div className={styles.subCategoryName}>
								{subCategory.name}
							</div>
						</label>
					))}
				</div>
			</div>
		))}

		{searchPhrase && (
			<button
				className={styles.clearButton}
				onClick={onClear}
			>
				Сбросить
			</button>
		)}
	</div>
);
