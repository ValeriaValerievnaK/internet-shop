import styled from 'styled-components';

const ButtonContainer = ({ children, className, ...props }) => {
	return (
		<button className={className} {...props}>
			{children}
		</button>
	);
};

export const Button = styled(ButtonContainer)`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 17px;
	height: 35px;
	width: ${({ width = '100%' }) => width};
	border: 1px solid #d4a574;
	border-radius: 10px;
	background-color: #f5e6d3ff;
	color: #8b4716ff;

	&:hover {
		cursor: pointer;
		background-color: #ede0d1;
	}

	&:disabled {
		background-color: #f0e9e2ff;
		color: #b0b0b0;
		border-color: #e0e0e0;
		cursor: not-allowed;

		&:hover {
			background-color: #f9f9f9;
		}
	}
`;
