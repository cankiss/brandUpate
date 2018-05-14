<template>
    <div class="container has-header has-footer">
        <mheader :text='title'></mheader>
        <div class="content">
            <ul v-if="couponList.length">
                <li v-for="(couponDetail,index) in couponList" :key="index" @click="chooseCoupon(index)" :class="{'disabled':couponDetail.flag==0}">
                    <flexbox class="couponDetail">
                        <flexbox-item :span="3/8">
                            <p class="text-center red-text">
                                <span class="font-size-12">￥</span>
                                <span class="font-size-36">{{couponDetail.couponMoney}}</span>
                                <span class="font-size-12">元</span>
                            </p>
                            <p class="text-center font-size-12 font-666">
                                有效期至{{couponDetail.dueDate}}
                            </p>
                        </flexbox-item>
                        <flexbox-item class="border-line">
                            <div>
                                <flexbox>
                                    <flexbox-item class="font-size-14 font-000">
                                        {{couponDetail.couponName}}
                                    </flexbox-item>
                                    <flexbox-item class="text-center remind-tips"  v-if="couponDetail.status==1&&couponDetail.remind==1">
                                        即将到期
                                    </flexbox-item>
                                </flexbox>
                            </div>
                            <div>
                                <p>单笔出借满{{couponDetail.startInvestAmount}}元可使用</p>
                                <p> 仅限{{couponDetail.termTime}}{{couponDetail.timeType|timeTypeFliter}}项目使用</p>
                            </div>
                        </flexbox-item>
                        <span class="coupon-tips">
                                                        返现卷
                                                    </span>
                    </flexbox>
                    <span v-if="checkedId==couponDetail.couponId&&couponDetail.flag==1" class="checked-icon"></span>
                </li>
            </ul>
        </div>
        <footer>
            <x-button type="default" class="un-use" @click.native="unUseCoupon">不使用优惠券</x-button>
        </footer>
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
        XButton
    } from "vux";
    import mheader from "~/common/m-header.vue";
    import checkboxI from "~/common/checkbox-i.vue";
    export default {
        components: {
            mheader,
            Flexbox,
            FlexboxItem,
            XProgress,
            Group,
            GroupTitle,
            Cell,
            XButton
        },
        data() {
            return {
                title: "选择优惠券",
                couponList: [],
                amount: 0,
                id: '',
                profit:0,
                type:1,
                checkedCoupon: {},
                checkedId: null,
                investName:''
            }
        },
        methods: {
            init() {
                this.checkedCoupon = this.$store.getters.getCheckedCoupon;
                if ( this.checkedCoupon&&this.checkedCoupon.id) {
                    this.checkedId = this.checkedCoupon.couponId;
                }
                let checkCouponFun;
                if (this.type == 1) {
                    checkCouponFun = this.$store.dispatch('checkCouponListZT', {
                        amount: this.amount,
                        productId: this.id
                    });
                } else {
                    if (this.type == 2) {
                        console.log(2+":"+this.type);
                        checkCouponFun = this.$store.dispatch('checkCouponList', {
                            amount: this.amount,
                            productId: this.id
                        });
                    } else {
                        checkCouponFun = this.$store.dispatch('checkCouponList', {
                            amount: this.amount,
                            borrowNid: this.id
                        });
                    }
                }
                checkCouponFun.then(res => {
                    if (res.code == 200) {
                        this.couponList = res.model;
                    }else{
                          this.$vux.toast.show({text:res.msg})
                    }
                })
            },
            chooseCoupon(index) {
                if (this.couponList[index].flag == 0) return
                this.checkedCoupon = this.couponList[index];
                if (this.checkedCoupon.id) {
                    this.checkedId = this.checkedCoupon.id;
                }
                this.$store.commit('changeCoupon', this.checkedCoupon)
                this.$router.push({path:`/pro/invest/${this.id}/${this.type}?amount=${this.amount}&profit=${this.profit}&investName=${this.investName}`})
                
            },
            unUseCoupon(){
                //useCoupon 1不使用  0或者不传 使用
                    this.$store.commit('changeCoupon', {})
                   this.$router.push({path:`/pro/invest/${this.id}/${this.type}?amount=${this.amount}&profit=${this.profit}&investName=${this.investName}&useCoupon=1`})
            }
        },
        created() {
            this.id = this.$route.params.id;
            this.amount = this.$route.params.amount;
            this.profit = this.$route.params.profit;
            this.type = this.$route.params.type;
            console.log(1+":"+this.type);
            this.investName = this.$route.query.investName;
            this.init();
        }
    };
</script>
<style lang="less" scoped>
    li {
        position: relative;
    }
    .couponDetail {
        box-sizing: border-box;
        margin: 8px 0;
        background: #fff;
        position: relative;
        padding: 16px 0;
        height: 123px;
        font-size: 12px;
        color: #666;
        line-height: 20px;
         :before {
            content: "";
            display: inline-block;
            height: 6px;
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            background: url(~assets/pro/norbg_gift_money.png) no-repeat;
            background-size: 100% auto;
            z-index: 99;
        }
        .coupon-tips {
            position: absolute;
            display: inline-block;
            width: 60px;
            height: 20px;
            font-size: 12px;
            color: #fff;
            background: #FF665E;
            line-height: 20px;
            text-align: center;
            position: absolute;
            left: 0;
            top: 3px;
            z-index: 9999;
        }
        .link-group {
            font-size: 14px;
            text-align: center;
            p {
                color: #FF665E;
            }
            margin-left: 0 !important;
        }
        .border-line {
            border-left: 2px dashed #E1E1E1;
            padding: 0 5px;
            box-sizing: border-box;
        }
        .remind-tips {
            font-size: 10px;
            color: #FF4000;
        }
    }
    .checked-icon {
        position: absolute;
        right: 0;
        bottom: 0;
        display: inline-block;
        width: 44px;
        height: 44px;
        background: url(~assets/mine/icon_chosen@2x.png) no-repeat;
        background-size: cover;
    }
    footer {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        max-width: 750px;
        border-top: 1px solid #E1E1E1;
        z-index: 9999;
        .un-use {
            background: #FFFFFF;
            border: none;
            font-size: 20px;
            color: #666666;
             :after {
                border: none;
            }
        }
    }
    li.disabled {
        .couponDetail {
            color: #999;
            .font-666,
            .red-text,
            .coupon-tips,
            .remind-tips {
                color: #999;
            }
             :before {
                content: "";
                display: inline-block;
                height: 6px;
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                background: url(~assets/pro/overbg_gift_money.png) no-repeat;
                background-size: 100% auto;
                z-index: 99;
            }
        }
        .coupon-tips {
            background: #CCC;
        }
    }
</style>
