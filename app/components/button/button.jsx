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
	font-size: 18px;
	height: 32px;
	width: ${({ width = '100%' }) => width};
	border: 1px solid #11212eff;
	border-radius: 10px;
	background-color: #d2e3f3ff;

	&:hover {
		cursor: pointer;
	}
`;
