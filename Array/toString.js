/**
 https://www.ecma-international.org/ecma-262/7.0/#sec-array.toString
 */
'use strict';
if (!Array.prototype.toString) {
	Array.prototype.toString = function () {
		if (this === null || typeof this === 'undefined') {
			throw new TypeError('Array.prototype.toString called on null or undefined');
		}
		// Let array be ? ToObject(this value).
		var array = Object(this);
		// Let func be ? Get(array, "join").
		var func = Array.prototype.join
		// 	If IsCallable(func) is false, let func be the intrinsic function %ObjProto_toString%.
		if (typeof func !== 'function') {
			func = Object.prototype.join
		}
		// Return ? Call(func, array).
		return func.call(array)
	}
}
