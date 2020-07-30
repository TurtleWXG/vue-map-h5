<template>
  <div id="app">
    <div id="container"></div>
    <map-detail class="abc" :detailData="detailData"></map-detail>
  </div>
</template>

<script>
import AMap from 'AMap'
import MapDetail from '@/components/MapDetail/MapDetail'
import { loadHouseRoomDetailQrcode } from '@/api/house/house'
export default {
  name: 'App',
  data() {
    return {
      detailData: {},
      qrcodeId: ''
    }
  },
  mounted() {
    const param = window.location.search.substring(1)
    this.qrcodeId = param.split('=')[1]
    this.loadData()
  },
  methods: {
    init(lng = 116.397428, lat = 39.90923) {
      const MAP = new AMap.Map('container', {
        center: [lng, lat],
        resizeEnable: true,
        zoom: 15
      })
      if (lng !== 116.397428) {
        const Marker = new AMap.Marker({
          position: new AMap.LngLat(lng, lat),
          title: '北京'
        })
        MAP.add(Marker)
      }
    },
    async loadData() {
      const res = await loadHouseRoomDetailQrcode({ qrcodeId: this.qrcodeId })
      if (res.code === 200) {
        this.detailData = res.data
        if (res.data.house.lng) {
          this.init(res.data.house.lng, res.data.house.lat)
        } else {
          this.init()
        }
      } else {
        console.error(res.msg || '请求出错!')
        // this.showTips(res.msg)
      }
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
.abc {
  flex: 1;
}
</style>
