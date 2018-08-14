/**
 Auth: Lei.j1ang
 Created: 2018/8/13-14:49
 */
'use strict';
if (!Array.prototype.shift){
	Array.prototype.shift = function () {
		if (this === null || typeof this === 'undefined') {
			throw new TypeError('Array.prototype.shift called on null or undefined');
		}
		// Let O be ? ToObject(this value).
		var O = Object(this);
		// Let len be ? ToLength(? Get(O, "length")).
		var len = O.length >>> 0;
		// If len is zero, then
		if (len === 0){
		//      Perform ? Set(O, "length", 0, true).
			O.length = 0;
		// 	    Return undefined.
			return undefined
		}
		// Let first be ? Get(O, "0").
		var first = O[0];
		// Let k be 1.
		var k = 1;
		// Repeat, while k < len
		while (k < len) {
			// 	    Let from be ! ToString(k).
			// 	    Let to be ! ToString(k-1).
			// 	    Let fromPresent be ? HasProperty(O, from).
			//  	If fromPresent is true, then
			if(k in O) {
				//          Let fromVal be ? Get(O, from).
				// 	        Perform ? Set(O, to, fromVal, true).
				//          依次前移一位
				O[k - 1] = O[k];
			}else {
				// 	    Else fromPresent is false,
				// 	        Perform ? DeletePropertyOrThrow(O, to).
				//  删除前一个的原因是因为在本次，不会覆盖前一个，导致前一个出现两次
				//  不删除本条数据是因为，下一次循环会覆盖或者删除
				delete O[k - 1];
			}
			// 		Increase k by 1.
			k += 1;
		}
		//  Perform ? DeletePropertyOrThrow(O, ! ToString(len-1)).
		delete O[len - 1];
		// 	Perform ? Set(O, "length", len-1, true).
		O.length = len -1;
		// 	Return first.
		return first
	}
}
