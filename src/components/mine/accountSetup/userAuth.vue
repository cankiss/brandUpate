<template>
  <div class="container has-header userAuth">
    <m-header :msg='msg'></m-header>
    <!-- <div class="easy-recharge">
      <div>
        <p class="font-size-16">便捷绑卡充值</p>
        <p class="font-666">绑卡充值，方便快捷一步到位</p>
      </div>
      <div class="link-btn">
        <router-link to='/mine/easyRecharge'>去试试</router-link>
      </div>
    </div> -->
    <div v-if="item">
      <group>
        <x-input
        title="姓名"
        :placeholder="item.status >= 2 ? item.realName :'请输入姓名'"
        @on-change="items.name = item.realName"
        v-model="item.realName"
        label-width="100px"
        :readonly="item.status >=2"></x-input>
        <x-input
        title="身份证号"
        :placeholder="item.status >= 2 ? item.idCard : '请输入您的身份证号'"
        @on-change="items.idCard = item.idCard"
        v-model="item.idCard"
        label-width="100px"
        :max="18"
        :readonly="item.status >=2"></x-input>
      </group>

      <div class="recharge-tip font-size-12">
        <p class="font-999">请绑定本人银行卡，银行卡户名要求与实名信息一致</p>
        <span @click="$router.push('/find/help/bankQuota')">查看支持银行</span>
      </div>

      <group>
        <x-input title="银行卡号"
        placeholder="请输入银行卡号"
        label-width="100px"
        :show-clear='false'
        :max='19'
        v-model="items.bankCardNo"
        @on-blur="getBankLogo(items.bankCardNo)">
          <img :src="bankLogo" slot="right" style="width:25px;height:25px;">
        </x-input>

        <x-input title="预留手机"
        placeholder="请输入银行预留手机号"
        label-width="100px"
        :show-clear='false'
        :required='true'
        :max="11"
        v-model="items.mobile"
        ></x-input>

        <x-input title="验证码"
        placeholder="请输入验证码"
        label-width="100px"
        :show-clear="false"
        :max="6"
        v-model="items.validateCode">
          <div slot="right">
            <a href="javascript:" style="color:#FF665E" @click="sendMsg(items.mobile)" v-show="codeShow">获取</a>
            <countdown v-show="!codeShow" v-model="time" @on-finish="finish" :start="!codeShow"></countdown>
          </div>
        </x-input>

        <x-input
        title="交易密码"
        placeholder="请设置平台6位数字交易密码"
        label-width="100px"
        :show-clear="false"
        :max="6"
        :type="checkText ? 'password': 'text'"
        :is-type="isNum"
        ref="isPwd"
        v-model="items.pwd">
          <img src="~assets/common/eye@2x.png" slot="right" style="width:25px;height:20px;" @click="checkText = !checkText" v-if='checkText'>
          <img src="~assets/common/icon_eye_open@2x.png" slot="right" style="width:25px;height:20px;" @click="checkText = !checkText" v-else>
        </x-input>
      </group>
    </div>
    <div style="text-align:center;margin:10px 0">
      <!-- <p class="font-size-12 font-999">收不到短信验证码？<span style="color:#43A0FF" @click="sendMsg(items.mobile,2)">获取语音验证码</span></p> -->
    </div>
    <div style="width:90%;margin:20px auto;">
      <x-button type='warn' @click.native="goBindCard(items)">确认绑卡</x-button>
    </div>
    <m-dialog ref="dialog" @onHide="$router.go(-1)">
      绑卡成功！
    </m-dialog>
  </div>
</template>
<script>
import { XInput , Group , XButton , Cell , Countdown} from "vux";
import MHeader from '../common/headerService'
import MDialog from '../common/dialog'
import md5 from '@/config/md5'
export default {
  data(){
    return{
      msg:'信息认证',
      bankLogo:require('@/assets/mine/icon_card@2x.png'),
      codeShow:true,
      checkText:true,
      time:60,
      item:{},
      items:{
        bankCardNo:'',
        name:'',
        idCard:'',
        bankCode:'',
        pwd:'',
        validateCode:'',
        mobile:'',
        userDevice:'02'
      },
      isNum:function(value){
        return {
          valid: /^[0-9]*$/.test(value),
          msg: '请填写6位数字'
        }
      }
    }
  },
  components:{
    MHeader,
    XInput,
    Group,
    XButton,
    Cell,
    Countdown,
    MDialog
  },
  created(){
    this.$mine('realUser/selectRealUserByUserId',{userDevice:'02'})
      .then(({code,model}=res) =>{
        if(code == '200') this.item = model
      })
  },
  methods:{
    finish(index){
      this.codeShow = !this.codeShow
      this.time = 60
    },
    sendMsg(phone_num,type = '1'){
      if(!phone_num) return
      this.codeShow = !this.codeShow
      this.$mine('sms/requestAppValidateCode',{
        type,operationType:'6',phone_num
      }).then(({code,msg}=res) =>{
        code == '200' && this.$vux.toast.show({
            type: "text",
            text: type === '1' ? "验证码已发送" : '语音验证码已发送',
            position: "middle",
            width:'80%'
        });
        code != '200' && this.$vux.toast.show({
            type: "text",
            text: msg,
            position: "middle",
            width:'80%'
        })
      })
    },
    getBankLogo(bankCardNo) {
      bankCardNo &&
        this.$post('information/getBankInformation',{
          userDevice:'02',bankCardNo
        }).then(({model,code,msg}=res) => {
          if(code === '200') {
            this.bankLogo = model.logo
            this.items.bankCode = model.bankCode
          }else this.$vux.toast.show({
            type: "text",
            text: msg,
            position: "middle",
            width:'80%'
          })
        })
    },
    goBindCard(_json){
      let isSubmit = true
      Object.values(_json).forEach(item => {
        if(!item) {
          this.$vux.toast.show({
            type: "text",
            text: '请填写完整',
            position: "middle",
            width:'80%'
          })
          isSubmit = !isSubmit
        }
      })

      if(isSubmit && this.$refs.isPwd.valid){
        let {pwd:transactionPassword} = _json
        delete _json.pwd
        this.$mine('information/bindingCard',
        Object.assign(_json,{transactionPassword:md5(transactionPassword)}))
        .then(({code,msg}=res) => {
          if(code === '200') {
            this.$refs.dialog.showDialog = true
          }else this.$vux.toast.show({
              type: "text",
              text: msg,
              position: "middle",
              width:'80%'
          })
        })
        _json.pwd = transactionPassword
      }
    }
  }
}
</script>
<style>
.weui-cells{
  margin-top: 0;
}
.userAuth .weui-cell_warn .weui-icon-warn{
  display: none;
}
</style>

<style lang="less" scoped>
  .easy-recharge{
    padding: 5px 10px;
    display: flex;
    justify-content: space-between;
    .link-btn >a{
      color: #43A0FF;
      padding: 2px 10px;
      height: 20px;
      width: 48px;
      border: 1px solid #43A0FF;
      border-radius: 63px;
      display: inline-block;
      margin-top: 10px;
    }
  }

  .recharge-tip{
    padding: 5px;
    display: flex;
    justify-content: space-around;
    span{
      color: #43A0FF
    }
  }
</style>