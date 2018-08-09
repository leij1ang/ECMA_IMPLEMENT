/**
 cma-262/7.0
 https://www.ecma-international.org/ecma-262/7.0/#sec-array.lastIndexOf
 */
'use strict'
if (!Array.prototype.lastIndexOf) {
	Array.prototype.lastIndexOf = function (searchElement /*, fromIndex*/) {
		'use strict';

		if (this === void 0 || this === null) {
			throw new TypeError();
		}

		// Let O be ? ToObject(this value).
		var O = Object(this);
		// Let len be ? ToLength(? Get(O, "length")).
		var len = O.length >>> 0;
		// If len is 0, return -1.
		if (len === 0) {
			return -1;
		}
		// If argument fromIndex was passed, let n be ? ToInteger(fromIndex); else let n be len-1.
		var n = arguments.length > 1 ? arguments[1] >> 0 : len - 1;
		//  If n ≥ 0, then
		//      If n is -0, let k be +0; else let k be min(n, len - 1).
		// 	Else n < 0,
		// 	    Let k be len + n.
		var k = n >= 0 ? Math.min(n, len - 1) : len + n;
		// Repeat, while k ≥ 0
		while (k >= 0) {
			//   Let kPresent be ? HasProperty(O, ! ToString(k)).
			// 	 If kPresent is true, then
			if (k in O) {
				//      Let elementK be ? Get(O, ! ToString(k)).
				var elementK = O[k];
				//  	Let same be the result of performing Strict Equality Comparison searchElement === elementK.
				if (searchElement === elementK) {
					// 	    If same is true, return k.
					return k
				}

			}
			k -= 1;
		}

		return -1;
	};
}
