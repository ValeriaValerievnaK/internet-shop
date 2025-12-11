import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ProductContent, Comments } from './components';
import { Loader } from '../../components';
import { useAppDispatch } from '../../../src/hooks';
import {
	loadProductAsync,
	selectProduct,
	selectProductIsLoading,
} from '../../../src/modules/product';
import { updateIsLoadingStart } from '../../../src/modules/app';
import styles from './products.module.css';

export const Products = () => {
	const dispatch = useAppDispatch();

	const product = useSelector(selectProduct);
	const isLoading = useSelector(selectProductIsLoading);

	const param = useParams();

	useEffect(() => {
		dispatch(updateIsLoadingStart());

		dispatch(loadProductAsync(param.productId));
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

			<Comments comments={product.comments || []} productId={product.id || ''} />
		</div>
	);
};
