<template>
    <div class="container has-header">
        <m-header :text='msg' :isBack="isBack" @leftBack="leftBack"></m-header>
        <div slot="overwrite-title">
            <tab :line-width="4" bar-active-color="#FF6E66" custom-bar-width="30px">
                <tab-item :selected="tabPath==1">
                    <router-link :to="{path:`/mine/myCoupon/unuse`}" class="font-333">
                        未使用
                    </router-link>
                </tab-item>
                <tab-item :selected="tabPath==2">
                    <router-link :to="{path:`/mine/myCoupon/used`}" class="font-333">
                        已使用
                    </router-link>
                </tab-item>
                <tab-item :selected="tabPath==3">
                    <router-link :to="{path:`/mine/myCoupon/overTime`}" class="font-333">
                        已过期
                    </router-link>
                </tab-item>
            </tab>
        </div>
        <router-view class="couponList" @changeTabPath="changeTabPath"></router-view>
    </div>
</template>
<script>
    import {
        Tab,
        TabItem
    } from 'vux'
    import MHeader from '~/common/m-header';
    export default {
        data() {
            return {
                msg: '我的优惠券',
                tabPath: 1,
                isBack:true
            }
        },
        components: {
            MHeader,
            Tab,
            TabItem,
        },
        methods: {
            changeTabPath(val) {
                // this.tabPath = val;
            },
            tabchange(){
                let path = this.$route.path;
                let target = path.split('/')[3];
                if(target == 'unuse'){
                     this.tabPath = 1;
                }else if(target == 'used'){
                     this.tabPath = 2;
                }else{
                     this.tabPath = 3;
                }
            },
            leftBack(){
                this.$router.push({path:'/mine'})
            }
        },
        watch:{
            '$route':'tabchange'
        },
        created(){
            this.tabchange();
        }
    }
</script>
<style lang="less" scoped>
    .couponList {
        padding: 8px 12px;
    }
</style>
