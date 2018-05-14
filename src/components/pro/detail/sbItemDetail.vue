<template>
    <div class="sb-item-detail">
        <!--项目介绍-->
        <flexbox orient="vertical">
            <flexbox-item class="group-tl">
                <flexbox>
                    <flexbox-item :span="1/3">
                        项目介绍
                    </flexbox-item>
                    <flexbox-item class="text-right">
                        {{bnid}}
                    </flexbox-item>
                </flexbox>
            </flexbox-item>
            <flexbox-item>
                <flexbox>
                    <flexbox-item :span="1/2" class="text-center">
                        <span class="sb-rate" v-if="borrow.rate">{{borrow.extraRate+borrow.rate}}</span> <span class="red-text">%</span> <br/>
                        <span class="font-999">借款年利率</span>
                    </flexbox-item>
                    <flexbox-item class="text-center" style="padding-top:16px;">
                        借款金额<span class="borrow-info">{{borrow.borrowAmount|bigMoneyCheck}}</span> <br/> 借款期限
                        <span class="borrow-info">{{borrow.termTime}}{{borrow.timeType|timeTypeFliter}}</span>
                    </flexbox-item>
                </flexbox>
            </flexbox-item>
        </flexbox>
        <!--借款信息-->
        <flexbox orient="vertical">
            <flexbox-item class="group-tl">
                <flexbox>
                    <flexbox-item>借款信息</flexbox-item>
                    <flexbox-item class="red-text text-right">
                        <a class="red-text" :href="orderSourceUrl">借款协议</a>
                    </flexbox-item>
                </flexbox>
            </flexbox-item>
            <flexbox-item class="group-body">
                <group>
                    <cell>
                        <span slot="title">借款用途</span><span v-if="borrow.borrowUse">{{borrow.borrowUse}}</span>
                    </cell>
                    <cell>
                        <span slot="title">还款方式</span><span  v-if="borrow.borrowType">{{borrow.borrowType|borrowTypeFliter}}</span>
                    </cell>
                    <cell>
                        <span slot="title">募集状态</span><span  v-if="borrow.status&&borrow.status==4">募集中</span><span  v-else-if="borrow.status">{{borrow.status|borrowStatusFliter}}</span>
                    </cell>
                    <cell>
                        <span slot="title"> 募集期限</span><span> 3天</span>
                    </cell>
                    <cell>
                        <span slot="title">募集开始时间</span><span  v-if="borrow.startInverstTime">{{borrow.startInverstTime|timesecFliter}}</span>
                    </cell>
                </group>
            </flexbox-item>
        </flexbox>
        <!--借款人信息-->
        <flexbox orient="vertical" v-if="isloanBorrow">
            <flexbox-item class="group-tl" v-if="isEnterprise">
              借款企业信息
            </flexbox-item>
            <flexbox-item class="group-tl" v-else>
              借款人信息
            </flexbox-item>
            <flexbox-item class="group-body">
                <group v-if="isEnterprise">
                  <cell>
                    <span slot="title">公司名称</span><span  v-if="loanBorrowPerson[0].name">{{loanBorrowPerson[0].name||''}}</span>
                  </cell>
                  <cell>
                    <span slot="title">公司地址</span><span v-if="loanBorrowPerson[0].address">{{loanBorrowPerson[0].address||''}}</span>
                  </cell>
                  <cell>
                    <span slot="title">经营范围</span><span v-if="loanBorrowPerson[0].businessScope">{{loanBorrowPerson[0].businessScope||''}}</span>
                  </cell>
                  <!--<cell>-->
                    <!--<span slot="title">公司简介</span><span>{{loanBorrowPerson[0].idCardNumber}}</span>-->
                  <!--</cell>-->
                </group>
                <group v-else>
                    <cell>
                        <span slot="title">姓名</span><span v-if="loanBorrowPerson[1]">{{loanBorrowPerson[1].name||''}}</span>
                    </cell>
                    <cell>
                        <span slot="title">性别</span><span v-if="loanBorrowPerson[1]">{{loanBorrowPerson[1].gender||''}}</span>
                    </cell>
                    <cell>
                        <span slot="title">年龄</span><span v-if="loanBorrowPerson[1]">{{loanBorrowPerson[1].age||''}}</span>
                    </cell>
                    <cell>
                        <span slot="title"> 身份证号</span><span v-if="loanBorrowPerson[1]">{{loanBorrowPerson[1].idCardNumber||''}}</span>
                    </cell>
                    <cell>
                        <span slot="title">居住地址</span><span v-if="loanBorrowPerson[1]">{{loanBorrowPerson[1].address||''}}</span>
                    </cell>
                </group>
            </flexbox-item>
        </flexbox>
        <!--审核信息-->
        <flexbox orient="vertical">
            <flexbox-item class="group-tl" v-if="isEnterprise">
              借款征信信息
            </flexbox-item>
            <flexbox-item class="group-tl" v-else>
                审核信息
            </flexbox-item>
            <flexbox-item class="group-body" v-if="isloanBorrow">
                <group v-if="isEnterprise" class="sbDetailcompany">
                    <cell v-if="loanBorrowPerson[0].businessEntity">
                      <span slot="title">企业法人身份</span><span><img class="icon-right" :src="iconRightUrl" alt=""></span>
                    </cell>
                    <cell v-if="loanBorrowPerson[0].permitNo && loanBorrowPerson[0].permitAddress && loanBorrowPerson[0].xxzzPath">
                      <span slot="title">企业营业执照</span><span><img class="icon-right" :src="iconRightUrl" alt=""></span>
                    </cell>
                    <cell v-if="loanBorrowPerson[0].icpbaxkPath">
                      <span slot="title">企业ICP备案</span><span><img class="icon-right" :src="iconRightUrl" alt=""></span>
                    </cell>
                    <cell v-if="loanBorrowPerson[0].hyxkzPath">
                      <span slot="title">企业行业许可证</span><span><img class="icon-right" :src="iconRightUrl" alt=""></span>
                    </cell>
                    <cell v-if="loanBorrowPerson[0].yhkhxkzPath">
                      <span slot="title">企业银行开户许可</span><span><img class="icon-right" :src="iconRightUrl" alt=""></span>
                    </cell>
                    <cell v-if="loanBorrowPerson[0].swdjzPath">
                      <span slot="title">企业税务登记</span><span><img class="icon-right" :src="iconRightUrl" alt=""></span>
                    </cell>
                </group>
                <group v-else>
                    <cell  v-if="loanBorrowPerson[3]&&loanBorrowPerson[3].idCardStatus==1">
                        <span slot="title">身份证</span><span><img class="icon-right" :src="iconRightUrl" alt=""></span>
                    </cell>
                    <cell v-if="loanBorrowPerson[3]&&loanBorrowPerson[3].phoneStatus==1">
                        <span slot="title">手机号认证</span><span><img class="icon-right" :src="iconRightUrl" alt=""></span>
                    </cell>
                    <cell  v-if="loanBorrowPerson[3]&&loanBorrowPerson[3].sesameCredStatus">
                        <span slot="title">芝麻信用认证</span><span><img class="icon-right" :src="iconRightUrl" alt=""></span>
                    </cell>
                    <cell  v-if="loanBorrowPerson[3]&&loanBorrowPerson[3].educateStatus">
                        <span slot="title">学历认证</span><span><img class="icon-right" :src="iconRightUrl" alt=""></span>
                    </cell>
                    <cell  v-if="loanBorrowPerson[3]&&loanBorrowPerson[3].faceStatus">
                        <span slot="title">人脸识别认证</span><span><img class="icon-right" :src="iconRightUrl" alt=""></span>
                    </cell>
                    <cell  v-if="loanBorrowPerson[3]&&loanBorrowPerson[3].comfundsStatus">
                        <span slot="title">公积金流水</span><span><img class="icon-right" :src="iconRightUrl" alt=""></span>
                    </cell>
                  </group>
            </flexbox-item>
        </flexbox>
        <!--审核流程-->
        <flexbox orient="vertical">
            <flexbox-item class="group-tl">
                审核流程
            </flexbox-item>
            <flexbox-item class="text-center group-body">
                <!-- <span class="icon-flow">
                                评估信息
                            </span>
                <span class="icon-flow">
                                借款人进件
                            </span>
                <span class="icon-flow">
                                签约
                            </span>
                <span class="icon-flow">
                                资料审核
                            </span>
                <span class="icon-flow">
                                发布借款
                            </span> -->
                        <img src="~assets/pro/pic_schudle@2x.png" alt="">
            </flexbox-item>
        </flexbox>
        <!--统计信息-->
        <flexbox orient="vertical">
            <flexbox-item class="group-tl">
                统计信息
            </flexbox-item>
            <flexbox-item class="group-body" v-if="isloanBorrow">
                <group v-if="isEnterprise&&loanBorrowPerson[1]">
                  <cell>
                    <span slot="title">累计借款</span><span v-if="loanBorrowPerson[1].amountCount">{{loanBorrowPerson[1].amountCount}}笔</span>
                     <span v-else>0笔</span>
                  </cell>
                  <cell>
                    <span slot="title">成功还款</span><span v-if="loanBorrowPerson[1].rePaymentCount">{{loanBorrowPerson[1].rePaymentCount}}笔</span>
                    <span v-else>0笔</span>
                  </cell>
                  <cell>
                    <span slot="title">历史逾期 </span><span>0笔</span>
                  </cell>
                </group>
                <group v-else-if="loanBorrowPerson[2]">
                    <cell>
                        <span slot="title">累计借款</span><span v-if="loanBorrowPerson[2].amountCount">{{loanBorrowPerson[2].amountCount}}笔</span>
                         <span v-else>0笔</span>
                    </cell>
                    <cell>
                        <span slot="title">成功还款</span><span v-if="loanBorrowPerson[2].rePaymentCount">{{loanBorrowPerson[2].rePaymentCount}}笔</span>
                         <span v-else>0笔</span>
                    </cell>
                    <cell>
                        <span slot="title">历史逾期 </span><span>0笔</span>
                    </cell>
                </group>
                <group v-else>
                    <cell>
                        <span slot="title">累计借款</span><span>0笔</span>
                    </cell>
                    <cell>
                        <span slot="title">成功还款</span><span>0笔</span>
                    </cell>
                    <cell>
                        <span slot="title">历史逾期 </span><span>0笔</span>
                    </cell>
                </group>
            </flexbox-item>
        </flexbox>
    </div>
</template>
<script>
    import {
        Flexbox,
        FlexboxItem,
        Group,
        Cell
    } from 'vux'
    import ybd_config from "@/config/config"
    export default {
        components: {
            Flexbox,
            FlexboxItem,
            Group,
            Cell,
        },
        data() {
            return {
                name: '散标详情',
                id: '',
                type: 2,
                iconRightUrl: require('../../../assets/pro/icon_right.png'),
                loanBorrowPerson: [],//审核信息
                isloanBorrow:false,//检测loanBorrowPerson是否有值
                borrow: {},
                 orderSourceUrl:'html/1LoginRegister/jrxjjkxy.html',
                isEnterprise: false//判断是个人还是企业
            }
        },
        methods: {
            init() {
                this.id = this.$route.params.id;
                this.type = this.$route.params.type;
                this.name = this.$route.params.name;
                this.bnid = this.$route.params.bnid;
                this.$emit('changeName', this.name);
                this.getLoanBorrowPerson()
                this.getBorrow()
            },
            getLoanBorrowPerson() {
                this.$post('borrow/selectLoanBorrowPerson', {
                    borrowNid: this.bnid
                }).then(res => {
                    if (res.code == 200) {
                        console.log(res);
                        this.loanBorrowPerson = res.model;
                        this.isloanBorrow = true;
                        if(this.loanBorrowPerson.length<=2){//length值大于2是个人信息，小于等于2是企业信息
                            this.isEnterprise = true;
                        }
                    }
                })
            },
            getBorrow() {
                this.$post('borrow/selectBorrowByBorrowNid', {
                    borrowNid: this.bnid
                }).then(res => {
                    if (res.code == 200) {
                        this.borrow = res.model;
                        if(this.borrow.orderSource){
                             this.orderSourceUrl = ybd_config.xyObj[this.borrow.orderSource];
                        }
                    }
                })
            }
        },
        created() {
            this.init()
        }
    }
</script>
<style>
    .sb-item-detail>.vux-flexbox {
        padding: 0 10px;
        background: #fff;
        box-sizing: border-box;
        margin-bottom: 10px;
    }
    .sb-item-detail .group-tl {
        font-size: 14px;
        color: #000;
        line-height: 45px;
        border-bottom: 1px solid #E1E1E1;
    }
    .sb-item-detail .weui-cell:before,
    .sb-item-detail .weui-cells:before {
        display: none;
    }
    .sb-item-detail .weui-cells {
        margin-top: 0;
    }
    .sb-item-detail .sb-rate {
        font-size: 36px;
        color: #ff665e;
    }
    .sb-item-detail .borrow-info {
        margin-left: 10px;
        color: #666;
        line-height: 40px;
        display: inline-block;
    }
    .sb-item-detail .group-body {
        color: #666;
    }
    .sb-item-detail .weui-cell {
        padding-left: 0;
    }
    .sb-item-detail .weui-cell__ft {
        text-align: left;
        flex: 2;
    }
    .sb-item-detail .icon-right {
        display: inline-block;
        height: 14px;
        width: auto;
    }
    .sb-item-detail .vux-flex-col .vux-flex-row {
        margin-bottom: 0;
    }
    .sbDetailcompany .weui-cells.vux-no-group-title{
      display:flex;flex-wrap:wrap;
    }
    .sbDetailcompany .weui-cell{
      width:50%;
      box-sizing:border-box;
    }
    .sbDetailcompany .vux-cell-primary{
      flex:10;
    }
    .sbDetailcompany .weui-cells:before{
        display: none;
    }
</style>
