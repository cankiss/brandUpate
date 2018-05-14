<template>

</template>

<script>

  import {querystring} from 'vux';
  import wechat from '@/config/wechat';

  /*import store from '@/store';
  this.$router.beforeEach(function(to) {
    store.commit("updateLoadingStatus", { isLoading: false });
  });*/

  export default {
    components: {},
    data() {
      return {
        pageTitle: '微信登录授权回调',
        wechatCode: '',
        state: ''
      }
    }, /*
    metaInfo() {
      return {
        title: this.pageTitle
      }
    },*/
    mounted() {
      let params = querystring.parse(window.location.search.substr(1));
      if (params && params.code && params.state) {
        this.wechatCode = params.code;
        this.state = params.state;
        this.handle();
      } else {
        this.$vux.toast.show({
          type: 'warn',
          text: '参数错误',
          position: 'middle',
          onHide() {
            window.location.href = '/'; //回首页
          }
        });
      }
    },
    methods: {
      handle() {

        let me = this;
        if (me.state.indexOf('autoLogin') != -1) { //处理自动登录

          me.state = me.state.replace('autoLogin', ''); //处理me.state里面的值

          me.$post('user/selectBycode', {code: me.wechatCode}).then(res => {

            if (res.code == '200') { //如果该微信号绑定过APP中的用户，则将数据写入到本地缓存，进行自动登录

              //将用户信息写入到本地缓存
              me.storage.set("couponPopup", res.model.couponPopup);
              me.storage.set("loginStatus", 1);
              me.storage.set("user_id", res.model.id);
              me.storage.set("inviteCode", res.model.inviteCode);
              me.storage.set("phone_num", res.model.mobile);

              //自动登录成功，跳回到用户登录前的页面
              me.$vux.toast.show({
                type: 'success',
                text: '自动登录成功',
                position: 'middle',
                onHide() {
                  window.location.href = '/#' + me.state;
                }
              });

            } else if (res.code == '1512' || res.code == '1513') { //如果该微信号没有绑定过APP中的用户，则直接跳回到手动登录页面

              window.location.href = '/#/login/2?redirect=' + me.state; //直接跳回到手动登录页面

            } else { //后台处理异常时

              me.$vux.toast.show({
                type: 'warn',
                text: res.msg,
                position: 'middle',
                onHide() {
                  window.location.href = '/#/login/2?redirect=' + me.state; //直接跳回到手动登录页面
                }
              });

            }

          }).catch(error => { //接口调用出错

            me.$vux.toast.show({
              type: 'warn',
              text: (error && error.message) ? error.message : '未知错误',
              position: 'middle',
              onHide() {
                window.location.href = '/#/login/2?redirect=' + me.state; //直接跳回到手动登录页面
              }
            });

          });

        } else if (me.state == '2') { //检查该微信用户是否有绑定过APP中的用户，有绑定则跳转到解绑页面，没有绑定则跳转到绑定页面（注：目前绑定微信自动登录的页面和普通的登录页面是共用同一个页面）

          me.$post('user/selectBycode', {code: me.wechatCode}).then(res => {

            if (res.code == '200') { //绑定过，跳转到解绑页面

              window.location.href = wechat.getWechatAuthUrl(4);

            } else if (res.code == '1512' || res.code == '1513') { //没有绑定过，跳转到绑定界面

              window.location.href = wechat.getWechatAuthUrl(3);

            } else { //后台处理异常时

              me.$vux.toast.show({
                type: 'warn',
                text: res.msg,
                position: 'middle',
                onHide() {
                  window.location.href = '/'; //跳转到首页
                }
              });

            }

          }).catch(error => { //接口调用出错

            me.$vux.toast.show({
              type: 'warn',
              text: (error && error.message) ? error.message : '未知错误',
              position: 'middle',
              onHide() {
                window.location.href = '/'; //跳转到首页
              }
            });

          });

        } else if (me.state == '3') { //处理跳转到绑定页面

          window.location.href = '/#/login/2?code=' + me.wechatCode;

        } else if (me.state == '4') { //处理跳转到解绑页面

          window.location.href = '/#/wechat/unbind?code=' + me.wechatCode;

        } else { //异常情况

          me.$vux.toast.show({
            type: 'warn',
            text: '非法调用',
            position: 'middle',
            onHide() {
              window.location.href = '/'; //跳转到首页
            }
          });

        }
      }
    }
  }

</script>

<style scoped>

</style>
