<template>
    <div class="itemDteail">
        <dl>
            <dt>
                                                            项目明细
                                </dt>
            <dd class="dd">
                <div style="width:75%;margin:0 auto;">
                    <p class="text-center">收益率</p>
                    <img src="~assets/common/risk_level.png" alt="">
                    <p class="text-center">
                        <span class="fl">低</span>
                        <span>风险评级</span>
                        <span class="fr">高</span>
                    </p>
                </div>
                <div id="proDetailEcharts" ref="proDetailEcharts">
                </div>
                <p class="tips">
                    {{totalCount}}个标 <br>
                    <router-link :to="{path:`/pro/detail/prosb/${this.id}/${this.type}/${this.name}?a=${a}`}">
                        详情>>
                    </router-link>
                </p>
                <ul>
                    <li v-for="(item,key) in list" :key="key" class="text-left font-666">
                        <span class="sb_span" :style="{background:`${item.color}`}"></span>{{item.name}} 占{{item.per}}%，共计{{item.value}}元
                    </li>
                </ul>
                <div class="infos font-size-12">
                    <p>
                        <span class="font-666">累计：</span>
                        <span class="font-999">{{totalCount}}个标</span>
                    </p>
                    <p>
                        <span class="font-666">散标组成：</span> <span class="font-999"> 亿宝贷根据风险定价原则，将散标按从低到高分为A-E五个风险评级。理论上风险越高，则收益越高。</span>
                    </p>
                </div>
            </dd>
        </dl>
    </div>
</template>
<script>
    import echarts from "echarts"
    // import {
    // } from "vux"
    export default {
        // components: {
        // },
        data() {
            return {
                id: '',
                type: 1,
                name: '',
                urlConfig: {
                    1: 'borrowZt/queryCountAmoutZhiTou',
                    2: 'borrow/queryCountAmoutPoolBorrow',
                    3: ''
                },
                data: {},
                list: [],
                color: ['#43A0FF', '#77CC31', '#FBCA30', ' #FF665E', '#6766FF'],
                totalCount: 0,
                a:2
            }
        },
        methods: {
            init() {
                this.id = this.$route.params.id;
                this.type = this.$route.params.type;
                this.name = this.$route.params.name;
                if(this.$route.query.a){
                    this.a = this.$route.query.a;
                }
                this.$emit('changeName', this.name);
                this.$post(this.urlConfig[this.type], {
                    'productId': this.id
                }).then(res => {
                    if (res.code == 200) {
                        let datamodel = res.model;
                        let total = datamodel.totalAmout ?  datamodel.totalAmout:1
                        let percentumA = parseFloat(datamodel.A_Amout / total * 100).toFixed(2);
                        let percentumB = parseFloat(datamodel.B_Amout / total * 100).toFixed(2);
                        let percentumC = parseFloat(datamodel.C_Amout / total * 100).toFixed(2);
                        let percentumD = parseFloat(datamodel.D_Amout / total * 100).toFixed(2);
                        let percentumE = parseFloat(datamodel.E_Amout / total * 100).toFixed(2);
                        this.list = [];
                        this.list.push({
                            color: this.color[0],
                            per: percentumA,
                            value: datamodel.A_Amout,
                            name: 'A类标'
                        })
                        this.list.push({
                            color: this.color[1],
                            per: percentumB,
                            value: datamodel.B_Amout,
                            name: 'B类标'
                        })
                        this.list.push({
                            color: this.color[2],
                            per: percentumC,
                            value: datamodel.C_Amout,
                            name: 'C类标'
                        })
                        this.list.push({
                            color: this.color[3],
                            per: percentumD,
                            value: datamodel.D_Amout,
                            name: 'D类标'
                        })
                        this.list.push({
                            color: this.color[4],
                            per: percentumE,
                            value: datamodel.E_Amout,
                            name: 'E类标'
                        })
                        this.totalCount = datamodel.total;
                        this.$nextTick(() => {
                            let eleEcharts = echarts.init(document.getElementById('proDetailEcharts'));
                            eleEcharts.title = '环形图';
                            let option = {
                                tooltip: {
                                    trigger: 'none',
                                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                                },
                                legend: {
                                    show: false,
                                    orient: 'bottom',
                                    x: 'left',
                                    data: ['A类标', 'B类标', 'C类标', 'D类标', 'E类标']
                                },
                                series: [{
                                    name: '散标组成',
                                    type: 'pie',
                                    radius: ['50%', '70%'],
                                    avoidLabelOverlap: false,
                                    label: {
                                        normal: {
                                            show: false,
                                            position: 'center'
                                        },
                                        emphasis: {
                                            show: false,
                                            textStyle: {
                                                fontSize: '30',
                                                fontWeight: 'bold'
                                            }
                                        }
                                    },
                                    labelLine: {
                                        normal: {
                                            show: false
                                        },
                                        emphasis: {
                                      }
                                    },
                                    color: this.color,
                                    data: this.list
                                }]
                            };
                            eleEcharts.setOption(option);
                        })
                    }``
                })
            }
        },
        created() {
            this.init()
        },
        mounted() {},
    }
</script>
<style scoped>
    .itemDteail dl {
        background: #fff;
    }
    .itemDteail #proDetailEcharts {
        width: 300px;
        height: 300px;
        margin: 0 auto;
        box-sizing: border-box;
    }
     .itemDteail dl{
         padding: 0 16px;
     }
    .itemDteail dl dt {
        font-size: 14px;
        color: #000000;
        line-height: 44px;
    }
    .itemDteail dd{
        position: relative;
    }
    .itemDteail dd .tips{
        position: absolute;
        left: 0;
        right:0;
        top:190px;
        text-align: center;
        line-height: 20px;
        margin: auto;
        font-size:12px;
        background: transparent;
    }
    .itemDteail dd .tips a{
        color: #0BC0FF;
    }
    .itemDteail .sb_span{
        display: inline-block;
        width: 16px;
        height: 16px;
        border-radius: 2px;
        position :absolute;
        left:0;
        top:0;
        bottom: 0;
        margin: auto;
    }
    .itemDteail ul li{
        width: 60%;
        margin: 0 auto;
        line-height: 2;
        position: relative;
        padding-left:20px;
        min-width: 225px;
    }
    .itemDteail .infos p{
        line-height: 1.5;
    }
    .itemDteail .fl{
        float: left;
    }
    .itemDteail .fr{
        float: right;
    }
</style>
