// import Vue from 'vue'
import axios from 'axios'
const baseURL = process.env.baseURL
// 创建 axios 实例
const service = axios.create({
  baseURL: baseURL, // api base_url
  timeout: 30000 // 请求超时时间
})

const err = error => {
  if (error.response) {
    console.log('error.response: ', error.response)
  }
  return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use(config => {
  // const token = Vue.ls.get(ACCESS_TOKEN)
  // if (token) {
  //   config.headers['X-TOKEN'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
  // }
  // return config
}, err)

// response interceptor
service.interceptors.response.use(response => {
  return response.data
}, err)

export { service as axios }
