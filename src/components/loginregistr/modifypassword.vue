<template>
  <!--修改密码第二步-->
  <div class="container has-header">
    <mHeader :text="title"></mHeader>
    <p class="loginNum">您的登录账号{{ phone_num | momentNum }}</p>
    <ul class="regbox">
      <!--图形验证码-->
      <li><cationCode v-on:grap="getgrap" class="modifypassword"></cationCode></li>
      <li class="modifypassword">
        <!--短信验证码-->
        <group class="loginphoneNumber cationCode loginforgetpassword">
          <x-input class="weui-cell_vcode" :show-clear="isClear" :max="max" placeholder="请输入验证码" v-model="smscode" @on-change="passedchange" @on-focus="onpoint" @on-blur="onblur">
            <div slot="label">
              <img class="leftIcon" src="~/assets/common/login_conforcode@2x.png">
              <span class="leftTitle">验证码</span>
            </div>
            <div slot="right" style="display:inline-block;width:104px;height:46px;border-left:solid 1px #f5f5f5;vertical-align:middle;margin:0;padding:0;">
              <x-button class="timeDown" type="default" mini @click.native="cutdown('sms/requestCodeValidateCode',1)">获 取</x-button>
            </div>
          </x-input>
        </group>
      </li>
      <!--<li>-->
        <!--语音验证码-->
        <!--获取语音验证码点击事件   @click="cutdown('sms/requestValidateCode',2)" 使用时直接添加到第一个a标签中并移除class类名-->
        <!--<div class="verifcode">收不到短信验证码？<a v-if="isDisabled" href="javascript:;" class="notvoice">获取语音验证码</a>
          <a v-else href="javascript:;" class="notvoice">获取语音验证码</a>
        </div>
      </li>-->
      <li><landcode :promp="promp" v-on:password="getpassword" class="modifypassword"></landcode></li>
    </ul>
    <p class="passwordDesc">密码由6-16位数字、字母、特殊符号至少两种组成</p>
    <!--注册按钮-->
    <div class="registButton">
      <button v-if="fillAll">完成</button>
      <button v-else class="current" @click="diateregistr">完成</button>
    </div>
  </div>
</template>

<script>
  import mHeader from "../common/m-header.vue"
  import { XInput, Group,XButton } from 'vux'
  import cationCode from "./cationCode.vue"
  import landcode from "./landcode.vue"
  export default {
    data(){
      return {
        title:"忘记密码",
        max:6,
        promp:{
          title:"新登录密码",
          place:"请输入新登录密码"
        },
        isClear:true,
        isEyes:true,//输入的密码是否可见
        grapcode:"",//图形验证码
        fillAll:true,//输入框是否全部有内容
        smscode:"",//短信验证码
        passed:"",//密码
        phone_num:this.storage.get('phone_num'),//手机号
        //phone_num:this.$route.query.phone_num,
        isDisabled:true//获取短信验证码和语音验证码是否可点击
      }
    },
    mounted(){
      //组件加载完毕添加验证码图片
      this.refreshCode()
    },
    created(){
    	this.changeTitle()
    },
    methods:{
    	onpoint(){
    		this.isClear = true;
    	},
    	onblur(){
    		this.isClear = false;
    	},
    	changeTitle(){
    		if(this.$route.query.title == "1"){
    			this.title = "修改登录密码"
    		};
    	},
      getgrap(grap){//获取用户输入的图形验证码
        this.grapcode = grap;
        this.passedchange();
      },
      getpassword(password){//获取用户输入的密码
        this.passed = password;
        this.passedchange();
      },
      cutdown(url,num){//获取短信验证码和语音验证码的点击事件
        if(!this.isDisabled)return;
        this.isDisabled = false;
        let vsCode = this.grapcode.replace(/\s/g,"");//去除图形验证码的空格
        let codeData = {
          "phone_num": this.phone_num,
          "type": num,
          "operationType": 2,
          "picCode": vsCode
        };
        if(vsCode){
          this.$post(url,codeData).then(res=>{
            console.log(res);
          if(res.code == "200"){
            this.$vux.toast.show({
              type:'text',
              text: res.msg,
              width:'80%'
            });
            var scents = 60;
            let self = this;
            var timeDown = document.querySelector(".timeDown");
            var timer = setInterval(function(){
              scents--;
              if(scents <= 0){
                self.isDisabled = true;
                clearInterval(timer);
                timeDown.innerHTML = '重新获取';
              }else{
                timeDown.innerHTML = scents + 's';
              }
            },1000);
          }else{
            this.isDisabled = true;
            this.$vux.toast.show({
              type:'text',
              text: res.msg,
              width:'80%'
            })
          }
        })
        }else{
          this.isDisabled = true;
          this.$vux.toast.show({
            type:'text',
            text: '请输入图形验证码',
            width:'80%'
          })
        }
      },
      refreshCode() {//图形验证码点击事件
        var registerValidate = document.getElementById("registerValidate");
        registerValidate.style.background = 'url('+ IMAGEURL + Math.random() + ') no-repeat center';
        registerValidate.style.backgroundSize = '100% 100%';
      },
      passedchange(){//判断三个输入框是否都有值
        this.smscode = this.smscode.trim();
        if(this.passed && this.smscode && this.grapcode){
          this.fillAll = false;
        }else{
          this.fillAll = true;
        }
      },
      diateregistr(){//完成按钮点击事件
        let validate_code = this.smscode.replace(/\s/g,"");
        let password = this.passed;
        //数字 字母 和下划线
        var reg = /^(?!^\d+$)(?!^[a-zA-Z]+$)(?!^_+$)[\d|a-zA-Z|_]{6,16}$/;
        if(reg.test(password)){
          let regisData = {
            phone_num:this.phone_num,
            validate_code:validate_code,
            password:password
          };
          this.$post("user/resetPassword",regisData).then(res=>{
            console.log(res);
            if(res.code == "200"){
              this.$vux.toast.show({
                type:'text',
                text: '密码修改成功',
                width:'80%'
              });
              //this.storage.set("loginStatus", 1);
              this.storage.set("phone_num", this.phone_num);
              //this.storage.set("user_id", res.model.userId);
              this.storage.set("inviteCode", res.model.inviteCode);
              this.$router.go("-2");
            }else{
              this.$vux.toast.show({
                type:'text',
                text: res.msg,
                width:'80%'
              })
            }
          })
        }else{
          this.$vux.toast.show({
            type:'text',
            text: '登录密码由6-16位数字、字母、下划线组合，至少包含两种类型',
            width:'80%'
          })
        }
      }
    },
    components:{
      mHeader,
      XInput,
      Group,
      cationCode,
      landcode,
      XButton
    },
    filters:{
      momentNum(num){
        var newArr = num.split("");
        for(let i = 3;i<=6;i++){
          newArr[i] = "*";
        };
        return newArr.join("");
      }
    },
    metaInfo() {
      return {
        title: this.title
      }
    }
  }
</script>

<style scoped>
  .loginNum{line-height:40px;font-size:12px;color:#999;padding-left:12px;}
  .passwordDesc{text-align:center;font-size:12px;color:#666;margin-top:14px;}
  /*注册按钮*/
  .registButton{text-align:center;margin-top:20px;}
  .registButton button{width:90%;height:44px;background:#D8D8D8;font-size: 18px;color: #FFFFFF;border:0;border-radius:5px;}
  .registButton button.current{background:#FF665E;}
  /*语音验证码*/
  .verifcode{text-align:center;font-size:12px;color:#999;line-height:50px;}
  .verifcode a{color:#65b0fc;}
  .verifcode a.notvoice{color:#999;}
</style>
<style>
  .loginphoneNumber .weui-btn:after{border:0;transform: scale(1)}
  .loginphoneNumber .weui-btn_default{background-color:rgba(0,0,0,0);width:115px;height:46px;font-size: 14px;color: #FF665E;}
  .loginphoneNumber .weui-btn_mini{padding:0;}
  .loginphoneNumber.loginforgetpassword .leftIcon{display:none;}
  .modifypassword .loginphoneNumber .leftIcon{display:none;}
  .modifypassword .loginphoneNumber .leftTitle{width:77px;color:#000;}
</style>
