<template>
    <flexbox orient="vertical" class="investGroup" ref="investGroup">
        <flexboxItem>
            <flexbox>
                <flexboxItem :span="6/10">
                    <flexbox>
                        <flexbox-item :span="4/5">
                            <group>
                                <x-input name="detail.amount" :max="8" type="text" :debounce="300" @on-change="getExpectedRevenue" v-model="inputAmount" @on-focus="setFocus" @on-blur="setBlur" class="font-333 font-size-24 invest-flex"></x-input>
                            </group>
                        </flexbox-item>
                        <flexbox-item>
                            <span class="font-999 font-size-18">元</span>
                        </flexbox-item>
                    </flexbox>
                </flexboxItem>
                <flexboxItem>
                    <x-button type="default" @click.native="invest" class="invest-btn">立即出借</x-button>
                </flexboxItem>
            </flexbox>
        </flexboxItem>
        <flexbox-item class="revenue-group font-999">
            <flexbox>
                <flexboxItem :span="6/10">
                    预计收益：
                    <div class="popover-content" v-show="popover" @click="changePopover">
                       依据前7天的近七日历史年化收益率计算，金额可能或高或低，以最终收益为准。
                    </div>
                   <a class="icon" href="javascript:void(0)" @click="changePopover">
                        <img  src="~assets/pro/icon_i_gray.png" alt="">
                    </a>
                    <span class="red-text">{{revenue}}元</span>
                </flexboxItem>
                <flexboxItem>
                    <p class="text-right">{{detail.investDegrees || detail.minInvestAmount}}整数倍</p>
                </flexboxItem>
            </flexbox>
        </flexbox-item>
    </flexbox>
</template>
<script>
    import {
        Flexbox,
        FlexboxItem,
        numberComma,
        Group,
        XButton,
        XInput
    } from "vux"
    export default {
        components: {
            Flexbox,
            FlexboxItem,
            numberComma,
            Group,
            XButton,
            XInput
        },
        props: {
            detail: {
                type: Object,
                default: {
                }
            }
        },
        data() {
            return {
                inputAmount: this.amount,
                revenue: 0,
                popover:false
            }
        },
        methods: {
            invest() {
            	//getUser
                this.$emit('invest',[this.inputAmount,this.revenue]);
            },
            getExpectedRevenue() {
                if(!/^-?\d+\.?\d{0,2}$/.test(this.inputAmount)) {
                    var s = this.inputAmount;
                    this.inputAmount = s.substring(0, s.length - 1);
                }
                this.revenue = 0;
                this.$post('invest/getExpectedRevenue', {
                    rate: this.detail.rate + this.detail.extraRate,
                    timeType: this.detail.durationType || this.detail.timeType,
                    termTime: this.detail.duration || this.detail.termTime,
                    borrowType: this.detail.repaymentType || this.detail.borrowType,
                    amount: this.inputAmount ? this.inputAmount : 0
                }).then(res => {
                    if(res.code==200){
                        this.revenue = (res.model.expectedRevenue -  this.inputAmount).toFixed(2);
                    }
                })
            },
            setFocus(){
                console.log(this.$refs.investGroup);
                this.$refs.investGroup.$el.style.position="absolute";
                 this.$refs.investGroup.$el.style.position="fixed";
            },
            setBlur(){
                this.$refs.investGroup.$el.style.position="fixed";
            },
            changePopover(){
                this.popover = !this.popover;
                // setTimeout(this.closePopver(),3000);
            },
            closePopver(){
                this.popover = false;
            }
        },
        watch: {
            detail(detail) {
                this.inputAmount = (detail.productId == 'XSB0002' ? detail.maxInvestAmount : detail.minInvestAmount);
            }
        }
    }
</script>
<style scoped>
    .investGroup {
        position: fixed;
        max-width: 750px;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        background: #fff;
        box-shadow: 0 0 0 10px #f5f5f5;
    }
    .revenue-group {
        padding: 0 12px;
        line-height: 26px;
        font-size: 14px;
        box-sizing: border-box;
    }
    .investGroup .invest-flex {
        padding: 5px 16px;
    }
    .investGroup .invest-btn {
        background: #FD655D;
        color: #fff;
        font-size: 20px;
        line-height: 46px;
        border-radius: 0;
    }
      .investGroup .icon{
          display: inline-block;
          width:14px;
          height: 14px;
      }
      .investGroup .my-popover{
          display: inline-block;
      }
      .investGroup .vux-popover{
          position: fixed;
          left:50px;
          padding: 3px;
      }
      .popover-content{
          display: inline-block;
          position: absolute;
            background-color: #FFF2CE;
            color: #FF665E;
            border-radius: 6px;
            z-index: 500;
            width: 200px;
            left: 20px;
            padding: 10px;
            bottom: 30px;
      }
      .popover-content::before{
                content:"";
                position: absolute;
              border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                border-top: 5px solid #FFF2CE;
                left: 32%;
                -webkit-transform: translateX(-50%);
                transform: translateX(-50%);
                bottom: -5px;
      }
</style>
