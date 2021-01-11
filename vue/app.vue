<template>
    <div id="app">
        指令测试
        <input v-focus type="text">
    </div>
</template>
<script>
import Vue from 'vue'
Vue.directive('focus', {
  // When the bound element is inserted into the DOM...
  inserted: function (el) {
    // Focus the element
    el.focus()
  }
})
export default {
    data() {
        return {};
    }
};
</script>

<style scoped>
</style>
