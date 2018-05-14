<template>
  <div class="container has-header">
    <m-header :text="msg"></m-header>
    <div style="height:5px"></div>
    <div class="red-wrapper" v-if="title">
      <div class="red-container">
        <div>
          <span>{{title.receiveCapitalWaitSum | numToMoneyField}}元</span><br>
          <span>应回本金</span>
        </div>
        <div>
          <span>{{title.interestReceiveWaitSum | numToMoneyField}}元</span><br>
          <span>应回利息</span>
        </div>
        <div>
          <span>{{title.maxPeriod || '0'}}期</span><br>
          <span>应回期数</span>
        </div>
      </div>
    </div>
    <div class="title-wrapper">
      <div class="title-container">
        <div>
          <span>应回本金</span><br>
          <span>应回利息</span>
        </div>
        <div>
          <span>实回金额</span>
        </div>
        <div>
          <span>状态</span>
        </div>
      </div>
    </div>
    <div class="return-wrapper">
      <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
        <div v-if="items.length">
          <div class="return-container font-999" v-for="(item,i) in items" :key="i">
            <div>
              <span>{{item.receiveCapitalWait | numToMoneyField}}元</span><br>
              <span>{{item.interestReceiveWait | numToMoneyField}}元</span>
            </div>
            <div>
              <span>{{item.principalReceveWait | numToMoneyField}}元</span>
            </div>
            <div>
              <span>{{item.status == 1 ? '待还款' : '已还款'}}</span><br>
              <span>{{item.recoverTime | creatTime}}</span>
            </div>
          </div>
        </div>
        <div v-else style="min-height:400px">
          <no-data>暂无数据</no-data>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MHeader from '~/common/m-header'
  import NoData from '../../common/noData'
  import { debounce } from "vux";
  export default {
    data() {
      return {
        msg: '回款计划',
        busy:false,
        page_num:1,
        title:null,
        items:[]
      }
    },
    components: {
      MHeader,
      NoData
    },
    created(){
    },
    methods:{
      loadMore:debounce(function () {
        this.$mine('recoverPlan/recoverPlanListByNid',{
        borrowNid:this.$route.params.borrowNid,
        borrowInvestId:this.$route.params.borrowInvestId,
        page_num:this.page_num++
        }).then(({model,code}=res) => {
          if(code === '200') {
            this.title = model.sum
            model && model.borrowRecoverPlans.length > 0 ?
              this.items = this.items.concat(model.borrowRecoverPlans)
              : this.busy = true

          }
        })
      },300,{'leading': true,'trailing': false})
    }
  }
</script>

<style lang="less" scoped>
  .red-wrapper {
    background: #FF665E;
    color: #fff;
    padding: 10px 10px 5px;
    .red-container {
      display: flex;
      justify-content: space-around;
    }
  }
  .title-wrapper {
    background: #fff;
    margin-top: 10px;
    border-bottom:1px solid #f2f2f2;
    .title-container {
      padding: 5px;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
  }
  .return-wrapper{
    background: #fff;
    .return-container{
      padding: 10px 10px 5px;
      border-bottom:1px solid #F2F2F2;
      display: flex;
      justify-content: space-around;
      align-items: center;
      text-align: right;
    }
  }
</style>
