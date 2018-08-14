/**
 Auth: Lei.j1ang
 Created: 2018/8/13-10:28
 */
'use strict';

if (!Array.prototype.pop) {
	Array.prototype.pop = function () {
		// Let O be ? ToObject(this value).
		var O = Object(this);
// Let len be ? ToLength(? Get(O, "length")).
		var len = O.length >>> 0;
// 	If len is zero, then
		if (len === 0) {
// Perform ? Set(O, "length", 0, true).
// 	Return undefined.
			return undefined
		} else {
// 	Else len > 0,
// 	Let newLen be len-1.
			var newLen = len - 1;
// Let indx be ! ToString(newLen).
			var indx = newLen.toString()
// 	Let element be ? Get(O, indx).
			var element = O[newLen];
// 	Perform ? DeletePropertyOrThrow(O, indx).
			delete O[indx];
// 	Perform ? Set(O, "length", newLen, true).
			O.length = newLen;
// 	Return element.
			return element
		}

	}
}
