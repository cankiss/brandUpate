<template>
  <div class="container has-header withdraw">
    <!--header-->
    <m-header :text='msg'>
      <div slot="rightHtml">
        <router-link to='/find/customerService'>
          <img :src="seviceIcon" style="display:inline-block">
        </router-link>
        <router-link :to="{name:'Record',params: { type: 2 }}">
          <span class="font-666">提现记录</span>
        </router-link>
      </div>
    </m-header>
    <div style="height:1px"></div>
    <!--bankCode-->
    <bank-card :bankInfo="bankInfo">
      <div slot="cardExplain">
        <router-link :to="{name:'withdrawExplain'}">
          <img :src="imgUrl" alt="" style="width:82px">
        </router-link>
      </div>
    </bank-card>
    <!--账户余额-->
    <group label-width="100px">
       <cell title="可提金额" :border-intent="false" primary="content">
        <div class="account-remain font-333">
          <span v-show='amount'>{{amount | numToMoneyField}}</span>
          <span>元</span>
        </div>
      </cell>
    </group>
    <!--提现金额-->
    <div class="withdraw-money">
      <div class="withdraw-wrap clearfix">
        <p>提现金额</p>
        <label class="user-input">
          <span>￥</span>
          <input type="text" placeholder="请输入提现金额" maxlength="10" autofocus
            v-model="withDraw" @input="format">
          <span>元</span>
        </label>
        <p class="font-size-12">预计到账：<span style="color:#FF665E">{{predict}}</span>元</p>
      </div>
    </div>
    <!--确认提现-->
    <div style="width:90%;margin:20px auto">
      <x-button type="warn" @click.native='goWithDraw(predict)'>确认提现</x-button>
    </div>
    <!--虚拟键盘-->
    <key-board :is-pay='isPay' @close='isPay = !isPay'  @pas-end='submit' ref="pay">
      <span class="font-size-16">提现金额</span>
      <span slot="explain"><i style="font-size:26px">{{withDraw}}</i>元</span>
    </key-board>
    <!--提现成功-->
    <m-dialog ref="dialog" @onHide="withdrawComplete">
      提现成功！
      <p slot="info">您已成功申请提现{{withDraw}}元。</p>
    </m-dialog>
  </div>
</template>
<script>
import { Group , Cell , XInput, XButton} from "vux";
import MHeader from '~/common/m-header'
import BankCard from './bankCardCom'
import KeyBoard from '~/common/keyBoard'
import MDialog from '../common/dialog';
import md5 from '@/config/md5'
export default {
  data(){
    return{
      msg:'提现',
      imgUrl:require('@/assets/mine/cash_instruction@2x.png'),
      seviceIcon:require('@/assets/mine/call@3x.png'),
      amount:'',
      withDraw:'',
      isPay:false,
      charge:1,
      bankInfo:[]
    }
  },
  components:{
    MHeader,
    BankCard,
    KeyBoard,
    MDialog,
    Group,
    Cell,
    XInput,
    XButton
  },
  computed:{
    predict(){
      let value = this.withDraw
      return (!!value && value > this.charge) ? (value-this.charge).toFixed(2) : '0.00'
    }
  },
  methods:{
    format(){
      if(!/^-?\d+\.?\d{0,2}$/.test(this.withDraw)){
        this.withDraw = this.withDraw.slice(0,this.withDraw.length-1)
      }
    },
    withdrawComplete(){
      this.amount -= this.withDraw
      this.withDraw = ''
    },
    goWithDraw(predict){
      predict < 5 ? this.$vux.toast.show({
        text:'提现金额不能小于5元',
        type:'text',
        width:'80%'
      }):this.isPay = true

    },
    submit(value){
      this.$mine('bankPay/repay',{
        txn_amt:this.withDraw,
        password:md5(value),
        OrgCode:1,
        returnurl:this.returnURL()
      }).then(res =>{
        if(res.code == '200'){
          this.$refs.pay.$payStatus(true)
          this.$refs.dialog.showDialog = true
        }else{
          this.$refs.pay.$payStatus(false)
          this.$vux.toast.show({
            text:res.msg,
            type:'text',
            width:'80%'
          })
        }
      })
    },
    returnURL(param) {
	    let path = location.href.split("/"),
		      exceptLast = path.splice(0, path.length - 1);
	        if(param) exceptLast.push(param);
	        return exceptLast.join("/");
    }
  },
  created(){
    this.$mine('userAcount/selectUserAcount').then(({code,model}=res)=>{
      if(code === '200') {
        this.amount = model.availableCredit || '0'
        this.charge = model.shouxufei
      }
    })
    this.$mine('realUser/selectRealUserByUserId',{'userDevice':'02'}).then(({model,code}=res) => {
      if(code === '200') {
        this.bankInfo = model.realUserCardList
      }
    })
  }
}
</script>
<style lang="less" scoped>
  .withdraw{
    .withdraw-money{
      margin-top: 10px;
      padding:5px 15px;
      background: #fff;
      .withdraw-wrap{
        p:nth-child(3){
          float: right;
        }
      }
    }
    .account-remain{
      display: flex;
      justify-content: space-between;
    }
    .user-input{
      display: block;
      border-bottom: 1px solid #eeeeee;
      margin: 10px 0 0 40px;
      font-size: 16px;
      input{
        border: 0;
        outline: none;
        height: 26px;
        width: 80%;
        font-size: 16px;
      }
      ::-webkit-input-placeholder{
        padding-left: 10px;
      }
    }
  }
</style>
