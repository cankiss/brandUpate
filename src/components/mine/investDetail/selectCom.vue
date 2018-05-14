/*
 * @Author: wzc0x0@gmail.com
 * @Date: 2017-12-03 22:04:53
 * @Explain:已废弃
 */
<template>
  <div class="sub-tab-wrap">
    <tab :line-width="4" :bar-active-color="barColor" defaultColor="#333" active-color="#333">
      <tab-item v-for="(item,i) in items" :key="i" :selected='i === 0' @on-item-click="tabSelect(item)">
        <div class="sub-tab">
          <img :src="item.imgUrl" alt="">
          <br>
          <span>{{item.title}}</span>
        </div>
      </tab-item>
    </tab>
  </div>
</template>

<script>
  import { Tab , TabItem } from "vux";
  export default {
    data() {
      return {
        barColor: "#FF665E",
        items:[],
        otherArr:[
           {
            title:'未起息',
            status:2,
            color:'#FF665E',
            imgUrl:require('@/assets/mine/sell_hold@2x.png')
          },
          {
            title:'持有中',
            status:1,
            color:'#FFB31F',
            imgUrl:require('@/assets/mine/sell_quit@2x.png')
          },
          {
            title:'已退出',
            status:3,
            color:'#43A0FF',
            imgUrl:require('@/assets/mine/sell_out@2x.png')
          }
        ],
        zhitouArr:[
          {
            title:'持有中',
            status:1,
            color:'#FF665E',
            imgUrl:require('@/assets/mine/sell_hold@2x.png')
          },
          {
            title:'退出中',
            status:2,
            color:'#FFB31F',
            imgUrl:require('@/assets/mine/sell_quit@2x.png')
          },
          {
            title:'已退出',
            status:3,
            color:'#43A0FF',
            imgUrl:require('@/assets/mine/sell_out@2x.png')
          }
        ]
      }
    },
    watch:{
      '$route':'tabSwitch'
    },
    components:{
      Tab,
      TabItem
    },
    created(){
      this.tabSwitch()
    },
    methods:{
      tabSelect(that){
        this.$emit('on-select',that.status)
        this.barColor = that.color
      },
      tabSwitch(){
        this.$route.path.indexOf('zhitou') > 0 ? this.items = this.zhitouArr : this.items = this.otherArr
      }
    }
  }
</script>

<style lang="less" scoped>
  .sub-tab-wrap {
    margin: 10px 0;
    .vux-tab {
      height: 60px;
    }
    .sub-tab {
      margin: 5px 0;
      line-height: 1;
      img {
        display: inline-block;
        width: 30px;
        height: 30px;
      }
      span {
        font-size: 14px;
      }
    }
  }
</style>
