import styled from 'styled-components';

const IconContainer = ({ className, id, ...props }) => (
	<div className={className} {...props}>
		<i className={`fa ${id}`} aria-hidden="true"></i>
	</div>
);

export const Icon = styled(IconContainer)`
	font-size: ${({ size = '24px' }) => size};
	margin: ${({ margin = '0' }) => margin};
	color: ${({ disabled }) => (disabled ? '#836953ff' : '#5c3b1fff')};
	transition: transform 3s ease;

	&:hover {
		cursor: pointer;
		transform: rotate(360deg);
	}
`;
