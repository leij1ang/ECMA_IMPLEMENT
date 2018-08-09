/**
 cma-262/7.0
 https://www.ecma-international.org/ecma-262/7.0/#sec-array.includes
 */
'use strict';

if (!Array.prototype.includes) {
	Array.prototype.includes = function (searchElement, fromIndex) {

		if (this == null) {
			throw new TypeError('"this" is null or not defined');
		}

		// 1. Let O be ? ToObject(this value).
		var O = Object(this);

		// 2. Let len be ? ToLength(? Get(O, "length")).
		var len = O.length >>> 0;

		// 3. If len is 0, return false.
		if (len === 0) {
			return false;
		}

		// 4. Let n be ? ToInteger(fromIndex).
		var n = fromIndex || 0;

		// 5. If n ≥ 0, then
		//  a. Let k be n.
		// 6. Else n < 0,
		//  a. Let k be len + n.
		//  b. If k < 0, let k be 0.
		var k = Math.max(n >= 0 ? n : len + n, 0);

		// 7. Repeat, while k < len
		while (k < len) {
			// a. Let elementK be the result of ? Get(O, ! ToString(k)).
			// b. If SameValueZero(searchElement, elementK) is true, return true.
			// c. Increase k by 1.
			// NOTE: === provides the correct "SameValueZero" comparison needed here.
			if (O[k] === searchElement) {
				return true;
			}
			k++;
		}

		// 8. Return false
		return false;
	}
}

