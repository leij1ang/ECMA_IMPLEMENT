/**
 cma-262/7.0
 https://www.ecma-international.org/ecma-262/7.0/#sec-array.join
 */
'use strict';
if (!Array.prototype.join) {
	Array.prototype.join = function (separator) {
		if (this === void 0 || this === null) {
			throw new TypeError();
		}
		// Let O be ? ToObject(this value).
		var O = Object(this);
		// Let len be ? ToLength(? Get(O, "length")).
		var len = O.length >>> 0;
		// 	If separator is undefined, let separator be the single-element String ",".
		// 	Let sep be ? ToString(separator).
		var sep = separator === undefined ? ',' : separator;
		// 	If len is zero, return the empty String.
		if (len === 0) {
			return ''
		}
		// 	Let element0 be Get(O, "0").
		var element0 = O[0]
		// 	If element0 is undefined or null, let R be the empty String; otherwise, let R be ? ToString(element0).
		var R = element0 === undefined || element0 === null ? '' : element0.toString();
		// 	Let k be 1.
		var k = 1;
		// Repeat, while k < len
		while (k < len) {
			// 	Let S be the String value produced by concatenating R and sep.
			var S = R + sep;
			// 	Let element be ? Get(O, ! ToString(k)).
			var element = O[k];
			// 	If element is undefined or null, let next be the empty String; otherwise, let next be ? ToString(element).
			var next = (element === undefined || element === null) ? '' : element
			// 	Let R be a String value produced by concatenating S and next.
			R = S + next;
			// 	Increase k by 1.
			k += 1;
		}

		// Return R.
		return R
	}
}
