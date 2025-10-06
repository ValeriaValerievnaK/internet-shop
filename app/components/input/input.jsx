import { forwardRef } from 'react';
import styled from 'styled-components';

const InputContainer = forwardRef(({ className, ...props }, ref) => (
	<input className={className} {...props} ref={ref} />
));

export const Input = styled(InputContainer)`
	height: 40px;
	border: 1px solid #000;
	margin: 0 0 10px;
	padding: 10px;
	font-size: 18px;
	border-radius: 10px;
	width: ${({ width = '100%' }) => width};
`;
