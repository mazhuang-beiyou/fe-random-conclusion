function add() {
    let args = [...arguments]
    function sum() {
        // return add.apply(null, [...args, ...arguments])
        return add.call(null, ...[...args, ...arguments])
    }
    sum.toString = () => args.reduce((a, b) => a + b)
    return sum;
}

console.log(add(1, 2, 3, 4)(2, 3))
