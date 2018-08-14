/**
 https://www.ecma-international.org/ecma-262/7.0/#sec-array.reduceRight
 */
'use strict';
if (!Array.prototype.reduceRight) {
	Array.prototype.reduceRight = function(callback /*, initialValue*/) {
		if (null === this || 'undefined' === typeof this) {
			throw new TypeError('Array.prototype.reduceRight called on null or undefined');
		}
		// Let O be ? ToObject(this value).
		var O = Object(this);
		// Let len be ? ToLength(? Get(O, "length")).
		var len = O.length >>> 0;
		// If IsCallable(callbackfn) is false, throw a TypeError exception.
		if ('function' !== typeof callback) {
			throw new TypeError(callback + ' is not a function');
		}
		if(arguments.length < 2 && len === 0){
			return new TypeError()
		}
		// Let k be len-1.
		var k = len -1;
		// If initialValue is present, then
		// Set accumulator to initialValue.
		var accumulator
		if (arguments.length > 1){
			accumulator = arguments[1];
		}else {
			// Let kPresent be false.
			var kPresent = false;
			// 	Repeat, while kPresent is false and k ≥ 0
			while (!kPresent && k >= 0) {
				// Let Pk be ! ToString(k).
				// 	Let kPresent be ? HasProperty(O, Pk).
				kPresent = (k in O);
				// 	If kPresent is true, then
				if(kPresent) {
					// Let accumulator be ? Get(O, Pk).
					accumulator = O[k];
				}
				// 	Decrease k by 1.
				k -=1;
			}

			// If kPresent is false, throw a TypeError exception.
			if (!kPresent){
				throw new TypeError()
			}
		}
		// Repeat, while k ≥ 0
		while (k >= 0) {
			// Let Pk be ! ToString(k).
			// 	Let kPresent be ? HasProperty(O, Pk).
			// 	If kPresent is true, then
			if (k in O) {
				// Let kValue be ? Get(O, Pk).
				var kValue = O[k];
				// 	Let accumulator be ? Call(callbackfn, undefined, « accumulator, kValue, k, O »).
				accumulator = callback.call(undefined, accumulator, kValue, k, O);
			}
			// Decrease k by 1.
			k -=1;
		}
		// Return accumulator.
		return accumulator
	};
}
