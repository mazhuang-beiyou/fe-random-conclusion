// call的作用：
// bind() 方法会创建一个新函数。当这个新函数被调用时，bind()的第一个参数将作为它运行时的 this，之后的一序列参数将会在传递的实参前传入作为它的参数。(来自于 MDN )
// 样例：
var value = 1
const foo = {
    value: 2
}
function fn() {
    console.log(this.value)
    return this.value
}
let bindFoo = fn.bind(foo)
console.log(bindFoo()) //2 ,2

// 简单实现
Function.prototype.bind2 = function (context) {
    const fn = this
    return function() {
        return fn.apply(context)
    }
}
bindFoo = fn.bind2(foo)
console.log(bindFoo()) //2 ,2

// 问题1：还不能传参
fn = function(name, age) {
    console.log(this.value);
    console.log(name);
    console.log(age);

}
var bindFoo = bar.bind(foo, 'daisy');
bindFoo('18');
// 2 daisy 18
// 可以先传一个，调用时候再传一个
// 修改:
Function.prototype.bind2 = function (context) {
    const fn = this
    const args = Array.prototype.slice.call(arguments, 1)
    return function () {
        args.push(...Array.from(arguments))
        return fn.apply(context, args)
    }
}