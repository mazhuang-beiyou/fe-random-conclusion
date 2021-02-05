<template>
    <div>
        <input class="input" v-model="nums" />
        <node :nodeData="treeData" />
    </div>
</template>

<script>
import node from './node.vue'
class treeNode {
    constructor(val) {
        this.val = val
        this.left = null
        this.right = null
    }
}
export default {
    components: {
        node
    },
    data() {
        return {
            nums: '1, 2, 3, 4, 5, 6, 7',
            treeData: null
        };
    },
    computed: {
        treeArr() {
            return this.nums.split(',')
        }
    },
    watch: {
        nums() {
            this.construct()
        }
    },
    created() {
        this.construct()
    },
    methods: {
        construct() {
            this.treeData = new treeNode(this.treeArr[0])
            this.build(this.treeData, 0)
        },
        build(node, index) {
                if (!node) return
                const left = index * 2 + 1
                if (this.treeArr[left]) {
                    node.left = new treeNode(this.treeArr[left])
                    this.build(node.left, left)
                }
                const right = this.treeArr[index*2+2]
                if (right) {
                    node.right = new treeNode(right)
                    this.build(node.right, index*2+2)
                }
            }
    }
};
</script>

<style scoped>
.input {
    width: 500px;
}
</style>
