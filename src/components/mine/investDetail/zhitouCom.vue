<template>
  <div>
    <!--设计原因我放弃了单个组件，全部复制粘贴，虽然我很反感 -->
    <div class="sub-tab-wrap">
      <tab :line-width="4" :bar-active-color="barColor" defaultColor="#333" active-color="#333">
        <tab-item selected  @on-item-click="tabSelect(1)"
        @click.native="barColor = '#FF665E'">
          <div class="sub-tab">
            <img src="~assets/mine/sell_hold@2x.png" alt="">
            <br>
            <span>持有中</span>
          </div>
        </tab-item>
        <tab-item @on-item-click="tabSelect(2)"
        @click.native="barColor = '#FFB31F'">
          <div class="sub-tab">
            <img src="~assets/mine/sell_quit@2x.png" alt="">
            <br>
            <span>退出中</span>
          </div>
        </tab-item>
        <tab-item @on-item-click="tabSelect(3)"
        @click.native="barColor = '#43A0FF'">
          <div class="sub-tab">
            <img src="~assets/mine/sell_out@2x.png" alt="">
            <br>
            <span>已退出</span>
          </div>
        </tab-item>
      </tab>
    </div>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
      <template v-if='items.length > 0'>
        <div v-for='(item,i) in items' :key="i" style="margin-bottom:5px">
          <div class="yibao-com">
            <h2><i></i>{{item.productName}}</h2>
            <div class="yibao-padding">
              <flexbox :gutter="0">
                <flexbox-item>锁定期限</flexbox-item>
                <flexbox-item>
                  <div class="locked-time">
                    <span class="font-999">{{item.termTime}}{{item.timeType | timeTypeFliter}}</span>
                    <span class="red-text font-size-12" v-if="item.count > 0">{{`(续投${item.count}次)`}}</span>
                  </div>
                </flexbox-item>
                <flexbox-item>加入金额</flexbox-item>
                <flexbox-item><span class="font-999">{{item.amout || '0'}}元</span></flexbox-item>
              </flexbox>
              <flexbox :gutter="0">
                <flexbox-item>预期收益</flexbox-item>
                <flexbox-item><span class="font-999"><i class="red-text">{{item.profitWait || "0"}}  </i>元</span></flexbox-item>
                <flexbox-item>到期时间</flexbox-item>
                <flexbox-item><span class="font-999">{{item.expireDayZ}}</span></flexbox-item>
              </flexbox>
              <flexbox :gutter="0">
                <flexbox-item :span="3">使用优惠</flexbox-item>
                <flexbox-item>
                  <span class="font-999">{{item.remark || '未使用'}}</span>
                  <span v-if='item.remark' style="font-size:12px;padding:0 4px;" class="font-999">起息后返现至账户余额</span>
                </flexbox-item>
              </flexbox>
            </div>
          </div>
          <div class="check-wrap">
            <flexbox>
              <flexbox-item>
                <popover placement="bottom" :gutter="0">
                  <div slot="content" class="check-protocol">
                    <a href="javascript:void(0)" @click="goFadada(item)">《出借人服务协议》</a>
                  </div>
                  <p class="font-999">查看协议</p>
                </popover>
              </flexbox-item>
              <span class="check-line"></span>
              <flexbox-item @click.native="$router.push({name:'exitZhitou',
                  params: { nid: item.nid , name:item.productName}})">
                <p class="font-999">智投详情</p>
              </flexbox-item>
              <template v-if="status === 1">
                <span class="check-line"></span>
                <flexbox-item @click.native="$router.push({name:'exitZhitou',
                  params: { nid: item.nid , name:item.productName }})">
                  <p :class="item.isQuit - 0 ? 'red-text' :'font-999'">我要退出</p>
                </flexbox-item>
              </template>
            </flexbox>
          </div>
        </div>
      </template>
      <div v-else>
        <no-data>未匹配到数据</no-data>
      </div>
    </div>
  </div>
</template>
<script>
  import { Flexbox, FlexboxItem, Tab, TabItem, Popover,debounce} from "vux";
  import NoData from '../common/noData'
  export default {
    data(){
      return{
        barColor: "#FF665E",
        status:1,
        busy:false,
        page_num:1,
        items:[]
      }
    },
    components: {
      Tab,
      TabItem,
      Flexbox,
      FlexboxItem,
      Popover,
      NoData
    },
    methods:{
      tabSelect(status){
        this.status = status
        this.items = []
        this.page_num = 1
        this.busy = false
        this.loadMore()
      },
      goFadada(_param){
        let _json = {batch:_param.nid,type:'TuanBiao'}
        this.$mine('fadada/selectUserFadadaContractInfo',_json).then(res =>{
          if(res.code == '200') window.location.href = res.model.viewpdfUrl
        })
      },
      loadMore:debounce(function(){
        this.$mine('borrowZt/selectZhiTouInvestRecordNew',{
            page_num:this.page_num++,
            status:this.status
          }).then(({model,code}=res) => {
            if(code === '200'){
              model && model.list.length > 0 ?
              this.items = this.items.concat(model.list) :
              this.busy = true
            }
        })
      },300,{'leading': true,'trailing': false})
    }
  }
</script>
<style lang="less" scoped>
  .yibao-com {
    background: #fff;
    padding: 10px;
    h2 {
      font-size: 16px;
      line-height: 22px;
      font-weight: normal;
      padding: 5px 0;
      border-bottom: 1px solid #F6F6F6;
      i {
        display: inline-block;
        width: 4px;
        height: 15px;
        background: #FF665E;
        margin-right: 6px;
        vertical-align: middle;
      }
    }
    .yibao-padding{
      padding: 8px 0;
      .locked-time{
        span{
          float: left;
        }
        span:nth-of-type(2){
          white-space: nowrap;
        }
      }
    }
  }
  .check-wrap {
      background: #F9F9F9;
      p{
        text-align: center;
        line-height: 20px;
        padding: 5px 0;
      }
      .check-line{
        height: 20px;
        width: 1px;
        background: #DEDEDE;
      }
      .check-protocol{
        padding: 5px;
        a{
          color:#FF665E;
        }
      }
  }
  .sub-tab-wrap {
    margin: 10px 0;
    .vux-tab {
      height: 66px;
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
        line-height:26px;
      }
    }
  }
</style>
