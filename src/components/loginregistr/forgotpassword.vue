<template>
  <!--忘记密码第一步-->
    <div class="container has-header">
      <mHeader :text="text" :isBack="isBack" @leftBack="leftBack"></mHeader>
      <phoneNum :phoneIform="phoneIform" :storePhoneNum="maskValue" class="modifypassword" v-on:count="getcount"></phoneNum>
      <div class="nextStop">
        <button :disabled="nextStep" @click="tolink">下一步</button>
      </div>
    </div>
</template>

<script>
    import mHeader from "../common/m-header.vue"
    import phoneNum from "./phoneNum.vue"
    export default {
        data(){
            return {
              text:"忘记密码",
              isBack:true,//紧张头部返回按钮默认事件
              maskValue:this.storage.get('phone_num') || "",//手机号码
              nextStep:true,
              phoneIform:{//组件传值
                img:require("../../assets/common/login_phone@2x.png"),
                desk:"手机号",
                place:"请输入您的手机号码",
                mask:"999 9999 9999",
                max:13,
                type:"tel"
              },
            }
        },
        methods:{
        	leftBack(){
        		if(this.storage.get("loginStatus") != "1"){
        			this.storage.set("phone_num","");
        		};
        		this.$router.go(-1);
        	},
        	changeTitle(){
        		if(this.$route.query.title == "1"){
        			this.text = "修改登录密码"
        		};
        	},
          onchange(){
            if(this.maskValue.replace(/\s/g,"")){
              this.nextStep = false;
            }else{
              this.nextStep = true;
            }
          },
          getcount(count){
            this.maskValue = count;
            this.onchange();
          },
          tolink(){
            var reg = /^1\d{10}$/;
            if(reg.test(this.maskValue.replace(/\s/g,""))){
              this.storage.set("phone_num",this.maskValue.replace(/\s/g,""));
              if(this.$route.query.title == "1"){
        				this.$router.push("/modifypassword?title=1");
        			}else{
              	this.$router.push("/modifypassword");
             	};
              //this.$router.push("/modifypassword?phone_num=" + this.maskValue.replace(/\s/g,""));
            }else{
              this.$vux.toast.show({
                type:'text',
                text: '手机号码格式不正确',
                width:'80%'
              });
            }
          }
        },
        created(){
        	this.changeTitle()
        },
        components:{
          mHeader,
          phoneNum
        },
        metaInfo() {
          return {
            title: this.text
          }
        }
    }
</script>

<style scoped>
  .forgetPassed .weui-cells:after{border-bottom:0 !important;}
  .nextStop{padding:30px 15px 0;}
  .nextStop button{display:block;width:100%;height:44px;color:#fff;border-radius:4px;font-size:18px;background:#FF665E;border:0;}
  .nextStop button[disabled=disabled]{background:#ccc;}
</style>
<style>
  .modifypassword .loginphoneNumber .leftIcon{display:none;}
  .modifypassword .loginphoneNumber .leftTitle{width:77px;color:#000;}
</style>
