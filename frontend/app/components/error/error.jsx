import { H2 } from '../h2/h2';
import styled from 'styled-components';

const Div = styled.div`
	text-align: center;
	padding: 24px;
	margin: 20px auto;
	background: #fff5f5;
	border: 1px solid #fc8181;
	border-top: 8px solid #fc8181;
	border-radius: 12px;
	color: #c53030;
	box-shadow: 0 2px 8px rgba(197, 48, 48, 0.1);
	max-width: 400px;
	position: relative;
`;

const ErrorIcon = styled.div`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	background: #feb2b2;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0 auto 16px;
	font-weight: bold;
	font-size: 20px;

	&::before {
		content: '!';
	}
`;

export const Error = ({ error }) => {
	if (!error) {
		return null;
	}

	return (
		<Div>
			<ErrorIcon />
			<H2 style={{ color: '#c53030', margin: '0 0 8px 0' }}>Ошибка</H2>
			<div>{error}</div>
		</Div>
	);
};
