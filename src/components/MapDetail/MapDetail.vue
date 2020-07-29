<template>
  <div class="view-container">
    <i class="iconfont icon-zuojiantou-copy"></i>
    <div class="view-content" :style="{ height: winHeight }">
      <div
        class="icon-box"
        @click="
          () => {
            show = !show
          }
        "
      >
        <i class="jiantou iconfont" :class="[!show ? 'icon-shangjiantou' : 'icon-jiantou9']"></i>
      </div>
      <div class="scroll-view">
        <div class="view-item">
          <div class="view-title">房屋信息</div>
          <div class="view-list">
            <div class="list-item">
              <div class="item-title">房屋地区</div>
              <div class="item-content">{{ ('北京市' + (house.areaName + house.streetName)) | isNull }}</div>
            </div>
            <div class="list-item">
              <div class="item-title">房屋地址</div>
              <div class="item-content">{{ (house.communityName + house.houseNumber + house.room) | isNull }}</div>
            </div>
            <div class="list-item">
              <div class="item-title">房屋用途</div>
              <div class="item-content">{{ houseRoomInfo.houseUsed | fmtDict(houseUsedDict) }}</div>
            </div>
            <div class="list-item">
              <div class="item-title">房屋类型</div>
              <div class="item-content">{{ houseRoomInfo.houseType | fmtDict(houseTypeDict) }}</div>
            </div>
            <div class="list-item">
              <div class="item-title">土地性质</div>
              <div class="item-content">{{ houseRoomInfo.landStatus | fmtDict(landPropertyDict) }}</div>
            </div>
            <div class="list-item">
              <div class="item-title">房屋层数</div>
              <div class="item-content">{{ houseRoomInfo.floorNums | isNull }}</div>
            </div>
            <div class="list-item">
              <div class="item-title">管理类型</div>
              <div class="item-content">{{ houseRoomInfo.manageType | fmtDict(manageTypeDict) }}</div>
            </div>
            <template v-if="houseRoomInfo.isDanger && houseRoomInfo.isDanger === '1'">
              <div class="list-item">
                <div class="item-title">治安隐患</div>
                <div class="item-content">{{ trouble.securityTrouble | fmtCheckBoxDict(securityTroubleDict) }}</div>
              </div>
              <div class="list-item">
                <div class="item-title">消防隐患</div>
                <div class="item-content">
                  {{ trouble.fireControlTrouble | fmtCheckBoxDict(fireControlTroubleDict) }}
                </div>
              </div>
              <div class="list-item">
                <div class="item-title">不稳定风险</div>
                <div class="item-content">{{ trouble.instabilityTrouble | isNull }}</div>
              </div>
              <div class="list-item">
                <div class="item-title">群租及其他</div>
                <div class="item-content">{{ trouble.otherTrouble | fmtCheckBoxDict(otherTroubleDict) }}</div>
              </div>
            </template>
            <div class="list-item">
              <div class="item-title">房屋产权类型</div>
              <div class="item-content">{{ list.propertyType | fmtDict(houseEquityDict) }}</div>
            </div>
          </div>
        </div>
        <div class="view-item">
          <div class="view-title">社区信息</div>
          <div class="view-list">
            <block v-for="item in policeList" :key="item.id">
              <div class="list-item">
                <div class="item-title">社区民警</div>
                <div class="item-content">{{ (item.name + ' -- ' + item.mobilePhone) | isNull }}</div>
              </div>
            </block>
            <div class="list-item">
              <div class="item-title">派出所名称</div>
              <div class="item-content">{{ policeStation.policeStation | isNull }}</div>
            </div>
            <div class="list-item">
              <div class="item-title">派出所地址</div>
              <div class="item-content">{{ policeStation.address | isNull }}</div>
            </div>
            <block v-for="item in policeStation.policeStationHotlineList" :key="item.number">
              <div class="list-item">
                <div class="item-title">派出所电话</div>
                <div class="item-content">{{ item.phoneNumber | isNull }}</div>
              </div>
            </block>
            <div class="list-item">
              <div class="item-title">孙河地区热线(24小时)</div>
              <div class="item-content">13231341221</div>
            </div>
            <div class="list-item">
              <div class="item-title">孙河社区卫生服务中心</div>
              <div class="item-content">010-87544123</div>
            </div>
            <div class="list-item">
              <div class="item-title">康营家园三社区居委会</div>
              <div class="item-content">010-87544123</div>
            </div>
            <div class="list-item">
              <div class="item-title">三社区流管所</div>
              <div class="item-content">010-87544123</div>
            </div>
            <div class="list-item">
              <div class="item-title">孙河物业(二、三社区)</div>
              <div class="item-content">010-87544123</div>
            </div>
          </div>
        </div>
        <div class="view-item" v-if="checkinList.length !== 0">
          <div class="view-title">居住人员</div>
          <div class="view-list">
            <block v-for="(item, index) in checkinList" :key="index">
              <div class="list-item">
                <div class="item-title">人员信息</div>
                <div class="item-content">{{ (item.name + ' -- ' + item.phone) | isNull }}</div>
              </div>
            </block>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  nationalityDict,
  provinceListDict,
  houseEquityDict,
  rentUseTypeDict,
  rentChargeTypeDict,
  contractExistDict,
  recordsExistDict,
  taxesExistDict,
  liabilityPaperTypeDict,
  xbDict,
  zzmmDict,
  auditStatusDict,
  houseUsedDict,
  houseTypeDict,
  landPropertyDict,
  manageTypeDict,
  hasDict,
  securityTroubleDict,
  fireControlTroubleDict,
  otherTroubleDict,
  cardTypeDict,
  censusRegisterTypeDict
} from '@/utils/dict'
const IMGbaseURL = process.env.VUE_APP_mapIconUrl
export default {
  name: 'MapDetail',
  data() {
    return {
      houseEquityDict,
      nationalityDict,
      provinceListDict,
      rentUseTypeDict,
      rentChargeTypeDict,
      contractExistDict,
      recordsExistDict,
      taxesExistDict,
      liabilityPaperTypeDict,
      zzmmDict,
      xbDict,
      auditStatusDict,
      houseUsedDict,
      houseTypeDict,
      landPropertyDict,
      manageTypeDict,
      hasDict,
      securityTroubleDict,
      fireControlTroubleDict,
      otherTroubleDict,
      cardTypeDict,
      censusRegisterTypeDict,

      list: {}, // 信息列表
      house: {}, // 房屋基本信息列表
      policeList: {}, // 民警信息列表
      policeStation: {}, // 派出所信息列表
      houseRoomInfo: {}, // 房屋详细信息列表
      trouble: {}, // 房屋隐患信息列表
      checkinList: [], // 房屋隐患信息列表

      show: false,

      WindowHeight: 0,

      amapPlugin: '',

      IMGbaseURL,

      markers: [
        {
          latitude: 0,
          longitude: 0,
          iconPath: IMGbaseURL + 'location.png'
        }
      ],
      longitude: 0,
      latitude: 0
    }
  },
  computed: {
    winHeight() {
      if (this.show) {
        return this.WindowHeight - 40 + 'px'
      } else {
        return this.WindowHeight / 4 + 'px'
      }
    }
  },
  methods: {
    hasLength(obj) {
      const length = Object.keys(obj)
      return length.length === 0 ? false : true
    },
    // 弹窗
    showTips(msg = '请求出错, 请稍后再试', type = 'danger') {
      this.$refs.toast.showTips({
        msg,
        duration: 2000,
        type
      })
    },
    getWindowHeight() {
      this.WindowHeight = document.body.clientHeight
    }
  },
  mounted() {
    this.getWindowHeight()
    // if (options.data) {
    //   this.list = { ...JSON.parse(options.data) }
    //   this.house = this.list.house ? this.list.house : {}
    //   this.longitude = this.house.lng ? Number(this.house.lng) : 0
    //   this.latitude = this.house.lat ? Number(this.house.lat) : 0
    //   this.markers[0].latitude = this.latitude
    //   this.markers[0].longitude = this.longitude
    //   this.houseRoomInfo = this.house.houseRoomInfo ? this.house.houseRoomInfo : {}
    //   this.trouble = this.house.trouble ? this.house.trouble : {}
    //   this.checkinList = this.list.checkinList ? this.list.checkinList : []
    //   this.policeList = this.list.policeList ? this.list.policeList : {}
    //   this.policeStation = this.list.policeStation ? this.list.policeStation : {}
    // }
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/list-detail.scss';
@import '../../scss/icon/iconfont.css';
.view-container {
  position: relative;
  .view-content {
    position: absolute;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    transition: all 1s;
    display: flex;
    flex-direction: column;
    background-color: #c0c0c0;
    border-radius: 20px 20px 0 0;
    .icon-box {
      height: 70rpx;
      background-color: #fff;
      display: flex;
      justify-content: center;
      border-radius: 20px 20px 0 0;
      .jiantou {
        font-size: 45px;
      }
    }
    .scroll-view {
      flex: 1;
      overflow: hidden;
    }
  }
}
</style>
