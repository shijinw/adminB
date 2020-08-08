// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import ViewUI from 'view-design';
import {Tree, Button} from 'element-ui';
import i18n from '@/locale';
import config from '@/config';
import importDirective from '@/directive';
import 'view-design/dist/styles/iview.css';
import 'element-ui/lib/theme-chalk/index.css';
import './index.less';
import '@/assets/icons/iconfont.css';
import Vue2OrgTree from 'vue2-org-tree';
import echarts from 'echarts';
import 'echarts/lib/chart/line';
import VueKindEditor from 'vue-kindeditor';
import 'kindeditor/kindeditor-all-min.js';
import 'kindeditor/themes/default/default.css';
// const Vue = require('vue')
// import watermark from '@/assets/watermark.js'
// Vue.prototype.$watermark = watermark
// var socket = io('http://dests.youcaiwx.cn:2120')
// socket.on('connect', function () {
//   socket.emit('login', 555)
// })

// // 后端推送来消息时
// socket.on('new_msg', function (msg) {
//   let json = JSON.parse(msg)
//   Message.success(json.value)
// })
Vue.use (Tree);
Vue.use (Button);
if (!window.iview) {
  Vue.use (ViewUI, {
    i18n: (key, value) => i18n.t (key, value),
  });
}
// Vue.use(ElementUI)
Vue.use (Vue2OrgTree);
Vue.use (VueKindEditor);

Vue.config.productionTip = false;

/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config;
/**
 * 注册指令
 */
importDirective (Vue);

/* eslint-disable no-new */
new Vue ({
  el: '#app',
  router,
  i18n,
  store,
  echarts,
  render: h => h (App),
});
