<template>

  <div class="container has-header">

    <mheader :text="pageTitle"></mheader>

    <!--<mheader :text="pageTitle" @rightMore="wechatShare">-->
    <!--<img slot="rightHtml" src="../../../assets/common/share.png">-->
    <!--</mheader>-->

    <section class="main">

      <p class="wechat-qrcode"><img src="../../../assets/find/wechat/qrcode.png"></p>

      <!--<div class="wechat-text text-center">-->
      <!--<div class="wechat-center">-->
      <!--<p class="font-size-12 font-333;">方式一：微信扫一扫图中二维码，关注亿宝金服</p>-->
      <!--<p class="font-size-12 font-333;">方式二：打开微信-右上角+-添加朋友-搜索“亿宝金服”</p>-->
      <!--</div>-->
      <!--</div>-->

    </section>

  </div>

</template>

<script>

  import mheader from '../../common/m-header.vue';

  export default {
    components: {
      mheader
    },
    data() {
      return {
        pageTitle: '关注微信'
      }
    },
    methods: {
//      wechatShare() {
//        this.$vux.toast.show({
//          type: 'text',
//          text: '功能调试中',
//          position: 'middle'
//        })
//      }
    },
    metaInfo() {
      return {
        title: this.pageTitle
      }
    }
  }

</script>

<style scoped>

  .main {
    padding-top: 0;
  }

  .wechat-qrcode img {
    width: 100%;
    height: auto;
    display: block;
  }

  /*.wechat-text {*/
  /*padding: 10px 0;*/
  /*background-color: #fff;*/
  /*}*/

  /*.wechat-text .wechat-center {*/
  /*display: inline-block;*/
  /*}*/

  /*.wechat-text .wechat-center p {*/
  /*text-align: left;*/
  /*}*/

</style>
