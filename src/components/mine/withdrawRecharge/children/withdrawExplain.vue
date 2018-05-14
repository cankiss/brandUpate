<template>
  <div class="container has-header">
    <m-header :text='msg'></m-header>
    <div style="height:10px"></div>
    <div>
      <div>
        <div class="explain-content">
          <p>提现费用</p>
          <p class="font-999">提现费用为每笔1元，费用由客户承担；</p>
        </div>
        <div class="explain-content">
          <p>提现银行卡</p>
          <p class="font-999">当前只支持绑定一张银行卡（借记卡），如果您在提现操作时还没有绑定银行卡，请先去完成绑定银行卡操作；</p>
        </div>
        <div class="explain-content">
          <p>到账时间</p>
          <p class="font-999">周一至周日，22:30前提现，T+0到账；22：30后提现，T+1到账；节假日提现请以官网公告时间为准；</p>
        </div>
        <div class="explain-content">
          <p>禁止说明</p>
          <p class="font-999">禁止洗钱、信用卡套现、虚假交易等行为，一经发现并确认，将终止该账户的使用；</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MHeader from '~/common/m-header'
export default {
  data(){
    return{
      msg:'提现说明'
    }
  },
  components:{
    MHeader
  }
}
</script>
<style lang="less" scoped>
  .explain-content{
    border-bottom: 1px solid #f2f2f2;
    padding: 5px 20px;
    background: #fff;
    p:nth-child(2){
      margin-top: 5px;
    }
  }
</style>
