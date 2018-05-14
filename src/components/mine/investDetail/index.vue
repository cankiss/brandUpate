<template>
  <div class="yibaoTab">
    <div class="yibaoTab-wrap">
      <div class="back-icon-wrap" @click="$router.go(-1)">
        <p class="back-icon"></p>
      </div>
      <tab :line-width="4" bar-active-color="#FF6E66" custom-bar-width="30px" defaultColor="#BFBFBF" active-color="#333333">
        <tab-item :selected="$route.path.indexOf('zhitou') > 0" @on-item-click="$router.replace({'name':'zhitou'})">
          <span>亿宝智投</span>
        </tab-item>
        <tab-item :selected="$route.path.indexOf('optimization') > 0" @on-item-click="$router.replace({'name':'opti'})">
          <span>亿宝优选</span>
        </tab-item>
        <tab-item :selected="$route.path.indexOf('sanbiao') > 0" @on-item-click="$router.replace({'name':'sanbiao'})">
          <span>散标计划</span>
        </tab-item>
      </tab>
    </div>
    <!-- <select-com @on-select='select'></select-com> -->
    <router-view></router-view>
  </div>
</template>

<script>
  import { Tab, TabItem } from "vux";
  // import SelectCom from "./selectCom";
  import Notice from '../common/notice.vue';
  export default {
    components: {
      Tab,
      TabItem,
      Notice
    },
    methods: {
      select(status) {
        let curPath = this.$route.path.split('/').length - 1
        switch (this.$route.path.split('/')[curPath]) {
          case 'zhitou':
            this.$store.dispatch('zhitou', {
              zhitouStatus: status
            })
            break
          case 'optimization':
            this.$store.dispatch('opti', {
              optiStatus: status
            })
            break
          case 'sanbiao':
            this.$store.dispatch('sanbiao', {
              sanBiaoStatus: status
            })
            break
        }
      },
      onScoller(totalTop){
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        if (scrollTop >= totalTop) {
          // document.querySelector('.yibaoTab-wrap').classList.add('fixed')
          document.querySelector('.sub-tab-wrap').classList.add('fixed')
        } else {
          // document.querySelector('.yibaoTab-wrap').classList.remove('fixed')
          document.querySelector('.sub-tab-wrap').classList.remove('fixed')
        }
      }
    },
    mounted() {
      let titleTop = document.querySelector('.sub-tab-wrap').offsetTop,
      totalTop = titleTop + document.querySelector('.sub-tab-wrap').offsetHeight
      window.addEventListener('scroll', this.onScoller(totalTop))
    },
    beforeDestroy(){
      window.removeEventListener('scroll',this.onScoller)
    }
  }
</script>

<style lang="less" scoped>
  .yibaoTab {
    .yibaoTab-wrap {
      background: #fff;
      .back-icon-wrap {
        padding: 12px 5px 9px;
        float: left;
        border-bottom: 1px solid #e5e5e5;
        .back-icon {
          float: left;
          height: 22px;
          width: 22px;
          background: url('~assets/mine/back@2x.png') no-repeat center 90%;
          background-size: contain;
        }
      }
    }
    span {
      font-size: 18px;
    }
    .fixed {
      position: fixed;
      width: 100%;
      top:-10px;
    }
  }
</style>
