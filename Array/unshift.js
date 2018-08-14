/**
 https://www.ecma-international.org/ecma-262/7.0/#sec-array.unshift
 */
'use strict';
if (!Array.prototype.unshift) {
	Array.prototype.unshift = function () {
		if (this === null || typeof this === 'undefined') {
			throw new TypeError('Array.prototype.unshift called on null or undefined');
		}
		// Let O be ? ToObject(this value).
		var O = Object(this)
		// Let len be ? ToLength(? Get(O, "length")).
		var len = O.length >> 0;
		// 	Let argCount be the number of actual arguments.
		var argCount = arguments.length;
		// 	If argCount > 0, then
		if (argCount > 0) {
			// If len+argCount > 253-1, throw a TypeError exception.
			if (len + argCount > Math.pow(2, 53) - 1) {
				throw new TypeError();
			}
			// 	Let k be len.
			var k = len;
			// 	Repeat, while k > 0,
			while (k > 0) {
				// 	    Let from be ! ToString(k-1).
				var from = k - 1;
				// 	    Let to be ! ToString(k+argCount-1).
				var to = k + argCount - 1;
				// 	    Let fromPresent be ? HasProperty(O, from).
				if (from in O) {
					// 	    If fromPresent is true, then
					//          Let fromValue be ? Get(O, from).
					// 	        Perform ? Set(O, to, fromValue, true).
					O[to] = O[from];
				} else {
					// 	    Else fromPresent is false,
					// 	        Perform ? DeletePropertyOrThrow(O, to).
					delete O[to];
				}
				// 		Decrease k by 1.
				k -= 1;
			}
			// Let j be 0.
			var j = 0;
			// Let items be a List whose elements are, in left to right order, the arguments that were passed to this function invocation.
			var items = Array.prototype.slice.call(arguments)
			// Repeat, while items is not empty
			while (items.length !== 0) {
				//      Remove the first element from items and let E be the value of that element.
				// 	    Perform ? Set(O, ! ToString(j), E, true).
				O[j] = items.shift();
				//      Increase j by 1.
				j += 1;
			}
		}
		// Perform ? Set(O, "length", len+argCount, true).
		O.length = len + argCount;
		// 	Return len+argCount.
		return O.length;
	}
}
