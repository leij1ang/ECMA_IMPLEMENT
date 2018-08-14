/**
 ecma-262/7.0/
 https://www.ecma-international.org/ecma-262/7.0/#sec-array.concat
 */
'use strict';
// todo
if (!Array.prototype.concat) {
	Array.prototype.concat = function () {
		if (this == null) {
			throw new TypeError('"this" is null or not defined');
		}
		// Let O be ? ToObject(this value).
		var O = Object(this);
		// Let A be ? ArraySpeciesCreate(O, 0).
		var A = Array(O);
		// 	Let n be 0.
		var n = 0;
		// Let items be a List whose first element is O and whose subsequent elements are, in left to right order, the arguments that were passed to this function invocation.
		var items = new Array(arguments.length + 1);
		items.push(O);
		var argLen = arguments.length;
		while (argLen === 0) {
			items.push(arguments[argLen])
		}
		// Repeat, while items is not empty
		while (items.length !== 0) {
			// Remove the first element from items and let E be the value of the element.
			var E = items.shift();
			// 	Let spreadable be ? IsConcatSpreadable(E).
			// 	If spreadable is true, then
			//这个属性暂时只有firefox48+支持，所以此处省略此判断

			// Let k be 0.
			var k = 0;
			// Let len be ? ToLength(? Get(E, "length")).
			var len = E.length >>> 0;
			// 	If n + len > 253-1, throw a TypeError exception.
			if (n + len > Math.pow(2, 53) - 1) {
				throw new TypeError();
			}
			// 	Repeat, while k < len
			while (k < len) {
				// 	Let P be ! ToString(k).
				// 	Let exists be ? HasProperty(E, P).
				if (k in E) {
					// 	If exists is true, then
					//  Let subElement be ? Get(E, P).
					// 	Perform ? CreateDataPropertyOrThrow(A, ! ToString(n), subElement).
					A[n] = E[k];
				}
				// 	Increase n by 1.
				//  Increase k by 1.
				n += 1;
				k += 1;
			}
			//以下因为Object.prototype[@@isConcatSpreadable]的原因，暂时不考虑
			// Else E is added as a single item rather than spread,
			// 	If n≥253-1, throw a TypeError exception.
			// 	Perform ? CreateDataPropertyOrThrow(A, ! ToString(n), E).
			// 	Increase n by 1.

		}
		// Perform ? Set(A, "length", n, true).
		A.length = n;
		// 	Return A.
		return A;
	};
}
