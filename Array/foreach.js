/**
 cma-262/7.0
 https://www.ecma-international.org/ecma-262/7.0/#sec-array.forEach
 */
'use strict';
if (!Array.prototype.forEach) {

	Array.prototype.forEach = function(callback, thisArg) {

		var T, k;

		if (this == null) {
			throw new TypeError(' this is null or not defined');
		}

		// Let O be ? ToObject(this value).
		var O = Object(this);

		// 2.Let len be ? ToLength(? Get(O, "length")).
		var len = O.length >>> 0;

		// 3. If IsCallable(callbackfn) is false, throw a TypeError exception.
		if (typeof callback !== "function") {
			throw new TypeError(callback + ' is not a function');
		}

		// 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
		if (arguments.length > 1) {
			T = thisArg;
		}

		// 5. Let k be 0
		k = 0;

		// 6. Repeat, while k < len
		while (k < len) {
			var kValue;

			//  Let Pk be ! ToString(k).
			//  Let kPresent be ? HasProperty(O, Pk).
			// 	If kPresent is true, then
			if (k in O) {

				// Let kValue be ? Get(O, Pk).
				kValue = O[k];

				// Perform ? Call(callbackfn, T, « kValue, k, O »).
				callback.call(T, kValue, k, O);
			}
			// Increase k by 1.
			k++;
		}
		// 7 Return undefined.
	};
}
