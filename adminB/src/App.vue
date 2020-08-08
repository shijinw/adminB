<template>
  <div id="app">
    <router-view v-if="isAlive" />
  </div>
</template>

<script>
export default {
  name: 'App',
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      id: '',
      isAlive: true
    }
  },
  methods: {
    reload() {
      this.isAlive = false
      this.$nextTick(function() {
        this.isAlive = true
      })
    }
  }
}
</script>

<style lang="less">
.size {
  width: 100%;
  height: 100%;
}
html,
body {
  .size;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
#app {
  .size;
}
</style>
