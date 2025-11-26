import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
	loadProductAsync,
	updateIsLoadingEnd,
	updateIsLoadingStart,
} from '../../../src/actions';
import { selectIsLoading, selectProduct } from '../../../src/selectore';
import { ProductContent, Comments } from './components';
import { Error, Loader } from '../../components';
import styles from './products.module.css';

export const Products = () => {
	const [error, setError] = useState(false);

	const dispatch = useDispatch();

	const product = useSelector(selectProduct);
	const isLoading = useSelector(selectIsLoading);

	const param = useParams();

	useEffect(() => {
		dispatch(updateIsLoadingStart());

		dispatch(loadProductAsync(param.productId))
			.then((productData) => {
				if (productData?.error) {
					setError(productData.error);
				}
			})
			.finally(() => {
				dispatch(updateIsLoadingEnd());
			});
	}, [dispatch, param.productId]);

	if (isLoading) {
		return <Loader />;
	}

	if (error) {
		return <Error error={error} />;
	}

	return (
		<div className={styles.container}>
			<ProductContent product={product} />

			<Comments comments={product.comments} productId={product.id} />
		</div>
	);
};
