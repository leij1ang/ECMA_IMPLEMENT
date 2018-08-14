/**
 Auth: Lei.j1ang
 Created: 2018/8/14-14:26
 */
'use strict';
if (!Array.prototype.toLocaleString) {
	Array.prototype.toLocaleString = function (reserved1, reserved2) {
		if (this === null || typeof this === 'undefined') {
			throw new TypeError('Array.prototype.toLocaleString called on null or undefined');
		}
// Let array be ? ToObject(this value).
		var array = Object(this);
// Let len be ? ToLength(? Get(array, "length")).
		var len = array.length >>> 0;
// 	Let separator be the String value for the list-separator String appropriate for the host environment's current locale (this is derived in an implementation-defined way).
		var separator = ',';
// If len is zero, return the empty String.
		if (len === 0) {
			return '';
		}
// 	Let firstElement be ? Get(array, "0").
		var firstElement = array[0];
// 	If firstElement is undefined or null, then
		var R;
		if (firstElement === null || typeof firstElement === 'undefined') {
// Let R be the empty String.
			R = '';
		} else {
// 	Else,
// 	Let R be ? ToString(? Invoke(firstElement, "toLocaleString")).
			R = firstElement.toLocaleString(reserved1, reserved2);
		}
// 	Let k be 1.
		var k = 1;
// Repeat, while k < len
		while (k < len) {
// 	Let S be a String value produced by concatenating R and separator.
			var S = R + separator;
// 	Let nextElement be ? Get(array, ! ToString(k)).
			var nextElement = array[k];
// 	If nextElement is undefined or null, then
			if (nextElement === null || typeof nextElement === 'undefined') {
// Let R be the empty String.
				R = '';
			} else {
// 	Else,
// 	Let R be ? ToString(? Invoke(nextElement, "toLocaleString")).
				R = nextElement.toLocaleString(reserved1, reserved2);
// 	Let R be a String value produced by concatenating S and R.
				R = S + R;
			}
// 	Increase k by 1.
			k += 1;
		}
// Return R.
		return R;
	}
}

