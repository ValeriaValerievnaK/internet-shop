export const updateCountData = (price, count, action) => {
	let newCount;
	let newPrice;

	const singlePrice = Number(price) / Number(count);

	if (action === 'increase') {
		newCount = Number(count) + 1;
		newPrice = newCount * singlePrice;
	}

	if (action === 'decrease') {
		newCount = Number(count) - 1;
		newPrice = newCount * singlePrice;
	}

	return { newCount, newPrice };
};

export const updateCountDataInCart = (price, count, action) => {
	let newCount;
	let newPrice;

	if (action === 'increase') {
		newCount = Number(count) + 1;
		newPrice = newCount * price;
	}

	if (action === 'decrease') {
		newCount = Number(count) - 1;
		newPrice = newCount * price;
	}

	return { newCount, newPrice };
};
