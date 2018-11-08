
import axios from 'axios'
import { Toast } from 'vant'
import router from '../router'

// request拦截器
axios.interceptors.request.use(config => {
  // 加上token
  if (localStorage['token']) {
    config.headers['Authorization'] = `Bearer ${localStorage['token']}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

// response拦截器
axios.interceptors.response.use(
  response => {
    return Promise.resolve(response)
  },
  error => { // 默认除了2XX之外的都是错误的，就会走这里
    // 如果是token过期跳转到登录页
    if (error.response.status && error.response.status === 401) {
      // 清楚localStorage里的token信息
      localStorage.removeItem('token')
      router.replace('/login')
    }
    return Promise.reject(error)
  }
)

// 响应结果预处理
function handleResult (promiseObj) {
  return new Promise((resolve, reject) => {
    promiseObj.then(res => {
      if (res.status === 200) {
        if (res.data.code === 200 || !res.data.code) {
          resolve(res.data)
        } else { // 请求错误
          Toast.fail(res.data.message)
          reject(res.data)
        }
      } else { // 服务器错误
        // Toast.fail(res.message)
        Toast.fail('服务器错误')
        reject(res.data)
      }
    }).catch(err => { // 网络错误
      // Toast.fail(err)
      console.log(err)
      Toast.fail('网络错误')
      reject(err)
    })
  })
}

export default {
  post (url = '/', paramObj) {
    console.log(url)
    return handleResult(axios.post(url, paramObj))
  },
  get (url = '/') {
    return handleResult(axios.get(url))
  }
}
