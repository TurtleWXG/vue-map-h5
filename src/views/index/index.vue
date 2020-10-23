<template>
  <div id="app">
    <div id="container"></div>
    <map-detail v-if="!type" class="abc" :detailData="detailData"></map-detail>
    <building-map-detail v-else class="abc" :detailData="detailData"></building-map-detail>
  </div>
</template>

<script>
import AMap from 'AMap'
import MapDetail from '@/components/MapDetail/MapDetail'
import buildingMapDetail from '@/components/MapDetail/buildingMapDetail'
import { loadHouseRoomDetailQrcode, loadHouseBuildingDetailQrcode } from '@/api/house/house'
export default {
  name: 'App',
  data() {
    return {
      detailData: {},
      qrcodeId: '',
      type: ''
    }
  },
  mounted() {
    // const param = window.location.search.substring(1)
    this.qrcodeId = this.getQueryVariable('id') ? this.getQueryVariable('id') : '' 
    this.type = this.getQueryVariable('type') == 'house' ? true : false
    if(!this.type){
        this.loadData()
    } else {
        this.buildingLoadData()
    }
  },
  methods: {
    getQueryVariable(variable) {
      var query = window.location.search.substring(1)
      var vars = query.split('&')
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=')
        if (pair[0] == variable) {
          return pair[1]
        }
      }
      return false
    },
    init(lng = 116.542582, lat = 40.035219) {
      const MAP = new AMap.Map('container', {
        center: [lng, lat],
        resizeEnable: true,
        zoom: 15
      })
      if (lng !== 116.542582) {
        const Marker = new AMap.Marker({
          position: new AMap.LngLat(lng, lat),
          title: '北京'
        })
        MAP.add(Marker)
      }
    },
    async loadData() {
      const res = await loadHouseRoomDetailQrcode({ qrcodeId: this.qrcodeId })
      // const res = await loadHouseRoomDetailQrcode({ qrcodeId: '1547bbc3fdd27706651b8b956f14c04e7c5629f3' })
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
    },
    async buildingLoadData() {
      const res = await loadHouseBuildingDetailQrcode({ qrcodeId: this.qrcodeId })
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
    MapDetail,
    buildingMapDetail
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
