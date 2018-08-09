/**
 Auth: Lei.j1ang
 comp: pactera.com
 Created: 2018/8/8-11:16
 */
'use strict'
// 此文件为标准中的抽象运算
var O = {}
// ToLength,https://www.ecma-international.org/ecma-262/7.0/#sec-tolength
// 此为简单方法
var tolength = O.length >>> 0;
// ToInteger,https://www.ecma-international.org/ecma-262/7.0/#sec-tointeger
// 此为简单方法
var tointeger = O.length >> 0;
// ToString,https://www.ecma-international.org/ecma-262/7.0/#sec-tostring
// 此为简单方法
var tostring = O.length.toString()
// HasProperty (O, P),https://www.ecma-international.org/ecma-262/7.0/#sec-hasproperty
// 	Assert: Type(O) is Object.
// 	Assert: IsPropertyKey(P) is true.
// 	Return ? O.[[HasProperty]](P).
//IsPropertyKey,https://www.ecma-international.org/ecma-262/7.0/#sec-ispropertykey
var IsPropertyKey = function (arg) {
	return typeof arg === 'string' || typeof arg === 'symbol';

}
//isCallable,https://www.ecma-international.org/ecma-262/7.0/#sec-iscallable
var isCallable = function (fn) {
	return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
};

