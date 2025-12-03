import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
	loadProductAsync,
	updateIsLoadingEnd,
	updateIsLoadingStart,
} from '../../../src/actions';
import { selectIsLoading, selectProduct } from '../../../src/selectors';
import { ProductContent, Comments } from './components';
import { Loader } from '../../components';
import { useAppDispatch } from '../../../src/hooks';
import styles from './products.module.css';

export const Products = () => {
	const dispatch = useAppDispatch();

	const product = useSelector(selectProduct);
	const isLoading = useSelector(selectIsLoading);

	const param = useParams();

	useEffect(() => {
		dispatch(updateIsLoadingStart());

		dispatch(loadProductAsync(param.productId))
			.finally(() => {
				dispatch(updateIsLoadingEnd());
			});
	}, [dispatch, param.productId]);

	if (isLoading) {
		return <Loader />;
	}

	if (!product) {
		return null;
	}

	return (
		<div className={styles.container}>
			<ProductContent product={product} />

			<Comments comments={product.comments} productId={product.id} />
		</div>
	);
};
