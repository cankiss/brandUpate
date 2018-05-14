<template>
  <div>
    <div class="sub-tab-wrap">
      <tab :line-width="4" :bar-active-color="barColor" defaultColor="#333" active-color="#333">
        <tab-item selected @on-item-click="tabSelect(1)"
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
            <span>未起息</span>
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
            <h2><i></i>{{item.borrowName}}</h2>
            <div class="yibao-padding">
              <flexbox>
                <flexbox-item>出借金额</flexbox-item>
                <flexbox-item><span class="font-999">{{item.inverstSuccessAmount}}元</span></flexbox-item>
                <flexbox-item>出借年利率</flexbox-item>
                <flexbox-item><span class="red-text">{{item.rate}}%</span></flexbox-item>
              </flexbox>
              <flexbox>
                <flexbox-item>预计收益</flexbox-item>
                <flexbox-item><span class="font-999"><i class="red-text">{{item.profitWait}}  </i>元</span></flexbox-item>
                <flexbox-item>出借期限</flexbox-item>
                <flexbox-item><span class="font-999">{{item.termTime}}{{item.timeType | timeTypeFliter}}</span></flexbox-item>
              </flexbox>
              <flexbox :gutter="0">
                <flexbox-item :span="3">使用优惠</flexbox-item>
                <flexbox-item>
                  <span class="font-999">{{item.remark || '未使用'}}</span>
                  <span v-if='item.remark' style="font-size:12px;padding:0 4px;" class="font-666">起息后返现至账户余额</span>
                </flexbox-item>
              </flexbox>
              <flexbox :gutter="0">
                <flexbox-item :span="3">出借时间</flexbox-item>
                <flexbox-item><span class="font-999">{{item.inverstTime | momentTime}}</span></flexbox-item>
              </flexbox>
            </div>
          </div>
          <div class="check-wrap">
              <flexbox>
                <flexbox-item>
                  <popover placement="bottom" :gutter="0" @on-show="onShow(i)">
                    <div slot="content" class="check-protocol">
                      <!-- <a href="javascript:void(0)" @click="goFadada(item)">《出借人服务协议》</a> -->
                      <div v-html="sanBiaoProtocol(item)" class="sanBiaoProtocol"></div>
                    </div>
                    <p class="font-999">查看协议</p>
                  </popover>
                </flexbox-item>
                <template>
                  <!-- v-if="item.status >= 5" -->
                  <span class="check-line"></span>
                  <flexbox-item>
                    <p class="font-999"
                    @click="$router.push(`/mine/invest/sanbiao/returnMoney/${item.borrowNid}/${item.id}`)">查看回款</p>
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
  import { Flexbox, FlexboxItem, Popover, Tab, TabItem,debounce } from "vux";
  import NoData from '../common/noData'
  export default {
    data(){
      return{
        barColor: "#FF665E",
        busy:false,
        page_num:1,
        status:1,
        items:[]
      }
    },
    components: {
      Flexbox,
      FlexboxItem,
      Popover,
      NoData,
      Tab,
      TabItem
    },
    methods:{
      tabSelect(status){
        this.status = status
        this.busy = false
        this.items = []
        this.page_num = 1
        this.loadMore()
      },
      sanBiaoProtocol(data){
        //copy old code , I can't write this code!
        let xgxy = '',
            userId = this.storage.get('user_id')
        if (data.status >= 5) {
            if (data.type < 13) {
                if (data.agreementType == 1) {
                    xgxy = '<a class="font-blue" href="html/2DetailPage/borrowing.html?type=1&borrowNid=' + data.borrowNid + '&invertId=' + data.id + '&userId=' + userId + '">《借款协议》</a><a class="htxy" href="html/2DetailPage/ConsultingManagement.html?type=1&borrowNid=' + data.borrowNid + '&invertId=' + data.id + '&userId=' + userId + '">《咨询与管理服务协议》</a>';
                } else if (data.agreementType == 2) {
                    if (data.borrowType == 1) {
                        xgxy = '<a class="font-blue" href="html/2DetailPage/debentureTransfer.html?type=2&borrowNid=' + data.borrowNid + '&invertId=' + data.id + '&userId=' + userId + '">《债权转让协议》</a><a class="font-blue" href="html/2DetailPage/ConsultingManagement.html?type=2&borrowNid=' + data.borrowNid + '&invertId=' + data.id + '&userId=' + userId + '">《咨询与管理服务协议》</a>';
                    } else {
                        xgxy = '<a class="font-blue" href="html/2DetailPage/debentureTransfer2.html?type=2&borrowNid=' + data.borrowNid + '&invertId=' + data.id + '&userId=' + userId + '">《债权转让协议》</a><a class="font-blue" href="html/2DetailPage/ConsultingManagement.html?type=2&borrowNid=' + data.borrowNid + '&invertId=' + data.id + '&userId=' + userId + '">《咨询与管理服务协议》</a>';
                    }
                };
            } else {
                xgxy = '<a class="font-blue nextTick" href="javascript:void(0)" user-id="' + userId + '" borrow-invest-id="' + data.id + '">《出借人服务协议》</a><a class="font-blue" href="' + data.url + '">《借款协议》</a>';
            }
        } else {
            xgxy = '<a class="font-blue nextTick" href="javascript:void(0)" user-id="' + userId + '" borrow-invest-id="' + data.id + '">《出借人服务协议》</a><a class="font-blue" href="javascript:void(0)">《借款协议》</a>';
        }
        return xgxy
      },
      goFadada(_data){
        this.$mine('fadada/selectUserFadadaContractInfo',_data).then(res =>{
          if(res.code === '200' && res.model ) window.location.href = res.model.viewpdfUrl
        })
      },
      onShow(whichOne){
        // when popOver open!
        document.querySelectorAll('.sanBiaoProtocol')[whichOne].addEventListener('click',e =>{
            if(e.target.classList.contains('nextTick')){
              let _json = this.getAttrs(e.target)
              this.goFadada({
                borrowInvestId:_json.borrowInvestId,
                userId:_json.userId
              })
            }
        })
      },
      getAttrs(node){
        let attrsArr = [].map.call(node.attributes, function(item) { return item })
        return attrsArr.reduce((attrs, attribute) => {
            attrs[this.getCamelCase(attribute.name)] = attribute.value;
            return attrs;
        }, {})
      },
      getCamelCase:(function(){
        let cache = {};
        return function(str) {
            return cache[str] ? cache[str] : cache[str] = str.replace(/-([a-z])/g, function(all,i) {
                return i.toUpperCase()
            })
        }
      })(),
      loadMore:debounce(function(){
        this.$mine('userAcount/InvestSanBiaoRecordNew',{
          page_num:this.page_num++,
          borrowType:0,
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
<style>
.sanBiaoProtocol .font-blue{
  display: block;
  color:#FF665E;
}

</style>

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
      padding: 8px 0
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
