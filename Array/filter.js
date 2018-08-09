/**
 cma-262/7.0
 https://www.ecma-international.org/ecma-262/7.0/#sec-array.filter
 */
'use strict';
if (!Array.prototype.filter) {
	Array.prototype.filter = function (fun /* , thisArg*/) {
		if (this === void 0 || this === null)
			throw new TypeError();
		// Let O be ? ToObject(this value).
		var O = Object(this);
		// Let len be ? ToLength(? Get(O, "length")).
		var len = O.length >>> 0;
		// If IsCallable(callbackfn) is false, throw a TypeError exception.
		if (typeof fun !== "function")
			throw new TypeError();
		// If thisArg was supplied, let T be thisArg; else let T be undefined.
		var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
		//  Let A be ? ArraySpeciesCreate(O, 0).
		var A = [];
		// 	Let k be 0.
		var k = 0;
		//  Let to be 0.
		// to在这里没有声明，因为关于to的步骤可以用push()来实现
		// Repeat, while k < len
		while (k < len) {
			//  Let Pk be ! ToString(k).
			// 	Let kPresent be ? HasProperty(O, Pk).
			// 	If kPresent is true, then
			//      Let kValue be ? Get(O, Pk).
			//      Let selected be ToBoolean(? Call(callbackfn, T, « kValue, k, O »)).
			if (k in O && fun.call(thisArg, O[k], k, O)) {
				// NOTE: Technically this should Object.defineProperty at
				//       the next index, as push can be affected by
				//       properties on Object.prototype and Array.prototype.
				//       But that method's new, and collisions should be
				//       rare, so use the more-compatible alternative.
				//      If selected is true, then
				//      Perform ? CreateDataPropertyOrThrow(A, ! ToString(to), kValue).
				//      Increase to by 1.
				// 将符合callback的数据放入A
				A.push(O[k]);
				// Increase k by 1.
				k += 1;
			}
		}
		return A;
	};
}
