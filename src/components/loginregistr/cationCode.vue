<template>
  <!--图形验证码-->
  <div>
    <group class="loginphoneNumber cationCode">
      <x-input class="weui-cell_vcode" :show-clear="isClear" placeholder="请输入图形验证码" maxlength="4" v-model="grapcode" @on-change="passedchange" @on-focus="onpoint" @on-blur="onblur">
        <div slot="label">
          <img class="leftIcon" :src="imgIcon">
          <span class="leftTitle">图形验证</span>
        </div>
        <div slot="right" style="display:inline-block;width:104px;border-left:solid 1px #f5f5f5;margin:0;padding:0;vertical-align:middle;">
          <img src="" v-if="url" id="urlImg" @click="refreshCode">
          <span id="registerValidate" @click="refreshCode" v-else></span>
        </div>
      </x-input>
    </group>
  </div>
</template>

<script>
    import { XInput, Group } from 'vux'
    export default {
        data(){
            return {
              grapcode:"",
              isClear:true,
              imgIcon:require("@/assets/common/login_invite@2x.png")
            }
        },
        mounted(){
          this.refreshCode()
        },
        methods:{
          onpoint(){
          	this.isClear = true;
            this.imgIcon = require("@/assets/common/login_invite@2x_hover.png");
            this.notifocuse();
          },
          notifocuse(){
            let key = "point";
            this.$emit(key,"onFocuse");
          },
          onblur(){
            if(!this.grapcode){
              this.imgIcon = require("@/assets/common/login_invite@2x.png");
            };
            this.notiblur();
            this.isClear = false;
          },
          notiblur(){
            let key = "blur";
            this.$emit(key,"onBlur");
          },
          refreshCode() {//图形验证码点击事件
            var registerValidate = document.getElementById("registerValidate");
            var urlImg = document.getElementById("urlImg");
            var backImg = "";
            var phnum = this.storage.get('phone_num')
            if(this.url == 1){
              backImg = CodeImg + this.number;
              urlImg.src = backImg;
            }else{
              backImg = IMAGEURL + Math.random();
              registerValidate.style.background = 'url('+ backImg + ') no-repeat center';
              registerValidate.style.backgroundSize = '100% 100%';
            }
          },
          passedchange(){//向父组件传递图形验证码
            this.grapcode = this.grapcode.trim();
            this.grapcount();
          },
          grapcount(){
            let key = "grap";
            this.$emit(key,this.grapcode);
          }
        },
        components:{
          XInput,
          Group
        },
        props:["url","number"]
    }
</script>

<style scoped>
  #registerValidate{display:block;width:100%;height:46px;}
  #urlImg{display:block;width:100%;height:46px;}
</style>
<style>
  .loginphoneNumber .weui-cells:after{border-bottom:0;}
  .cationCode .weui-cell__ft{width:140px;}
  .loginphoneNumber.cationCode .weui-cell{padding:0 0 0 20px;}
</style>
