<template>

</template>

<script>

  import wechat from '@/config/wechat';

  export default {
    components: {},
    data() {
      return {
        pageTitle: '微信登录授权验证'
      }
    },/*
    metaInfo() {
      return {
        title: this.pageTitle
      }
    },*/
    mounted() {
      let me = this;
      if (wechat.isWechatPlatform()) {
        window.location.href = wechat.getWechatAuthUrl(2);
      } else {
        me.$vux.alert.show({
          title: '提示',
          content: '请在微信中打开此页面',
          buttonText: '返回首页',
          onHide() {
            me.$router.push('/');
          }
        });
      }
    }
  }

</script>

<style scoped>

</style>
