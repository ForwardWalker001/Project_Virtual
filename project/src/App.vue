<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { setStorage } from "./util/StorageMan";
export default {
  name: 'App',
  components: {
    
  },
  created() {
    setStorage('score',0,0.5)
  }
}
</script>

<style>
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
#app {
  width: 100%;
  height: 100%;
}
</style>
