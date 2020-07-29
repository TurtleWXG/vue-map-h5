<template>
  <div id="app">
    <div id="container"></div>
    <map-detail></map-detail>
  </div>
</template>

<script>
import AMap from 'AMap'
import MapDetail from '@/components/MapDetail/MapDetail'
export default {
  name: 'App',
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const MAP = new AMap.Map('container', {
        center: [116.397428, 39.90923],
        resizeEnable: true,
        zoom: 10
      })
      const Marker = new AMap.Marker({
        position: new AMap.LngLat(116.397428, 39.90923),
        title: '北京'
      })
      MAP.add(Marker)
    }
  },
  components: {
    MapDetail
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
#container {
  width: 750px;
  height: 100vh;
}
</style>
