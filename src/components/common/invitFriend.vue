<template>
  <div class="container has-header">
    <mHeader :text="pageTitle" :isBack="isBack" @leftBack="leftBack"></mHeader>
    <div class="main">
      <div class="invit-top">
        <img src="../../assets/common/invit-top.png">
        <div class="invit-record">
          <a href="javascript:;" @click="goInvitRecord"><img src="../../assets/common/check-record@2x.png"></a>
        </div>
      </div>
      <div class="invit-box">
        <div class="wrap">
          <p class="caption">手机邀请码</p>
          <p class="phone-num">{{shareMobile}}</p>
          <div class="invit-qrcode">
            <qrcode :value="shareUrl" :bg-color="bgColor" :fg-color="fgColor" :size="size" type="img"></qrcode>
          </div>
          <img v-if="isWechatShare" class="share-button" @click="goWechatShare" src="../../assets/home/button-share@2x.png">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import mHeader from "./m-header.vue";
  import {
    Qrcode
  } from 'vux';

  export default {
    data() {
      return {
        pageTitle: "邀请好友",
        isBack: true,
        shareMobile: '',
        shareUrl: '',
        bgColor: '#fff',
        fgColor: '#fe6d98',
        size: 140,
        isWechatShare: false
      }
    },
    components: {
      mHeader,
      Qrcode
    },
    metaInfo() {
      return {
        title: this.pageTitle
      }
    },
    created() {
      this.shareMobile = this.storage.get('phone_num');
      this.shareUrl = INVIT_URL + '/appRegister/h5/newbank/register_invite.html?inviteCode=' + this.shareMobile;

      if (this.storage.get('sbType') == '1') { //ios
        this.isWechatShare = true;
      } else if (this.storage.get('sbType') == '2') { //android
        this.isWechatShare = true;
      } else { //h5
        this.isWechatShare = false;
      }
    },
    methods: {
      goInvitRecord() { //调用iOS、Android、h5
        let sbType = this.storage.get('sbType');
        sbType ? (this.appBridge.sendData(sbType, 'goInvitRecord')) : (this.$router.push('/mine/invite/inviteRecord'));
      },
      goWechatShare() { //调用iOS、Android、h5
        let sbType = this.storage.get('sbType');
        sbType && (this.appBridge.sendData(sbType, 'goWechatShare', {shareUrl: this.shareUrl}));
        //sbType ? (this.appBridge.sendData(sbType, 'goWechatShare', {shareUrl: this.shareUrl})) : (this.$router.push('/mine/invite/inviteRecord'));
      },
      leftBack() {
        let type = this.$route.params.backtype;
        if (type == 1) {
          this.$router.push("/");
        } else {
          this.$router.push("/find");
        }
      }
    }
  }
</script>

<style scoped>
  .main {
    padding-top: 0;
  }

  .invit-top {
    position: relative;
  }

  .invit-top img {
    width: 100%;
  }

  .invit-record {
    position: absolute;
    top: 62%;
    left: 16%;
    right: 18.6%;
  }

  .invit-record a {
    display: block;
    cursor: pointer;
  }

  .invit-box {
    padding: 90px 0 74px 0;
    background: url(../../assets/common/invit-box.png) no-repeat center top #fff;
    background-size: 375px 355px;
  }

  .invit-box .wrap {
    width: 150px;
    margin: 0 auto;
    position: relative;
  }

  .invit-box .wrap .share-button {
    position: absolute;
    bottom: -56px;
    left: 50%;
    width: 140px;
    margin-left: -70px;
  }

  .invit-box .wrap .caption {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    text-align: center;
  }

  .invit-box .wrap .phone-num {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    text-align: center;
    margin-bottom: 12px;
  }

  .invit-box .wrap .invit-qrcode {
    padding: 5px;
    background-color: #fff;
    border-radius: 5px;
  }
</style>
