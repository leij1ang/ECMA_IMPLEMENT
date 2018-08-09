/**
 ecma-262/7.0/
 https://www.ecma-international.org/ecma-262/7.0/#sec-array.fill
 */
'use strict';
if (!Array.prototype.fill) {
	Array.prototype.fill = function (value) {
		// Steps 1-2.
		if (this == null) {
			throw new TypeError('this is null or not defined');
		}
		// Let O be ? ToObject(this value).
		var O = Object(this);

		// Let len be ? ToLength(? Get(O, "length")).
		var len = O.length >>> 0;

		var start = arguments[1];
		var end = arguments[2];
		// Let relativeStart be ? ToInteger(start).
		var relativeStart = start >> 0;

		// If relativeStart < 0, let k be max((len + relativeStart), 0); else let k be min(relativeStart, len).
		var k = relativeStart < 0 ?
			Math.max(len + relativeStart, 0) :
			Math.min(relativeStart, len);

		// If end is undefined, let relativeEnd be len; else let relativeEnd be ? ToInteger(end).
		var relativeEnd = end === undefined ?
			len : end >> 0;

		// If relativeEnd < 0, let final be max((len + relativeEnd), 0); else let final be min(relativeEnd, len).
		var final = relativeEnd < 0 ?
			Math.max(len + relativeEnd, 0) :
			Math.min(relativeEnd, len);

		// Repeat, while k < final
		while (k < final) {
			//Let Pk be ! ToString(k).
			// Perform ? Set(O, Pk, value, true).
			O[k] = value;
			//Increase k by 1.
			k += 1;
		}

		// Return O.
		return O;
	};
}
