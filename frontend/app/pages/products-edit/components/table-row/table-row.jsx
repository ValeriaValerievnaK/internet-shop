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
	min-height: 60px;

	& > div {
		padding: 0 10px;
		display: flex;
		align-items: center;
	}

	& input,
	& select {
		height: 40px;
		margin: 0;
		box-sizing: border-box;
	}

	& .title-column {
		padding: 10px;
		flex: 2 1 200px;
		width: 200px;
		font-weight: 500;
	}

	& .category-column {
		flex: 1 1 150px;
		width: 150px;
	}

	& .price-column {
		flex: 1 1 120px;
		width: 120px;
		font-weight: 500;
		color: #248124ff;
	}

	& .count-column {
		flex: 1 1 100px;
		width: 100px;
	}

	& .imageUrl-column {
		flex: 1 1 120px;
		width: 120px;
		text-align: center;
	}
`;
