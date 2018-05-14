<template>
    <div>
        <mheader :isBack="isBack" @leftBack="leftBack" :text="pageTitle" @rightMore="jumpCall">
            <img slot="rightHtml" src="../../../assets/common/call-gray.png">
        </mheader>
        <div class="container has-header invest">
            <group>
                <cell title="可投金额" value-align="left" align-items="flex-start" class="font-333">
                    <span>{{remainAmount|numToMoneyField}}元</span>
                </cell>
            </group>
            <group>
                <cell title="出借金额"></cell>
                <flexbox class="invest-group">
                    <flexbox-item :span="1/5">￥</flexbox-item>
                    <flexbox-item>{{investAmount|numToMoneyField}}</flexbox-item>
                    <flexbox-item :span="1/5" class="font-size-16 text-right">元</flexbox-item>
                </flexbox>
                <flexbox>
                    <flexbox-item class="text-right profit-group">
                        <span>预计收益</span>
                        <!-- <a href="javascript:void(0)" class="icon-group">
                                                                                                                <img class="icon" src="~assets/pro/icon_i_gray.png" alt="">
                                                                                                            </a> -->
                        <popover placement="bottom" class="icon-group" :gutter="10">
                            <div slot="content">
                                依据前7天的近七日历史年化收益率计算，金额可能或高或低，以最终收益为准。
                            </div>
                            <img class="icon" src="~assets/pro/icon_i_gray.png" alt="">
                        </popover>
                        <span class="red-text">{{profit}}</span>
                        <span>元</span>
                    </flexbox-item>
                </flexbox>
            </group>
            <group>
                <cell title="账户余额" value-align="left" align-items="flex-start">
                    <span>{{accountReaminAmount|numToMoneyField}} 元</span>
                </cell>
            </group>
            <group>
                <cell is-link :link="{path:`/pro/checkCoupon/${id}/${investAmount}/${profit}/${type}?investName=${investName}`}">
                    <span slot="title">我的优惠券</span>
                    <span>{{couponName}}</span>
                </cell>
                <cell class="coupon-tips" v-if="couponAmount">
                    返现金额将在项目满标起息后发放至您的账户余额内
                </cell>
            </group>
            <div class="bank-group" v-if="accountReaminAmount<investAmount">
                <flexbox class="card-group">
                    <flexbox-item :span="1/10">
                        <img class="bank-logo" :src="bankLogoUrl" alt="">
                    </flexbox-item>
                    <flexbox-item :span="1/2">
                        {{bankName}}（尾号{{failNum}}）
                    </flexbox-item>
                    <flexbox-item class="text-left">
                        <span class="item-title-label">
                                                                                                            认证充值
                                                                                                          </span>
                    </flexbox-item>
                </flexbox>
                <div class="font-999">
                    <span class="quan">限</span> 单笔{{singerMaxAmount|bigMoneyCheck}}，单日{{singerDayAmount|bigMoneyCheck}}
                </div>
                <div class="font-999">
                    <img class="img-icon" src="~assets/pro/go-back.png" alt=""> 资金同卡进出，安全便捷
                </div>
                <!-- <p>{{bankLogoUrl}}</p> -->
            </div>
            <flexbox class="agree-group">
                <flexbox-item :span="1/14">
                    <checkboxI @checkClick="checkClick" :value="checkObj.value" :isTrueValue="checkObj.istrue" :isFalseValue="checkObj.isflase"></checkboxI>
                </flexbox-item>
                <flexbox-item v-if="type==1">
                    点击确认投资即表示已阅读并同意<a href="html/2DetailPage/sbRiskDisclosure1.html">《出借风险告知书》</a><a href="html/1LoginRegister/zt_cjrfwxy.html">《出借人服务协议》 </a><a href="html/1LoginRegister/yzbjkxy.html">《借款协议》</a><a href="html/1LoginRegister/zt_zzxy.html">《债权转让协议》</a>
                </flexbox-item>
                <flexbox-item v-if="type==2">
                    点击确认投资即表示已阅读并同意<a href="html/2DetailPage/sbRiskDisclosure1.html">《出借风险告知书》</a><a href="html/1LoginRegister/tzrwxy.html">《出借人服务协议》 </a><a href="html/1LoginRegister/yzbjkxy.html">《借款协议》</a>
                </flexbox-item>
                <flexbox-item v-if="type==3">
                    点击确认投资即表示已阅读并同意<a href="html/2DetailPage/sbRiskDisclosure1.html">《出借风险告知书》</a><a href="html/1LoginRegister/zt_cjrfwxy.html">《出借人服务协议》 </a><a :href="orderSourceUrl">《借款协议》</a>
                </flexbox-item>
            </flexbox>
            <div class="btn-group">
                <button class="btn" @click="showKeyBoard">
                                                                                                    确认出借
                                                                                                </button>
            </div>
        </div>
        <key-board :is-pay='isPay' @close='isPay = !isPay' payTitle='确认支付' @refetch='refetch' @pas-end="invest" ref="keyboard">
            <span class="font-size-16">支付金额</span>
            <span slot="explain"><i style="font-size:26px">{{investAmount}}</i>元</span>
        </key-board>
        <key-board-count :is-pay='isCountPay' @close='isCountPay = !isCountPay' payTitle='确认支付' :phoneNum="bankMobile" @refetch='refetchMsg' @pas-end="investByMsg" ref="keyboardMsg" @endTime="endTime">
            <span class="font-size-16">本次支付金额</span>
            <span slot="explain"><i style="font-size:26px">{{investAmount|numToMoneyField}}</i>元</span>
        </key-board-count>
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
    } from "vux";
    import mheader from "~/common/m-header.vue";
    import checkboxI from "~/common/checkbox-i.vue";
    import keyBoard from "~/common/keyBoard.vue"
    import keyBoardCount from "~/common/keyBoardCount.vue"
    import md5 from "@/config/md5";
    import ybd_config from "@/config/config"
    export default {
        components: {
            mheader,
            Flexbox,
            FlexboxItem,
            XProgress,
            Group,
            GroupTitle,
            Cell,
            Popover,
            checkboxI,
            keyBoard,
            keyBoardCount
        },
        data() {
            return {
                pageTitle: "确认出借",
                isPay: false,
                isCountPay: false,
                checkObj: {
                    value: "0",
                    istrue: "1",
                    isfalse: "0"
                },
                investName: '',
                id: '',
                type: 1,
                userId: '',
                userStatus: {},
                detail: {},
                remainAmount: 0,
                investAmount: 0,
                profit: 0,
                couponId: null,
                couponName: '无可用优惠券',
                realUserStatus: {},
                userAccount: {},
                bankLogoUrl: '',
                bankName: '',
                failNum: '',
                singerMaxAmount: 0,
                singerDayAmount: 0,
                accountReaminAmount: 0,
                bankMobile: '',
                payMsbObj: {},
                isBack: true,
                isEnd: true,
                orderSourceUrl:'html/1LoginRegister/jrxjjkxy.html',
                couponAmount:0
            };
        },
        methods: {
            jumpCall() {
                this.$router.push("/find/customerService");
            },
            checkClick() {
                this.checkObj.value === this.checkObj.istrue ?
                    (this.checkObj.value = this.checkObj.isfalse) :
                    (this.checkObj.value = this.checkObj.istrue);
            },
            leftBack() {
                this.$store.commit('changeCoupon', {});
                if (this.type == 1) {
                    this.$router.push({
                        path: `/pro/ztDetail/zt/${this.id}`
                    })
                } else if (this.type == 2) {
                    this.$router.push({
                        path: `/pro/ztDetail/pro/${this.id}`
                    })
                } else {
                    this.$router.push({
                        path: `/pro/ztDetail/sb/${this.id}`
                    })
                }
            },
            endTime() {
                this.isEnd = true;
            },
            refetch() {},
            refetchMsg() {
                let txn_amt = this.investAmount - this.accountReaminAmount;
                let postdata = {
                    txn_amt: txn_amt,
                    rechargeWay: "AUTH",
                    mobile: this.bankMobilebankMobile
                }
                this.$mine("bankPay/pay", postdata).then(res => {
                    if (res.code == 200) {
                        this.isCountPay = true;
                        this.isEnd = false;
                        this.payMsbObj = res.model;
                    } else {
                        this.$vux.toast.text(res.msg);
                    }
                })
            },
            showKeyBoard() {
//          	let model = {
//                  invest_ceiling: "100万元",
//                  risk_tolerance_type: "谨慎型"
//              }
                if (this.checkObj.value === this.checkObj.istrue) {
                    // if (this.userStatus.isFree && this.userStatus.isFree == 1 && (this.investAmount - this.userStatus.amount)<=0 &&  this.investAmount <= this.accountReaminAmount) {
                    //     console.log(this.investAmount)
                    //     console.log(this.userStatus.amount)
                    //     this.investByNoPassword()
                    //     return;
                    // }
//                  this.ismonoverrun=true;
//                  if(this.ismonoverrun==true)
//                  {
//              	   this.showPlugin(model);
//              	   return;
//                  }
                    if (this.investAmount > this.accountReaminAmount) {
                        if (this.isEnd) {
                            this.refetchMsg()
                        } else {
                            this.isCountPay = true;
                        }
                    } else {
                        this.isPay = true;
                    }
                } else {
                    this.$vux.toast.text('请同意并勾选协议');
                }
            },
//          showPlugin (model) {
//            let that = this
//		      this.$vux.confirm.show({
//		      	confirmText:'继续',
//		        content: `您在投金额已超${model.invest_ceiling}，超出了您目前的风险承受能力（${model.risk_tolerance_type}），确定要继续吗`,
//		        onConfirm () {
//		          if (that.investAmount > that.accountReaminAmount) {
//                      if (that.isEnd) {
//                          that.refetchMsg()
//                      } else {
//                          that.isCountPay = true;
//                      }
//                  } else {
//                      that.isPay = true;
//                  }
//		        }
//		      })
//		    },
            invest(val) {
                let investParams = {
                    amount: this.investAmount,
                    expectedRevenue: this.profit,
                    transactionPassword: md5(val),
                    userCouponId: this.couponId
                }
                if (this.type == 3) {
                    investParams.borrowNid = this.id
                } else {
                    investParams.productId = this.id
                }
                let url = 'investZt/investZt';
                if (this.type == 2) {
                    url = 'invest/investPool';
                } else if (this.type == 3) {
                    url = 'invest/invest';
                }
                this.$mine(url, investParams).then(res => {
                    if (res.code == 200) {
                        this.$store.commit('changeCoupon', {})
                        this.$router.push({
                            path: `/pro/investSuccess?amount=${this.investAmount}&investName=${this.investName}`
                        })
                    } else {
                        this.$vux.toast.text(res.msg);
                    }
                    this.$nextTick(() => {
                        this.$refs.keyboard.$payStatus(true);
                    })
                })
            },
            investByMsg(val) {
                let txn_amt = this.investAmount - this.accountReaminAmount;
                console.log(this.investAmount)
                let investParams = {
                    amount: this.investAmount,
                    expectedRevenue: this.profit,
                    userCouponId: this.couponId,
                    smsCode: val,
                    requestNo: this.payMsbObj.requestNo,
                    token: this.payMsbObj.token,
                    crmOrderNo: this.payMsbObj.crmOrderNo
                }
                if (this.type == 3) {
                    investParams.borrowNid = this.id
                } else {
                    investParams.productId = this.id
                }
                let url = "investZt/investZtNew";
                if (this.type == 2) {
                    url = 'invest/investPoolNew';
                } else if (this.type == 3) {
                    url = 'invest/investNew';
                }
                this.$mine(url, investParams).then(res => {
                    if (res.code == 200) {
                        this.$router.push({
                            path: `/pro/investSuccess?amount=${this.investAmount}&investName=${this.investName}`
                        })
                    } else {
                        this.$vux.toast.text(res.msg);
                    }
                    this.$nextTick(() => {
                        this.$refs.keyboardMsg.$payStatus(true);
                    })
                })
            },
            investByNoPassword() {
                let investParams = {
                    amount: this.investAmount,
                    expectedRevenue: this.profit,
                    userCouponId: this.couponId
                }
                if (this.type == 3) {
                    investParams.borrowNid = this.id
                } else {
                    investParams.productId = this.id
                    if (this.type == 1) {
                        investParams.type = 2
                    } else {
                        investParams.type = 1
                    }
                }
                let url = "freePayment/freePaymentInvestNew";
                if (this.type == 3) {
                    url = 'freePayment/freePaymentInvest';
                }
                this.$mine(url, investParams).then(res => {
                    if (res.code == 200) {
                        this.$router.push({
                            path: `/pro/investSuccess?amount=${this.investAmount}&investName=${this.investName}`
                        })
                    } else {
                        this.$vux.toast.text(res.msg);
                    }
                })
            },
            init() {
                this.id = this.$route.params.id;
                this.type = this.$route.params.type;
                this.investAmount = this.$route.query.amount ? this.$route.query.amount : 0;
                this.profit = this.$route.query.profit ? this.$route.query.profit : 0;
                this.useCoupon = this.$route.query.useCoupon ? this.$route.query.useCoupon : 0;
                this.investName = this.$route.query.investName ? this.$route.query.investName : '';
                this.userId = this.storage.get("user_id");
                if (this.useCoupon === 0) {
                    this.checkCoupon()
                } else {
                    this.couponId = null;
                    this.couponName = '不使用优惠券';
                }
                let url = '';
                //1 智投 2亿宝优选  3散标
                if (this.type == 1) {
                    url = this.id == 'XSB0002' ? 'borrowZt/selectZhiTouXSB' : 'borrowZt/selectZhiTou'
                } else if (this.type == 2) {
                    url = 'borrow/selectByProductId'
                } else {
                    url = 'borrow/selectBorrowByBorrowNid'
                }
                var postParamObj = {};
                this.type == 3 ? postParamObj['borrowNid'] = this.id : postParamObj['productId'] = this.id
                this.$post(url, postParamObj).then(res => {
                    if (res.code == "200") {
                        this.type == 1 ? this.detail = res.model.financeProductZt : this.detail = res.model;
                        this.remainAmount = this.detail.remainAmount;
                        if(this.type==3&&this.detail.orderSource){
                            this.orderSourceUrl = ybd_config.xyObj[this.detail.orderSource];
                        }
                    }
                })
                this.getRealUserStatus();
                this.getUserAccount();
            },
            getRealUserStatus() {
                this.$post('realUser/selectRealUserByUserId', {
                    userId: this.userId,
                    userDevice: '02'
                }).then(res => {
                    if (res.code == 200) {
                        this.realUserStatus = res.model;
                        let cardInfo = this.realUserStatus.realUserCardList[0];
                        this.bankLogoUrl = cardInfo.mapUrl;
                        this.bankName = cardInfo.bankName;
                        this.failNum = cardInfo.toAccNo.substr(cardInfo.toAccNo.length - 4, cardInfo.toAccNo.length - 1)
                        this.singerMaxAmount = cardInfo.singerMaxAmount - 0;
                        this.singerDayAmount = cardInfo.singerDayAmount - 0;
                        this.bankMobile = cardInfo.mobile;
                    }
                })
                this.$post('user/selectUserStatus', {
                    id: this.userId
                }).then(res => {
                    if (res.code == 200) {
                        this.userStatus = res.model;
                    };
                });
            },
            getUserAccount() {
                this.$post('userAcount/selectUserAcount', {
                    userId: this.userId
                }).then(res => {
                    if (res.code == 200) {
                        this.userAccount = res.model;
                        this.accountReaminAmount = this.userAccount ? this.userAccount.availableCredit : 0;
                    }
                })
            },
            checkCoupon() {
                let storeCoupon = this.$store.getters.getCheckedCoupon;
                if (storeCoupon && storeCoupon.id) {
                    this.couponId = storeCoupon.couponId;
                    this.couponName = storeCoupon.remark;
                    this.couponAmount = storeCoupon.couponAmount;
                    return;
                }
                let checkCouponFun;
                if (this.type == 1) {
                    checkCouponFun = this.$store.dispatch('checkCouponListZT', {
                        amount: this.investAmount,
                        productId: this.id
                    });
                } else {
                    if (this.type == 2) {
                        checkCouponFun = this.$store.dispatch('checkCouponList', {
                            amount: this.investAmount,
                            productId: this.id
                        });
                    } else {
                        checkCouponFun = this.$store.dispatch('checkCouponList', {
                            amount: this.investAmount,
                            borrowNid: this.id
                        });
                    }
                }
                checkCouponFun.then(res => {
                    if (res.code == 200) {
                        if (res.model.length > 0 && res.model[0].flag == 1) {
                            this.couponId = res.model[0].couponId;
                            this.couponName = res.model[0].remark;
                            this.couponAmount =  res.model[0].couponAmount;
                            this.$store.commit('changeCoupon', res.model[0])
                        }
                    } else {
                         this.couponAmount = 0;
                        this.$vux.toast.text(res.msg)
                    }
                })
            }
        },
        created() {
            this.init();
        },
        computed: {}
    };
</script>
<style>
    .invest {
        padding-top: 10px
    }
    .invest .font-333 .weui-cell__ft {
        color: #333;
    }
    .invest>div {
        margin-bottom: 10px;
    }
    .invest .weui-cell__ft.vux-cell-align-left {
        padding-left: 37px;
    }
    .invest .icon-group {
        display: inline-block;
        vertical-align: middle;
        /* position: relative; */
    }
    .invest .icon {
        display: inline-block;
        vertical-align: middle;
        width: 12px;
    }
    .invest .vux-popover {
        position: fixed;
        padding: 10px;
        line-height: 1;
        text-align: left;
    }
    .invest .agree-group {
        box-sizing: border-box;
        padding: 16px;
        font-size: 12px;
    }
    .invest .btn-group {
        padding: 16px;
    }
    .invest .btn-group .btn {
        background: #ff665e;
        border-radius: 4px;
        display: inline-block;
        width: 100%;
        line-height: 44px;
        font-size: 18px;
        color: #fff;
        border: none;
    }
    .bank-group {
        background: #fff;
    }
    .bank-logo {
        display: inline-block;
        width: 26px;
        height: 26px;
    }
    .item-title-label {
        display: inline-block;
        border: 1px solid #43A0FF;
        border-radius: 2px;
        color: #43A0FF;
        line-height: 19px;
        width: 57px;
        text-align: center;
        font-size: 12px;
    }
    .quan {
        display: inline-block;
        width: 18px;
        height: 18px;
        border: 1px solid #b7b7b7;
        color: #b7b7b7;
        border-radius: 50%;
        font-size: 12px;
        text-align: center;
        line-height: 18px;
    }
    .img-icon {
        display: inline-block;
        width: 18px;
        vertical-align: middle;
    }
    .invest .invest-group {
        box-sizing: border-box;
        padding: 0 16px;
        font-size: 30px;
        color: #333;
    }
    .invest .profit-group {
        box-sizing: border-box;
        padding-right: 16px;
    }
    .invest .coupon-tips {
        font-size: 12px;
        color: #999;
        line-height: 22px;
        padding: 0 16px;
    }
    .invest .bank-group>div {
        padding: 0 16px;
        vertical-align: middle;
    }
    .invest .bank-group>div.card-group {
        padding: 16px;
        border-bottom: 1px solid #F5F5F5;
    }
    .invest .weui-cell:before {
        left: 0;
    }
    .invest .agree-group a {
        color: #43A0FF;
    }
    .weui-dialog__bd:first-child
    {
    	padding-top: 1.7rem;
    }
</style>
