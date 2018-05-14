<template>
    <flexbox-item class="list-item">
        <a href="javascript:void(0)" @click="toDetail(item)" class="font-333">
            <flexbox orient="vertical">
                <flexbox-item>
                    <span class="item-title-name">{{item.productName||item.borrowName}}</span>
                    <!-- <span v-if="rankFliter(item.productId)" class="item-title-label">排位赛</span>
                    <span v-if="item.productId==='XSB0002'" class="item-title-label item-title-label-new">随时出借</span>
                    <span v-if="item.productId==='XSB0002'" class="item-title-label item-title-label-new">仅限一次</span>
                    <span v-if="item.productId==='XSB0002'" class="item-title-label item-title-label-new">上限五万</span> -->
                    <span v-for="(label,index) in item.labels" :key="index" class="item-title-label" :class="{'item-title-label-new':item.productId==='XSB0002'}">{{label}}</span>
                </flexbox-item>
                <flexbox-item>
                    <flexbox>
                        <flexbox-item :span="5">
                            <div class="red-text">
                                <span class="rate-num">{{item.rate + item.extraRate}}</span>
                                <span class="rate-Symbol">%</span>
                            </div>
                            <div>
                                <span class="font-999 font-size-12" v-if="item.borrowNid">
                                                                 出借年利率
                                </span>
                                <span class="font-999 font-size-12" v-else>
                                                                 近七日历史年化收益率
                                </span>
                            </div>
                        </flexbox-item>
                        <flexbox-item class="padleft20 left-line">
                            <flexbox>
                                <flexbox-item>
                                    <p>{{(item.termTime||item.duration)}}{{item.durationType|timeTypeFliter}}{{item.timeType|timeTypeFliter}}</p>
                                     <p v-if="item.borrowNid" class="font-999 date-type">
                                        出借期限
                                    </p>
                                    <p class="font-999 date-type" v-else>
                                        {{item.productId | timeTypeNameFliter}}
                                    </p>

                                </flexbox-item>
                                <flexbox-item class="text-right">
                                    <button v-if="(item.status==1&&item.productId)||(item.borrowNid&&item.status==4)" class="btn red-bg">
                                                                            立即出借
                                                                     </button>
                                    <button class="btn red-bg full" v-else-if="item.borrowNid&&item.status==7">
                                            还款中
                                    </button>
                                    <button v-else class="btn red-bg full">
                                            已满标
                                    </button>
                                </flexbox-item>
                            </flexbox>
                        </flexbox-item>
                    </flexbox>
                </flexbox-item>
                <flexbox-item>
                    <flexbox>
                        <flexbox-item v-if="item.borrowNid||isProduct(item.productId)" :span="2/3">
                            <x-progress :percent="item | percentRemainFliterToNumber" :show-cancel="false"></x-progress>
                        </flexbox-item>
                        <flexbox-item v-else :span="1/2">
                            <x-progress :percent="item | percentRemainFliterToNumber" :show-cancel="false"></x-progress>
                        </flexbox-item>
                        <flexbox-item>
                            <p v-if="item.borrowNid||isProduct(item.productId)||item.productId=='XSB0002'" class="residual-amount text-right">
                                剩: {{ item.remainAmount | bigMoneyCheck}}
                            </p>
                            <p v-else class="residual-amount text-right">
                                持有满{{(item.time||item.duration)}}{{item.durationType|timeTypeFliter}}可申请退出
                            </p>
                        </flexbox-item>
                    </flexbox>
                </flexbox-item>
            </flexbox>
        </a>
    </flexbox-item>
</template>
<script>
    import {
        Flexbox,
        FlexboxItem,
        XProgress
    } from "vux"
    export default {
        components: {
            Flexbox,
            FlexboxItem,
            XProgress
        },
        props: {
            item: {
                type: Object,
                default: {}
            }
        },
        methods: {
            itemClick() {
                this.$emit("itemClick");
            },
            rankFliter(value) {
                if (value == 'SZY0001' || value == 'YYY0002' || value == 'JJF0002' || value == 'SJY0002' || value == 'NNZ0002') {
                    return true;
                } else {
                    return false;
                }
            },
            isProduct(productId) {
                var failId = productId.charAt(productId.length - 1);
                if (failId == 1) {//亿宝优选最后一位是1
                    return true
                } else {//智投最后一位是2
                    return false
                }
            },
            toDetail(item) {//只有散标有borrrowNid
              let param = "";
              let id = this.item.borrowNid || this.item.productId;
              param = this.item.borrowNid ? "sb" : (this.isProduct(this.item.productId) ? "pro" : "zt");
              this.$router.push({
                path: `/pro/ztDetail/${param}/${id}`
              });
            }
        },
        created(){
            if(this.item.label){
                 this.item.labels = this.item.label.split(',');
            }else{
                this.item.labels = [];
            }

        }
    }
</script>
<style>

</style>
