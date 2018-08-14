/**
 https://www.ecma-international.org/ecma-262/7.0/#sec-array.some
 */
'use strict';

if (!Array.prototype.some) {
	Array.prototype.some = function(callbackfn/*, thisArg*/) {
		if (this === null || typeof this === 'undefined') {
			throw new TypeError('Array.prototype.some called on null or undefined');
		}
		// Let O be ? ToObject(this value).
		var O = Object(this);
		// Let len be ? ToLength(? Get(O, "length")).
		var len = O.length >>> 0;
		// If IsCallable(callbackfn) is false, throw a TypeError exception.
		if (typeof callbackfn !== 'function') {
			throw new TypeError();
		}
		// If thisArg was supplied, let T be thisArg; else let T be undefined.
		var T = arguments.length >= 2 ? arguments[1] : void 0;
		// Let k be 0.
		var k = 0;

		// Repeat, while k < len
		while (k < len){
			// Let Pk be ! ToString(k).
			// 	Let kPresent be ? HasProperty(O, Pk).
			// 	If kPresent is true, then
			if (k in O){
			// Let kValue be ? Get(O, Pk).
			// 	Let testResult be ToBoolean(? Call(callbackfn, T, « kValue, k, O »)).
				var testResult = callbackfn.call(T,O[k],k,O);
			// If testResult is true, return true.
				if (testResult){
					return true
				}
			}
			// 	Increase k by 1.
			k += 1;
		}
		return false;
	};
}
