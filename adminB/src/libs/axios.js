import axios from 'axios'
import { getToken } from '@/libs/util'
import { Message } from 'iview'
import config from '@/config'
class HttpRequest {
  constructor (baseUrl = baseURL) {
    if (process.env.NODE_ENV === 'production') {
      switch (document.domain) {
        case 'dests.youcaiwx.cn':
          this.baseUrl = config.baseUrl.test
          break
        case 'ycdb.youcaiwx.cn':
          this.baseUrl = config.baseUrl.pro
          break
        default:
          this.baseUrl = baseUrl
          break
      }
    } else {
      this.baseUrl = baseUrl
    }
    this.queue = {}
  }
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        'tokens': getToken()
      }
    }
    return config
  }
  distroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
      }
      this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      this.distroy(url)
      const { data, status } = res
      setTimeout(() => {
        if (!data) {
          Message.error('当前操作失误，请注意')
        }
      }, 10000)
      return { data, status }
    }, error => {
      this.distroy(url)
      return Promise.reject(error)
    })
  }
  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
