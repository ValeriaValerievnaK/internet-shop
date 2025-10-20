import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useServerRequest } from '../../../src/hooks';
import { loadProductAsync } from '../../../src/actions';
import { selectProduct } from '../../../src/selectore';
import { ProductContent, Comments } from './conponents';
import styles from './products.module.css';

export const Products = () => {
	const dispatch = useDispatch();
	const param = useParams();
	const requestServer = useServerRequest();
	const product = useSelector(selectProduct);

	useEffect(() => {
		dispatch(loadProductAsync(requestServer, param.productId));
	}, [dispatch, requestServer, param.productId]);

	return (
		<div className={styles.container}>
			<ProductContent product={product} />
			<Comments comments={product.comments} productId={product.id} />
		</div>
	);
};
