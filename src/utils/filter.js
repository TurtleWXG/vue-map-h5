import Vue from 'vue'

Vue.prototype.OK_CODE = 200

/**
 * @description 格式化字典
 * @date 2020-06-21
 * @param {(string | undefined)} name 选中项
 * @param {Dist[]} list 字典数组
 * @param {keyof Dist} [type='value'] 返回字典属性, 默认返回 value 属性
 */
export function fmtDict(name, list, type = 'value') {
  if (name || name === 0) {
    const index = list.findIndex(item => {
      return String(item.name) === String(name)
    })
    if (index !== -1) {
      return list[index][type] || '--'
    }
  } else {
    return '--'
  }
}
Vue.filter('fmtDict', fmtDict)

/**
 * @description 格式化 CheckBox 字典
 * @date 2020-06-21
 * @param {(string | undefined)} name 选中项, 会有多项, 逗号分隔
 * @param {Dist[]} list 字典数组
 * @param {keyof Dist} [type='value'] 返回字典属性, 默认返回 value 属性
 */

Vue.filter('fmtCheckBoxDict', function(name, list, type = 'value') {
  if (name === null || name === undefined) return
  const arr = name.split(',')
  if (arr && arr.length !== 0 && arr[0] !== '') {
    const str = arr.reduce((acc, cur) => {
      const index = list.findIndex(item => {
        return String(item.name) === String(cur)
      })
      acc = acc + list[index][type] + '，'
      return acc
    }, '')
    return str.slice(0, str.length - 1)
  } else {
    return '--'
  }
})

/**
 * @description 是否为空
 * @date 2020-06-21
 * @param {(string | number | undefined)} name 判断值
 */

Vue.filter('isNull', function(name) {
  if (name || name === 0) {
    return name
  } else {
    return '--'
  }
})
