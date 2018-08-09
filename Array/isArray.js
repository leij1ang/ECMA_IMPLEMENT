/**
 The isArray function takes one argument arg
 这个方法没有按照标准步骤来
 另外谨记，不要用typeof来检测一个object数据，比如array其实是一个特殊的object，typeof array 出来结果是'object'
 */
'use strict';
if (!Array.prototype.isArray) {
	Array.prototype.isArray = function(arg) {
		return Object.prototype.toString.call(arg) === '[object Array]';
	};
}
//或者--------------------------------------------------------------------------
if (!Array.prototype.isArray) {
	Array.prototype.isArray = function(arg) {
		return arg[0] instanceof Array;
	};
}
