import rgb from "./rgb";

function hslToRgb(hsl) {
	let [h, s, l] = hsl;
	h /= 360;
	s /= 100;
	l /= 100;

	let r, g, b;

	if (s === 0) {
	  r = g = b = l;
	} else {
	  const hue2rgb = (p, q, t) => {
		if (t < 0) t += 1;
		if (t > 1) t -= 1;
		if (t < 1 / 6) return p + (q - p) * 6 * t;
		if (t < 1 / 2) return q;
		if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
		return p;
	  };

	  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
	  const p = 2 * l - q;

	  r = hue2rgb(p, q, h + 1 / 3);
	  g = hue2rgb(p, q, h);
	  b = hue2rgb(p, q, h - 1 / 3);
	}

	return `rgb(${[Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]})`;
}

function hslStringToArray(hslString) {
	// Regular expression to match HSL values in the string
	const regex = /hsl\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)/;
	const match = hslString.match(regex);

	if (match && match.length === 4) {
		// Extract hue, saturation, and lightness values
		const h = parseInt(match[1], 10);
		const s = parseInt(match[2], 10);
		const l = parseInt(match[3], 10);

		return [h, s, l];
	} else {
		// Handle invalid input
		throw new Error('Invalid HSL color string');
	}
}


export default function hsl (str) {
	const arr = hslStringToArray(str);

	const rgbString = hslToRgb(arr);

	const result = rgb(rgbString);
	return result;
}