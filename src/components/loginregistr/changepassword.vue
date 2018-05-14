<template>
  <!--修改密码第二步-->
  <div class="container has-header">
    <mHeader :text="title"></mHeader>
    <p class="loginNum">您的登录账号{{ phone_num | momentNum }}</p>
    <ul class="regbox">
      <!--原来的登录密码-->
      <li><landcode :promp="oldpromp" v-on:password="getoldpassword" class="modifypassword"></landcode></li>
      <!--新登录密码-->
      <li><landcode :promp="promp" v-on:password="getnewpassword" class="modifypassword"></landcode></li>
      <!--确认密码-->
      <li><landcode :promp="ispromp" v-on:password="getsurepassword" class="modifypassword"></landcode></li>
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
  import landcode from "./landcode.vue"
  export default {
    data(){
      return {
        title:"修改登录密码",
        oldpromp:{
          title:"登录密码",
          place:"请输入登录密码"
        },
        promp:{
          title:"新登录密码",
          place:"请输入新登录密码"
        },
        ispromp:{
          title:"确认密码",
          place:"请确认新登录密码"
        },
        fillAll:true,//输入框是否全部有内容
        oldpassed:"",//老登录密码
        newpassed:"",//新登录密码
        surepassed:"",//确认新密码
        phone_num:this.storage.get('phone_num')//注册手机号
      }
    },
    methods:{
      getoldpassword(password){//获取老的密码
        this.oldpassed = password;
        this.passedchange();
      },
      getnewpassword(password){//获取新的密码
        this.newpassed = password;
        this.passedchange();
      },
      getsurepassword(password){//获取确认的密码
        this.surepassed = password;
        this.passedchange();
      },
      passedchange(){//判断三个输入框是否都有值
        if(this.oldpassed && this.newpassed && this.surepassed){
          this.fillAll = false;
        }else{
          this.fillAll = true;
        }
      },
      diateregistr(){//完成按钮点击事件
        if(this.newpassed !== this.surepassed){
          this.$vux.toast.show({
            type:'text',
            text: '两次密码输入不一致，请重新输入',
            width:'80%'
          });
          return;
        };
        //数字 字母 和下划线
        var reg = /^(?!^\d+$)(?!^[a-zA-Z]+$)(?!^_+$)[\d|a-zA-Z|_]{6,16}$/;
        if(reg.test(this.newpassed)){
          let regisData = {
            userId:this.storage.get("user_id"),
            password:this.oldpassed,
            newPassword:this.newpassed
          };
          this.$post("user/resetPasswordInMore",regisData).then(res=>{
            console.log(res);
            if(res.code == "200"){
              this.$vux.toast.show({
                type:'text',
                text: '密码修改成功',
                width:'80%'
              });
              this.$router.go(-1);
            }else{
              this.$vux.toast.show({
                type:'text',
                text: res.msg,
                width:'80%'
              })
            }
          });
        }else{
          this.$vux.toast.show({
            type:'text',
            text: '登录密码由6-16位数字、字⺟母、特殊字符⾄至少两种组成',
            width:'80%'
          })
        }
      }
    },
    components:{
      mHeader,
      landcode
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
</style>
<style>
  .loginphoneNumber .weui-btn:after{border:0;transform: scale(1)}
  .loginphoneNumber .weui-btn_default{background-color:rgba(0,0,0,0);width:115px;height:46px;font-size: 14px;color: #FF665E;}
  .loginphoneNumber .weui-btn_mini{padding:0;}
  .loginphoneNumber.loginforgetpassword .leftIcon{display:none;}
  .modifypassword .loginphoneNumber .leftIcon{display:none;}
  .modifypassword .loginphoneNumber .leftTitle{width:77px;color:#000;}
</style>
