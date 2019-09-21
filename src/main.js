import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
// import video_new from './component/video_new'
// Vue.component("VideoNew",video_new)
import MintUI from 'mint-ui'
import { Toast, MessageBox, DatetimePicker, Picker, Popup } from 'mint-ui'
import VConsole from 'vconsole/dist/vconsole.min.js' //import vconsole
import Viewer from 'viewerjs';
import 'mint-ui/lib/style.css'
import 'viewerjs/dist/viewer.css'
import './sass/gu_template.css'
import './css/normalize.css'
import './css/Project.css'
import './css/fonts/font.css'
import './css/iconfont/iconfont.css'
import 'video.js/dist/video-js.css'
import { getCookie, getMd5 } from './public/index.js'
import qs from 'qs';
// import VueVideoPlayer from 'vue-video-player'
//VideoPlayer
// import VideoPlayer from 'vue-video-player'
// require('video.js/dist/video-js.css')
// require('vue-video-player/src/custom-theme.css')
// Vue.use(VideoPlayer)

//全局登录弹窗组件
import ModelToast from './public/toast'
Vue.use(ModelToast)

//全局赠课弹窗组件
import GifToast from './public/GifToast'
Vue.use(GifToast)
let vConsole = new VConsole() // 初始化

import { axios } from "./public/utils"
//图片懒加载
import VueLazyload from 'vue-lazyload'

Vue.prototype.$axios = axios
Vue.prototype.$Toast = Toast
Vue.prototype.$MessageBox = MessageBox
Vue.prototype.$Picker = Picker
Vue.prototype.$DatetimePicker = DatetimePicker
Vue.prototype.$Popup = Popup
const img = new Image();
const viewer = new Viewer(img,{toolbar:false,navbar:false,title:false})
Vue.prototype.ShowViewer = (src) => {
  img.src = src
  viewer.show();
}
Vue.config.productionTip = false

const error = require('../static/img/bg.png')
// 懒加载
Vue.use(MintUI, {
  //懒加载
  lazyload: {
    preLoad: 1.3,
    error: error,
    loading: error,
    // attempt: 1
  }
})

// 路由钩子
router.beforeEach((to, from, next) => {
  //设置页面头部
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (to.path == '/phonelogin' || to.path == '/emaillogin') {
    if (from.path == '/phoneforgetpasswordtwo' ||
      from.path == '/emailforgetpasswordtwo' || from.path == '/phonecaptchalogin' ||
      from.path == '/phoneregisterone' || from.path == '/phoneforgetpasswordone' || from.path == '/'
      || from.path == '/emailregisterone' || from.path == '/emailforgetpasswordone') {
      let url = window.localStorage.getItem('url')
      window.localStorage.setItem('url', url)
    } else {
      window.localStorage.setItem('url', from.fullPath)
    }
  }
  next()
})
//判断是不是微信页面来设置头部内容
let isWeiXin = () => {
  return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
}
if (isWeiXin()) {
  Vue.prototype.$flag = true
} else {
  Vue.prototype.$flag = false
}
let vue = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
