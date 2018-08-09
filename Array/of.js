/**
 ecma-262/7.0
 https://www.ecma-international.org/ecma-262/7.0/#sec-array.from
 */
'use strict';
if (!Array.of) {
	Array.of = function () {
		return Array.prototype.slice.call(arguments);
	};
}

if (!Array.of) {
	Array.of = function () {
		if (this == null) {
			throw new TypeError('"this" is null or not defined');
		}
		var isCallable = function (fn) {
			var toStr = Object.prototype.toString;
			return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
		};
		// Let len be the actual number of arguments passed to this function.
		var len = arguments.length;
		// Let items be the List of arguments passed to this function.
		var items = arguments;
		// Let C be the this value.
		var C = this;
		// 	If IsConstructor(C) is true, then
		// Let A be ? Construct(C, « len »).
		// Else,
		// 	Let A be ? ArrayCreate(len).
		var A = isCallable(C) ? Object(new C(len)) : new Array(len);
		// 	Let k be 0.
		var k = 0;
		// Repeat, while k < len
		while (k < len) {
			// 	Let kValue be items[k].
			var kValue = items[k]
			// 	Let Pk be ! ToString(k).
			// 	Perform ? CreateDataPropertyOrThrow(A, Pk, kValue).
			Object.defineProperty(A, k.toString(), {
				enumerable: true,
				configurable: true,
				writable: true,
				value: kValue
			});
			// 	Increase k by 1.
			k += 1;
		}
		// Perform ? Set(A, "length", len, true).
		A.length = len;
		// 	Return A.
		return A
	};
}



