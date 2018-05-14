<template>
    <!--项目列表-->
    <div class="pro-sb">
        <div class="detail-tab pro-sb-detail-tab" slot="overwrite-title" id="itemSbTypeMenu">
            <tab :line-width="4" bar-active-color="#FF6E66" custom-bar-width="30px">
                <tab-item @on-item-click="tabTb(0)" class="item-type" selected>
                    A类标
                </tab-item>
                <tab-item @on-item-click="tabTb(1)" class="item-type">
                    B类标
                </tab-item>
                <tab-item @on-item-click="tabTb(2)" class="item-type">
                    C类标
                </tab-item>
                <tab-item @on-item-click="tabTb(3)" class="item-type">
                    D类标
                </tab-item>
                <tab-item @on-item-click="tabTb(4)" class="item-type">
                    E类标
                </tab-item>
            </tab>
        </div>
        <x-table :cell-bordered="false" style="background-color:#fff;">
            <thead>
                <tr class="font-000">
                    <th class="text-center" width="23%">项目</th>
                    <th class="text-center" width="18%">借款人</th>
                    <th class="text-center" width="22%">借款金额</th>
                    <th class="text-center" width="37%">借款期限/借款利率</th>
                </tr>
            </thead>
            <tbody v-for="(item,key) in data" :key="key" v-show="item.isShow">
                <tr v-for="(node,index) in item.value.list" :key="index">
                    <td>
                        <router-link :to="{path:`/pro/detail/sb/detail/${id}/${type}/${name}/${node.borrowNid}?a=${a}&par=1`}">
                            {{node.borrowName}}
                        </router-link>
                    </td>
                    <td>
                        <router-link :to="{path:`/pro/detail/sb/detail/${id}/${type}/${name}/${node.borrowNid}?a=${a}&par=1`}">
                            {{node.realName}}
                        </router-link>
                    </td>
                    <td>
                        <router-link :to="{path:`/pro/detail/sb/detail/${id}/${type}/${name}/${node.borrowNid}?a=${a}&par=1`}">
                            {{node.borrowAmount}}元
                        </router-link>
                    </td>
                    <td>
                        <router-link :to="{path:`/pro/detail/sb/detail/${id}/${type}/${name}/${node.borrowNid}?a=${a}&par=1`}">
                            {{node.termTime}}{{node.timeType|timeTypeFliter}}/
                            {{node.rate + node.extraRate}}%
                        </router-link>
                    </td>
                </tr>
            </tbody>
        </x-table>
    </div>
</template>

<script>
    import {
        Tab,
        TabItem,
        XTable
    } from "vux"
    import mheader from "~/common/m-header.vue";
    export default {
        components: {
            Tab,
            TabItem,
            XTable,
            mheader
        },
        data() {
            return {
                data: [],
                urlConfig: {
                    1: 'borrowZt/selectZhiTouDetail',
                    2: 'borrow/queryPoolDetaiBorrow'
                },
                page_num_arr: {
                    'A': 1,
                    'B': 1,
                    'C': 1,
                    'D': 1,
                    'E': 1
                },
                type_arr: {
                    'A': '01',
                    'B': '02',
                    'C': '03',
                    'D': '04',
                    'E': '05'
                },
                listFlag: false,
                a: 2,
                index: 0
            }
        },
        methods: {
            init() {
                this.id = this.$route.params.id;
                this.type = this.$route.params.type;
                this.name = this.$route.params.name;
                if (this.$route.query.a) {
                    this.a = this.$route.query.a
                }
                this.$emit('changeName', this.name);
                this.$post(this.urlConfig[this.type], {
                    productId: this.id,
                    page_num: this.page_num_arr['A'],
                    type: this.type_arr['A']
                }).then(res => {
                    if (res.code == 200) {
                        let model = res.model;
                        // model.mapA.list.length > 0 ?
                        this.data.push({
                            name: 'A',
                            value: model.mapA,
                            isShow: false,
                            page_num: 1,
                            map: 'mapA'
                        })
                        //  : {}
                        // model.mapB.list.length > 0 ? 
                        this.data.push({
                            name: 'B',
                            value: model.mapB,
                            isShow: false,
                            page_num: 1,
                            map: 'mapB'
                        })
                        // : {}
                        // model.mapC.list.length > 0 ?
                        this.data.push({
                            name: 'C',
                            value: model.mapC,
                            isShow: false,
                            page_num: 1,
                            map: 'mapC'
                        })
                        // : {}
                        // model.mapD.list.length > 0 ?
                        this.data.push({
                            name: 'D',
                            value: model.mapD,
                            isShow: false,
                            page_num: 1,
                            map: 'mapD'
                        })
                        //  : {}
                        // model.mapE.list.length > 0 ? 
                        this.data.push({
                            name: 'E',
                            value: model.mapE,
                            isShow: false,
                            page_num: 1,
                            map: 'mapE'
                        })
                        //  : {}
                        this.data[0].isShow = true;
                        this.$nextTick(() => {
                            let itemWidth = document.getElementsByClassName('item-type')[0].clientWidth;
                            document.getElementById('itemSbTypeMenu').getElementsByClassName('vux-tab-ink-bar')[0].style.width = itemWidth + 'px'
                        })
                    }
                }).then(() => this.listFlag = false)
            },
            tabTb(key) {
                console.log(key);
                this.index == key;
                for (let i = 0; i < this.data.length; i++) {
                    if (i == key) {
                        this.data[i].isShow = true
                    } else {
                        this.data[i].isShow = false
                    }
                }
            },
            changeName(name) {
                this.name = name
            },
            getNextList() {
                if (this.listFlag) return;
                this.listFlag = true;
                let tabPage = this.data.filter((x) => {
                    if (x.isShow) return x.name
                })[0]
                if (tabPage.page_num >= tabPage.value.totalPageNum) return;
                this.$post(this.urlConfig[this.type], {
                    productId: this.id,
                    page_num: ++tabPage.page_num,
                    type: this.type_arr[tabPage.name]
                }).then(res => {
                    if (res.code == 200) {
                        console.log(res.model[tabPage.map].list)
                        console.log(res.model[tabPage.map].list instanceof Array)
                        console.log(tabPage.value.list instanceof Array)
                        tabPage.value.list = tabPage.value.list.concat(res.model[tabPage.map].list);
                        console.log(tabPage.value.list)
                        tabPage.value.totalPageNum = res.model[tabPage.map].totalPageNum;
                        for (let i = 0; i < this.data.length; i++) {
                            if (this.data[i].name == tabPage.name) {
                                this.data[i] = tabPage;
                                break;
                            }
                        }
                    }
                }).then(() => this.listFlag = false)
            }
        },
        created() {
            this.init();
        },
        mounted() {
            this.$nextTick(() => {
                window.addEventListener('scroll', () => {
                    let app = document.getElementById('app');
                    let urlArr = this.$route.path.split('/');
                    if (urlArr[3] === 'prosb') {
                        // alert('scroll');
                        // alert("1:"+document.documentElement.scrollTop);
                        // alert("2:"+window.innerHeight);
                        // alert("3:"+app.clientHeight)
                        let top = document.documentElement.scrollTop || document.body.scrollTop
                        if (top + window.innerHeight >= app.clientHeight) {
                            // alert(0);
                            this.getNextList();
                        }
                    }
                })
            })
        },
        destroyed() { //离开页面时移除监听滚动事件，否则会报错
			window.removeEventListener('scroll',  this.getNextList)
		}
    }
</script>

<style scoped>
    .pro-sb .detail-tab {
        margin-bottom: 13px;
        position: fixed;
        left: 0;
        right: 0;
        top: 92px;
        max-width: 750px;
        margin: auto;
        z-index: 999;
    }
    .pro-sb {
        margin-top: 136px;
    }
    .vux-tab .vux-tab-item a {
        display: inline-block;
        width: 100%;
        height: 100%;
    }
    .pro-sb .vux-tab-item {
        color: #999;
    }
    .pro-sb .vux-tab .vux-tab-item.vux-tab-selected {
        color: #333;
    }
    .pro-sb table tr td a {
        display: block;
        font-size: 14px;
        color: #3F3F3F;
        line-height: 44px;
    }
</style>
