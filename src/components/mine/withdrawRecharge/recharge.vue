<template>
  <div class="container has-header recharge">
    <!--header-->
    <m-header :text='msg'>
      <div slot="rightHtml">
        <router-link to='/find/customerService'>
          <img :src="seviceIcon" style="display:inline-block">
        </router-link>
        <router-link :to="{name:'Record',params: { type: 1 }}">
          <span class="font-666">充值记录</span>
        </router-link>
      </div>
    </m-header>
    <!--notice-->
    <div style="height:1px"></div>
    <notice :msg='info' @isNotice="isNotice = !isNotice" v-if="isNotice"></notice>
    <!--bankCard-->
    <bank-card :isRecharge='true' :bankInfo="bankInfo">
      <div slot="cardExplain">
        <router-link to="/find/help/bankQuota">
          <img :src="imgUrl" alt="" style="width:82px">
        </router-link>
      </div>
    </bank-card>
    <!--账户余额-->
    <group label-width="100px">
      <cell title="账户余额" primary="content">
        <div class="account-remain font-333">
          <span v-if='remain'>{{remain | numToMoneyField}}</span>
          <span>元</span>
        </div>
      </cell>
      <x-input title="预留手机号" v-model="phoneNumber" :show-clear='false' :max="11">
        <span slot="right" style="color:#FF665E" @click="phoneNumber = ''">修改</span>
      </x-input>
    </group>
    <!--充值金额-->
    <div class="withdraw-money">
      <div class="withdraw-wrap">
        <p>充值金额</p>
        <label class="user-input">
          <span>￥</span>
          <input type="text" placeholder="请输入充值金额" v-model="rechargeAmount" maxlength="10"
          autofocus @input="format">
          <span>元</span>
        </label>
      </div>
    </div>
    <!--确认充值-->
    <div style="width:90%;margin:20px auto">
      <x-button type="warn" @click.native='goRecharge(rechargeAmount)'>确认充值</x-button>
    </div>
    <!--虚拟键盘-->
    <key-board-count :is-pay='isPay' @close='isPay = !isPay' payTitle='确认充值' :phoneNum='phoneNumber'
    @refetch='refetch' ref="pay" @pas-end='submit' @endTime="endTime">
      <span class="font-size-16">本次充值金额</span>
      <span slot="explain"><i style="font-size:26px">{{rechargeAmount}}</i>元</span>
    </key-board-count>
    <!--dialog-->
    <m-dialog ref="dialog" @onHide="rechargeComplete">
      充值成功！
      <p slot="info">您已成功充值{{rechargeAmount}}元。</p>
    </m-dialog>
  </div>
</template>
<script>
import BankCard from './bankCardCom'
import MHeader from '~/common/m-header'
import KeyBoardCount from '~/common/keyBoardCount';
import Notice from '~/mine/common/notice'
import MDialog from '../common/dialog';
import { Group , Cell , XInput, XButton} from "vux";
export default {
  data(){
    return {
      isNotice:true,
      isPay:false,
      msg:'充值',
      info:'若银行卡预留手机号有变更，可在当前页面修改。',
      seviceIcon:require('@/assets/mine/call@3x.png'),
      imgUrl:require('@/assets/mine/limit_instruction@2x.png'),
      remain:'',
      rechargeAmount:'',
      phoneNumber:'',
      oldPhoneNumber:'',
      bankInfo:[],
      _params:null,
      isRefetch:false,
      isEnd:true //true 时可以发送验证码 false 表示验证码倒计时结束
    }
  },
  components:{
    MHeader,
    BankCard,
    KeyBoardCount,
    Group,
    Cell,
    XInput,
    XButton,
    Notice,
    MDialog
  },
  created(){
    this.$mine('userAcount/selectUserAcount').then(({model,code}=res) =>{
      if(code === '200') this.remain = model.availableCredit || '0'
    })
    this.$mine('realUser/selectRealUserByUserId',{'userDevice':'02'}).then(({model,code}=res) => {
      if(code === '200') {
        this.bankInfo = model.realUserCardList
        this.phoneNumber = this.phoneHidden(model.realUserCardList[0].mobile)
        this.oldPhoneNumber = model.realUserCardList[0].model
      }
    })
  },
  methods:{
    format(){
      if(!/^-?\d+\.?\d{0,2}$/.test(this.rechargeAmount)){
        this.rechargeAmount = this.rechargeAmount.slice(0,this.rechargeAmount.length-1)
      }
    },
    rechargeComplete(){
      this.remain += this.rechargeAmount
      this.rechargeAmount = ''
    },
    refetch(){
      this.isRefetch = true
      this.bankPay().catch(res => {
        this.$vux.toast.show({
          text:res,
          type:'text',
          width:'80%'
        })
      })
    },
    goRecharge(recharge){ //点击提交按钮
      recharge < 50 ? this.$vux.toast.show({
        text:'充值金额不能小于50元',
        type:'text',
        width:'80%'
      }):(() =>{
        if(this.isEnd){
          this.bankPay().catch(res => {
            this.$vux.toast.show({
              text:res,
              type:'text',
              width:'80%'
            })
          })
        }else{
          this.isPay = true
        }
      })()
    },
    endTime(){
      this.isEnd = true;
    },
    submit(verifyCode){ //虚拟键盘获取用户验证码
      this.verifyCode(verifyCode)
    },
    verifyCode(verifyCode){
      this.$mine('bankPay/payVerifyCode',Object.assign(this._params,{verifyCode}))
        .then(result => {
          if(result.code == '200'){
            this.$refs.pay.$payStatus(true)
            this.$refs.dialog.showDialog = true
          }else{
            this.$refs.pay.$payStatus(false)
            this.$vux.toast.show({
              text:result.msg,
              type:'text',
              width:'80%'
            })
          }
        })
    },
    bankPay(){
      return new Promise((resolve,reject) => {
        //判断用户是否修改了手机号码
        let _json = {txn_amt:this.rechargeAmount,rechargeWay:'AUTH'}
        if(this.phoneNumber.indexOf('*') === -1){
          if(this.phoneNumber != this.oldPhoneNumber){
            Object.assign(_json,{mobile:this.phoneNumber})
          }
        }
        this.$mine('bankPay/pay',_json).then(({code,model,msg}=res) =>{
          code == '200' ? (() =>{
            this.isEnd = false;
            this.isPay = true
            this._params = {
              requestNo : model.requestNo,
              token : model.token,
              amount:  model.amount,
              crmOrderNo:model.crmOrderNo
            }
            resolve()
          })() : reject(msg)
        })
      })
    },
    phoneHidden(value){
      return !!value ? value.toString().replace(/(\d{3})\d{4}(\d{4})/, "$1****$2") : ''
    }
  }
}
</script>
<style lang="less" scoped>
  .recharge{
    .withdraw-money{
      margin-top: 10px;
      padding:5px 15px;
      background: #fff;
      .withdraw-wrap{
      padding-bottom: 10px
      }
    }
    .account-remain{
      display: flex;
      justify-content: space-between;
    }
    .user-input{
      display: block;
      border-bottom: 1px solid #eeeeee;
      font-size: 16px;
      input{
        border: 0;
        outline: none;
        height: 38px;
        width: 80%;
        font-size: 16px;
      }
      ::-webkit-input-placeholder{
        padding-left: 10px;
      }
    }
  }
</style>
