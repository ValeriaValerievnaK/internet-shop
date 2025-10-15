import styled from 'styled-components';

const TableRowContainer = ({ children, className }) => {
	return <div className={className}>{children}</div>;
};

export const TableRow = styled(TableRowContainer)`
	display: flex;
	align-items: center;
	border: ${({ border }) => (border ? '1px solid #e0e0e0' : 'none')};
	padding: 12px 0;
	margin-bottom: 8px;
	border-radius: 4px;
	background: ${({ border }) => (border ? '#f9f9f9' : 'transparent')};

	& > div {
		padding: 0 10px;
		display: flex;
		align-items: center;
	}

	& .title-column {
		width: 200px;
		flex-shrink: 0;
		font-weight: 500;
	}

	& .category-column {
		width: 150px;
		flex-shrink: 0;
	}

	& .price-column {
		width: 120px;
		flex-shrink: 0;
		font-weight: 500;
		color: #248124ff;
	}

	& .count-column {
		width: 100px;
		flex-shrink: 0;
	}

	& .imageUrl-column {
		width: 120px;
		flex-shrink: 0;
		justify-content: center;
	}

	& .actions-column {
		width: 100px;
		flex-shrink: 0;
	}
`;
