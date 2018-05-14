<template>
  <div class="container has-header payPwdSet">
    <m-header :text="msg ? '设置交易密码' : '重置交易密码' "></m-header>
    <group :title="'您的登录账号'+ storage.get('phone_num') | phoneHidden">
      <x-input title="验证码" placeholder="请输入验证码" label-width="100px" :show-clear="false" :max='6'
      v-model="items.smsCode">
        <div slot="right">
          <a href="javascript:void(0)" style="color:#FF665E" @click="sendMsg" v-show="codeShow">获取</a>
          <countdown v-show="!codeShow" v-model="time" @on-finish="finish" :start="!codeShow"></countdown>
        </div>
      </x-input>
    </group>
    <div class="send-validate">
      <!-- <p class="font-size-12">收不到短信验证码？<a href="javascript:void(0)" style="color:#43A0FF">获取语言验证码</a></p> -->
    </div>
    <group>
      <x-input title="身份证号" placeholder="请输入您的身份证号码" label-width="100px" :show-clear="false" :max="18"
      v-if='!msg' v-model="items.idcard"></x-input>
      <x-input title="交易密码" placeholder="请设置平台6位数字交易密码"
      label-width="100px"
      :max='6'
      :is-type="isNum"
      :show-clear="false"
      v-model="items.pwd"
      :type="checkText ? 'password': 'text'" ref='isPwd'>
      <div slot="right" style="width:25px;height:15px;">
        <img src="~assets/common/eye@2x.png"  @click="checkText = !checkText" v-if='checkText'>
        <img src="~assets/common/icon_eye_open@2x.png" @click="checkText = !checkText" v-else>
      </div>
      </x-input>
    </group>
    <div style="margin:20px;width:90%">
      <x-button type="warn" @click.native="accomplishSet(items)" v-if="msg">完成</x-button>
      <x-button type="warn" @click.native="accomplishReset(items)" v-else>完成</x-button>
    </div>
    <m-dialog ref="dialog" @onHide="$router.go(-1)">
      恭喜您！
      <p slot="info">修改成功！</p>
    </m-dialog>
  </div>
</template>
<script>

import { XInput , Group , XButton , Cell , Countdown} from "vux";
import MHeader from "~/common/m-header";
import md5 from '@/config/md5'
import MDialog from '../../common/dialog'
export default {
  data(){
    return {
      checkText:true,
      codeShow:true,
      time:60,
      items:{
        smsCode:'',
        idcard:'',
        pwd:'',
        checkType:'realName',
        orgCode:'1',
        userDevice:'02'
      },
      isNum:function(value){
        return {
          valid: /^[0-9]*$/.test(value),
          msg: '请输入6位数字'
        }
      }
    }
  },
  methods:{
    finish(){
      this.codeShow = !this.codeShow
      this.time = 60
    },
    sendMsg(){
      this.codeShow = !this.codeShow
      this.$mine('sms/requestAppValidateCode',{
        type:'1',operationType:this.msg ? '9' : '7'
      }).then(({code,msg}=res) =>{
        code == '200' && this.$vux.toast.show({
            type: "text",
            text: "验证码已发送",
            position: "middle"
        });
        code != '200' && this.$vux.toast.show({
            type: "text",
            text: msg,
            position: "middle",
            width:'80%'
        })
      })
    },
    accomplishReset(_json){
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
        let {pwd:newPassword} = _json
        delete _json.pwd
        this.$mine('bankPay/updateTradePasswordP',
        Object.assign(_json,{newPassword:md5(newPassword)}))
          .then(({code,msg}=res) => {
            if(code === '200'){
              this.$refs.dialog.showDialog = true
            }else this.$vux.toast.show({
              type: "text",
              text: msg,
              position: "middle",
              width:'80%'
          })
        })
        _json.pwd = newPassword
      }
    },
    accomplishSet(_json){
      let {smsCode,pwd:password} = _json
      if(smsCode && password && this.$refs.isPwd.valid){
        this.$mine('bankPay/setTradePassword',{
          smsCode,password:md5(password),mobile:this.storage.get('phone_num')
        }).then(({code,msg}=res) =>{
          code === '200' ?
              this.$refs.dialog.showDialog = true
            : this.$vux.toast.show({
              type: "text",
              text: msg,
              position: "middle",
              width:'80%'
          })
        })
      }
      else if (!this.$refs.isPwd.valid){
        this.$vux.toast.show({
            type: "text",
            text: '请填写6位数字',
            position: "middle",
            width:'80%'
          })
      }
      else this.$vux.toast.show({
            type: "text",
            text: '请填写完整',
            position: "middle",
            width:'80%'
          })
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
  computed:{
    msg(){
      return this.$route.params.type == 0
    }
  }
}
</script>
<style>
.payPwdSet .weui-cell_warn .weui-icon-warn{
  display: none;
}
</style>

<style lang="less" scoped>
  .send-validate{
    text-align: center;
    padding: 10px 0;
    height: 10px;
  }
</style>
