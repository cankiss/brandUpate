import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import FastClick from 'fastclick';
import fly, { _post, _userId } from "@/config/ajax";
import filters from '@/config/filter'
import ybd_config from "@/config/config"
import Meta from 'vue-meta' //custom document title
import { AlertPlugin, ConfirmPlugin, LoadingPlugin, ToastPlugin } from "vux";
import infiniteScroll from "vue-infinite-scroll"; //see it https://github.com/ElemeFE/vue-infinite-scroll
import appBridge from '@/config/appBridge'

import 'babel-polyfill' //will add some ployfill depend on .babelrc `targets`


Vue.prototype.$post = _post
Vue.prototype.$http = fly
Vue.prototype.$mine = _userId //auto add userId when you send ajax but you must make sure user_id existed
Vue.prototype.storage = require('store') //Cross-browser storage for all use cases, used across the web.
Vue.prototype.ybd_config = ybd_config //全局静态配置 和环境无关
Vue.prototype.appBridge = appBridge //appBridge(ios and android bridge)


Vue.use(Meta)
Vue.use(AlertPlugin);
Vue.use(ConfirmPlugin);
Vue.use(LoadingPlugin);
Vue.use(ToastPlugin);
Vue.use(infiniteScroll);

FastClick.attach(document.body)

Vue.config.productionTip = false

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})
