<template>
    <!--项目列表-->
    <div class="container has-header detail-desc">
        <mheader :text="name" :isBack="isBack" @leftBack="backToDetail">
        </mheader>
        <div class="detail-tab fixed-menu" slot="overwrite-title">
            <tab :line-width="4" bar-active-color="#FF6E66" custom-bar-width="30px">
                <tab-item :selected="tabPath==1">
                    <router-link :to="{path:`/pro/detail/introduce/${id}/${type}/${name}?a=${a}`}" class="font-333">
                        项目介绍
                    </router-link>
                </tab-item>
                <tab-item :selected="tabPath==2">
                    <router-link :to="{path:`/pro/detail/record/${id}/${type}/${name}?a=${a}`}" class="font-333">
                        加入记录
                    </router-link>
                </tab-item>
                <tab-item :selected="tabPath==3">
                    <router-link v-if="type==3" :to="{path:`/pro/detail/sb/detail/${id}/${type}/${name}/${id}?a=${a}`}" class="font-333">项目明细</router-link>
                    <router-link v-else :to="{path:`/pro/detail/detail/${id}/${type}/${name}?a=${a}`}" class="font-333">
                        项目明细
                    </router-link>

                </tab-item>
                <tab-item :selected="tabPath==4">
                    <router-link :to="{path:`/pro/detail/question/${id}/${type}/${name}?a=${a}`}" class="font-333">
                        常见问题
                    </router-link>
                </tab-item>
            </tab>
        </div>
        <router-view @changeName="changeName" class="detail-content fixed-content" :sbType="sbType">
        </router-view>
    </div>
</template>

<script>
    import {
        Tab,
        TabItem
    } from "vux"
    import mheader from "../../common/m-header.vue";
    export default {
        components: {
            Tab,
            TabItem,
            mheader
        },
        data() {
            return {
                tabPath: 1,
                detail: {
                    productName: '详情'
                },
                id: '',
                type: 1,
                name: '',
                isBack: true,
                urlArr: [],
                a: 2,
                sbType:3
            }
        },
        methods: {
            tablist() {
                this.urlArr = this.$route.path.split('/');
                let urlObj = {
                    'introduce': 1,
                    'record': 2,
                    'detail': 3,
                    'question': 4,
                    'sb': 3
                }
                this.tabPath = urlObj[this.urlArr[3]];
                this.setHeader();
            },
            init() {
                this.id = this.$route.params.id;
                this.type = this.$route.params.type;
                this.sbType = this.$route.query.sbType;
                console.log(this.type);
                this.tablist();
            },
            changeName(name) {
                this.name = name
            },
            backToDetail() {
                this.urlArr = this.$route.path.split('/');
                let par = this.$route.query.par;
                if (this.urlArr[3] === 'sb' && this.type !== 3) {
                    if (!par) {
                        this.$router.push({
                            path: `/pro/ztDetail/sb/${this.id}`
                        })
                        return;
                    }
                    this.$router.push({
                        path: `/pro/detail/prosb/${this.id}/${this.type}/${this.name}`
                    })
                } else if (this.urlArr[3] === 'prosb' && this.type !== 3) {
                    this.$router.push({
                        path: `/pro/detail/detail/${this.id}/${this.type}/${this.name}`
                    })
                } else {
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
                }
            },
            setHeader() {
                this.$nextTick(() => {
                    this.a = this.$route.query.a;
                    if (this.a && this.a == 1) {
                        if (document.getElementsByClassName('fixed-menu')[0]) {
                            document.getElementsByClassName('fixed-menu')[0].style.top = 0;
                        }
                        if (document.getElementsByClassName('fixed-content')[0]) {
                            document.getElementsByClassName('fixed-content')[0].style.paddingTop = '45px';
                        }
                        if (document.getElementsByClassName('detail-desc')[0]) {
                            document.getElementsByClassName('detail-desc')[0].style.marginTop = '0'
                        }
                        if (document.getElementsByClassName('pro-sb-detail-tab')[0]) {
                            document.getElementsByClassName('pro-sb-detail-tab')[0].style.top = '45px'
                        } //pro-sb
                        if (document.getElementsByClassName('pro-sb')[0]) {
                            document.getElementsByClassName('pro-sb ')[0].style.marginTop = '45px';
                        } //pro-sb
                    }
                })
            }
        },
        created() {
            this.init();
        },
        mounted() {
            // this.a = this.$route.query.a;
            // if (this.a && this.a == 1) {
            //     document.getElementsByClassName('fixed-menu')[0].style.top = 0;
            //     document.getElementsByClassName('fixed-content')[0].style.paddingTop = '45px';
            // }
            this.setHeader()
        },
        watch: {
            '$route': 'tablist'
        },
        metaInfo() {
          return {
            title:this.name
          }
        }
    }
</script>

<style>
    .detail-desc .m-header {
        z-index: 999;
    }
    .detail-tab {
        margin-bottom: 13px;
        position: fixed;
        left: 0;
        right: 0;
        top: 47px;
        max-width: 750px;
        margin: auto;
        z-index: 999;
    }
    .container.has-header.detail-desc {
        margin-top: 92px;
    }
    /* .detail-content{
                                        padding-top: 45px;
                                    } */
</style>
