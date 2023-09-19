import rgba from "./rgba";

function hslaToRgba(hsla) {
	let [h, s, l, a] = hsla;
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

	return `rgba(${[Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]}, ${a})`;
}

function hslaStringToArray(hslaString) {
	// Regular expression to match HSL values in the string
	const regex = /hsla\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*,\s*([0-9.]+)\s*\)/;
	const match = hslaString.match(regex);

	if (match && match.length === 5) {
		// Extract hue, saturation, and lightness values
		const h = parseInt(match[1], 10);
		const s = parseInt(match[2], 10);
		const l = parseInt(match[3], 10);
		const a = parseFloat(match[4]);

		return [h, s, l, a];
	} else {
		// Handle invalid input
		throw new Error('Invalid HSL color string');
	}
}

export default function hsla (str) {
	console.log(str)
	const arr = hslaStringToArray(str);

	const rgbaString = hslaToRgba(arr);


	const result = rgba(rgbaString);
	return result;
}