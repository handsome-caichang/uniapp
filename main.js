import Vue from 'vue'
import App from './App'
import api from './api/index.js'
import store from './store'

import mock from './mock/mock.js'

Vue.config.productionTip = false

Vue.prototype.$store = store

// 实际请求
Vue.prototype.api = api

// 模拟请求
Vue.prototype.$api = mock

App.mpType = 'app'


const app = new Vue({
    store,
    ...App
})
app.$mount()
