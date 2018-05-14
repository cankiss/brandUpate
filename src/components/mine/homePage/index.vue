<template>
  <div class="container has-footer">
    <user-info></user-info>
    <!--用户信息-->
    <user-money></user-money>
    <!--资产信息-->
    <loan-detail></loan-detail>
    <!--出借明细-->
    <user-pay></user-pay>
    <!--资金交易-->
    <user-reward></user-reward>
    <!--奖励优惠-->
    <m-footer :pageName="pageName"></m-footer>
  </div>
</template>

<script>
  import MFooter from '~/common/m-footer'
  import { UserInfo, UserMoney, UserPay, UserReward, LoanDetail } from "./export";
  export default {
    data() {
      return {
        pageName: 'mine',
        msg: '您有1张返现券2017-10-27即将过期，请尽快使用'
      }
    },
    components: {
      UserInfo,
      UserMoney,
      UserPay,
      UserReward,
      LoanDetail,
      MFooter
    },
    metaInfo: {
      title: '我的账户'
    }
  }
</script>

<style lang='less' scope>

</style>

