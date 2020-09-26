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

new MyPromise((resolve, reject) => {
    resolve(1)
})
.then(val1 => {
    console.log('val1', val1)
    return val1 * 2
}, () => { })
.then(val2 => {
    console.log('val2', val2)
    return val2
    }, () => { }
)

