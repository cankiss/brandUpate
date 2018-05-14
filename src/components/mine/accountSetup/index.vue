<template>
  <div class="container has-header has-footer">
    <m-header :msg='msg'></m-header>
    <group title="基本信息">
      <cell title="实名认证" :border-intent="false" primary="content" :link="user.realName ? '':'/mine/setup/userAuth'">
        <p style="text-align:left" class="font-333">{{user.realName | nameHidden}}</p>
      </cell>
      <cell title="手机认证" :border-intent="false" primary="content">
        <p style="text-align:left" class="font-333">{{storage.get('phone_num') | phoneHidden }}</p>
      </cell>
      <cell title="银行卡管理" :border-intent="false" primary="content"
      :link="item.status > 2 ? '/mine/setup/bankCard' : '/mine/setup/userAuth'">
        <div class="user-bankCard" v-for="(bank,i) in user.realUserCardList" :key="i">
          <span style="text-align:left" class="font-333">{{bank.toAccNo | bankCodeTail}}</span>
          <img :src="bank.mapUrl || '~assets/mine/icon_card@2x.png'" alt="">
        </div>
      </cell>
      <!--银行存管开户-->
      <!--<cell title="银行存管开户" :border-intent="false" primary="content"
            :link="'/mine/setup/bankOpenAccount'">
      </cell>-->
      <!--银行存管开户结束-->
    </group>
    <group title="账号安全">
      <cell title="登录密码" :border-intent="false" link='/forgotpassword?title=1'>去修改</cell>
      <cell title="交易密码" :border-intent="false" :link='`/mine/setup/payPwdSet/${item.isPassword}`'>
      {{item.isPassword == 1 ? '去修改' :'去设置'}}</cell>

      <!-- <cell title="免密支付" :border-intent="false" link='/mine/setup/withoutPwdPay'></cell> -->

      <cell title="收货地址" :border-intent="false" primary="content" link='/mine/setup/manageAddress'>
        <p style="text-align:left" class="font-333">{{item.provinceZ}}{{item.cityZ}}{{item.countyZ}}</p>
      </cell>

      <cell title="风险评估测试" :border-intent="false" primary="content" @click.native="toTest" is-link>
        <div class="risk-test">
          <span class="font-333">{{riskType[user.riskLevel]}}</span>
          <span>{{user.riskLevel > 0 ? '重新测' : '去测评'}}</span>
        </div>
      </cell>
    </group>
    <div class="exit-btn">
      <group>
        <x-button type="warn" style="border-radius: 0" @click.native='exitAccount'>退出</x-button>
      </group>
    </div>
  </div>
</template>
<script>
import MHeader from '../common/headerService'
import { Group , Cell , XButton} from "vux";
export default {
  data(){
    return{
      msg:'账户设置',
      item:{},
      user:{},
      riskType:['保守型（默认）','稳健型','谨慎型','平衡型','进取型','激进型']
    }
  },
  components:{
    MHeader,
    Group,
    Cell,
    XButton
  },
  mounted(){
    this._ajax().then(({res,result}=data) => {
      if(res) this.item = res.model
      if(result) this.user = result.model
    })
  },
  methods:{
    userStatus(){
      return this.$post('user/selectUserStatus',{id:this.storage.get('user_id')})
    },
    userMessage(){
      return this.$mine('realUser/selectRealUserByUserId',{userDevice:'02'})
    },
    _ajax(){
      return new Promise((resolve,reject) => {
        this.userStatus().then(res => {
          if(res.code == '200'){
            res.model.status >= 2 ? this.userMessage().then(result => {
              result.code == '200' && resolve({res,result})
            }):resolve({res})
          }else reject()
        })
      })
    },
    exitAccount(){
      this.storage.each((v,k) => {k != 'phone_num' && this.storage.remove(k) })
      this.$router.replace('/')
    },
    toTest(){
      window.location.href="html/2DetailPage/fengxianpinggu.html";
    }
  },
  filters:{
    bankCodeTail(code){
      return code ? `尾号${code.slice(code.length - 4,code.length)}` : ''
    }
  }
}
</script>
<style>
.vux-cell-bd{
  width: 120px;
}
</style>

<style lang="less" scoped>
  .exit-btn{
    position: absolute;
    width: 100%;
    max-width: 750px;
    bottom: 0
  }
  .user-bankCard{
    display: flex;
    justify-content: space-between;
    img{
      width: 25px;
      height: 25px;
      display: inline-block;
    }
  }
  .risk-test{
    display: flex;
    justify-content: space-between;
  }
</style>
