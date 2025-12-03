import type { SetStateAction, Dispatch } from "react";

export const debounce = (fn:Dispatch<SetStateAction<boolean>>, delay: number) => {
	let timeoutId: number;

	return (...args) => {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(fn, delay, ...args);
	};
};
