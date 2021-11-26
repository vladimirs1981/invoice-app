import { monthsArray } from './Array/Months';

export const dateFormat = (input) => {
	const day = input.slice(8, 10);
	let month = monthsArray[Number(input.slice(5, 7)) - 1];
	const year = input.slice(0, 4);
	const formatted = `${day} ${month} ${year}`;
	return formatted;
};

export const currencyFormat = (amount) => {
	const output = `£ ${new Intl.NumberFormat('en-UK', {
		style: 'currency',
		currency: 'GBP',
	})
		.format(amount)
		.toString()
		.slice(1)}`;
	return output;
};
