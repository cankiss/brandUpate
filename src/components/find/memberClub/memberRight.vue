<template>

  <div>
    <!--会员权益-->
    <div class="member_rights member_tab">
      <img src="~/assets/find/tab_comming.png" class="member_rights_title">
      <p class="pt20">亲爱的客户：</p>
      <p class="pb20">
        空前绝后，千载难逢，错过毁一生！会员权益上线前，会员等级不设定有效期，出借金额获取的成长值可持续累计！会员权益上线后，可直接享受当前等级的权益，会员等级有效期90天自会员权益上线之日开始计算。（每个账户会有一个初始成长值，会根据账户历史的价值评定）会员等级越高，奖励将越丰厚！满减券、加息券、免费提现、生日礼券，权益丰厚畅想不断！满减券可直接抵现噢！别让你的资金闲置，赶快玩转起来！</p>
      <ul class="clearfix">
        <li v-for="(item, i) in list" :key="i">
          <img :src="item.img">
          <p>{{ item.text }}</p>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>

  export default {
    data() {
      return {
        list: [{
          img: require("@/assets/find/icon_free.png"),
          text: "免费提现"
        }, {img: require("@/assets/find/icon_jiaxi.png"), text: "加息券"}, {
          img: require("@/assets/find/icon_manjian.png"),
          text: "满减券"
        }, {img: require("@/assets/find/icon_birth.png"), text: "生日礼包"}, {
          img: require("@/assets/find/icon_dakefu.png"),
          text: "大客户感恩"
        }, {img: require("@/assets/find/icon_call.png"), text: "专属客服"}]
      }
    }
  }

</script>

<style scoped>

  .member_rights {
    padding: 20px 0 25px;
    background: #fff;
  }

  .member_rights_title {
    display: block;
    width: 213px;
    margin: 0 auto;
  }

  .member_rights p {
    padding: 0 20px;
    color: #999;
    font-size: 15px;
    line-height: 22px;
  }

  .member_rights p.pt20 {
    padding-top: 20px;
  }

  .member_rights p.pb20 {
    padding-bottom: 20px;
    text-indent: 2em;
  }

  .member_rights ul li {
    float: left;
    width: 33.3333%;
  }

  .member_rights ul li img {
    display: block;
    height: 40px;
    width: auto;
    margin: 0 auto;
  }

  .member_rights ul li p {
    text-align: center;
    font-size: 14px;
    line-height: 18px;
    padding: 20px 0;
  }

</style>
