/**
 Auth: Lei.j1ang
 Created: 2018/8/13-10:38
 */
'use strict';
if (!Array.prototype.pop) {
	Array.prototype.pop = function () {
// Let O be ? ToObject(this value).
		var O = Object(this);
// Let len be ? ToLength(? Get(O, "length")).
		var len = O.length;
// 	Let items be a List whose elements are, in left to right order, the arguments that were passed to this function invocation.
		var items = Array.prototype.slice.apply(arguments)
// Let argCount be the number of elements in items.
		var argCount = items.length;
// 	If len + argCount > 253-1, throw a TypeError exception.
		if (len + argCount > Math.pow(2, 53) - 1) {
			throw new TypeError()
		}
// 	Repeat, while items is not empty
		var k = 0;
		while (k < items.length) {
// Remove the first element from items and let E be the value of the element.
// 	Perform ? Set(O, ! ToString(len), E, true).
			O[len] = items[k];
// 	Let len be len+1.
			len += 1;
		}

// Perform ? Set(O, "length", len, true).
		O.length = len;
// 	Return len.
		return len;
	}
}
