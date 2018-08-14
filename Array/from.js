/**
 ecma-262/7.0
 https://www.ecma-international.org/ecma-262/7.0/#sec-array.from
 鉴于无法使用 Polyfill 实现真正的的迭代器，该实现不支持规范中定义的泛型可迭代元素。
 */
'use strict'
if (!Array.prototype.from) {
	Array.prototype.from = function (items/*, mapFn, thisArg */) {
		if (this === null || typeof this === 'undefined') {
			throw new TypeError('Array.prototype.from called on null or undefined');
		}

		var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
		var mapping;
		var T;
		if (typeof mapFn === 'undefined') {
			// If mapfn is undefined, let mapping be false.
			mapping = false;
		} else {
			// Else,
			// 	If IsCallable(mapfn) is false, throw a TypeError exception.
			// 	If thisArg was supplied, let T be thisArg; else let T be undefined.
			// 	Let mapping be true.
			if(typeof mapFn !== 'function'){
				throw new TypeError()
			}
			T = arguments.length > 2 ? arguments[2] : undefined;
			mapping = true;
		}
		// Let usingIterator be ? GetMethod(items, @@iterator).
		// If usingIterator is not undefined, then
		// If IsConstructor(C) is true, then
		// Let A be ? Construct(C).
		// 	Else,
		// 	Let A be ArrayCreate(0).
		// 	Let iterator be ? GetIterator(items, usingIterator).
		// 	Let k be 0.
		// Repeat
		// If k ≥ 253-1, then
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
	};
}
