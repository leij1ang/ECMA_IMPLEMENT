/**
 ecma-262/7.0/
 https://www.ecma-international.org/ecma-262/7.0/#sec-array.concat
 */
'use strict';
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
		// Repeat, while items is not empty
		// Remove the first element from items and let E be the value of the element.
		// 	Let spreadable be ? IsConcatSpreadable(E).
		// 	If spreadable is true, then
		// Let k be 0.
		// Let len be ? ToLength(? Get(E, "length")).
		// 	If n + len > 253-1, throw a TypeError exception.
		// 	Repeat, while k < len
		// 	Let P be ! ToString(k).
		// 	Let exists be ? HasProperty(E, P).
		// 	If exists is true, then
		// Let subElement be ? Get(E, P).
		// 	Perform ? CreateDataPropertyOrThrow(A, ! ToString(n), subElement).
		// 	Increase n by 1.
		// Increase k by 1.
		// Else E is added as a single item rather than spread,
		// 	If n≥253-1, throw a TypeError exception.
		// 	Perform ? CreateDataPropertyOrThrow(A, ! ToString(n), E).
		// 	Increase n by 1.
		// Perform ? Set(A, "length", n, true).
		// 	Return A.
	};
}
