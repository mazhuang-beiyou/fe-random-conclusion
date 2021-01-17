// 关于背包问题的链接和代码，背包问题leetcode没有直接的题目，但是有很多相关的题目，这里直接
// 写一下关于背包问题的题目和代码的理解

// 问题描述：01背包问题。
// N件物品和一个容量为V的背包、费用为Ci, 价值分别Wi
// 例如：背包容量12、C = [4, 6, 2, 2, 5, 1]、W = [8, 10, 6, 3, 7, 2]

// 方程为 F(i, v) = Math.max(F(i-1, v), F(i-1, v-C[i]) + W[i])
// 所有的类似背包问题都由此公式演化而来，因此不能死背，可以理解为：前i件物品正好放入一个容量为v的背包

// 实现为：
const N = 6
V = 12
const C = [4, 6, 2, 2, 5, 1]
const W = [8, 10, 6, 3, 7, 2]
let dp = new Array(V).fill(0)
for (let i = 0; i < 6; i++) {
// 下列代码可优化成从后往前遍历：
    // const tmp = [...dp]
    // for (let j = 0; j < V; j++) {
    //     if (C[i] <= j + 1) {
    //         dp[j] = Math.max(tmp[j] || 0, (tmp[j - C[i]] || 0) + W[i])
    //     } else dp[j] = tmp[j]
    // }
// 即：
    for (let j = V - 1; j >= 0; j--) {
        if (C[i] <= j + 1) {
            dp[j] = Math.max(dp[j] || 0, (dp[j - C[i]] || 0) + W[i])
        } else dp[j] = dp[j]
    }
}

dp = new Array(V).fill(0)
// 完全背包问题：
// 就是01背包问题的一个变种，此种问题未01背包条件改成每个物品可以无限拿，那么状态转义方程就变成了：
// F(i, v) = Math.max(F(i-1, v), F(i, v-C[i]) + W[i])
// 代码也就是上边的01背包问题，从前往后遍历就可以了：
for (let i = 0; i < 6; i++) {
    for (let j = 0; j < V; j++) { // 这里有变化之前为(let j = V - 1; j >= 0; j--)
        if (C[i] <= j + 1) {
            dp[j] = Math.max(dp[j] || 0, (dp[j - C[i]] || 0) + W[i])
        } else dp[j] = dp[j]
    }
    console.log(dp)
}