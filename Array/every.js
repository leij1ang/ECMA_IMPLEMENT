/**
 ecma-262/7.0
 https://www.ecma-international.org/ecma-262/7.0/#sec-array.every
 */
'use strict';
if (!Array.prototype.every) {
	Array.prototype.every = function (callbackfn /*, thisArg */) {
		if (this === void 0 || this === null) {
			throw new TypeError();
		}
		// Let O be ? ToObject(this value).
		var O = Object(this);
		// Let len be ? ToLength(? Get(O, "length")).
		var len = O.length >>> 0;
		// If IsCallable(callbackfn) is false, throw a TypeError exception.
		// 检查是否是回调函数
		if (typeof  callbackfn !== 'function') {
			throw new TypeError();
		}
		// If thisArg was supplied, let T be thisArg; else let T be undefined.
		var T = arguments.length >= 2 ? arguments[1] : void 0;
		// Let k be 0.
		var k = 0;
		//Repeat, while k < len
		while (k < len) {
			//  Let Pk be ! ToString(k).
			// 	Let kPresent be ? HasProperty(O, Pk).
			// 	If kPresent is true, then
			//      Let kValue be ? Get(O, Pk).
			// 	    Let testResult be ToBoolean(? Call(callbackfn, T, « kValue, k, O »)).
			//      If testResult is false, return false.
			if (k in O && !callbackfn.call(T, O[k], k, O)) {
				return false;
			}
			// Increase k by 1.
			k += 1
		}
		return true;
	};
}
