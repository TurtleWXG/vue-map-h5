<template>
  <div class="view-container">
    <div class="scroll-view">
      <div v-for="(item, index) in list" :key="index">
        <div class="view-item">
          <div class="view-title">{{ item.name | isNull }}</div>
          <div class="view-list">
            <div class="list-item">
              <div class="item-title">联系电话</div>
              <div class="item-content">{{ item.telephone | isNull }}</div>
            </div>
            <div class="list-item">
              <div class="item-title">上班时间</div>
              <div class="item-content">{{ item.workTimed | isNull }}</div>
            </div>
            <div class="list-item">
              <div class="item-title">详细地址</div>
              <div class="item-content">{{ item.address | isNull }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getInnerUnit } from '@/api/house/house'
export default {
  name: 'detail',
  data() {
    return {
      code: '',
      list: []
    }
  },
  mounted() {
    const param = window.location.search.substring(1)
    this.code = param.split('=')[1]
    this.loadData()
  },
  methods: {
    async loadData() {
      const { code, data, msg } = await getInnerUnit({ areaNumber: this.code })
      if (code === 200) {
        this.list = data
      } else {
        console.error(msg || '请求出错!')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/list-detail.scss';
</style>
