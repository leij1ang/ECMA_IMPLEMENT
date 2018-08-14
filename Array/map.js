/**
 */
'use strict';
if (!Array.prototype.map) {
	Array.prototype.map = function (callback/*, thisArg*/) {

		var T, A, k;

		if (this == null) {
			throw new TypeError(" this is null or not defined");
		}

		// 1. Let O be ? ToObject(this value).
		var O = Object(this);

		// 2.Let len be ? ToLength(? Get(O, "length")).
		var len = O.length >>> 0;

		// 3.If IsCallable(callbackfn) is false, throw a TypeError exception.
		if (typeof callback !== 'function') {
			throw new TypeError(callback + " is not a function");
		}

		// 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
		if (arguments.length > 1) {
			T = arguments[1];
		}

		// 5. Let A be ? ArraySpeciesCreate(O, len).
		A = new Array(len);

		// 6. Let k be 0.
		k = 0;

		// 7. Repeat, while k < len
		while (k < len) {

			var kValue, mappedValue;

			//  Let Pk be ! ToString(k).
			//  Let kPresent be ? HasProperty(O, Pk).
			// 	If kPresent is true, then
			if (k in O) {

				// Let kValue be ? Get(O, Pk).
				kValue = O[k];

				// Let mappedValue be ? Call(callbackfn, T, « kValue, k, O »).
				mappedValue = callback.call(T, kValue, k, O);

				// Perform ? CreateDataPropertyOrThrow(A, Pk, mappedValue).
				A[k] = mappedValue;
			}
			// Increase k by 1.
			k++;
		}

		// 8. Return A.
		return A;
	};
}
