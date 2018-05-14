<template>
  <div class="container has-header">
    <m-header :text='msg' @rightMore="$router.push('/mine/setup/unBindCardExplain')">
      <div slot="rightHtml">
        <img src="~assets/mine/icon_question@2x.png">
      </div>
    </m-header>
    <div style="height:10px"></div>
    <bank-card :bankInfo='bankInfo'>
      <!-- <div slot="delCard">删除</div> -->
    </bank-card>
  </div>
</template>
<script>
import bankCard from '~/mine/withdrawRecharge/bankCardCom'
import MHeader from '~/common/m-header'
export default {
  data(){
    return {
      msg:'银行卡管理',
      bankInfo:[]
    }
  },
  components:{
    MHeader,
    bankCard
  },
  created(){
    this.$mine('realUser/selectRealUserByUserId',{'userDevice':'02'}).then(({model,code}=res) => {
      if(code === '200') {
        this.bankInfo = model.realUserCardList
      }
    })
  }
}
</script>
