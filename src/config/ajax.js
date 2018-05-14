/*
 * @Author: wzc0x0@gmail.com
 * @Date: 2017-11-04 22:44:52
 * @Feature: Package ajax function by flyio & add global loading style when ajax
 * Release global variable in webpack.base.conf.js when compile
 */

import fly from "flyio"
import qs from 'qs'
import store from "@/store"

import Vue from "vue";
import { ToastPlugin } from "vux";
Vue.use(ToastPlugin);

const _store = require('store')

const jsonChange = data => {
    return (typeof(data) == "object" && Object.prototype.toString.call(data).toLowerCase() == "[object object]" && !data.length) ?
        data : JSON.parse(data)
}

fly.config.timeout = "20000";
fly.config.baseURL = BASEURL;

fly.interceptors.request.use((conf, promise) => {
    store.commit("updateLoadingStatus", { isLoading: true });
    return conf
})

fly.interceptors.response.use(
    (res, promise) => {
        store.commit("updateLoadingStatus", { isLoading: false });
        return jsonChange(res.data);
    },
    (err, promise) => {
        store.commit("updateLoadingStatus", { isLoading: false });
        Vue.$vux.toast.show({
            type: "text",
            text: "未知错误",
            position: "middle"
        });
        console.log(err)
    }
);


export const _post = (url, data, options) => fly.post(url, qs.stringify(data), options)

export const _userId = (url, data, options) => {
    data ? Object.assign(data, { userId: _store.get('user_id') }) : data = { userId: _store.get('user_id') }
    return fly.post(url, qs.stringify(data), options)
}

export default fly