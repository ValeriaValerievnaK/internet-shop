export const updateCountData = (
	price: number,
	count: number,
	action: 'increase' | 'decrease',
) => {
	let newCount: number;
	let newPrice: number;

	const singlePrice = Number(price) / Number(count);

	if (action === 'increase') {
		newCount = Number(count) + 1;
		newPrice = newCount * singlePrice;
	} else {
		newCount = Number(count) - 1;
		newPrice = newCount * singlePrice;
	}

	return { newCount, newPrice };
};
