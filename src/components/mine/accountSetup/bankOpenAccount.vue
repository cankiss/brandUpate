<template>
  <div class="container has-header bank-open-account">
    <!--header-->
    <m-header :msg='text'></m-header>
    <!--person information section -->
    <div class="user-information-cell">
      <group>
        <x-input
          title="姓名"
          v-model="item.realName"
          label-width="100px"
          :class="'disable-style'"
          :readonly="true">
        </x-input>
        <x-input
          title="身份证号"
          :class="'disable-style'"
          v-model="item.idCard"
          label-width="100px"
          :readonly="true">
        </x-input>
      </group>
    </div>
    <!--tips-->
    <div class="middle-tips">
      请绑定本人银行卡,银行卡户名要求与实名信息一致
      <span @click="$router.push('/find/help/bankQuota')">查看支持银行</span>
    </div>
    <!--person information section -->
    <div>
      <group>
        <x-input
          title="银行卡号"
          :type="'number'"
          placeholder="请输入银行卡号"
          label-width="100px"
          :max="19">
          <div slot="right" style="width:24px;">
            <img src="../../../assets/mine/timg.jpg">
          </div>
        </x-input>
        <x-input
          title="预留手机"
          :type="'tel'"
          v-model="item.tel"
          placeholder="请输入银行预留手机号"
          label-width="100px"
          :max="11">
        </x-input>
        <x-input
          title="验证码"
          label-width="100px"
          :placeholder="'请输入验证码'"
          :max="6"
          v-model="item.validateCode">
            <div slot="right">
              <a href="javascript:" style="color:#FF665E" @click="sendMsg(item.tel)" v-show="codeShow">
                {{validateCodeText}}
              </a>
              <countdown v-show="!codeShow"
                         v-model="time"
                         @on-finish="finish"
                         :start="!codeShow">
              </countdown>
            </div>
        </x-input>
      </group>
    </div>
    <!--button-->
    <div style="width:90%;margin:20px auto;">
      <x-button type='warn' @click.native="openAccountNow()">确认开户</x-button>
    </div>
    <!--copy-right-->
    <div class="footer-bar">
      <img src="../../../assets/home/footer-bar.png" alt="">
    </div>
  </div>
</template>

<script>
  import { XInput , Group , XButton, Countdown } from "vux";
  import MHeader from '../common/headerService'

    export default {
      name: "bank-open-account",
      components:{
        MHeader,
        XInput,
        Group,
        XButton,
        Countdown
      },
      data(){
          return{
            text:'银行存管开户',
            codeShow:true,
            time:60,
            validateCodeText:"获取",
            item:{
              realName:'刘良',
              idCard:'610424200010109527',
              tel:null,
              validateCode:null
            }
          }
      },
      created(){
        // 组件钩子,当组件创建完毕的时候进行调用。请求用户数据
      },
      methods:{
        sendMsg(userTel){
          this.codeShow = false;
        },
        finish(){
          this.codeShow = true;
          this.validateCodeText = "重新获取";
        },
        // 立即开户
        openAccountNow(){
          // 显示
          this.$vux.alert.show({
            title: '恭喜您',
            content: '开户成功',
            onShow () {
              console.log('Plugin: I\'m showing')
            },
            onHide () {
              console.log('Plugin: I\'m hiding')
            }
          })
        }
      }
    }
</script>

<style scoped lang="less">
  .disable-style{
    color: #999;
  }
  .container{
    .user-information-cell{
      padding-top: 10px;
    }
    .middle-tips{
      background-color: #F5F5F5;
      height: 30px;
      line-height: 30px;
      color: #9B9B9B;
      text-indent: 2%;
      font-size: 0.7rem;
      span{
        color: #549EE7;
        float: right;
        text-decoration: none;
        margin-right: 2%;
        font-family: "Microsoft YaHei";
      }
    }
    .footer-bar{
      border-top: 1px solid #eee;
      position: absolute;
      bottom: 0;
    }
  }
</style>
