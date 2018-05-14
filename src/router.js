import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import find from '@/components/find'
import home from '@/components/home'
import newUser from '@/components/newUser'
import mine from '@/components/mine'
import register from '@/components/loginregistr'
import pro from '@/components/pro'
import wechatRouter from '@/components/wechat'
import notFound from '@/components/404'
import appBridge from '@/config/appBridge' //与原生APP交互的桥工具
import wechat from '@/config/wechat'

const _store = require('store')

Vue.use(Router)

const router = new Router({
  routes: [...home, ...find, ...mine, ...pro, ...register, ...wechatRouter, ...newUser,
    {
      path: "*",
      component: notFound
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return {x: 0, y: 0}
  }
});

//不同平台路由处理
const routerJump = {

  //APP平台
  appPlatform(to, from, next, sbType) {

    let tempAppBridge;
    if (sbType == '1') {                          //ios
      tempAppBridge = appBridge.ios;
    } else if (sbType == '2') {                   //android
      tempAppBridge = appBridge.android;
    } else {                                      //异常情况，直接当作h5平台处理
      routerJump.h5Platform(to, from, next);
      return;
    }

    if (!window.sessionStorage.getItem('sbType')) { //第一次进webView时，利用app桥去拿用户信息，如果拿到用户信息，则缓存到webView中，如果没有拿到，则不进行缓存
      _store.clearAll();
      window.sessionStorage.setItem('sbType', sbType);
      _store.set('sbType', sbType);
      tempAppBridge.getData((data) => {
        data.userId && _store.set('user_id', data.userId);
        data.mobile && _store.set('phone_num', data.mobile);
        if (to.matched.some(record => record.meta.requiresAuth)) {
          _store.get('user_id') ? next() : appBridge.sendData(sbType, 'goLogin', {redirect: to.fullPath});
        } else {
          next();
        }
      });
    } else { //不是第一次进webView时，则从缓存里面去取用户信息，如果缓存里面也没取到用户信息，直接跳转到APP登录页面
      if (to.matched.some(record => record.meta.requiresAuth)) {
        _store.get('user_id') ? next() : appBridge.sendData(sbType, 'goLogin', {redirect: to.fullPath});
      } else {
        next();
      }
    }

  },

  //微信平台
  wechatPlatform(to, from, next) {
    routerJump.h5Platform(to, from, next);
    // if(wechat.isWechatPlatform()){
    //   window.location.href = wechat.getWechatAuthUrl('autoLogin' + to.fullPath);
    // }else{
    // }
  },

  //h5浏览器平台
  h5Platform(to, from, next) {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!_store.get('user_id')) {
        next({
          path: "/login/2",
          query: {redirect: to.fullPath}
        });
      } else {
        next();
      }
    } else {
      next();
    }
  }

};

//路由跳转前处理
router.beforeEach(function (to, from, next) {

  // Global loading status by router switch
  store.commit("updateLoadingStatus", {isLoading: true});

  //从sessionStorage中去拿sbType的值，如果拿不到，则从url中去拿
  let sbType = window.sessionStorage.getItem('sbType') || to.query.sbType;

  //APP平台
  if (sbType) {
    routerJump.appPlatform(to, from, next, sbType);
    return
  }

  //微信平台
  if (wechat.isWechatPlatform()) {
    routerJump.wechatPlatform(to, from, next);
    return
  }

  //h5浏览器平台
  routerJump.h5Platform(to, from, next);

});

//路由跳转后处理
router.afterEach(function (to) {
  store.commit("updateLoadingStatus", {isLoading: false});
});

export default router
