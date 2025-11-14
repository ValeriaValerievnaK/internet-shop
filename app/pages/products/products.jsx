import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadProductAsync, updateIsLoading } from '../../../src/actions';
import { selectIsLoading, selectProduct } from '../../../src/selectore';
import { ProductContent, Comments } from './conponents';
import { Loader } from '../../components';
import { useServerRequest } from '../../../src/hooks';
import styles from './products.module.css';

export const Products = () => {
	const dispatch = useDispatch();
	const param = useParams();
	const requestServer = useServerRequest();
	const product = useSelector(selectProduct);
	const isLoading = useSelector(selectIsLoading);

	useEffect(() => {
		dispatch(updateIsLoading());
		dispatch(loadProductAsync(requestServer, param.productId)).finally(() => {
			dispatch(updateIsLoading());
		});
	}, [dispatch, requestServer, param.productId]);

	return (
		<div className={styles.container}>
			{isLoading && <Loader />}

			{!isLoading && (
				<>
					<ProductContent product={product} />
					<Comments comments={product.comments} productId={product.id} />
				</>
			)}
		</div>
	);
};
