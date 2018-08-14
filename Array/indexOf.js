/**
 https://www.ecma-international.org/ecma-262/7.0/#sec-array.indexOf
 */
'use strict';
if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function(searchElement, fromIndex) {

		var k;
		if (this == null) {
			throw new TypeError('"this" is null or not defined');
		}

		// 1. Let O be the result of calling ToObject passing
		var O = Object(this);

		// 2. Let len be ? ToLength(? Get(O, "length")).
		var len = O.length >>> 0;

		// 3. If len is 0, return -1.
		if (len === 0) {
			return -1;
		}

		// 4. Let n be ? ToInteger(fromIndex). (If fromIndex is undefined, this step produces the value 0.)
		var n = fromIndex >> 0 || 0;

		if (Math.abs(n) === Infinity) {
			n = 0;
		}

		// 5. If n >= len, return -1.
		if (n >= len) {
			return -1;
		}

		// 6. If n ≥ 0, then
		//      If n is -0, let k be +0; else let k be n.
		// 7. Else n < 0,
		//      Let k be len + n.
		//      If k < 0, let k be 0.
		k = Math.max(n >= 0 ? n : len + n, 0);

		// 8. Repeat, while k < len
		while (k < len) {
			//  Let kPresent be ? HasProperty(O, ! ToString(k)).
			//  If kPresent is true, then
			//  Let elementK be ? Get(O, ! ToString(k)).
			// 	Let same be the result of performing Strict Equality Comparison searchElement === elementK.
			// 	If same is true, return k.
			if (k in O && O[k] === searchElement) {
				return k;
			}
			// 	Increase k by 1.
			k++;
		}
		// 9. Return -1
		return -1;
	};
}
