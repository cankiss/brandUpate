<template>
  <div class="container has-header has-footer">
    <m-header :text='msg'></m-header>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
      <div v-if="items.length">
        <div v-for="(item,index) in items" :key="index">
          <group :title="isTitle(item.createTime)">
            <div class="withdraw-record">
              <div class="font-size-12">
                <p>{{item.orderNum}}</p>
                <p>{{item.createTime}}</p>
              </div>
              <div>
                <p :style="{color:item.status == 3 ? '#FF665E' : '#333'}" style="text-align:right">
                  {{`${item.typeName}${item.statusName}`}}</p>
                <p> {{item.operateUse == 1 ? '+' : (item.operateUse == 2 ? '-' : '')}}
                  {{item.amount | numToMoneyField}}元</p>
              </div>
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
import { Group, debounce} from "vux";
import MHeader from '~/common/m-header'
import NoData from '../../common/noData'
export default {
  data(){
    return{
      page_num:1,
      type:1,
      items:[],
      title:['','充值记录','提现记录'],
      cache: {}
    }
  },
  components:{
    MHeader,
    Group,
    NoData
  },
  computed:{
    msg(){
      return this.title[this.$route.params.type]
    }
  },
  methods:{
    isTitle(value){
      value = value.split(' ')[0]
      if (this.cache[value]) return ''
      else {
        this.cache[value] = value
        return value
      }
    },
    loadMore:debounce(function(){
      this.$mine('userAcount/queryCapitalRecord',{
          pageNum:this.page_num++,
          type:this.$route.params.type
        }).then(({code,model}=res) => {
          if(code === '200') {
              model && model.length > 0 ?
              this.items = this.items.concat(model) :
              this.busy = true
          }
        })
    },800,{'leading': true,'trailing': false})
  }
}
</script>
<style lang="less" scoped>
  .withdraw-record{
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #f2f2f2;
    p{
      line-height: 22px;
    }
  }
</style>
