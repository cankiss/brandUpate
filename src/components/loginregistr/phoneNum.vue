<template>
    <!--输入手机号码-->
  <div>
    <group class="loginphoneNumber">
      <x-input v-model="phonenumber" :placeholder="phoneIform.place" :show-clear="isClear" :type="phoneIform.type" :max="phoneIform.max" @on-change="onFocus" @on-focus="onpoint" @on-blur="onblur" @keyup.native="onkeydown">
        <div slot="label">
          <img class="leftIcon" :src="iconImg">
          <span class="leftTitle">{{ phoneIform.desk }}</span>
        </div>
      </x-input>
    </group>
  </div>
</template>

<script>
    import { XInput, Group,debounce } from 'vux';
    export default {
        data(){
            return {
              phonenumber:"",
              iconImg:this.phoneIform.img,
              isClear:true
            }
        },
        created(){
        	this.obtainNumber()
        },
        methods: {
          onFocus(){//向父组件传递手机号码
            this.notiflycount();
          },
          obtainNumber(){
          	if(this.storePhoneNum){
          		let arr = this.storePhoneNum.split("");
          		for(let k = 0;k < arr.length; k++){
	              if( k == 3 || k == 7){
	                arr[k] = " " + arr[k];
	              };
	           	};
          		this.phonenumber = arr.join("");
          	};
          },
          onpoint(){//获得焦点事件
            if(this.phoneIform.type == "tel"){
              this.iconImg = require("@/assets/common/login_phone@2x_hover.png");
            }else if(this.phoneIform.type == "text"){
              this.iconImg = require("@/assets/common/login_invite@2x_hover.png");
            };
            this.notifocuse();
            this.isClear = true;
          },
          onblur(){
            if(!this.phonenumber){
              this.iconImg = this.phoneIform.img;
            };
            this.notiblur();
            this.isClear = false;
          },
          onkeydown:debounce(function(){
            this.phonenumber = this.phonenumber.substr(0,13).replace(/\D/g,"");
            if(!this.phonenumber) return;
            let arr = this.phonenumber.split("");
            for(let k = 0;k < arr.length; k++){
              if( k == 3 || k == 7){
                arr[k] = " " + arr[k];
              };
            };
            this.phonenumber = arr.join("");
            this.phonenumber = this.phonenumber.substr(0,13);
          },300),
          notiflycount(){
            let key = "count";
            this.$emit(key,this.phonenumber);
          },
          notifocuse(){
            let key = "point";
            this.$emit(key,"onFocuse");
          },
          notiblur(){
            let key = "blur";
            this.$emit(key,"onBlur");
          }
        },
        components:{
          XInput,
          Group
        },
        props:["phoneIform","storePhoneNum"]
    }
</script>

<style>
  .loginphoneNumber .leftIcon{display:inline-block;padding-right:10px;width:18px;vertical-align:middle}
  .loginphoneNumber .leftTitle{display:inline-block;font-size:14px;color:#999;width:66px;}
  .loginphoneNumber .weui-cell{padding:10px 20px;}
  .loginphoneNumber .weui-cells:after{border-bottom:0;}
</style>
