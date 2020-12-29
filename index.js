var value = 1
const foo = {
    value: 2
}
function fn() {
    console.log(this.value)
    return this.value
}

Function.prototype.bind2 = function (context) {
    const fn = this
    return function() {
        return fn.apply(context)
    }
}
bindFoo = fn.bind2(foo)
console.log(bindFoo()) //2 ,2