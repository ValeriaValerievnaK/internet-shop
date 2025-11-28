import type { FC, HTMLAttributes } from 'react';
import styled from 'styled-components';

interface IProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  id?: string;
  inactive?: boolean;
  size?: string;
  margin?: string;
  disabled?: boolean;
}

const IconContainer: FC<IProps> = ({ className, id, inactive, ...props }) => (
	<div className={className} {...props}>
		<i className={`fa ${id}`} aria-hidden="true"></i>
	</div>
);

export const Icon = styled(IconContainer)`
	font-size: ${({ size = '24px' }) => size};
	margin: ${({ margin = '0' }) => margin};
	color: ${({ disabled }) => (disabled ? '#836953ff' : '#57361aff')};

	&:hover {
		cursor: ${({ inactive }) => (inactive ? 'default' : 'pointer')};
	}
`;
