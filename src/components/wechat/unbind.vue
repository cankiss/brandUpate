<template>

  <div class="container has-header">

    <mheader :isBack="isBack" @leftBack="leftBack" :text="pageTitle"></mheader>

    <section class="main">

      <headLogo></headLogo>

      <p class="intro">尊敬的用户，您已经开启了免登录模式，如想关闭，请点击下方按钮！</p>

      <div class="unbind-button">
        <x-button action-type="button" type="warn" @click.native="onUnBind">解除账号绑定</x-button>
      </div>

    </section>

  </div>

</template>

<script>

  import mheader from '../common/m-header.vue';
  import headLogo from "../loginregistr/headLogo.vue";
  import {XButton} from 'vux';
  import wechat from '@/config/wechat';

  export default {
    components: {
      mheader, headLogo, XButton
    },
    data() {
      return {
        pageTitle: '账号解绑',
        isBack: true,
        wechatCode: ''
      }
    },
    metaInfo() {
      return {
        title: this.pageTitle
      }
    },
    created() {
      let code = this.$route.query.code;
      if (code) {
        this.wechatCode = code;
      } else {
        this.$vux.toast.show({
          type: 'warn',
          text: '参数错误',
          position: 'middle',
          onHide() {
            this.$router.push('/');
          }
        });
      }
    },
    mounted() {
    },
    methods: {
      leftBack() {
        this.$router.push('/');
      },
      onUnBind() {

        let me = this;
        me.$vux.confirm.show({
          title: '解绑提示',
          content: '您确定要解绑？',
          onConfirm() {
            me.unBindAjax();
          }
        });

      },
      unBindAjax() {

        let me = this;

        if (me.wechatCode) {

          me.$post('user/deleteByCode', {code: me.wechatCode}).then(res => {

            if (res.code == '200') {

              me.$vux.toast.show({
                type: 'success',
                text: '解绑成功',
                position: 'middle',
                onHide() {
                  me.$router.push('/');
                }
              });

            } else if (res.code == '1513' || res.code == '1514') {

              me.$vux.toast.show({
                type: 'warn',
                text: '解绑失败',
                position: 'middle',
                onHide() {
                  me.$router.push('/');
                }
              });

            } else {

              me.$vux.toast.show({
                type: 'warn',
                text: res.msg,
                position: 'middle',
                onHide() {
                  me.$router.push('/');
                }
              });

            }

          }).catch(error => {

            me.$vux.toast.show({
              type: 'warn',
              text: (error && error.message) ? error.message : '未知错误',
              position: 'middle',
              onHide() {
                me.$router.push('/');
              }
            });

          });

        } else {

          me.$vux.toast.show({
            type: 'warn',
            text: '参数错误',
            position: 'middle',
            onHide() {
              me.$router.push('/');
            }
          });

        }

      }
    }
  }

</script>

<style scoped>

  .main {
    padding-top: 0;
  }

  .intro {
    margin: 24px 5%;
    font-size: 12px;
    color: #666;
    line-height: 16px;
  }

  .unbind-button {
    margin: 24px 5%;
  }

</style>


