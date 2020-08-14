<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
#app {
  width: 750px;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
}
#container {
  width: 100%;
  height: 50vh;
}
</style>
