<template>
  <!--登录密码-->
  <div>
    <group class="loginphoneNumber loginlandcode">
      <x-input v-model="passed" :show-clear="isClear" :placeholder="promp.place" :type="type" :max="max" @on-change="passedchange" @on-focus="onpoint" @on-blur="onblur">
        <div slot="label">
          <img class="leftIcon" :src="imgIcon">
          <span class="leftTitle" >{{promp.title}}</span>
        </div>
        <div slot="right" style="width:25px;height:100%;vertical-align:middle;display:inline-block;">
          <span v-if="isEyes" @click="openClose" style="display:block;height:24px;">
          	<img src="../../assets/common/eye@2x.png" style="vertical-align: middle;display:inline-block;">
          </span>
          <span v-else @click="openClose" style="display:block;height:24px;">
          	<img src="../../assets/common/icon_eye_open@2x.png" style="vertical-align: middle;display:inline-block;">
          </span>
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
              passed:"",
              isEyes:true,//输入的密码是否可见
              isPoor:false,
              isClear:true,
              max:16,
              type:"password",
              imgIcon:require("@/assets/common/login_code@2x.png")
            }
        },
        methods: {
          onpoint(){
          	this.isClear = true;
            this.imgIcon = require("@/assets/common/login_code@2x_hover.png");
            this.notifocuse();
          },
          notifocuse(){
            let key = "point";
            this.$emit(key,"onFocuse");
          },
          onblur(){
            if(!this.passed){
              this.imgIcon = require("@/assets/common/login_code@2x.png");
            };
            this.notiblur();
            this.isClear = false;
          },
          notiblur(){
            let key = "blur";
            this.$emit(key,"onBlur");
          },
          openClose(){//输入的密码是否可见
            this.isEyes = !this.isEyes;
            if (this.isEyes) {
              this.type = "password";
            } else {
              this.type = "text";
            }
          },
          passedchange(){//向父组件传递登录密码
            this.passed = this.passed.trim();//去除两端空格
            if(this.passed.length > 0){
              this.isPoor = true;
            }else{
              this.isPoor = false;
            };
            this.passedcount();
          },
          passedcount(){
            let key = "password";
            this.$emit(key,this.passed);
          },
          poorclick(){
            this.passed = "";
            this.isPoor = false;
            this.passedcount();
          }
        },
        components:{
          XInput,
          Group
        },
        props:["promp"]
    }
</script>

<style>
  .loginphoneNumber .leftIcon{display:inline-block;padding-right:10px;width:18px;vertical-align:middle}
  .loginphoneNumber .leftTitle{display:inline-block;font-size:14px;color:#999;width:66px;}
  .loginphoneNumber .weui-cell{padding:10px 20px;}
  .loginlandcode .weui-cell__ft{width:60px;}
  .loginphoneNumber .leftIcon{display:inline-block;}
</style>
