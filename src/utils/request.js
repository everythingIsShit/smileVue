
import axios from 'axios'
import { Toast } from 'vant'

function handleResult (promiseObj) {
  return new Promise((resolve, reject) => {
    promiseObj.then(res => {
      if (res.status === 200) {
        if (res.data.code === 200 || !res.data.code) {
          resolve(res.data)
        } else { // 请求错误
          // Toast.fail(res.data.message)
          Toast.fail('请求错误')
          reject(res.data)
        }
      } else { // 服务器错误
        // Toast.fail(res.message)
        Toast.fail('服务器错误')
        reject(res.data)
      }
    }).catch(err => { // 网络错误
      // Toast.fail(err)
      Toast.fail('网络错误')
      reject(err)
    })
  })
}

export default {
  post (url = '/', paramObj) {
    return handleResult(axios.post(url, paramObj))
  },
  get (url = '/') {
    return handleResult(axios.get(url))
  }
}
