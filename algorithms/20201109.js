// 堆排序用数组模拟一个完全二叉树
const arr = [2, 9, 4, 8, 5, 4, 3]
heapSort(arr)
console.log(arr)

function heapSort(arr) {
    let len = arr.length

    buildHeap()
    while (len > 0) {
        let tmp = arr[0]
        arr[0] = arr[len - 1]
        arr[len - 1] = tmp
        len--
        sort(0)
    }

    function buildHeap() {
        let i = Math.floor(len / 2) - 1
        while (i >= 0) {
            sort(i)
            i--;
        }
    }

    function sort(index) {
        const left = index * 2 + 1
        const right = left + 1
        let max = arr[index]
        if (right <= len - 1) {
            max = Math.max(max, arr[left], arr[right])
        } else if (left <= len - 1) {
            max = Math.max(max, arr[left])
        }
        if (arr[index] === max) return
        if (arr[left] === max) {
            const tmp = arr[index]
            arr[index] = arr[left]
            arr[left] = tmp
            sort(left)
            return
        }
        if (arr[right] === max) {
            const tmp = arr[index]
            arr[index] = arr[right]
            arr[right] = tmp
            sort(right)
        }
    }
}