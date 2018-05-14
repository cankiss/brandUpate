<template>
  <!--智投详情页-->
    <div class="container has-header has-footer zt-detail">
        <mheader :text="detail.productName || detail.borrowName" @rightMore="rightMore" :moreHtml="rightMoreHTML">
        </mheader>
        <flexbox orient="vertical" :gutter="0">
            <flexbox-item class="detail-banner red-bg">
                <flexbox orient="vertical" :gutter="0">
                    <flexbox-item>
                        <flexbox>
                            <flexbox-item :span="3/4">
                                <p>
                                    <span class="rate-num">{{detail.rate+detail.extraRate}}</span><span class="font-size-12">%</span>
                                </p>
                                <p class="rate-desc">
                                    近七日历史年化收益率
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
                        <flexbox>
                            <flexbox-item :span="7/10">
                                <x-progress class="detail-progress" :percent="detail.investDegress-0 || detail.investProgress -0" :show-cancel="false"></x-progress>
                            </flexbox-item>
                            <flexbox-item class="reamin-percent text-right">
                                已购：{{detail.investDegress || detail.investProgress}}%
                            </flexbox-item>
                        </flexbox>
                    </flexbox-item>
                    <flexbox-item>
                        <flexbox>
                            <flexbox-item>
                                <p v-if="$route.params.param == 'sb'">按月付息到期还本</p>
                                <p v-else>一次性还本付息</p>
                            </flexbox-item>
                            <flexbox-item class="reamin-percent">
                                <p class="text-right">剩余金额{{detail.remainAmount|bigMoneyCheck}}</p>
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
                            <cell>
                                <span slot="title" class="font-size-14 font-333">
                                                                        <img :src="productFlowUrl" class="product-flow-icon">
                                                                        投资流程
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
                                                        到期前三天主动申请，债转完成后可退出
                                                    </span>
                            </cell>
                           
                         
                        </group>
                    </flexbox-item>
                    <flexbox-item>
                        <group class="invest-group">
                            <cell>
                                <span slot="title" class="font-size-14 font-333">
                                                                        <img :src="productDetailUrl" class="product-flow-icon">
                                                                        投资流程
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
                                <span  class="red-text ">
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
        numberComma
    } from "vux"
    import mheader from "../../common/m-header.vue";
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
            investAmount
        },
        data() {
            return {
                detail: {
                    productId: '',
                    param:'',
                    productName: '智投详情'
                },
                type:"",
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
                userId:'',
                userStatus:null,
                isBack:true
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
                this.detail.param = this.$route.params.param;
                this.userId = this.storage.get("user_id");
                console.log(this.userId);
                let data = {productId:this.detail.productId};
                let url = "";
                if(this.detail.param == "zt"){
                  this.type = 1;
                  url = this.detail.productId == 'XSB0002' ? 'borrowZt/selectZhiTouXSB' : 'borrowZt/selectZhiTou';
                }else if(this.detail.param == "sb"){
                  this.type = 3;
                  url = "borrow/selectBorrowByBorrowNid";
                  data = {borrowNid:this.detail.productId};
                }else if(this.detail.param == "pro"){
                  this.type = 2;
                  url = "borrow/selectByProductId";
                  this.$post("borrow/selectPoolRecordByProductId",data).then(res=>{
                    if(res.code == 200){
                      this.total = res.model.total;
                    };
                  });
                };
                this.$post(url,data).then(res => {
                    if (res.code == "200") {
                        this.detail = res.model.financeProductZt || res.model;
                        if(this.detail.param != "pro"){
                          this.total = res.model.total || res.model.totalPoeple;
                        };
                        console.log(this.detail);
                    };
                });
                if(this.userId){
                    this.$post('user/selectUserStatus', {id: this.userId}).then( res => {
                      if (res.code == 200){
                          this.userStatus = res.model;
                      };
                    });
                };
            },
            invest(args){
              this.$router.push({ path: `/pro/invest/${this.detail.productId}/1`, query: { amount: args[0],profit:args[1] }})
            }
        },
        created() {
            this.init();
        }
    }
</script>
<style scoped>
    .detail-banner {
        padding: 40px 16px 13px;
        box-sizing: border-box;
        color: #fff;
    }
    .zt-detail.has-footer{
        padding-bottom: 80px;
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
        width: 24px;
        height: 26px;
    }
    .zt-detail .weui-cells {
        margin-top: 0;
    }
    .flow-group .weui-cell__ft.vux-cell-align-left,
    .invest-group .weui-cell__ft.vux-cell-align-left {
        margin-left: 13px;
    }
</style>
