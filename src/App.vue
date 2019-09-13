<template>
  <div id="app">
      {{msg}}
    <button @click="click">按钮</button>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
        msg:""
    };
  },
  created() {
  },
  methods: {
      click(){
          this.msg="试试点击效果"
      }
  }
};
</script>

