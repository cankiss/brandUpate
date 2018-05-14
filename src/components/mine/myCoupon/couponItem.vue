<template>
    <flexbox class="couponDetail" :class="{'disabled' : status!=1}">
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
        <flexbox-item :span="1/2" class="border-line">
            <div>
                <flexbox>
                    <flexbox-item class="font-size-14 font-000">
                            {{couponDetail.couponName}}
                    </flexbox-item>
                    <flexbox-item class="text-center remind-tips" v-if="couponDetail.status==1&&couponDetail.remind==1">
                        即将到期
                    </flexbox-item>
                </flexbox>
            </div>
            <div>
                <p>单笔出借满{{couponDetail.startInvestAmount}}元可使用</p>
                <p> 仅限{{couponDetail.termTime}}{{couponDetail.timeType|timeTypeFliter}}项目使用</p>
            </div>
        </flexbox-item>
        <flexbox-item class="link-group" v-if="couponDetail.status==1">
            <router-link to="/pro/ztlist">
                <p>立</p>
                <p>即</p>
                <p>出</p>
                <p>借</p>
            </router-link>
        </flexbox-item>
                <!-- <flexbox-item class="link-group" v-if="couponDetail.status==2">
            <router-link to="/pro/ztlist">
                <p></p>
                <p>已</p>
                <p>使</p>
                <p>用</p>
            </router-link>
        </flexbox-item>
                <flexbox-item class="link-group" v-if="couponDetail.status==3">
            <router-link to="/pro/ztlist">
                <p></p>
                <p>已</p>
                <p>失</p>
                <p>效</p>
            </router-link>
        </flexbox-item> -->
        <span class="coupon-tips">
                        返现券
                    </span>
    </flexbox>
</template>
<script>
    import {
        Flexbox,
        FlexboxItem,
        dateFormat
    } from "vux"
    export default {
        components: {
            Flexbox,
            FlexboxItem
        },
        props: {
            couponDetail: {
                type: Object,
                default: {}
            },
            status:{
                type:Number,
                default:1
            }
        },
        methods: {
            timesecToDate(timesec) {
                return dateFormat(new Date(timesec), 'YYYY-MM-DD');
            }
        }
    }
</script>
<style lang="less" scoped>
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
            z-index: 999;
        }
        .link-group {
            font-size: 14px;
            text-align: center;
            p {
                color: #FF665E;
            }
            margin-left: 0 !important;
            border-left: 2px dashed #E1E1E1;
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
    .couponDetail.disabled{
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
            .link-group p{
                 color: #999;
            }
        
        .coupon-tips {
            background: #CCC;
        }
    }
</style>
