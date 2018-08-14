/**
 https://www.ecma-international.org/ecma-262/7.0/#sec-array.splice
 */
'use strict';
if (Array.prototype.splice) {
	Array.prototype.splice = function (start/*,deleteCount,...items*/) {

		if (this === null || typeof this === 'undefined') {
			throw new TypeError('Array.prototype.splice called on null or undefined');
		}
// Let O be ? ToObject(this value).
		var O = Object(this);
// Let len be ? ToLength(? Get(O, "length")).
		var len = O.length >> 0;
// 	Let relativeStart be ? ToInteger(start).
		var relativeStart = start >>> 0;
// 	If relativeStart < 0, let actualStart be max((len + relativeStart), 0); else let actualStart be min(relativeStart, len).
		var actualStart = relativeStart < 0 ? Math.max(len + relativeStart, 0) : Math.min(relativeStart, len);
// 	If the number of actual arguments is 0, then
		var insertCount;
		var actualDeleteCount;
		if (arguments.length === 0) {
// Let insertCount be 0.
// Let actualDeleteCount be 0.
			insertCount = 0;
			actualDeleteCount = 0;
		} else if (arguments.length === 1) {
// Else if the number of actual arguments is 1, then
// Let insertCount be 0.
// Let actualDeleteCount be len - actualStart.
			insertCount = 0;
			actualDeleteCount = len - actualStart;
		} else {
// 	Else,
// 	Let insertCount be the number of actual arguments minus 2.
// Let dc be ? ToInteger(deleteCount).
// 	Let actualDeleteCount be min(max(dc, 0), len - actualStart).
			insertCount = arguments.length - 2
			var dc = arguments[1] >>> 0;
			actualDeleteCount = Math.min(Math.max(dc, 0), len - actualStart);
		}
// 	If len+insertCount-actualDeleteCount > 253-1, throw a TypeError exception.
		if (len + insertCount - actualDeleteCount > Math.pow(2, 53) - 1) {
			throw new TypeError()
		}
// 	Let A be ? ArraySpeciesCreate(O, actualDeleteCount).
		var A = new Array(actualDeleteCount)
// 	Let k be 0.
		var k = 0;
// Repeat, while k < actualDeleteCount
		while (k < actualDeleteCount) {
// 	Let from be ! ToString(actualStart+k).
			var from = actualStart + k;
// 	Let fromPresent be ? HasProperty(O, from).
			if (from in O) {
// 	If fromPresent is true, then
//      Let fromValue be ? Get(O, from).
// 	    Perform ? CreateDataPropertyOrThrow(A, ! ToString(k), fromValue).
				A[k] = O[from]
			}
// 	Increment k by 1.
			k += 1;
		}
// Perform ? Set(A, "length", actualDeleteCount, true).
		A.length = actualDeleteCount;
// 	Let items be a List whose elements are, in left to right order, the portion of the actual argument list starting with the third argument. The list is empty if fewer than three arguments were passed.
		var items = Array.prototype.slice.call(arguments, 2);
// 	Let itemCount be the number of elements in items.
		var itemCount = items.length;
// 	If itemCount < actualDeleteCount, then
		// 如果删除的数量比新增的数量要多，那么原数组删除部分后面要前移
		if (itemCount < actualDeleteCount) {
			// Let k be actualStart.
			k = actualStart
			// 	Repeat, while k < (len - actualDeleteCount)
			while (k < actualDeleteCount) {
				// 	Let from be ! ToString(k+actualDeleteCount).
				var from = k + actualDeleteCount;
				// 	Let to be ! ToString(k+itemCount).
				var to = k + itemCount;
				// 	Let fromPresent be ? HasProperty(O, from).
				if (from in O) {
					// 	If fromPresent is true, then
					// Let fromValue be ? Get(O, from).
					// 	Perform ? Set(O, to, fromValue, true).
					O[to] = O[from];
				} else {
					// 	Else fromPresent is false,
					// 	Perform ? DeletePropertyOrThrow(O, to).
					// 删除前移后后面的空位
					delete O[to];
				}
				// 		Increase k by 1.
				k += 1;
			}
			// Let k be len.
			k = len;
			// 	Repeat, while k > (len - actualDeleteCount + itemCount)
			while (k > (len - actualDeleteCount + itemCount)) {
				// 	Perform ? DeletePropertyOrThrow(O, ! ToString(k-1)).
				delete O[k - 1];
				// 	Decrease k by 1.
				k -= 1;
			}
		} else if (itemCount > actualDeleteCount) {
// Else if itemCount > actualDeleteCount, then
			// 新增的数量比删除的多
// 	Let k be (len - actualDeleteCount).
			// 后移的位数
			k = len - actualDeleteCount
// 	Repeat, while k > actualStart
			while (k > actualStart) {
// 	Let from be ! ToString(k + actualDeleteCount - 1).
				var from = k + actualDeleteCount - 1;
// 	Let to be ! ToString(k + itemCount - 1).
				var to = k + itemCount - 1;
// 	Let fromPresent be ? HasProperty(O, from).
				if (from in O) {
// 	If fromPresent is true, then
// Let fromValue be ? Get(O, from).
// 	Perform ? Set(O, to, fromValue, true).
					O[to] = O[from];
				} else {
// 	Else fromPresent is false,
// 	Perform ? DeletePropertyOrThrow(O, to).
					//删除后移时多余的一个重复数
					delete O[to];
				}
// 	Decrease k by 1.
				k -= 1;
			}
		}
// Let k be actualStart.
		k = actualStart;
// 	Repeat, while items is not empty
		// 依次插入新增值
		while (items.length !== 0) {
			// Remove the first element from items and let E be the value of that element.
			var E = items.shift();
			// 	Perform ? Set(O, ! ToString(k), E, true).
			O[k] = E;
			// 	Increase k by 1.
			k += 1;
		}
// Perform ? Set(O, "length", len - actualDeleteCount + itemCount, true).
		O.length = len - actualDeleteCount + itemCount;
// 	Return A.
		return A;
	};
}
