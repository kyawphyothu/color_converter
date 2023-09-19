import rgb from "./rgb";
import rgba from "./rgba";

function hexToRGB(hex) {
	// Remove the hash if it's included
	hex = hex.replace(/^#/, '');

	// Parse the hex values to separate r, g, and b components
	const r = parseInt(hex.substring(0, 2), 16);
	const g = parseInt(hex.substring(2, 4), 16);
	const b = parseInt(hex.substring(4, 6), 16);

	return `rgb(${r}, ${g}, ${b})`;
}

function hexToRGBA(hex) {
	// Remove the hash if it's included
	hex = hex.replace(/^#/, '');

	// Parse the hex values to separate r, g, and b components
	const r = parseInt(hex.substring(0, 2), 16);
	const g = parseInt(hex.substring(2, 4), 16);
	const b = parseInt(hex.substring(4, 6), 16);
	const a = parseInt(hex.substring(6, 8), 16) / 255;

	return `rgba(${r}, ${g}, ${b}, ${a})`;
}


export function hex (str) {
	const rgbString = hexToRGB(str);

	const result = rgb(rgbString);
	return result;
}

export function hexA (str) {
	const rgbString = hexToRGBA(str);

	const result = rgba(rgbString);
	return result;
}
