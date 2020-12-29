// call的功能: 改变函数的this指向
// 例子：
var value = 1
const foo = {
    value: 2
}
let fn = function () {
    console.log(this.value)
}
fn() // 1
fn.call(foo) // 2
// 实现原理：
// 1.在call的对象中添加这个函数
// 2.用这个对象调用这个函数
// 3.删除这个函数
Function.prototype.call2 = function (context) {
    context.fn = this
    context.fn()
    delete context.fn
}
fn.call2(foo) // 2
// 问题1：call可以传参，call2却没实现, context传null，指向window
fn = function (name, age) {
    console.log(name, age)
    console.log(this.value)
}
fn.call(foo, 'rua', 12) // rua 12 2
fn.call2(foo, 'rua', 12) // undefined undefined 2
fn.call(null) // 1
fn.call2(null) // 报错

// 修改写法
Function.prototype.call2 = function (context) {
    const obj = context || window
    obj.fn = this
    var args = [];
    for(var i = 1, len = arguments.length; i < len; i++) {
        args.push(arguments[i]);
    }
    obj.fn(...args)
    delete obj.fn
}

fn.call(foo, 'rua', 12) // rua 12 2
fn.call2(foo, 'rua', 12) // rua 12 2
fn.call(null) // 1
fn.call2(null) // 1

// 问题2：函数有返回值怎么办?
fn = function(name, age) {
    return {
        value: this.value,
        name,
        age
    }
}
console.log(fn.call(foo, 'rua', 10)) // { value: 2, name: rua, age: 12 }
console.log(fn.call2(foo, 'rua', 10)) // undefined
// 修复

Function.prototype.call2 = function (context) {
    const obj = context || window
    obj.fn = this
    var args = [];
    for(var i = 1, len = arguments.length; i < len; i++) {
        args.push(arguments[i]);
    }
    obj.fn(...args)
    delete obj.fn
}
console.log(fn.call(foo, ['rua', 10])) // { value: 2, name: rua, age: 12 }
console.log(fn.call2(foo, ['rua', 10])) // { value: 2, name: rua, age: 12 }

// 同理可以实现apply
 Function.prototype.apply2 = function (context) {
     const obj = context || window
     const args = arguments[1] || []
     obj.fn = this
     const res = obj.fn(...args)
     delete obj.fn
     return res
 }

console.log(fn.apply(foo, ['rua', 10])) // { value: 2, name: rua, age: 12 }
console.log(fn.apply2(foo, ['rua', 10])) // { value: 2, name: rua, age: 12 }