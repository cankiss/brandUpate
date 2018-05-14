<template>
  <div class="container has-header">
    <mheader :text="title"></mheader>
    <div class="exr-main">
      <div class="font-333">体验金规则</div>
      <div class="exr-rules" v-for="rule in rules" :key="rule">
        <div class="font-222">{{rule.title}}</div>
        <div class="font-999" v-for="det in rule.dets" :key="det">{{det}}</div>
      </div>
    </div>

    <cash-use></cash-use>
  </div>
</template>

<script>
  import Mheader from "../common/m-header.vue";
  import CashUse from "./cash-use.vue";

  export default {
    components: {
      CashUse,
      Mheader
    },
    data() {
      return {
        title: '体验金使用规则',
        rules: [{
          title: '1.什么是体验金？',
          dets: ['体验金是亿宝贷平台的虚拟现金，仅限出借体验标时使用，不可提现，不可用于其他用途.']
        }, {
          title: '2.怎样使用体验金？',
          dets: [
            '获得体验金的用户，使用体验金出借指定的“体验标”可获得现金收益',
            '到期后体验金将收回，收益会发放至您的账户余额，收益可提现',
            '体验金8888元只能一次性出借“体验标”，不可拆分',
            '体验金有效期：自发放之日起60天内使用有效',
            '体验金收益计算公式：体验金金额*体验标年化收益率*出借期限（天）/ 365（天）'
          ]
        }, {
          title: '3.如何提现？',
          dets: ['收益到账后，可前去我的账户中提现，收益发放记录可前往“我的-资金流水”中查看']
        }]
      }
    }
  }
</script>

<style lang="less" scoped>
  .exr-main {
    background-color: #ffffff;
    padding-top: 6px;
    .font-333 {
      font-size: 16px;
      padding: 0 10px;
      box-sizing: border-box;
    }
    .exr-rules {
      border-bottom: 1px solid #f5f5f5;
      padding: 5px 10px;
      box-sizing: border-box;
      .font-222 {
        color: #222222;
        font-size: 15px;
        padding: 0 10px;
         box-sizing: border-box;
      }
      .font-999 {
        font-size: 14px;
        padding: 0 10px;
         box-sizing: border-box;
      }
    }
  }
</style>
