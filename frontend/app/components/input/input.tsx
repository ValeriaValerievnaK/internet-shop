import { forwardRef, type InputHTMLAttributes } from 'react';
import styled from 'styled-components';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  width?: string;
  margin?: string;
  error?: boolean;
}

const InputContainer = forwardRef<HTMLInputElement, IProps>(({ className, ...props }, ref) => (
	<input className={className} {...props} ref={ref} />
));

export const Input = styled(InputContainer)`
	border: 1px solid ${({ error }) => (error ? '#f19c9cff' : '#ddd')};
	background: ${({ error }) => (error ? '#ff444415' : '#f5eadd4b')};
	height: 40px;
	margin: ${({ margin = '0 0 10px' }) => margin};
	padding: 10px;
	font-size: 18px;
	border-radius: 10px;
	width: ${({ width = '100%' }) => width};

	&:focus {
		outline: none;
		border-color: ${({ error }) => (error ? '#f19c9cff' : '#aaa')};
		box-shadow: 0 0 0 2px
			${({ error }) => (error ? '#f7b8b862' : 'rgba(0, 0, 0, 0.1)')};
	}
`;
