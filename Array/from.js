/**
 ecma-262/7.0
 https://www.ecma-international.org/ecma-262/7.0/#sec-array.from
 鉴于无法使用 Polyfill 实现真正的的迭代器，该实现不支持规范中定义的泛型可迭代元素。
 */
'use strict'
if (!Array.prototype.from) {
	Array.prototype.from = (function () {
		var toStr = Object.prototype.toString;
		// 工具方法，检查是否是一个函数
		var isCallable = function (fn) {
			return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
		};
		// 此为标准中toInteger中的标准步骤
		var toInteger = function (value) {
			// Let number be ? ToNumber(argument).
			var number = Number(value);
			//If number is NaN, return +0.
			if (isNaN(number)) {
				return 0;
			}
			//If number is +0, -0, +∞, or -∞, return number.
			if (number === 0 || !isFinite(number)) {
				return number;
			}
			//Return the number value that is the same sign as number and whose magnitude is floor(abs(number)).
			return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
		};
		var maxSafeInteger = Math.pow(2, 53) - 1;
		var toLength = function (value) {
			var len = toInteger(value);
			return Math.min(Math.max(len, 0), maxSafeInteger);
		};
		function from(items/*,mapFn,thisArg*/) {
			// 前置检查
			if (items == null) {
				throw new TypeError("Array.from requires an array-like object - not null or undefined");
			}
			// 1. Let C be the this value.
			var C = this;

			// If mapfn is undefined, let mapping be false.
			var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
			var mapping = false;
			var T;
			if (typeof mapFn !== 'undefined') {
				// 	Else,
				// 	If IsCallable(mapfn) is false, throw a TypeError exception.
				// 	If thisArg was supplied, let T be thisArg; else let T be undefined.
				// 	Let mapping be true.
				if (!isCallable(mapFn)) {
					throw new TypeError('Array.from: when provided, the second argument must be a function');
				}

				if (arguments.length > 2) {
					T = arguments[2];
				}
				mapping = true
			}
			// 	Let usingIterator be ? GetMethod(items, @@iterator).
			// If usingIterator is not undefined, then
			// If IsConstructor(C) is true, then
			// Let A be ? Construct(C).
			// 	Else,
			// 	Let A be ArrayCreate(0).
			var A = isCallable(C) ? Object(new C(len)) : new Array(len);
			// 	Let iterator be ? GetIterator(items, usingIterator).
			// 	Let k be 0.
			var k = 0;
			// Repeat
			// If k ≥ 2**53-1, then
			while (k>= Math.pow(2,53)-1){

			}
		}
		from()

		// Let error be Completion{[[Type]]: throw, [[Value]]: a newly created TypeError object, [[Target]]: empty}.
		// Return ? IteratorClose(iterator, error).
		// 	Let Pk be ! ToString(k).
		// 	Let next be ? IteratorStep(iterator).
		// 	If next is false, then
		// Perform ? Set(A, "length", k, true).
		// 	Return A.
		// 	Let nextValue be ? IteratorValue(next).
		// 	If mapping is true, then
		// Let mappedValue be Call(mapfn, T, « nextValue, k »).
		// If mappedValue is an abrupt completion, return ? IteratorClose(iterator, mappedValue).
		// 	Let mappedValue be mappedValue.[[Value]].
		// 	Else, let mappedValue be nextValue.
		// 	Let defineStatus be CreateDataPropertyOrThrow(A, Pk, mappedValue).
		// 	If defineStatus is an abrupt completion, return ? IteratorClose(iterator, defineStatus).
		// 	Increase k by 1.
		// NOTE: items is not an Iterable so assume it is an array-like object.
		// 	Let arrayLike be ! ToObject(items).
		// 	Let len be ? ToLength(? Get(arrayLike, "length")).
		// 	If IsConstructor(C) is true, then
		// Let A be ? Construct(C, « len »).
		// Else,
		// 	Let A be ? ArrayCreate(len).
		// 	Let k be 0.
		// Repeat, while k < len
		// 	Let Pk be ! ToString(k).
		// 	Let kValue be ? Get(arrayLike, Pk).
		// 	If mapping is true, then
		// Let mappedValue be ? Call(mapfn, T, « kValue, k »).
		// Else, let mappedValue be kValue.
		// 	Perform ? CreateDataPropertyOrThrow(A, Pk, mappedValue).
		// 	Increase k by 1.
		// Perform ? Set(A, "length", len, true).
		// 	Return A.

		return function from(items/*, mapFn, thisArg */) {
			// 前置检查
			if (items == null) {
				throw new TypeError("Array.from requires an array-like object - not null or undefined");
			}
			// 1. Let C be the this value.
			var C = this;

			// 2 If mapfn is undefined, then let mapping be false.
			var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
			var T;
			var mapping = false;
			if (typeof mapFn !== 'undefined') {
				// 3. else
				// 3. a If IsCallable(mapfn) is false, throw a TypeError exception.
				if (!isCallable(mapFn)) {
					throw new TypeError('Array.from: when provided, the second argument must be a function');
				}

				// 3. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
				if (arguments.length > 2) {
					T = arguments[2];
				}
				//	3. c. Let mapping be true.
				mapping = true
			}

			// 10. Let lenValue be Get(items, "length").
			// 11. Let len be ToLength(lenValue).
			var len = toLength(items.length);

			// 13. If IsConstructor(C) is true, then
			// 13. a. Let A be the result of calling the [[Construct]] internal method
			// of C with an argument list containing the single item len.
			// 14. a. Else, Let A be ArrayCreate(len).
			var A = isCallable(C) ? Object(new C(len)) : new Array(len);

			// 16. Let k be 0.
			var k = 0;
			// 17. Repeat, while k < len… (also steps a - h)
			var kValue;
			while (k < len) {
				kValue = items[k];
				if (mapFn) {
					A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
				} else {
					A[k] = kValue;
				}
				k += 1;
			}
			// 18. Let putStatus be Put(A, "length", len, true).
			A.length = len;
			// 20. Return A.
			return A;
		};
	}());
}
