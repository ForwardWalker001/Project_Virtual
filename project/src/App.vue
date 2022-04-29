<template>
  <div id="app" v-loading="loading"
    element-loading-text="拼命加载场景中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
    <router-view></router-view>
  </div>
</template>

<script>
import { setStorage } from "./util/StorageMan";
export default {
  name: 'App',
  data () {
    return {
      loading: false
    }
  },
  computed: {
  },
  components: {
    
  },
  created() {
    setStorage('score',0,0.5)
  },
  mounted() {
    this.$EventBus.$on('changLoad',(val)=>{
      this.loading = val
    })
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
