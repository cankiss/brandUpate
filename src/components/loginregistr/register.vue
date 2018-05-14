<template>
  <!--注册第一步-->
    <div class="container has-header">
      <mHeader class="loginPageTitle" :text="title" :isBack="isBack" @leftBack="leftBack" @rightMore="rightMore">
      	<img src="~/assets/common/call@2x.png" slot="rightHtml">
      </mHeader>
      <!--logo-->
      <headLogo></headLogo>
      <div ref="jump">
	      <!--表单-->
	      <ul class="phone">
	        <li><phoneNum :phoneIform="phoneIform" v-on:count="getcount" v-on:point="getPoint"></phoneNum></li>
	        <li><phoneNum :phoneIform="vercodeIform" v-on:count="getvercode" v-on:point="getPoint"></phoneNum></li>
	      </ul>
	      <!--下一步-->
	      <div class="jump">
	        <a href="javascript:;" v-if="isToLink">下一步</a>
	        <a href="javascript:;" @click="toLink" v-else class="current">下一步</a>
	      </div>
      </div>
      <!--注册说明-->
      <div style="text-align:center;color:#ff665e;line-height:40px;">注册领取8888体验金+518元返现券</div>
      <!--广告位-->
      <div class="add" v-show="$route.params.id == 1">
        <img src="../../assets/common/addd.png" alt="">
      </div>
      <!--底部-->
      <div class="registfooter" ref="registfooter">亿宝贷  不会泄露您的个人信息</div>
      <!--toast-->
      <toast width="80%" position="middle" v-model="showPositionValue" type="text" :time="2000">{{ prompt }}</toast>
    </div>
</template>

<script>
    import mHeader from "../common/m-header.vue"
    import headLogo from "./headLogo.vue"
    import { XInput, Group } from 'vux'
    import { Toast } from 'vux'
    import phoneNum from "./phoneNum.vue"
    export default {
        data(){
            return {
              title:"注册",
              isBack:true,
              phonenumber:this.storage.get('phone_num') || "",//注册手机号
              invicode:"",//邀请码
              isToLink:true,//下一步是否可点击
              showPositionValue:false,//toast提示框
              prompt:"",//toast提示信息
              phoneIform:{//组件传值
                img:require("../../assets/common/login_phone@2x.png"),
                desk:"手机号码",
                place:"请输入手机号",
                mask:"999 9999 9999",
                max:13,
                type:"tel"
              },
              vercodeIform:{//组件传值
                img:require("../../assets/common/login_invite@2x.png"),
                desk:"邀请码 ",
                place:"请输入邀请码(选填)",
                mask:"99999999999",
                max:13,
                type:"text"
              }
            }
        },
        components:{
          mHeader,
          XInput,
          Group,
          Toast,
          headLogo,
          phoneNum
        },
        mounted(){
        	this.showAdd()
        },
        methods:{
        	leftBack(){
        		this.storage.set("phone_num","");
        		this.$router.go(-1);
        	},
          rightMore(){
            this.$router.push("/find/customerService");
          },
          showAdd(){
          	if(this.$route.params.id == 1){
          		this.$refs.registfooter.style.padding = 0;
          	};
          },
          getPoint(point){
          	let _this = this;
          	setTimeout(()=>{
          		let jump = _this.$refs.jump;
          		jump.scrollIntoViewIfNeeded();
          	},500);
          },
          getcount(count){//去除手机号的空格
            this.phonenumber = count.replace(/\s/g,"");
            if(this.phonenumber != ""){
              this.isToLink = false;
            }else{
              this.isToLink = true;
            };
          },
          getvercode(count){//去除邀请码的空格
            this.invicode = count.replace(/\s/g,"");
          },
          toLink(){//点击下一步按钮
            let usernumber = this.phonenumber;
            let vscode = this.invicode;
            var reg = /^1\d{10}$/;
            if(!reg.test(usernumber)){
              this.prompt = "手机号码格式不正确";
              this.showPositionValue = true;
            }else{
              this.storage.set('phone_num', usernumber);
              this.storage.set('inviteCode', vscode);
              this.$router.push("/registerSafety");
              return;
              this.$post("/user/validPhoneAndInviteCode",{"phone_num": usernumber,"inviteCode": vscode}).then(res=>{
                console.log(res);
              if(res.code == "200"){
                if(res.model.phone == "nonExist"){
                  if(res.model.inviteCode == "exist"){
                    this.storage.set('phone_num', usernumber);
                    this.storage.set('inviteCode', vscode);
                    this.$router.push("/registerSafety");
                  }else{
                    if(vscode != "") {
                      this.prompt = "邀请码不不正确，请重新输入";
                      this.showPositionValue = true;
                    } else {
                      this.storage.set('inviteCode', vscode);
                      this.storage.set('phone_num', usernumber);
                      this.$router.push("/registerSafety");
                    }
                  };
                }else{
                  this.prompt = "手机号码已存在";
                  this.showPositionValue = true;
                }
              }else {
                this.prompt = res.msg;
                this.showPositionValue = true;
              }
            });
            };
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
  .phone{margin-top:10px;background:#fff;}
  .jump{margin-top:24px;}
  .jump a{display:block;width:90%;height:44px;background: #D8D8D8;color:#fff;font-size:18px;line-height:44px;margin:0 auto;text-align:center;border-radius:5px;}
  .jump a.current{background:#FF665E;}
  .add{padding:30px 65px 10px;}
 .registfooter{width:100%;color:#666;font-size:12px;text-align:center;padding-top:100px;}
</style>
<style>
  .loginPageTitle .left-arrow{background: url("../../assets/common/login_nardet@2x.png") no-repeat!important; background-size: 100%!important;}
  .loginPageTitle .left-arrow:before{border-color: transparent!important;}
  .loginPageTitle .vux-header .vux-header-left .left-arrow{width:16px;height:16px;top:0;}
</style>
