import rgb from "./rgb";

function hwbToRgb(hwb) {
	// const hwbParts = hwb.match(/[\d.]+/g).map(Number);
	const [h, w, b] = hwb
	const w1 = 1 - w;
	const b1 = 1 - b;

	let r, g, bl;

	if (w1 + b1 <= 1) {
	  const i = Math.floor(h / 60);
	  const f = h / 60 - i;
	  const p = w1 * (1 - f);
	  const q = b1 * (1 - f);
	  const t = 1 - (p + q);

	  switch (i) {
		case 0:
		  r = 1;
		  g = t;
		  bl = 0;
		  break;
		case 1:
		  r = q;
		  g = 1;
		  bl = 0;
		  break;
		case 2:
		  r = 0;
		  g = 1;
		  bl = t;
		  break;
		case 3:
		  r = 0;
		  g = q;
		  bl = 1;
		  break;
		case 4:
		  r = t;
		  g = 0;
		  bl = 1;
		  break;
		case 5:
		  r = 1;
		  g = 0;
		  bl = p;
		  break;
		default:
		  r = 0;
		  g = 0;
		  bl = 0;
		  break;
	  }
	} else {
	  r = g = bl = 0;
	}

	return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(bl * 255)})`;
}

function hwbStringToHwbArray(hwbString) {
	// Remove "hwb(" and ")" from the input string
	const cleanedString = hwbString.replace(/hwb\(|\)/g, '');

	// Split the cleaned string into an array of values
	const values = cleanedString.split(',').map(value => parseFloat(value));

	// Ensure there are exactly three values (hue, whiteness, and blackness)
	if (values.length === 3 && !isNaN(values[0]) && !isNaN(values[1]) && !isNaN(values[2])) {
	  return values;
	} else {
	  throw new Error('Invalid HWB string format');
	}
}


export default function hwb (str) {
	const arr = hwbStringToHwbArray(str);
	console.log(arr)

	const rgbString = hwbToRgb(arr);

	const result = rgb(rgbString);
	return result;
}