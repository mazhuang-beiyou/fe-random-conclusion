<template>
    <div class="box">
        <div class="parent">{{ nodeData.val }}</div>
        <div class="children">
            <node v-if="nodeData.left" :nodeData="nodeData.left" />
            <node v-if="nodeData.right" :nodeData="nodeData.right" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'node',
    props: {
        nodeData: {
            default: null,
            type: Object
        }
    },
    data() {
        return {};
    }
};
</script>

<style scoped>
.box {
    margin: 5px 5px;
    text-align: center;
}
.children {
    display: flex;
    justify-content: center;
    text-align: center;
}
.parent {
    display: inline-block;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    border-radius: 50%;
    background: #16a83f;
}

</style>
