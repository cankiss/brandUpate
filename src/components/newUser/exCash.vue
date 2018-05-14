<template>
  <div class="container has-header" @click="hideAbTip()">
    <mheader :text="title" @rightMore="showCashRules()">
      <img slot="rightHtml" src="../../assets/new-user/qst.png"/>
    </mheader>
    <cash :available="available" :rented="rented" :cashStatus="cashStatus" :userId="userId" :status="status" :experienceTerm="experienceTerm" :expiryDate="expiryDate" @changeStatus="changeStatus"></cash>

    <div v-if="available">
      <div class="fw-tb red-bg">
        <div class="tbc">
          <div>体验标</div>
          <div class="big">8.8<span>%</span></div>
          <div class="small">
            近七日历史年化收益率<span class="ex-qst-icon" @click.stop="showAbTip()"></span>
            <div class="ex-ab-tip" v-if="abShow">
              近七日历史年化收益率：最近7日该项目年化收益率值范围，历史不代表未来，实际收益率可能高于或低于所标示近7日年化收益率。
            </div>
          </div>
        </div>
        <div class="tbc">
          <div>3天</div>
          <div>期限</div>
        </div>
        <div class="tbc">
          <div><span class="mid">6.43</span><span class="small">元</span></div>
          <div>预计收益</div>
        </div>
      </div>

      <group label-margin-right="2em" label-align="left" class="ex-group">
        <cell title="起息时间" value="出借后起息" value-align="left"></cell>
        <cell title="到期时间" value="出借后3天到期" value-align="left"></cell>
        <cell title="还款方式" value="到期后获得收益，本金收回，收益可提现" value-align="left"></cell>
      </group>

      <cash-use></cash-use>

      <div v-if="!rented" class="ex-fix">
        <div class="tbc fix-l font-333">8888<span class="font-999">元</span></div>
        <div class="tbc fix-r red-bg" @click="rent()">使用体验金出借</div>
      </div>

      <popup class="ex-pop" v-model="showPop">
        <div class="ex-p-t">确认出借
          <button class="ex-p-close" @click="closePop()"></button>
        </div>
        <div class="ex-p-box">
          <div v-for="pd in popData" class="ex-p-tb">
            <div class="tbc l font-666">{{pd.key}}</div>
            <div class="tbc r font-333">{{pd.value}}</div>
          </div>
        </div>
        <div class="ex-pro">
          <check-icon :value.sync="agree" ref="checkIcon"></check-icon>
          <p>我已阅读并同意
            <router-link :to="'/usageProtocol'">《体验金使用协议》</router-link>
          </p>
        </div>
        <box gap="0 10px 10px">
          <x-button type="warn" @click.native="submit()">确认出借</x-button>
        </box>
      </popup>
    </div>
  </div>
</template>

<script>
  import {Group, Cell, Popup, CheckIcon, XButton, Box} from 'vux'
  import mheader from '~/common/m-header.vue'
  import Cash from "./cash.vue";
  import CashUse from "./cash-use.vue";

  export default {
    components: {
      Box,
      XButton,
      CheckIcon,
      Popup,
      CashUse,
      Cash,
      Cell,
      Group,
      mheader
    },
    data() {
      return {
        title: '我的体验金',
        abShow: false,    //我的体验金提示
        showPop: false,   //出借
        agree: true,   //同意协议
        popData: [{
          'key': '出借金额',
          'value': '8888元'
        }, {
          'key': '出借项目',
          'value': '体验标'
        }, {
          'key': '近七日历史年化收益率',
          'value': '8.8%'
        }, {
          'key': '出借期限',
          'value': '3天'
        }, {
          'key': '预计收益',
          'value': '6.43元'
        }],
        userId: '',
        rented: false,
        available: true,
        cashStatus: false,
        experienceTerm:3,
        status:1,
        expiryDate:''
      }
    },
    methods: {
      rent() {
        this.showPop = true
      },
      closePop() {
        this.showPop = false
      },
      showAbTip() {
        this.abShow = true
      },
      hideAbTip() {
        this.abShow = false
      },
      showCashRules() {
        this.$router.push({path: '/cash-rules'})
      },
      changeStatus(status){
      	this.status = status;
      },
      submit() {  //确认出借
        if (this.agree) {
          this.$post(`newbieTask/updateExperienceStart`, {
            'userId': this.userId
          }).then(data => {
            if (data && data.code == '200') {
              this.$router.push({path: '/lendSuccess'})
            }
            this.showPop = false
          })
        } else {
          let that = this;
          this.$vux.alert.show({
            content: '请勾选阅读并同意《体验金使用协议》',
            onHide() {
              that.$refs.checkIcon.updateValue()
            }
          })
        }
      }
    },
    created() {
    	this.userId = this.storage.get("user_id");
      this.$post(`newbieTask/getExperienceRecordInfo`, {
        'userId': this.userId
      }).then(data => {
        if (data && data.code == '200') {
          let status = data.model.status;
          this.expiryDate = data.model.expiryDate;
          this.experienceTerm = data.model.experienceTerm;
          this.status = status;
          this.rented = status === 1 ? false : true
          this.available = !(status === 5) ? true : false
          this.cashStatus = status === 4 ? true : false
        }
      })
    }
  }
</script>

<style lang="less" scoped>
  * {
    box-sizing: border-box;
  }

  .fw-tb {
    display: table;
    width: 100%;
    color: #ffffff;
    padding: 10px;
    .tbc {
      display: table-cell;
      vertical-align: bottom;
      &:first-child {
        padding-left: 15px;
        position: relative;
      }
      &:nth-child(2), &:nth-child(3) {
        text-align: center;
        div {
          padding: 0 20px;
          @media only screen and (max-width: 320px) {
            padding: 0 10px;
          }
        }
      }
      &:nth-child(2) {
        div {
          border-left: 1px solid #ffffff;
          border-right: 1px solid #ffffff;
        }
      }
      .mid {
        font-size: 20px;
      }
      .small {
        font-size: 12px;
      }
      .ex-qst-icon {
        width: 14px;
        height: 14px;
        display: inline-block;
        vertical-align: middle;
        background: url("../../assets/new-user/qst_white.png") center no-repeat;
        background-size: 100%;
        margin-left: 5px;
      }
      .ex-ab-tip {
        width: 245px;
        height: 71px;
        background: url("../../assets/new-user/tip_bg.png") center no-repeat;
        background-size: 100%;
        position: absolute;
        bottom: -76px;
        left: 20px;
        z-index: 12;
        padding: 8px 4px 4px;
        color: #999999;
        font-size: 12px;
      }
    }
    .big {
      font-size: 36px;
      line-height: 36px;
      display: inline;
      padding-left: 10px;
      span {
        font-size: 14px;
      }
    }
  }

  .ex-group {
    .weui-cells, .vux-no-group-title {
      margin-top: 0;
    }
  }

  .ex-fix {
    width: 100%;
    height: 46px;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 10;
    display: table;
    .tbc {
      display: table-cell;
      width: 50%;
      line-height: 46px;
      cursor: pointer;
      &.fix-l {
        font-size: 24px;
        background-color: #ffffff;
        padding-left: 20px;
        position: relative;
        span {
          font-size: 18px;
          position: absolute;
          right: 30px;
          top: 0;
          height: 46px;
          display: block;
        }
      }
      &.fix-r {
        font-size: 20px;
        color: #ffffff;
        text-align: center;
      }
    }
  }

  .ex-pop {
    &.vux-popup-dialog {
      background-color: #ffffff;
    }
    .ex-p-t {
      text-align: center;
      height: 50px;
      line-height: 50px;
      position: relative;
      .ex-p-close {
        width: 14px;
        height: 14px;
        background: url("../../assets/new-user/close.png") center no-repeat, #ffffff;
        background-size: 100%;
        position: absolute;
        right: 20px;
        top: 20px;
        border: none;
      }
    }
    .ex-p-box {
      padding: 0 20px;
      .ex-p-tb {
        display: table;
        width: 100%;
        padding: 2px 0;
        &:first-child {
          border-top: 1px solid #efefef;
          padding-top: 10px;
        }
        &:last-child {
          border-bottom: 1px solid #efefef;
          padding-bottom: 10px;
        }
        .tbc {
          display: table-cell;
          &.r {
            text-align: right;
            font-size: 16px;
          }
        }
      }
    }
    .ex-pro {
      padding: 10px;
      p {
        display: inline-block;
        vertical-align: middle;
      }
      a {
        color: #6db0ff;
      }
    }
  }
</style>
