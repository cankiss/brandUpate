<template>
  <div>
    <div class="slide-content">
      <swiper v-model="index" height="186px" dots-class="custom-bottom" dots-position="center">
        <swiper-item>
          <div class="tab-swiper vux-center">
            <div class="slide-container-red">
              <div class="slide-title">
                <p class="slide-title-one">本月</p>
                <p class="slide-title-two" v-if='item'>
                  <span style="color:#FFC4C0">邀请人数</span><br>
                  <span>{{item.countByMonth || '0'}}<i class="font-size-16">人</i></span>
                </p>
              </div>
            </div>
          </div>
        </swiper-item>
        <swiper-item>
          <div class="tab-swiper vux-center">
            <div class="slide-container-blue">
              <div class="slide-title">
                <p class="slide-title-one">累计</p>
                <p class="slide-title-two" v-if='item'>
                  <span>邀请人数</span><br>
                  <span>{{item.count || '0'}}<i class="font-size-16">人</i></span>
                </p>
              </div>
            </div>
          </div>
        </swiper-item>
      </swiper>
    </div>
    <div class="record-container">
      <p class="record-title">邀请记录</p>
      <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
        <div class="record-content font-size-12" v-if="items.length">
          <div v-for="(item,i) in items" :key="i" style="border-bottom:1px solid #f2f2f2">
            <flexbox>
              <flexbox-item>
                <div>
                  <span>{{item.realName || '未实名'}}</span><br>
                  <span class="font-999">{{item.mobile}}</span>
                </div>
              </flexbox-item>
              <flexbox-item>
                <div style="text-align:right">
                  <span>{{item.tendAmount > 0 ? '已出借' : '未出借'}}</span><br>
                  <span class="font-999">{{item.createTime}}</span>
                </div>
              </flexbox-item>
            </flexbox>
          </div>
        </div>
        <div v-else style="height:200px">
          <no-data>暂无数据</no-data>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Flexbox, FlexboxItem, Swiper, SwiperItem,debounce} from "vux";
  import NoData from '../common/noData';
  export default {
    data() {
      return {
        page_num: 1,
        index:0,
        item:null,
        items:[]
      }
    },
    components: {
      Flexbox,
      FlexboxItem,
      Swiper,
      SwiperItem,
      NoData
    },
    methods:{
      loadMore:debounce(function () {
        this.$mine('user/selectInviteUserNew',{page_num:this.page_num++}).then(({code,model}=res) =>{
          if(code === '200') {
            this.item = model
            model && model.list.length > 0 ?
              this.items = this.items.concat(model.list)
              : this.busy = true
          }
        })
      },300,{'leading': true,'trailing': false})
    }
  }
</script>

<style lang="less">
.slide-content {
    .vux-slider > .vux-indicator > a > .vux-icon-dot.active{background: #ffffff};
    .vux-slider>.vux-indicator>a>.vux-icon-dot{background: rgba(255, 255, 255, 0.4)};
  }
</style>

<style lang="less" scoped>
  .slide-content {
    margin: 10px auto;
    width: 90%;
    .slide-container-blue,
    .slide-container-red {
      height: 186px;
      background: #43A0FF;
      border-radius: 10px;
      padding: 0 10px;
    }
    .slide-container-red {
      background: #FF665E;
    }
    .slide-title {
      text-align: center;
      color: #fff;
      .slide-title-one {
        font-size: 20px;
        line-height: 60px;
      }
      .slide-title-one:before {
        content: '';
        width: 14px;
        height: 2px;
        background: #fff;
        display: inline-block;
        margin-bottom: 5px;
        margin-right: 10px;
      }
      .slide-title-one:after {
        content: '';
        width: 14px;
        height: 2px;
        background: #fff;
        display: inline-block;
        margin-bottom: 5px;
        margin-left: 10px;
      }
      .slide-title-two {
        line-height: 1.1;
        span:nth-child(1) {
          color: #BBDCFF;
        }
        span:nth-child(3) {
          font-size: 36px;
        }
      }
      .slide-title-three {
        width: 90%;
        margin: 5px auto 0;
        display: flex;
        justify-content: space-between;
        span:nth-child(1) {
          font-size: 20px;
        }
        span:nth-child(3) {
          font-size: 12px;
          color: #F7F7F7;
        }
      }
    }
  }
  .record-container {
    background: #fff;
    margin-top: 10px;
    min-height:370px;
    overflow: hidden;
    .record-title {
      line-height: 20px;
      padding: 10px;
      border-bottom: 1px solid #E7E7E7;
    }
    .record-content {
      padding: 0 10px;
      span {
        line-height: 2;
      }
    }
  }
</style>
