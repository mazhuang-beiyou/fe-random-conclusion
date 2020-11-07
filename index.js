var a = 1
function debounce(fn, time) {
    let args = arguments
    let timeout = null
    return function () {
        if (timeout) {
            clearTimeout(timeout)
        }
        timeout = setTimeout(() => {
            fn.call(this, args)
        }, time);
    }
}
function fn(params) {
    console.log('fn', params, this.a)
}
const obj = {
    a: 2,
    fn(params) {
        console.log('fn', params, this.a)
    },
    debouncedFn: debounce(this.fn, 500, 'params')
}

obj.debouncedFn()
// setTimeout(() => {
//     obj.debouncedFn()
// }, 200);
