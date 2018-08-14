/**
 Auth: Lei.j1ang
 Created: 2018/8/13-15:07
 */
'use strict';
if(!Array.prototype.slice){
	Array.prototype.slice = function(start, end) {
		if (null === this || 'undefined' === typeof this) {
			throw new TypeError('Array.prototype.slice called on null or undefined');
		}
		// Let O be ? ToObject(this value).
		var O = Object(this);
		// Let len be ? ToLength(? Get(O, "length")).
		var len = O.length >>> 0;
		// 	Let relativeStart be ? ToInteger(start).
		var relativeStart = start >> 0;
		// 	If relativeStart < 0, let k be max((len + relativeStart), 0); else let k be min(relativeStart, len).
		var k = relativeStart < 0 ? Math.max((len + relativeStart), 0) : Math.min(relativeStart, len);
		// 	If end is undefined, let relativeEnd be len; else let relativeEnd be ? ToInteger(end).
		var relativeEnd = (arguments.length > 1  && typeof arguments[1] === 'number')? arguments[1] >> 0 : len;
		// 	If relativeEnd < 0, let final be max((len + relativeEnd), 0); else let final be min(relativeEnd, len).
		var final = relativeEnd < 0 ? Math.max(len + relativeEnd, 0) : Math.min(relativeEnd, len);
		// 	Let count be max(final - k, 0).
		var count = Math.max(final - k, 0);
		// 	Let A be ? ArraySpeciesCreate(O, count).
		var A = new Array(count);
		// 	Let n be 0.
		var n = 0;
		// Repeat, while k < final
		while (k < final) {
			// 	Let Pk be ! ToString(k).
			// 	Let kPresent be ? HasProperty(O, Pk).
			// 	If kPresent is true, then
			if(k in O){
			// Let kValue be ? Get(O, Pk).
			// 	Perform ? CreateDataPropertyOrThrow(A, ! ToString(n), kValue).
				A[n] =  O[k];
			}
			// 	Increase k by 1.
			k += 1;
			// Increase n by 1.
			n += 1;
		}
		// Perform ? Set(A, "length", n, true).
		A.length = n;
		// 	Return A.
		return A
	};
}
