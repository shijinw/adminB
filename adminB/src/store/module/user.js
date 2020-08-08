import { login, logout, getUserInfo, getUserSysMenu } from '@/api/user'
// import { getRouterReq } from '@/api/routers'
import { setToken, getToken, routersConfigAssembly } from '@/libs/util'
import { menuRefactoring } from '@/libs/business_util'
import _ from 'lodash'
import { Message } from 'iview'

export default {
  state: {
    userName: '',
    userId: '',
    groupId: '',
    avatorImgPath: '',
    token: getToken(),
    access: '',
    mobile: '',
    email: '',
    is_teacher: '',
    is_answer: ''
  },
  mutations: {
    setAvator (state, avatorPath) {
      state.avatorImgPath = avatorPath
    },
    setUserId (state, id) {
      state.userId = id
    },
    setGroupId (state, id) {
      state.groupId = id
    },
    setUserName (state, name) {
      state.userName = name
    },
    setmobile (state, mobile) {
      state.mobile = mobile
    },
    setemile (state, email) {
      state.email = email
    },
    setAccess (state, access) {
      state.access = access
    },
    is_teacher (state, teacher) {
      state.is_teacher = teacher
    },
    is_answer (state, answer) {
      state.access = answer
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    }
  },
  actions: {
    // 登录
    handleLogin ({ commit }, { userName, password }) {
      userName = userName.trim()
      return new Promise((resolve, reject) => {
        login({
          userName,
          password
        }).then(res => {
          const data = res.data

          if (data.code === 200) {
            commit('setToken', data.data)
            Message.success('登录成功!')
            resolve()
          } else if (data.code === 403) {
            Message.error('账号已被冻结，请联系管理员!')
          } else {
            Message.error('账号或密码错误！')
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('setToken', '')
          commit('setAccess', [])
          commit('setRoutersConfig', { newRouters: [], routersData: [] }) // 变为静态路由
          window.localStorage.clear()
          resolve()
        }).catch(err => {
          reject(err)
        })
        // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
        // commit('setToken', '')
        // commit('setAccess', [])
        // resolve()
      })
    },
    // 获取用户相关信息
    getUserInfo ({ state, commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(res => {
          const data = res.data
          commit('setAvator', data.data.head_img)
          commit('setUserName', data.data.truename)
          commit('setUserId', data.data.id)
          commit('setGroupId', data.data.group_id)
          commit('setemile', data.data.email)
          commit('setmobile', data.data.mobile)
          commit('is_teacher', data.data.is_teacher)
          commit('is_answer', data.data.is_answer)
          resolve(data.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取用户路由
    getRoutersConfig ({ state, commit }) {
      /* 有标准路由JOSN模式
     return getRouterReq().then((routersData) => {
        let routersConfig = _.cloneDeep(routersData.data)
        let newRoutersConfigObj = routersConfigAssembly(routersConfig)
        commit('setRoutersConfig', { newRouters: newRoutersConfigObj, routersData: routersData.data })
        return newRoutersConfigObj
      }) */

      /* 需要转换菜单JOSN为标准路由JOSN模式 */
      return getUserSysMenu().then((routersData) => {
        //  console.log('获取到用户菜单：' + JSON.stringify(routersData.data))
        // 把菜单列表转为框架标准路由JSON格式
        let newRoutersData = menuRefactoring(routersData.data.data, '0')
        //  console.log("转换路由："+JSON.stringify(newRoutersData))
        let routersConfig = _.cloneDeep(newRoutersData)
        let newRoutersConfigObj = routersConfigAssembly(routersConfig)
        commit('setRoutersConfig', { newRouters: newRoutersConfigObj, routersData: newRoutersData })
        return newRoutersConfigObj
      })
    }

  }
}
