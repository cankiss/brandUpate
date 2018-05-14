<template>
  <!--智投（去除）详情页-->
  <div class="container has-header has-footer zt-detail">
    <mheader :text="detail.productName || detail.borrowName" :isBack="isBack" @leftBack="leftBack" @rightMore="rightMore" :moreHtml="rightMoreHTML">
    </mheader>
    <flexbox orient="vertical" :gutter="0">
      <flexbox-item class="detail-banner red-bg">
        <flexbox orient="vertical" :gutter="0" class="font-size-12">
          <flexbox-item>
            <flexbox>
              <flexbox-item :span="3/4">
                <p>
                  <span class="rate-num" v-if="detail.rate">{{detail.rate+detail.extraRate}}</span><span class="font-size-12">%</span>
                </p>
                <p class="rate-desc">
                  近七日历史年化收益率
                  <popover placement="bottom" class="detail-top">
                    <div slot="content" class="popover-demo-content">
                      最近7日内，该项目年化收益率值范围。历史不代表未来，实际收益率可能高于或低于所标示近七日历史年化收益率。
                    </div>
                    <a class="icon" href="javascript:void(0)">
                      <img src="~assets/pro/icon_i_white.png" alt="">
                    </a>
                  </popover>
                </p>
              </flexbox-item>
              <flexbox-item>
                <p>
                  <span class="time-num">{{detail.time||detail.duration || detail.termTime}}</span>
                  <span class="font-size-12">{{detail.durationType || detail.timeType |timeTypeFliter}}</span>
                </p>
                <p>
                  {{detail.borrowNid || detail.productId | timeTypeNameFliter}}
                </p>
              </flexbox-item>
            </flexbox>
          </flexbox-item>
          <flexbox-item>
            <flexbox v-if="detail.remainAmount||detail.remainAmount==0">
              <flexbox-item :span="3/4">
                <x-progress class="detail-progress" :percent="detail|percentRemainFliterToNumber" :show-cancel="false"></x-progress>
              </flexbox-item>
              <flexbox-item class="reamin-percent text-right">
                剩{{detail|percentRemainFliterRe}}%
              </flexbox-item>
            </flexbox>
          </flexbox-item>
          <flexbox-item>
            <flexbox>
              <flexbox-item>
                <p v-if="param=='zt'">{{detail.repaymentType|retypeZtFliter}}</p>
                <p v-else-if="$route.params.param == 'pro'">{{detail.repaymentType|borrowTypeFliter}}</p>
                <p v-else>{{detail.borrowType|borrowTypeFliter}}</p>
              </flexbox-item>
              <flexbox-item class="reamin-percent">
                <p class="text-right" v-if="detail.remainAmount">剩余金额{{detail.remainAmount|bigMoneyCheck}}</p>
                <p class="text-right" v-else>已满标</p>
              </flexbox-item>
            </flexbox>
          </flexbox-item>
        </flexbox>
      </flexbox-item>
      <flexbox-item>
        <flexbox orient="vertical">
          <flexbox-item>
            <group class="font-size-12 flow-group">
              <cell class="xsb-tips" v-show="detail.productId=='XSB0002'">
                <span slot="title">
                  <img :src="productNoticeUrl" class="notice-icon">
                  用户可随时出借新手专享，但仅限出借一次，上限5万
                </span>
              </cell>
              <cell class="cell-tl">
                <span slot="title" class="font-size-14 font-333">
                 <img :src="productFlowUrl" class="product-flow-icon">
                  出借流程
                </span>
              </cell>
              <cell>
                <flexbox slot="title" class="font-999">
                  <flexbox-item class="text-center">
                    <p>
                      <img class="flow-icon" :src="step.ksjr" alt="">
                    </p>
                    <p>
                      开始加入
                    </p>
                  </flexbox-item>
                  <flexbox-item class="text-center">
                    <p>
                      <img class="flow-icon" :src="step.tbjs" alt="">
                    </p>
                    <p>
                      投标结束
                    </p>
                  </flexbox-item>
                  <flexbox-item class="text-center">
                    <p>
                      <img class="flow-icon" :src="step.ksjx" alt="">
                    </p>
                    <p>
                      开始计息
                    </p>
                  </flexbox-item>
                  <flexbox-item class="text-center">
                    <p>
                      <img class="flow-icon" :src="step.yytc" alt="">
                    </p>
                    <p>
                      到期<span v-if="$route.params.param == 'zt'">预约</span><span v-else>自动</span>退出
                    </p>
                  </flexbox-item>
                </flexbox>
              </cell>
              <cell v-if="$route.params.param == 'zt'" value-align="left" :link="{path:`/pro/detail/introduce/${detail.productId}/1/${detail.productName}`}" is-link>
                <span slot="title" class="font-999">
                                                              退出方式
                                                          </span>
                <span class="font-333">
                                                              锁定期到期前三天申请，债转完成后退出
                                                          </span>
              </cell>
              <cell v-if="$route.params.param == 'zt'" value-align="left" :link="{path:`/pro/detail/introduce/${detail.productId}/1/${detail.productName}`}" is-link>
                <span slot="title" class="font-999">
                                                              收益方式
                                                          </span>
                <span class="font-333">
                                                             退出后一次性收回本金和利息
                                                          </span>
              </cell>
            </group>
          </flexbox-item>
          <flexbox-item>
            <group class="invest-group">
              <cell class="cell-tl">
                <span slot="title" class="font-size-14 font-333">
                                                                              <img :src="productDetailUrl" class="product-flow-icon">
                                                                              项目相关
                                                                          </span>
              </cell>
              <cell is-link :link="{path:`/pro/detail/introduce/${detail.productId || detail.borrowNid}/${type}/${detail.productName || detail.borrowName}`}">
                <span slot="title">
                                                              项目介绍
                                                          </span>
              </cell>
              <cell is-link :link="{path:`/pro/detail/record/${detail.productId || detail.borrowNid}/${type}/${detail.productName || detail.borrowName}`}">
                <span slot="title">
                                                              加入记录
                                                          </span>
                <img v-if="!showTotal" class="hot" src="~assets/pro/hot.png" alt="">
                <span class="red-text " v-if="showTotal">
                                                               {{total}}人加入
                                                          </span>
              </cell>
              <cell v-if="type == 3" is-link :link="{path:`/pro/detail/sb/detail/${detail.productId || detail.borrowNid}/${type}/${detail.productName || detail.borrowName}/${detail.productId || detail.borrowNid}`}">
                <span slot="title">
                                                              项目明细
                                                          </span>
              </cell>
              <cell v-else is-link :link="{path:`/pro/detail/detail/${detail.productId || detail.borrowNid}/${type}/${detail.productName || detail.borrowName}`}">
                <span slot="title">
                                                              项目明细
                                                          </span>
              </cell>
              <cell is-link :link="{path:`/pro/detail/question/${detail.productId || detail.borrowNid}/${type}/${detail.productName || detail.borrowName}`}">
                <span slot="title">
                                                              常见问题
                                                          </span>
              </cell>
            </group>
          </flexbox-item>
        </flexbox>
      </flexbox-item>
    </flexbox>
    <!--bank-deposit component -->
    <bankdeposit v-if="isShowBankDeposit" :isHomeComponent="false"></bankdeposit>
    <!--invest component-->
    <investAmount :detail="detail" @invest="invest"></investAmount>
  </div>
</template>
<script>
  import {
    Flexbox,
    FlexboxItem,
    XProgress,
    Group,
    GroupTitle,
    Cell,
    numberComma,
    Popover
  } from "vux"
  import mheader from "../../common/m-header.vue";
  import bankdeposit from "../../common/bank-deposit.vue";
  import investAmount from "./investAmount.vue"
  export default {
    components: {
      mheader,
      Flexbox,
      FlexboxItem,
      XProgress,
      Group,
      GroupTitle,
      Cell,
      numberComma,
      investAmount,
      bankdeposit,
      Popover
    },
    data() {
      return {
        detail: {
          productId: '',
          param: '',
          productName: '智投详情'
        },
        id: '',
        type: "",
        param: "",
        total: 0,
        rightMoreHTML: require("../../../assets/pro/share.png"),
        productNoticeUrl: require("../../../assets/pro/product_notice.png"),
        productFlowUrl: require("../../../assets/pro/product_flow.png"),
        productDetailUrl: require("../../../assets/pro/product_Details.png"),
        step: {
          ksjr: require("../../../assets/pro/icon_join.png"),
          tbjs: require("../../../assets/pro/icon_over.png"),
          ksjx: require("../../../assets/pro/icon_clock.png"),
          yytc: require("../../../assets/pro/icon_quit.png"),
        },
        userId: '',
        userStatus: null,
        isBack: true,
        showTotal: true,
        poolObj: {
          // 'SZY0001': 'DoubleWeek',
          'YYY0002': 'DoubleMonth',
          'JJF0002': 'SingleSeason',
          'SJY0002': 'DoubleSeason',
          'NNZ0002': 'SingleYear'
        },
        isShowBankDeposit: false
      }
    },
    methods: {
      rightMore() {
        console.log('rightMore');
      },
      numberComma(value) {
        return numberComma(value)
      },
      init() {
        this.detail.productId = this.$route.params.id;
        if (this.poolObj[this.detail.productId]) {
          this.showTotal = false;
        }
        this.userId = this.storage.get("user_id");
        this.param = this.$route.params.param;
        console.log(this.userId);
        let data = {
          productId: this.detail.productId
        };
        let url = "";
        if (this.param == "zt") {
          this.type = 1;
          url = this.detail.productId == 'XSB0002' ? 'borrowZt/selectZhiTouXSB' : 'borrowZt/selectZhiTou';
        } else if (this.param == "sb") {
          this.type = 3;
          url = "borrow/selectBorrowByBorrowNid";
          data = {
            borrowNid: this.detail.productId
          };
        } else if (this.param == "pro") {
          this.type = 2;
          url = "borrow/selectByProductId";
          this.$post("borrow/selectPoolRecordByProductId", data).then(res => {
            if (res.code == 200) {
              this.total = res.model.total;
            };
          });
        };
        this.$post(url, data).then(res => {
          if (res.code == "200") {
            this.detail = res.model.financeProductZt || res.model;
            this.id = this.detail.borrowNid || this.detail.productId;
            if (this.param != "pro") {
              this.total = res.model.total || res.model.totalPoeple;
            };
            console.log(this.detail);
          };
        });
        if (this.userId) {
          this.$post('user/selectUserStatus', {
            id: this.userId
          }).then(res => {
            if (res.code == 200) {
              this.userStatus = res.model;
            };
          });
        };
      },
      //isFree
      invest(args) {
        if (!this.userId) {
          this.$router.push({
            path: "/login/2",
            query: {
              redirect: `/pro/ztDetail/${this.param}/${this.id}`
            }
          })
        }
        if (this.userStatus.status == 1) {
          this.$router.push({
            path: `/mine/setup/userAuth`
          });
          return;
        }
        if (this.userStatus.status == 2) {
          if (this.userStatus.isPassword == 0) {
            this.$router.push({
              path: `/mine/setup/userAuth`
            })
          } else {
            this.$router.push({
              path: `/mine/setup/userAuth`
            })
          }
          return;
        }
        let type = 1;
        let id = this.detail.productId;
        let investName = this.detail.productName;
        if (this.param == "pro") {
          type = 2
        } else if (this.param == "sb") {
          id = this.detail.borrowNid;
          investName = this.detail.borrowName;
          type = 3;
        }
        if (!args[1] && args[1] <= 0) {
          return;
        }
        let detail = this.detail;
        if (detail.remainAmount < args[0]) {
          this.$vux.toast.text('项目可出借余额不足');
          return;
        }
        if (detail.maxInvestAmount < args[0]) {
          this.$vux.toast.text('超过项目出借上限');
          return;
        }
        if (detail.minInvestAmount > args[0]) {
          this.$vux.toast.text('最少出借额度为' + detail.minInvestAmount + '元');
          return;
        }
        if (args[0] <= 0 || args[1] <= 0) {
          this.$vux.toast.text('投资和收益必须都大于0元');
          return;
        }
        this.$router.push({
          path: `/pro/invest/${id}/${type}`,
          query: {
            amount: args[0],
            profit: args[1],
            investName: investName
          }
        })
      },
      leftBack() {
        let param = this.param;
        if (param == 'zt') {
          this.$router.push({
            path: `/pro/ztlist`
          })
        } else if (param == 'pro') {
          this.$router.push({
            path: `/pro/yxlist`
          })
        } else if (param == 'sb') {
          this.$router.push({
            path: `/pro/sblist`
          })
        }
      }
    },
    created() {
      this.init();
    }
  }
</script>
<style>
  .detail-banner {
    padding: 40px 16px 13px;
    box-sizing: border-box;
    color: #fff;
  }
  .zt-detail.has-footer {
    padding-bottom: 100px;
  }
  .rate-num,
  .time-num {
    font-size: 36px;
  }
  .rate-desc {
    line-height: 24px;
  }
  .reamin-percent {
    line-height: 24px;
  }
  .detail-progress .weui-progress__bar {
    height: 4px;
  }
  .detail-progress .weui-progress__bar {
    background-color: rgba(256, 256, 256, .3)
  }
  .detail-progress .weui-progress__inner-bar {
    background: #fff;
    position: relative;
  }
  .detail-progress .weui-progress__inner-bar::after {
    content: "";
    position: absolute;
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 4px;
    background: #fff;
    top: -3px;
    right: 0;
    margin-left: -4px;
  }
  .zt-detail .weui-cells {
    font-size: 12px;
  }
  .invest-group .weui-cells {
    font-size: 14px;
  }
  .zt-detail .weui-cell:before {
    left: 0;
  }
  .xsb-tips {
    color: #FF665E;
    background: #FFF9EA;
  }
  .notice-icon,
  .product-flow-icon {
    width: 14px;
    height: 14px;
    display: inline-block;
    margin-right: 10px;
  }
  .flow-icon {
    display: inline-block;
    width: auto;
    height: 26px;
  }
  .zt-detail .weui-cells {
    margin-top: 0;
  }
  .flow-group .weui-cell__ft.vux-cell-align-left,
  .invest-group .weui-cell__ft.vux-cell-align-left {
    margin-left: 13px;
  }
  .invest-group .hot {
    height: 18px;
    width: auto;
  }
  .zt-detail .cell-tl {
    padding: 5px 15px;
  }
  .zt-detail .detail-top {
    display: inline-block;
  }
  .zt-detail .icon {
    display: inline-block;
    width: 14px;
    height: 14px;
  }
  .zt-detail .my-popover {
    display: inline-block;
  }
  .zt-detail .vux-popover {
    top: 169px !important;
    left: 10px !important;
    padding: 3px;
    max-width: 300px;
  }
  .zt-detail .vux-popover-arrow-up {
    left: 44%;
  }
</style>
