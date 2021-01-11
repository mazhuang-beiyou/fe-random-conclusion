function fun(n,o){
    console.log(o);
    return {
        fun: function(m){
            return fun(m,n);
        }
    };
}
const a = fun(0)
a.fun(1) // 0