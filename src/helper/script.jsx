import { hex, hexA } from "./hex";
import hsl from "./hsl";
import hsla from "./hsla";
import hwb from "./hwb";
import rgb from "./rgb";
import rgba from "./rgba";

export default function calculate(input) {
	// Regular expressions for each color format
	const rgbRegex = /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/i;
	const rgbaRegex = /^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*(?:0(\.\d+)?|1(\.0+)?)\s*\)$/i;
	const hexRegex = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
	const hexARegex = /^#([0-9a-fA-F]{8})$/;
	const hslRegex = /^hsl\(\s*\d+\s*,\s*\d+%?\s*,\s*\d+%?\s*\)$/i;
	const hslaRegex = /^hsla\(\s*\d+\s*,\s*\d+%?\s*,\s*\d+%?\s*,\s*(?:0(\.\d+)?|1(\.0+)?)\s*\)$/i;
	const hwbRegex = /^hwb\(\s*\d+\s*,\s*\d+%?\s*,\s*\d+%?\s*\)$/i;
	const hwbaRegex = /^hwba\(\s*(\d+(\.\d+)?|360)\s*,\s*(\d+(\.\d+)?)%\s*,\s*(\d+(\.\d+)?)%\s*,\s*(\d+(\.\d+)?)\s*\)$/i;
	const cmykRegex = /^cmyk\(\s*(?:100|\d{1,2}(?:\.\d+)?)%\s*,\s*(?:100|\d{1,2}(?:\.\d+)?)%\s*,\s*(?:100|\d{1,2}(?:\.\d+)?)%\s*,\s*(?:100|\d{1,2}(?:\.\d+)?)%\s*\)$/i;

	// Check the input against each regex pattern
	if (rgbRegex.test(input)) {
		return rgb(input);
	} else if (rgbaRegex.test(input)) {
		return rgba(input)
	} else if (hexRegex.test(input)) {
		return hex(input);
	} else if (hexARegex.test(input)) {
		return hexA(input)
	} else if (hslRegex.test(input)) {
		return hsl(input);
	} else if (hslaRegex.test(input)) {
		return hsla(input);
	} else if (hwbRegex.test(input)) {
		// return hwb(input)
	} else if (hwbaRegex.test(input)) {
	  return 'HWBA';
	} else if (cmykRegex.test(input)) {
	  return 'CMYK';
	} else {
	  return 'Unknown';
	}
}