/**
 https://www.ecma-international.org/ecma-262/7.0/#sec-array.reverse
 */
'use strict';
if (!Array.prototype.reverse) {
	Array.prototype.reverse = function () {
		if (this === null || typeof this === 'undefined') {
			throw new TypeError('Array.prototype.reverse called on null or undefined');
		}

		// Let O be ? ToObject(this value).
		var O = Object(this);
		// Let len be ? ToLength(? Get(O, "length")).
		var len = O.length>>>0;
		// 	Let middle be floor(len/2).
		var middle = (len/2) >>> 0;
		// 	Let lower be 0.
		var lower = 0;
		// Repeat, while lower ≠ middle
		while(lower !== middle) {
			// Let upper be len - lower - 1.
			// 与lower相对的后半段索引
			var upper = len - lower -1;
			// Let upperP be ! ToString(upper).
			// 	Let lowerP be ! ToString(lower).
			// 	Let lowerExists be ? HasProperty(O, lowerP).
			var lowerValue;
			var lowerExists = lower in O;
				// 	If lowerExists is true, then
			if(lowerExists) {
				// Let lowerValue be ? Get(O, lowerP).
				lowerValue = O[lower];

			}
			// 	Let upperExists be ? HasProperty(O, upperP).
			var upperValue;
			var upperExists = (upper in O);
			// 	If upperExists is true, then
			if(upperExists) {
			// Let upperValue be ? Get(O, upperP).
				upperValue = O[upper]
			}

			// 	If lowerExists is true and upperExists is true, then
			if(lowerExists && upperExists) {
				// Perform ? Set(O, lowerP, upperValue, true).
				O[lower] = upperValue;
				// 	Perform ? Set(O, upperP, lowerValue, true).
				O[upper] = lowerValue;
			}else if (!lowerExists && upperExists){
			// 	Else if lowerExists is false and upperExists is true, then
			// Perform ? Set(O, lowerP, upperValue, true).
			// 	Perform ? DeletePropertyOrThrow(O, upperP).
				O[lower] = upperValue;
				delete O[upper]
			}else if(lowerExists && !upperExists) {
				// 	Else if lowerExists is true and upperExists is false, then
				// Perform ? DeletePropertyOrThrow(O, lowerP).
				delete O[lower];
				// 	Perform ? Set(O, upperP, lowerValue, true).
				O[upper]=lowerValue;
			}
			// 	Else both lowerExists and upperExists are false,
			// 	No action is required.
			lower += 1;
			// 	Increase lower by 1.
		}
		return O
		// Return O.
	}
}
