import Vue from 'vue'
import App from './App'
import './weui.wxss'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
