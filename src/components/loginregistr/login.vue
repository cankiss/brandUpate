<template>
    <div class="container has-header">
      <mHeader class="loginPageTitle" :isBack="isBack" @leftBack="leftBack" :text="title" @rightMore="rightMore"><!--微信-头部左边返回按钮重新处理-->
        <p slot="rightHtml" style="font-size: 14px;color: #FF665E;" v-if="isMemory">切换账号</p>
        <p slot="rightHtml" style="font-size: 14px;color: #FF665E;padding:0 5px;" v-else>注册</p>
      </mHeader>
      <!--logo-->
      <headLogo></headLogo>
      <div ref="button">
	      <!--登录表单-->
	      <ul class="login">
	        <li class="memoryNum" v-if="isMemory">您上次登录账号{{ phone_num | momentNum }}</li>
	        <li v-else><phoneNum v-on:count="getcount" :phoneIform="phoneIform" v-on:point="getPoint"></phoneNum></li>
	        <li><landcode :promp="promp" v-on:password="getpassword" v-on:point="getPoint"></landcode></li>
	        <li v-show="worry"><cationCode v-on:grap="getgrap" :url="imgurl" :number="phone_num" v-on:point="getPoint" ref="cationCode"></cationCode></li>
	      </ul>
	      <!--忘记密码-->
	      <p class="forget"><router-link to="/forgotpassword">忘记密码？</router-link></p>
	      <!--微信-登录按钮-->
	      <div class="button">
	        <button v-if="isButton">{{wechatCodeFlag ? '开启免登录模式' : '登录'}}</button><!--微信-登录按钮文字-->
	        <button v-else class="current" @click="land">{{wechatCodeFlag ? '开启免登录模式' : '登录'}}</button><!--微信-登录按钮文字-->
	      </div>
      </div>
      <!--微信-账号免登录绑定-文案-->
      <ul v-if="wechatCodeFlag" class="introText"><!--微信-绑定免登录时才显示-普通登录不显示-->
        <li>想要看收益，省去每次登录输入账号和密码的麻烦。</li>
        <li>绑定微信账号不会泄露您的隐私。</li>
      </ul>
      <!--活动广告-->
      <div v-if="$route.params.id == 1">
        <activeAdd></activeAdd>
      </div>
    </div>
</template>

<script>
    import mHeader from "../common/m-header.vue"
    import headLogo from "./headLogo.vue"
    import phoneNum from "./phoneNum.vue"
    import landcode from "./landcode.vue"
    import cationCode from "./cationCode.vue"
    import activeAdd from "./activeAdd.vue"
    export default {
        data(){
            return {
              title:"登录",
              promp:{
                title:"登录密码",
                place:"请输入登录密码"
              },
              isBack: true,             //微信-禁用默认返回功能
              wechatCode: '',           //微信-授权code
              wechatCodeFlag: false,    //微信-授权标识
              phone_num:"",//登录手机号码
              isMemory:false,//判断是否是记忆用户
              password:"",//登录密码
              grapcode:"",//图形验证码
              isButton:true,
              worry:false,//是否显示验证码
              imgurl:1,
              wrongNumber:"",//密码输入错误次数
              phoneIform:{
                img:require("@/assets/common/login_phone@2x.png"),
                desk:"手机号码",
                place:"请输入手机号",
                mask:"999 9999 9999",
                max:13,
                type:"tel"
              }
            }
        },
        created(){
          this.getMemory()
          this.checkWechatCode() //微信-页面加载时，先判断是不是需要进行【账号免登录绑定】功能
        },
        methods:{
          leftBack(){ //微信-判断是不是微信授权时，设置不同的返回路径
            if(this.wechatCodeFlag){
              this.$router.push('/');
            }else{
              this.$router.go(-1);
            }
          },
          checkWechatCode(){ //微信-检查url中是否有code参数
            let code = this.$route.query.code;
            if(code){
              this.wechatCode = code;
              this.wechatCodeFlag = true;
              this.title = '账号免登录绑定';
            }
          },
          rightMore(){
            if(this.isMemory){
              this.phone_num = "";
              this.isMemory = false;
              this.canLogin();
            }else{
              this.$router.push("/register/2");
              this.storage.set("phone_num","");
            }
          },
          getMemory(){//判断是否有记忆登录
            let memoryNum = this.storage.get("phone_num");
            if(memoryNum){
              this.phone_num = memoryNum;
              this.isMemory = true
            }
          },
          getcount(count){//获取手机号码
            count = this.replace(count);
            this.phone_num = count;
            this.canLogin();
          },
          getPoint(point){
          	let _this = this;
          	setTimeout(()=>{
          		let button = _this.$refs.button;
          		button.scrollIntoViewIfNeeded();
          	},500);
          },
          getpassword(password){//获取登录密码
            password = password.trim();
            this.password = password;
            this.canLogin();
          },
          getgrap(grap){//获取图形验证码
            grap = this.replace(grap);
            this.grapcode = grap;
            if(this.phone_num && this.password && this.grapcode){
              this.isButton = false;
            }else{
              this.isButton = true;
            };
          },
          canLogin(){//判断登录按钮是否可点击
            if(this.wrongNumber == 2){
              if(this.phone_num && this.password && this.grapcode){
                this.isButton = false;
              }else{
                this.isButton = true;
              };
            }else{
              if(this.phone_num && this.password){
                this.isButton = false;
              }else{
                this.isButton = true;
              };
            };
          },
          replace(value){//去除空格
            return value.replace(/\s/g,"");
          },
          land(){//登录方法
              var reg = /^1\d{10}$/;
              if(!reg.test(this.phone_num)){//判断手机号码格式
                this.$vux.toast.show({
                  type:'text',
                  text: '手机号码格式不正确',
                  width:'80%'
                });
                return;
              };
              //数字 字母 和下划线 判断密码格式
              var reg = /^(?!^\d+$)(?!^[a-zA-Z]+$)(?!^_+$)[\d|a-zA-Z|_]{6,16}$/;
              if(!reg.test(this.password)){//初步判断密码格式
                this.$vux.toast.show({
                  type:'text',
                  text: '密码格式不正确',
                  width:'80%'
                });
                return;
              };
              let wrongData = {
                "phone_num":this.phone_num,
                "password":this.password,
                "source":2
              };
              if(this.wrongNumber == 2){//判断是否有图形验证码
                wrongData.validate_code = this.grapcode;
              };

            (this.wechatCodeFlag) && (wrongData.code = this.wechatCode); //微信-有微信code时，登录时加上code参数，后台会自动和当前微信号绑定，仅限微信环境中打开时。

            this.$post("user/login",wrongData).then(res=>{
                console.log(res);
                if(res.code == "1511" || res.code== "1506" || res.msg=="3"){
                  this.wrongNumber = 2;
                  this.worry = true;
                  this.isButton = true;
                  this.$vux.toast.show({
                    type:'text',
                    text: res.msg,
                    width:'80%'
                  });
                  if(this.worry){
                  	this.$refs.cationCode.refreshCode();
                  };
                }else if(res.code == "200") {
                  this.storage.set("couponPopup",res.model.couponPopup);
                  this.storage.set("loginStatus",1);
                  this.storage.set("user_id",res.model.id);
                  this.storage.set("inviteCode", res.model.inviteCode);
                  this.storage.set("phone_num",this.phone_num);
                  this.$vux.toast.show({
                    type:'text',
                    text: (this.wechatCodeFlag) ? '免登录绑定成功' : '登录成功', //微信-免登录绑定成功后提示语为【免登录绑定成功】
                    width:'80%'
                  });
                  let redirectUrl = this.$route.query.redirect;
                  if(this.wechatCodeFlag){
                    this.$router.push("/"); //微信-免登录绑定成功后跳转到首页
                  }else if (redirectUrl){
                    this.$router.replace(redirectUrl);
                  }else{
                    this.$router.push("/");
                  };
                }else{
                  this.$vux.toast.show({
                    type:'text',
                    text: res.msg,
                    width:'80%'
                  });
                };
              });
          }
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
        components:{
          mHeader,
          headLogo,
          phoneNum,
          landcode,
          cationCode,
          activeAdd
        },
        metaInfo() {
          return {
            title: this.title
          }
        }
    }
</script>

<style scoped>

  .login{width:100%;background:#fff;border-collapse:collapse;margin-top:10px;}
  .login li.memoryNum{background:#f5f5f5;line-height:40px;padding-left:20px;font-size:14px;color:#999;}
  .forget{text-align:right;}
  .forget a{display:inline-block;padding-top:10px;padding-right:15px;color: #FF665E;font-size:12px;}
  .button{margin-top:24px;padding:0 5%;}
  .button button{width:100%;height:44px;border-radius:5px;background:#ccc;color:#fff;font-size:18px;border:0;}
  .button button.current{background:#FF665E;}

  /*微信绑定-相关样式-start*/
  .introText{margin: 24px 5%;}
  .introText li{font-size:12px; color:#666; line-height: 16px; position: relative; padding: 2px 0 2px 20px;}
  .introText li:before{content: ''; display: block; position: absolute; top: 7px; left: 7px; width: 6px; height: 6px; background-color: #666; border-radius: 50%; font-size: 0;}
  /*微信绑定-相关样式-end*/

</style>
<style>
  .loginPageTitle .left-arrow{background: url("../../assets/common/login_nardet@2x.png") no-repeat!important; background-size: 100%!important;}
  .loginPageTitle .left-arrow:before{border-color: transparent!important;}
  .loginPageTitle .vux-header .vux-header-left .left-arrow{width:16px;height:16px;top:0;}
</style>
