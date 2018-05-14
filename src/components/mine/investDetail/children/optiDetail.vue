<template>
  <div class="container has-header">
    <m-header :text="`出借${_json.productName}详情`"></m-header>
    <p class="zhitou-title">
      {{`标的期号：${_json.nid}期`}}
    </p>
    <div>
      <div class="detail-title-wrap">
        <flexbox>
          <flexbox-item>
            <p>出借金额</p>
          </flexbox-item>
          <flexbox-item>
            <p class="font-999">{{_json.amout}}元</p>
          </flexbox-item>
          <flexbox-item>
            <p>分散标的</p>
          </flexbox-item>
          <flexbox-item>
            <p class="font-999">{{_json.totalRecord}}个</p>
          </flexbox-item>
        </flexbox>
        <flexbox :gutter='0'>
          <flexbox-item :span='3'>
            <p>出借时间</p>
          </flexbox-item>
          <flexbox-item>
            <p class="font-999">{{_json.operateTime | momentTime}}</p>
          </flexbox-item>
        </flexbox>
      </div>
    </div>
    <div>
      <div class="detail-title" style="margin-top:10px">
        <flexbox>
          <flexbox-item>
            <span>项目</span><br>
            <span>年利率/预计收益</span>
          </flexbox-item>
          <flexbox-item>
            <span>起息时间</span><br>
            <span>回款时间</span>
          </flexbox-item>
          <flexbox-item>
            <span>出借金额</span><br>
            <span>协议</span>
          </flexbox-item>
        </flexbox>
      </div>
    </div>
    <div>
      <div class="detail-title font-999">
        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
          <div v-if="items.length">
            <div class="detail-content" v-for="(item,i) in items" :key="i">
              <flexbox>
                <flexbox-item
              @click.native="$router.push(`/mine/invest/sanbiao/returnMoney/${item.borrowNid}/${item.id}`)">
                  <span>{{item.borrowName}}</span><br>
                  <span>{{item.rate}}%&emsp;{{item.profitWait}}元</span>
                </flexbox-item>
                <flexbox-item>
                  <span v-if="item.interestDay">{{item.interestDay*1000 | creatTime}}</span>
                  <span v-else>--------</span>
                  <br>
                  <span v-if="item.repaymentDate">{{item.repaymentDate*1000 | creatTime}}</span>
                  <span v-else>--------</span>
                </flexbox-item>
                <flexbox-item>
                  <span>{{item.inverstSuccessAmount}}元</span><br>
                  <a :href="item.url" style="color: #43a0ff">借款协议</a>
                </flexbox-item>
              </flexbox>
            </div>
          </div>
          <div class="no-data-wrap" v-else>
            <no-data>暂无数据</no-data>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Flexbox, FlexboxItem, debounce} from "vux";
  import MHeader from '~/common/m-header'
  import NoData from '../../common/noData'
  export default {
    data() {
      return {
        _json:null,
        page_num:1,
        busy:false,
        items:[]
      }
    },
    components: {
      MHeader,
      NoData,
      Flexbox,
      FlexboxItem
    },
    created(){
      this._json = JSON.parse(this.$route.params.detail)
    },
    methods:{
      loadMore:debounce(function () {
        this.$mine('userAcount/InvestSPoolDetail',{
          page_num :this.page_num++,
          nid : this._json.nid,
          userDevice:'02'
        }).then(({model,code}=res) =>{
          if(code === '200') {
            model && model.list.length > 0 ?
              this.items = this.items.concat(model.list) :
              this.busy = true
          }
        },300,{'leading': true,'trailing': false})
      })
    }
  }
</script>

<style lang="less" scoped>
  .zhitou-title {
    color: #fff;
    line-height: 32px;
    height: 32px;
    background: #FF665E;
    padding: 0 10px;
  }
  .detail-title-wrap{
    background: #fff;
    padding: 0 10px;
    border-bottom:1px solid #f2f2f2;
    p{
      padding: 5px 0;
    }
  }
  .detail-title {
    background: #fff;
    padding: 0 10px;
    border-bottom:1px solid #f2f2f2;
    .detail-content{
      border-bottom:1px solid #f2f2f2;
      padding: 5px 0;
    }
    .no-data-wrap{
      background: #fff;
      min-height: 300px;
    }
  }
</style>
