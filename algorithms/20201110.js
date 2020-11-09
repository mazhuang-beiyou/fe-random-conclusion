const { quick } = require("seedrandom")

const arr = [6, 2, 9, 4, 8, 5, 4, 3]
const end = arr.length - 1
quickSort(arr, 0, end)
console.log(arr)

function quickSort(arr, start, end) {
    if (start > end) return
    let midVal = arr[start]
    let begin = start + 1
    let over = end
    while (begin < over) {
        if (arr[begin] < midVal) {
            begin++
        }
        if (arr[over] > midVal) {
            over--
        }
        if (arr[begin] > midVal && arr[over] < midVal) {
            swap(begin, over)
            begin++
            over--
        }
    }
    if (arr[begin] < midVal) {
        swap(start, begin)
        quickSort(arr, start, begin - 1)
        quickSort(arr, begin + 1, end)
    }
    else {
        swap(start, begin - 1)
        quickSort(arr, start, begin - 2)
        quickSort(arr, begin, end)
    }
    function swap(i, j) {
        const tmp = arr[i]
        arr[i] = arr[j]
        arr[j] = tmp
    }
}
