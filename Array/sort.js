/**
此文件未按照ecma标准写
此排序算法采用'原地算法'https://en.wikipedia.org/wiki/In-place_algorithm中的timeSort进行排序
参考v8中的sort实现https://github.com/v8/v8/blob/master/src/js/array.js
 由于未理解GetThirdIndex()方法的含义，所以先将其删除，等弄明白再添加
 */
'use strict';
if (!Array.prototype.sort) {
	Array.prototype.sort = function (compareFn) {
		if (this === null || typeof this === 'undefined') {
			throw new TypeError('Array.prototype.some called on null or undefined');
		}
		var O = Object(this);
		var len = O.length >> 0;
		(function InnerArraySort(array, length, comparefn) {
			if (typeof comparefn !== "function") {
				comparefn = function (x, y) {
					if (x === y) return 0;
					else return x < y ? -1 : 1;
				};
			}
			// 插入排序(直接插入排序)
			// 比如一个排序到一半的数组 [0,6,7,5,4,2]，此轮到‘5’，在‘5’之前是有序的
			// 选取element = 5
			// tmp = 7
			// 比较 7与5,7比5大，7向后移 [0,6,7,7,4,2],因为‘5’已经保存在element中了，所以，不用担心‘5’丢失
			// tmp = 6
			// 比较 6与5,6比5大，6向后移 [0,6,6,7,4,2]
			// tmp = 0
			// 比较 0与5，0比5小，结束
			// 将tmp落在0之后，即[0,5,6,7,4,2]
			// 然后在用上面同样的方法比较 4 2
			function InsertionSort(a, from, to) {
				for (var i = from + 1; i < to; i++) {
					//取出数据
					var element = a[i];
					// 依次对比前面所有数据，将element插入到第一个符合条件的位置上
					// 取出一个数，依次向前对比，一直找到比他小的数，并在此位置之后落下
					for (var j = i - 1; j >= from; j--) {
						var tmp = a[j];
						var order = comparefn(tmp, element);
						// 如果符合条件，即element比tmp小
						if (order > 0) {
							//tmp后移，为element腾出空间
							a[j + 1] = tmp;
						} else {
							break;
						}
					}
					// element落位
					a[j + 1] = element;
				}
			};

			function QuickSort(a, from, to) {
				while (true) {
					if (to - from <= 10) {
						InsertionSort(a, from, to);
						return;
					}
					var third_index = from + ((to - from) >> 1);
					// Find a pivot as the median of first, last and middle element.
					//第一个元素
					var v0 = a[from];
					//最后一个元素
					var v1 = a[to - 1];
					//中间点元素
					var v2 = a[third_index];
					//比较第一个与最后一个元素
					var c01 = comparefn(v0, v1);
					if (c01 > 0) {
						// 如果第一个元素与最后一个元素分布不符合要求(默认函数中表现为，第一个元素大于最后一个元素) v0 > v1
						// 交换位置
						var tmp = v0;
						v0 = v1;
						v1 = tmp;
					}
					// 至此，头元素一定比尾元素小 v0 <= v1
					var c02 = comparefn(v0, v2);
					if (c02 >= 0) {
						//v0 >= v2
						// 如果头元素与中间元素分布不符合要求（默认函数中表现，头元素大于等于中间元素） v2 <= v0 <= v1
						// 将中间元素放在开始，最后元素放在中间，开始元素放在最后
						var tmp = v0;
						v0 = v2;
						v2 = v1;
						v1 = tmp;
						//v0<=v1<=v2
					} else {
						// 如果第一个元素比中间元素大 v0 < v2 && v0 <= v1
						var c12 = comparefn(v1, v2);
						if (c12 > 0) {
							//并且最后一个元素也比中间元素大 v2 < v1
							//交换v1与v2
							// v0 <= v2 <= v1
							var tmp = v1;
							v1 = v2;
							v2 = tmp;
						}
					}
					// v0 <= v1 <= v2
					//a[from] <= pivot <= a[to -1]
					a[from] = v0;
					a[to - 1] = v2;
					var pivot = v1;
					var low_end = from + 1;   // Upper bound of elements lower than pivot.
					var high_start = to - 1;  // Lower bound of elements greater than pivot.
					//交换起始的下一个元素与中间元素
					a[third_index] = a[low_end];
					a[low_end] = pivot;
					//同时pivot也为基准数
					partition: for (var i = low_end + 1; i < high_start; i++) {
						//选取第一个数
						var element = a[i];
						var order = comparefn(element, pivot);
						//如果选取的数比基准数小，将选取的数提前一位(其实就是交换pivot和当前数)
						if (order < 0) {
							a[i] = a[low_end];
							a[low_end] = element;
							low_end++;
						} else if (order > 0) {
							//如果选取的数比基数大
							do {
								//一直从尾部向前找到小于等于基准数的元素
								high_start--;
								if (high_start === i) break partition;
								var top_elem = a[high_start];
								order = comparefn(top_elem, pivot);
							} while (order > 0);
							//element > pivot >=top_elem
							a[i] = a[high_start];
							a[high_start] = element;
							if (order < 0) {
								element = a[i];
								a[i] = a[low_end];
								a[low_end] = element;
								low_end++;
							}
						}
					}
					//递归
					if (to - high_start < low_end - from) {
						QuickSort(a, high_start, to);
						to = low_end;
					} else {
						QuickSort(a, from, low_end);
						from = high_start;
					}
				}
			}
			if (length < 2) return array;
			QuickSort(array, 0, length);
			return array;
		})(O, len, compareFn);
	}
}
