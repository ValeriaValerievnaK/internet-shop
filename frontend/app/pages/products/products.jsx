import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadProductAsync, updateIsLoading } from '../../../src/actions';
import { selectIsLoading, selectProduct } from '../../../src/selectore';
import { ProductContent, Comments } from './conponents';
import { Error, Loader } from '../../components';
import styles from './products.module.css';

export const Products = () => {
	const [error, setError] = useState(true);
	const dispatch = useDispatch();
	const param = useParams();
	const product = useSelector(selectProduct);
	const isLoading = useSelector(selectIsLoading);

	useEffect(() => {
		dispatch(updateIsLoading());
		dispatch(loadProductAsync(param.productId))
			.then((productData) => {
				setError(productData.error);
			})
			.finally(() => {
				dispatch(updateIsLoading());
			});
	}, [dispatch, param.productId]);

	return (
		<div className={styles.container}>
			{isLoading && <Loader />}

			{!isLoading &&
				(error ? (
					<Error error={error} />
				) : (
					<>
						<ProductContent product={product} />
						<Comments comments={product.comments} productId={product.id} />
					</>
				))}
		</div>
	);
};
