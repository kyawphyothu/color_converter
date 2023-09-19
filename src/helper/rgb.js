// RGB to RGBA
function rgbToRgba(rgb, alpha) {
	const [r, g, b] = rgb;
	return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// RGB to HEX
function rgbToHex(rgb) {
	return "#" + rgb.map(c => c.toString(16).padStart(2, '0')).join('');
}

// RGB to HSL
function rgbToHsl(rgb) {
	const [r, g, b] = rgb.map(c => c / 255);

	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);

	let h, s, l = (max + min) / 2;

	if (max === min) {
		h = s = 0; // achromatic
	} else {
		const d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

		switch (max) {
		case r:
			h = (g - b) / d + (g < b ? 6 : 0);
			break;
		case g:
			h = (b - r) / d + 2;
			break;
		case b:
			h = (r - g) / d + 4;
			break;
		}

		h /= 6;
	}

	return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

// RGB to HSLA
function rgbToHsla(rgb, alpha) {
	const [r, g, b] = rgb.map(c => c / 255);

	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);

	let h, s, l = (max + min) / 2;

	if (max === min) {
		h = s = 0; // achromatic
	} else {
		const d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

		switch (max) {
		case r:
			h = (g - b) / d + (g < b ? 6 : 0);
			break;
		case g:
			h = (b - r) / d + 2;
			break;
		case b:
			h = (r - g) / d + 4;
			break;
		}

		h /= 6;
	}

	return `hsla(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%, ${alpha})`;
}

// RGB to HWB
function rgbToHwb(rgb) {
	const [r, g, b] = rgb.map(c => c / 255);
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	const w = 1 - max;
	const bValue = 1 - min;
	const h = rgbToHsl(rgb).split(",")[0].substring(4);

	return `hwb(${h}, ${Math.round(w * 100)}%, ${Math.round(bValue * 100)}%)`;
}

// RGB to HWBA
function rgbToHwba(rgb) {
	const [r, g, b] = rgb.map(c => c / 255);
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	const w = 1 - max;
	const bValue = 1 - min;
	const h = rgbToHsl(rgb).split(",")[0].substring(4);

	return `hwba(${h}, ${Math.round(w * 100)}%, ${Math.round(bValue * 100)}%, 1)`;
}

// RGB to CMYK
function rgbToCmyk(rgb) {
	const [r, g, b] = rgb.map(c => c / 255);
	const k = 1 - Math.max(r, g, b);
	if (k === 1) {
		return `cmyk(0%, 0%, 0%, 100%)`;
	}
	const c = (1 - r - k) / (1 - k);
	const m = (1 - g - k) / (1 - k);
	const y = (1 - b - k) / (1 - k);

	return `cmyk(${Math.round(c * 100)}%, ${Math.round(m * 100)}%, ${Math.round(y * 100)}%, ${Math.round(k * 100)}%)`;
}

// RGB string to RGB array
function rgbStringToRgbArray(rgbString) {
	// Extract the numbers using a regular expression
	const rgbValues = rgbString.match(/\d+/g);

	if (rgbValues && rgbValues.length === 3) {
	  // Parse the extracted values to integers
	  const r = parseInt(rgbValues[0], 10);
	  const g = parseInt(rgbValues[1], 10);
	  const b = parseInt(rgbValues[2], 10);

	  // Return the RGB values as an array
	  return [r, g, b];
	} else {
	  // Handle invalid input or return a default value
	  return null;
	}
}

// main function
export default function rgb (str) {
	const arr = rgbStringToRgbArray(str);

	const result = {};

	result.rgb = str;
	result.rgba = rgbToRgba(arr, 1);
	result.hex = rgbToHex(arr);
	result.hsl = rgbToHsl(arr);
	result.hsla = rgbToHsla(arr, 1);
	result.hwb = rgbToHwb(arr);
	result.hwba = rgbToHwba(arr);
	result.cmyk = rgbToCmyk(arr);

	return result;
}
