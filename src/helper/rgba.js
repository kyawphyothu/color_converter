// Function to convert RGBA to HEX
function rgbaToHex(rgba) {
	const [r, g, b, a] = rgba;
	const alphaHex = Math.round(a * 255).toString(16).padStart(2, '0');
	return `#${Math.round(r).toString(16).padStart(2, '0')}${Math.round(g).toString(16).padStart(2, '0')}${Math.round(b).toString(16).padStart(2, '0')}${alphaHex}`;
}

// Function to convert RGBA to HSLA
function rgbaToHsla(rgba) {
	const [r, g, b, a] = rgba;
	const rNormalized = r / 255;
	const gNormalized = g / 255;
	const bNormalized = b / 255;

	const max = Math.max(rNormalized, gNormalized, bNormalized);
	const min = Math.min(rNormalized, gNormalized, bNormalized);

	const l = (max + min) / 2;

	let h, s;

	if (max === min) {
	  h = s = 0; // achromatic
	} else {
	  const d = max - min;
	  s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
	  switch (max) {
		case rNormalized:
		  h = (gNormalized - bNormalized) / d + (gNormalized < bNormalized ? 6 : 0);
		  break;
		case gNormalized:
		  h = (bNormalized - rNormalized) / d + 2;
		  break;
		case bNormalized:
		  h = (rNormalized - gNormalized) / d + 4;
		  break;
	  }
	  h /= 6;
	}

	return `hsla(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%, ${a})`;
}

// Function to convert RGBA to HWBA
function rgbaToHwba(rgba) {
	const [r, g, b, a] = rgba;
	const rNormalized = r / 255;
	const gNormalized = g / 255;
	const bNormalized = b / 255;

	const max = Math.max(rNormalized, gNormalized, bNormalized);

	const w = (1 - max) * 100;

	const bValue = (1 - rNormalized - w / 100) / (1 - w / 100);
	const hValue = (1 - gNormalized - w / 100) / (1 - w / 100);

	return `hwba(${Math.round(hValue * 360)}, ${Math.round(w)}%, ${Math.round(bValue * 100)}%, ${a})`;
}

// Function to convert RGBA to CMYK
// function rgbaToCmyk(rgba) {
// 	const [r, g, b] = rgba;
// 	const rNormalized = r / 255;
// 	const gNormalized = g / 255;
// 	const bNormalized = b / 255;

// 	const k = Math.min(1 - rNormalized, 1 - gNormalized, 1 - bNormalized);
// 	const c = (1 - rNormalized - k) / (1 - k);
// 	const m = (1 - gNormalized - k) / (1 - k);
// 	const y = (1 - bNormalized - k) / (1 - k);

// 	return `cmyk(${Math.round(c * 100)}%, ${Math.round(m * 100)}%, ${Math.round(y * 100)}%, ${Math.round(k * 100)}%)`;
// }
function rgbaToCmyk(rgba) {
	const [r, g, b, a] = rgba;
	const rNormalized = r / 255;
	const gNormalized = g / 255;
	const bNormalized = b / 255;
	const aNormalized = a;

	const k = 1 - Math.max(rNormalized, gNormalized, bNormalized);
	const c = (1 - rNormalized - k) / (1 - k);
	const m = (1 - gNormalized - k) / (1 - k);
	const y = (1 - bNormalized - k) / (1 - k);

	return `cmyk(${Math.round(c * 100)}%, ${Math.round(m * 100)}%, ${Math.round(y * 100)}%, ${Math.round(k * 100)}%, ${aNormalized})`;
}

function rgbaStringToArray(rgbaString) {
	// Define a regular expression pattern to match RGBA format
	const rgbaRegex = /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)$/;

	// Use the regular expression to extract the components
	const match = rgbaString.match(rgbaRegex);

	if (match) {
	  // Extracted components will be in match array
	  const [, red, green, blue, alpha] = match;

	  // Convert the components to integers or floats and store in an array
	  const rgbaArray = [
		parseInt(red, 10),
		parseInt(green, 10),
		parseInt(blue, 10),
		parseFloat(alpha)
	  ];

	  return rgbaArray;
	} else {
	  // If the input string doesn't match the expected format, return null or handle the error accordingly
	  return null;
	}
}

export default function rgba (str) {
	const arr = rgbaStringToArray(str);

	const result = {};

	result.rgba = str;
	result.hex = rgbaToHex(arr);
	result.hsla = rgbaToHsla(arr);
	result.hwba = rgbaToHwba(arr);
	result.cmyk = rgbaToCmyk(arr);

	return result;
}