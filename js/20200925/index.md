# 手动实现一个Promise
* 基础版
```
const STATUS = {
    PENDING: 'PENDING',
    FULFILLED: 'FULFILLED',
    REJECT: 'REJECT'
}
class MyPromise {
    constructor(callback) {
        this.value = undefined
        this.status = STATUS.PENDING

        this.resolveQueue = []
        this.rejectQueue = []

        let called

        const resolve = value => {
            if (called) return
            called = true

            this.value = value
            this.status = STATUS.FULFILLED

            for (const fn of this.resolveQueue) {
                fn(value)
            }
        }

        const reject = reason => {
            if (called) return
            called = true

            this.value = reason
            this.status = STATUS.REJECT

            for (const fn of this.rejectQueue) {
                fn(value)
            }
        }
        try {
            callback(resolve, reject)
        } catch (e) {
            reject(e)
        }
    }
    then(onResolve, onReject) {
        if (this.status === STATUS.PENDING) {
            const resolveQueue = this.resolveQueue
            const rejectQueue = this.rejectQueue
            return new MyPromise((resolve, reject) => {
                resolveQueue.push(function (innerValue) {
                    try {
                        const value = onResolve(innerValue)
                        resolve(value)
                    } catch (e) {
                        reject(e)
                    }
                })
                rejectQueue.push(function (innerValue) {
                    try {
                        const value = onReject(innerValue)
                        resolve(value)
                    } catch (e) {
                        reject(e)
                    }
                })
            })
        } else {
            const innerValue = this.value
            const isFulfilled = this.status === STATUS.FULFILLED
            return new MyPromise((resolve, reject) => {
                try {
                    const value = isFulfilled ? onResolve(innerValue) : onReject(innerValue)
                    resolve(value)
                } catch (e) {
                    reject(e)
                }
            })
        }
    }
    catch(onReject) {
        return this.then(null, onReject)
    }
}
```
* resolve 和 reject静态方法
```
class MyPromise {
    .....
    static resolve(value) {
        return new MyPromise((resolve, reject) => {
            resolve(value))
        }
    }
    static reject(value) {
        return new Promise((resolve, reject) => {
            reject(value)
        })
    }
}
```

* 以上就是一个超级简易版的Promise写法，细节需要注意的很多，这里就不多详述了。