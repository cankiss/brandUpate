<template>
  <div class="container has-header accountSetup">
    <m-header :text='msg'></m-header>
    <tab :line-width="4" bar-active-color="#FF6E66" custom-bar-width="30px" defaultColor="#BFBFBF" active-color="#333333">
      <tab-item selected @on-item-click="tabSwitch(0)">
        <span class="font-size-16">全部</span>
      </tab-item>
      <tab-item @on-item-click="tabSwitch(3)">
        <span class="font-size-16">出借</span>
      </tab-item>
      <tab-item @on-item-click="tabSwitch(1)">
        <span class="font-size-16">充值</span>
      </tab-item>
      <tab-item @on-item-click="tabSwitch(2)">
        <span class="font-size-16">提现</span>
      </tab-item>
    </tab>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
      <div v-if="items.length">
        <div v-for="(item,index) in items" :key="index">
          <group :title="isTitle(item.createTimeZ)">
            <cell :title="item.typeName" :inline-desc="item.createTime" :arrow-direction="'down'" :border-intent="false" is-link ref='arrow' @click.native="showContent(index)">
              <div style="padding-right:10px">
                <div style="color:#23272A;" class="font-size-16">
                  {{item.operateUse == 1 ? '+' : (item.operateUse == 2 ? '-' : '')}} {{item.operationAmount | numToMoneyField}}
                </div>
                <span class="font-999 font-size-14">{{item.availableCreditAfter | numToMoneyField}}</span>
              </div>
            </cell>
            <div class="slide font-size-12" ref="show">
              <p>备注：</p>
              <p class="font-999">{{item.remark}}</p>
            </div>
          </group>
        </div>
      </div>
      <div v-else style="height:200px">
        <no-data>暂无数据</no-data>
      </div>
    </div>
  </div>
</template>

<script>
  import MHeader from "~/common/m-header";
  import NoData from "../common/noData"
  import {Tab,TabItem,debounce,Group, Cell} from "vux";
  export default {
    data() {
      return {
        msg: '资金流水',
        page_num: 1,
        types:0,
        items: [],
        cache: {},
        isShow:true,
        busy: false
      }
    },
    components: {
      MHeader,
      Tab,
      TabItem,
      NoData,
      Group,
      Cell
    },
    methods: {
      //every switch must be release these variables
      tabSwitch(types) {
        this.types = types
        this.items = []
        this.cache = {}
        this.page_num = 1
        this.busy = false
        this.loadMore()
      },
      isTitle(value) {
        if (this.cache[value]) return ''
        else {
          this.cache[value] = value
          return value
        }
      },
      showContent(index) {
        if (this.isShow) {
          this.$refs.arrow[index].arrowDirection = 'up'
          this.$refs.show[index].classList.add('animate')
          this.isShow = !this.isShow
        } else {
          this.$refs.arrow[index].arrowDirection = 'down'
          this.$refs.show[index].classList.remove('animate')
          this.isShow = !this.isShow
        }
      },
      loadMore: debounce(function() {
        this.cache = {} //clear cache when items change!
        this.$mine('userAcount/ziJinJiLuNewP', {
          page_num: this.page_num++,
          types: this.types
        }).then(({code,model} = res) => {
          if (code === '200') {
            model.list && model.list.length > 0 ?
            this.items = this.items.concat(model.list) :
            this.busy = true
          }
        })
      }, 300,{'leading': true,'trailing': false})
    }
  }
</script>
<style>
  .accountSetup .weui-cells:before{
    border-top: 1px solid #f2f2f2 !important;
  }
  .accountSetup .weui-cells:after{
    border-bottom:1px solid #f2f2f2 !important;
  }
</style>

<style lang="less" scoped>
  .slide {
    padding: 0 20px;
    overflow: hidden;
    max-height: 0;
    transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
    border-top: 1px solid #D9D9D9;
  }
  .animate {
    max-height: 9999px;
    transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
    transition-delay: 0s;
  }
</style>

