import { axios } from '@/utils/request'
const URL = '/house_room'

// 通过二维码id获取房屋套间登记信息 (管理员)
export function loadHouseRoomDetailQrcode(param) {
  return axios.request({
    url: URL + '/qrcode/detail',
    method: 'GET',
    params: param
  })
}

// 获取周边
export function getInnerUnit(param) {
  return axios.request({
    url: '/unit/important/getInnerUnit',
    method: 'GET',
    params: param
  })
}
