/**
 ecma-262/7.0
 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin
 */
'use strict'
if (!Array.prototype.copyWithin) {
	Array.prototype.copyWithin = function (target, start/*, end*/) {
		//前置检查
		if (this == null) {
			throw new TypeError('this is null or not defined');
		}
		// Let O be ? ToObject(this value).
		var O = Object(this);

		// Let len be ? ToLength(? Get(O, "length")).
		var len = O.length >>> 0;

		// Let relativeTarget be ? ToInteger(target).
		var relativeTarget = target >> 0;

		// If relativeTarget < 0, let to be max((len + relativeTarget), 0); else let to be min(relativeTarget, len).
		// 如果target为负数，则从尾部取数，如果target超出数组长度，则去数组的首[尾]
		var to = relativeTarget < 0 ?
			Math.max(len + relativeTarget, 0) :
			Math.min(relativeTarget, len);

		// 	Let relativeStart be ? ToInteger(start).
		var relativeStart = start >> 0;

		// If relativeStart < 0, let from be max((len + relativeStart), 0); else let from be min(relativeStart, len).
		// 同relativeTarget处理方式
		var from = relativeStart < 0 ?
			Math.max(len + relativeStart, 0) :
			Math.min(relativeStart, len);

		// If end is undefined, let relativeEnd be len; else let relativeEnd be ? ToInteger(end).
		var end = arguments[2];
		var relativeEnd = end === undefined ? len : end >> 0;

		// If relativeEnd < 0, let final be max((len + relativeEnd), 0); else let final be min(relativeEnd, len).
		// 同relativeTarget处理方式
		var final = relativeEnd < 0 ?
			Math.max(len + relativeEnd, 0) :
			Math.min(relativeEnd, len);

		// Let count be min(final-from, len-to).
		// 获取copy数量
		var count = Math.min(final - from, len - to);

		// Else,Let direction be 1.
		//此为标准中step11，为了代码风格，将11提前
		// 这个变量顾名思义就是方向，1就是依次向后赋值，-1为依次向前赋值
		var direction = 1;
		// If from<to and to<from+count, then
		// 此为标准中step10
		// 如果目标位置大于起始位置 并且 目标位置小于开始位置与copy数量的和(即最后位置)
		// 即目标位置处于起始位置和结束位置之间，如果依次向后赋值，则会丢失目标位置以及之后的值
		// 所有只能向前赋值
		if (from < to && to < (from + count)) {
			//Let direction be -1
			direction = -1;
			// Let from be from + count - 1.
			from += count - 1;
			//Let to be to + count - 1.
			to += count - 1;
		}

		// Repeat, while count > 0
		// 此循环中就是最后的赋值过程，比较简单
		while (count > 0) {
			//  Let fromKey be ! ToString(from).
			// 	Let toKey be ! ToString(to).
			// 	Let fromPresent be ? HasProperty(O, fromKey).
			if (from in O) {
				// If fromPresent is true, then
				//          Let fromVal be ? Get(O, fromKey).
				// 	        Perform ? Set(O, toKey, fromVal, true).
				// 在原数组上改写
				O[to] = O[from];
			} else {
				// Else fromPresent is false,
				// 	        Perform ? DeletePropertyOrThrow(O, toKey).
				delete O[to];
			}
			// Let from be from + direction.
			from += direction;
			// Let to be to + direction.
			to += direction;
			// Let count be count - 1.
			count--;
		}
		//Return O.
		// 返回原数组
		return O;
	};
}
