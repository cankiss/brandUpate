<template>

  <div class="container has-header">

    <mheader :text="pageTitle"></mheader>

    <section class="main">

      <div class="logo"><img src="../../../assets/find/aboutAPP/logo.png"></div>

      <group class="aboutAPP-group">
        <cell title="官方微博" value="亿宝贷"></cell>
        <cell title="官方微信" value="亿宝金服"></cell>
        <cell title="官方网站" value="www.001bank.com"></cell>
        <cell title="版本号" value="V3.4"></cell>
      </group>

    </section>

  </div>

</template>

<script>

  import mheader from '../../common/m-header.vue';
  import {Group, Cell} from 'vux';

  export default {
    components: {
      mheader, Group, Cell
    },
    data() {
      return {
        pageTitle: '关于APP'
      }
    },
    metaInfo() {
      return {
        title: this.pageTitle
      }
    }
  }

</script>

<style scoped>

  .logo {
    padding: 18px 0 28px;
    text-align: center;
  }

  .logo img {
    width: 120px;
    height: 120px;
    margin: 0 auto;
  }

</style>

<style>

  .aboutAPP-group .weui-cells {
    margin-top: 0 !important;
  }

  .aboutAPP-group .weui-cells .vux-label {
    font-size: 16px;
    color: #666;
  }

  .aboutAPP-group .weui-cells .weui-cell__ft {
    font-size: 16px;
    color: #333;
  }

</style>
