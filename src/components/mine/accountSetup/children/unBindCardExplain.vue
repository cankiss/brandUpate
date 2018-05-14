<template>
  <div class="has-header container">
    <m-header :text='msg'></m-header>
    <div style="height:5px"></div>
    <div class="unBindCard">
      <div>
        <div class="unBindCard-wrapper">
          <p class="font-333">账户余额+持有中出借<=1000元</p>
          <p class="font-999">当账户余额与持有中出借总和<=1000元时，输入交易密码即可解绑</p>
        </div>
      </div>
      <div>
        <div class="unBindCard-wrapper">
          <p class="font-333">账户余额+持有中出借>1000元</p>
          <p class="font-999">当账户余额与持有中出借总和>1000元时，上传相关资料等待1~2个工作日审核即可解绑</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MHeader from '~/common/m-header'
export default {
  data(){
    return {
      msg:'解绑说明'
    }
  },
  components:{
    MHeader
  },
  metaInfo:{
    title:'解绑说明'
  }

}
</script>
<style lang="less" scoped>
  .unBindCard{
    background: #fff;
    div:nth-of-type(1){
      border-bottom: 1px solid #f2f2f2;
    }
    .unBindCard-wrapper{
      padding: 10px 20px;
      p:nth-of-type(1){
        padding: 5px 0;
      }
    }
  }
</style>
