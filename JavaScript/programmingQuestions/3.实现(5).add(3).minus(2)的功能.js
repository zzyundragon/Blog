/**
 * 实现 (5).add(3).minus(2) 功能
 */

 /**
  * 解题思路：扩展原型属性，链式调用每次将值返回供后续调用
  */

Number.prototype.add = function(n) {
    return this + n
}
Number.prototype.minus = function(n) {
    return this - n
}
console.log((5).add(3).minus(2))


Number.prototype.add = function (value) {
    let  number = parseFloat(value);
    if (typeof number !== 'number' || Number.isNaN(number)) {
        throw new Error('请输入数字或者数字字符串～');
    };
    return this + number;
};
Number.prototype.minus = function (value) {
    let  number = parseFloat(value);
    if (typeof number !== 'number' || Number.isNaN(number)) {
        throw new Error('请输入数字或者数字字符串～');
    }
    return this - number;
};
console.log((5).add(3).minus(2));