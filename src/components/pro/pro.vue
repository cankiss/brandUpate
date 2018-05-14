<template>
  <!--项目列表-->
  <div class="pro container has-header has-footer">
    <XHeader :left-options="{showBack: false}" title="slot:overwrite-title">
      <div class="overwrite-title-demo" slot="overwrite-title">
        <tab :line-width="4" bar-active-color="#FF6E66" custom-bar-width="30px">
         <!--  <tab-item :selected="tabPath=='/pro/ztlist'">
            <router-link to="/pro/ztlist">
              精选团标
            </router-link>
          </tab-item> -->
          <tab-item :selected="tabPath=='/pro/yxlist'" link="/yxlist">
            <router-link to="/pro/yxlist">
              亿宝优选
            </router-link>
          </tab-item>
          <tab-item :selected="tabPath=='/pro/sblist'" link="/sblist">
            <router-link to="/pro/sblist">
              散标计划
            </router-link>
          </tab-item>
        </tab>
      </div>
    </XHeader>
    <router-view :imgList="imgList" />
    <mfooter :pageName="pageName">
    </mfooter>
  </div>
</template>

<script>
  import {
    XHeader,
    Tab,
    TabItem,
    Flexbox,
    FlexboxItem,
    XProgress
  } from "vux"
  import mfooter from "../common/m-footer.vue";
  export default {
    components: {
      mfooter,
      XHeader,
      Tab,
      TabItem,
      Flexbox,
      FlexboxItem,
      XProgress
    },
    data() {
      return {
        pageName: "pro",
        listItem: 1,
        tabPath: '/pro/sblist',
        imgList: {
          znpp: require('../../assets/pro/product_smart.png'),
          zdxt: require('../../assets/pro/product_auto.png'),
          zjbzg: require('../../assets/pro/product_money.png'),
          qedf: require('../../assets/pro/product_shortPro.png'),
          dcbz: require('../../assets/pro/prodct_set.png'),
          jlcf: require('../../assets/pro/product_low.png'),
          zjld: require('../../assets/pro/product_guarantee.png'),
        }
      }
    },
    methods: {
      onItemClick(item) {
        this.listItem = item;
      },
      tablist() {
        this.tabPath = this.$route.path;
      }
    },
    mounted() {
      this.$nextTick(() => {
        // this.listItem = this.$route.params.type;
        this.tabPath = this.$route.path;
        // console.log(this.listItem);
      })
    },
    watch: {
      '$route': 'tablist'
    }
  }
</script>

<style>
  .pro .vux-header {
    background: #fff;
    color: #BFBFBF;
    padding: 2px 0;
    box-shadow: 0 10px 0 0 #f5f5f5;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    max-width: 750px;
    margin: auto;
    margin-bottom: 10px;
  }
  .pro.container.has-footer {
    margin-top: 57px;
  }
  .pro .vux-header .vux-header-title-area {
    margin: 0 34px;
  }
  .pro .vux-header .vux-tab {
    height: 41px;
  }
  .pro .vux-tab .vux-tab-item {
    font-size: 18px;
  }
  .pro .vux-tab .vux-tab-item a {
    color: #333;
  }
  /* .pro .list-group {
          padding-top: 6px;
      } */
  .list-item {
    background: #fff;
    box-sizing: border-box;
    padding: 16px;
    font-size: 14px;
    margin-bottom: 10px;
  }
  .item-title-label {
    display: inline-block;
    border: 1px solid #43A0FF;
    border-radius: 2px;
    color: #43A0FF;
    line-height: 19px;
    width: 57px;
    text-align: center;
    margin-left: 19px;
    font-size: 12px;
  }
  .item-title-label-new {
    border: 1px solid #FE6862;
    color: #FE6862;
    margin-left: 5px;
  }
  .left-line {
    border-left: 1px solid #F5F5F5;
  }
  .rate-num {
    font-size: 36px;
    line-height: 36px;
  }
  .pro .weui-progress__inner-bar {
    background-color: #43A0FF;
  }
  .residual-amount {
    padding-left: 0px;
  }
  .btn {
    width: 85px;
    line-height: 30px;
    color: #fff;
    display: inline-block;
    background: #FF665E;
    border: 1px solid #FF665E;
    border-radius: 4px;
    margin-left: -8px;
  }
  .date-type {
    margin-top: 11px;
  }
  .instructions {
    margin-top: 0 !important;
  }
  .instructions p {
    text-align: center;
  }
  .instructions img {
    display: inline-block;
    width: auto;
    height: 48px;
  }
  .full {
    border: 1px solid #CCCCCC;
    border-radius: 4px;
    background: #fff;
    color: #999;
  }
</style>
