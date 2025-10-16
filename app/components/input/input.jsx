import { forwardRef } from 'react';
import styled from 'styled-components';

const InputContainer = forwardRef(({ className, ...props }, ref) => (
	<input className={className} {...props} ref={ref} />
));

export const Input = styled(InputContainer)`
	border: 1px solid #ddd;
	background: #f5eadd4b;
	height: 40px;
	margin: ${({ margin = '0 0 10px' }) => margin};
	padding: 10px;
	font-size: 18px;
	border-radius: 10px;
	width: ${({ width = '100%' }) => width};

	&:focus {
		outline: none;
		border-color: #aaa;
		box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
	}
`;
