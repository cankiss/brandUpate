<template>
    <div class="record">
        <flexbox class="tips red-text">
            <flexbox-item class="text-left">加入人数 {{total||0}}人</flexbox-item>
            <flexbox-item class="text-right">已出借金额{{totalAmount|bigMoneyCheck}}</flexbox-item>
        </flexbox>
        <flexbox class="hot-rank" orient="vertical" v-if="rankList&&rankList.length>0">
            <flexbox-item>
                <flexbox>
                    <flexbox-item class="font-000" :span="1/7">排行榜</flexbox-item>
                    <flexbox-item class="font-000 text-center" :span="3/5">
                        <img src="~assets/pro/icon_star_left.png" alt="" class="icon-star">
                        <span class="font-999 font-size-12">数据每五分钟更新一次</span>
                        <img src="~assets/pro/icon_star_right.png" alt="" class="icon-star">
                    </flexbox-item>
                    <flexbox-item class="text-right">
                        <a href="javascript:void(0)" @click="cashRule">
                            <img src="~assets/pro/gift_Details@2x.png" class="icon-cash-back" alt="">
                        </a>
                    </flexbox-item>
                </flexbox>
            </flexbox-item>
            <flexbox-item v-for="(rank,index) in rankList" :key="index">
                <flexbox>
                    <flexbox-item :span="1/10">
                        <img class="icon-pai" src="~assets/pro/gold.png" alt="" v-if="index==0">
                        <img class="icon-pai" src="~assets/pro/sliver.png" alt="" v-if="index==1">
                        <img class="icon-pai" src="~assets/pro/copper.png" alt="" v-if="index==2">
                    </flexbox-item>
                    <flexbox-item :span="7/10">
                        <p>{{rank.mobile}}</p>
                        <p>当日累计出借金额{{rank.inviteInvestAmount|numToMoneyField}}元</p>
                    </flexbox-item>
                    <flexbox-item>{{rank.returnCash}}元</flexbox-item>
                </flexbox>
            </flexbox-item>
        </flexbox>
        <!-- <scroller :on-infinite="infinite" style="padding-top:135px;" ref="myscroller"> -->
        <x-table :cell-bordered="false" style="background-color:#fff;">
            <thead>
                <tr class="font-000">
                    <th class="text-left font-000">参与用户</th>
                    <th class="text-right font-000">出借金额</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,key) in record" :key="key">
                    <td class="text-left">{{item.realName || item.investName | desens}} <br/> {{item.createTime || item.inverstTime || item.operateTime | momentTime}}
                    </td>
                    <td class="text-right">
                        {{moneyParse(item.amout || item.tendAllAcount)}}元
                    </td>
                </tr>
            </tbody>
        </x-table>
        <divider v-show="dividerFlag">没有更多了</divider>
        <!-- </scroller> -->
    </div>
</template>
<script>
    import {
        Tab,
        TabItem,
        Flexbox,
        FlexboxItem,
        XTable,
        LoadMore,
        dateFormat,
        numberComma,
        Divider
    } from "vux"
    export default {
        components: {
            Tab,
            TabItem,
            Flexbox,
            FlexboxItem,
            XTable,
            LoadMore,
            dateFormat,
            Divider
        },
        data() {
            return {
                record: [],
                id: '',
                type: 1,
                name: '',
                urlConfig: {
                    1: 'borrowZt/selectZhiTouAddRecord',
                    2: 'borrow/selectPoolRecordByProductId',
                    3: 'borrow/selectListByBorrowNid'
                },
                loadflag: false,
                page: 1,
                pageTotal: 1,
                dividerFlag: false,
                rankList: [],
                poolObj: {
                    // 'SZY0001': 'DoubleWeek',
                    'YYY0002': 'DoubleMonth',
                    'JJF0002': 'SingleSeason',
                    'SJY0002': 'DoubleSeason',
                    'NNZ0002': 'SingleYear'
                },
                total: 0,
                totalAmount: 0
            }
        },
        methods: {
            init() {
                this.id = this.$route.params.id;
                this.type = this.$route.params.type;
                this.name = this.$route.params.name;
                this.$emit('changeName', this.name);
                this.getList();
                if (this.poolObj[this.id]) {
                    //this.getRank();
                }
            },
            getDate(time) {
                return dateFormat(time, 'YYYY-MM-DD HH:mm:ss')
            },
            moneyParse(amout) {
                return numberComma(amout - 0)
            },
            getList() {
                console.log(this.loadflag);
                if (!this.loadflag) {
                    this.loadflag = true;
                } else {
                    return;
                }
                let postParamData = {};
                this.type == 3 ? (postParamData['borrowNid'] = this.id) : (postParamData['productId'] = this.id);
                postParamData['page_num'] = this.page;
                             console.log(11111);
                this.$post(this.urlConfig[this.type], postParamData).then(res => {
                    if (res.code == 200) {
                        this.record = this.record.concat(res.model.list);
                        this.pageTotal = res.model.totalPageNum;
                        this.total = res.model.total;
                        this.totalAmount = res.model.totalAmount;
                        // console.log();
                        //  console.log(this.page);
                        // console.log(this.pageTotal);
                        this.page++;
                        // done();
                    }
                }).then(() => this.loadflag = false)
            },
            getRank() {
                let _URL = ACTIVITYURL + 'ActivitQualifying/investZt' + this.poolObj[this.id] + 'RankingByDay';
                if (this.id == "SZY0001") {
                    _URL = ACTIVITYURL + 'ActivitQualifying/invest' + this.poolObj[this.id] + 'RankingByDay';
                }
                this.$post(_URL).then(res => {
                    if (res.code == 200) {
                        this.rankList = res.model
                    }
                })
            },
            cashRule() {
                // let url = 'html/activity/cashBackRule/cashBackRule.html?productId=' + this.id;
                // window.location.href = url;
                this.$router.push({ path:`/pro/cashRule/${this.id}`})
            }
        },
        created() {
            this.init()
        },
        filters: {
            desens(value) { //姓名加密
                value = value + "";
                let first = value.charAt(0);
                for (let i = 1; i < value.length; i++) {
                    first += "*";
                };
                return first;
            }
        },
        mounted() {
            this.$nextTick(() => {
                window.addEventListener('scroll', () => {
                    // this.getList()
                    // $(document).scrollTop() + $(window).height() >= $(document).height()
                    let app = document.getElementById('app');
                    let urlArr = this.$route.path.split('/');
                    let top = document.documentElement.scrollTop || document.body.scrollTop;
                    if (urlArr[3] == 'record') {
                        console.log('1:'+this.page);
                        console.log('2:'+this.pageTotal);
                        if (top + window.innerHeight >= app.clientHeight && this.page <= this.pageTotal && !this.loadflag) {
                            this.getList();
                        }
                    }
                })
            })
        },
        destroyed() { //离开页面时移除监听滚动事件，否则会报错
			window.removeEventListener('scroll', this.getList)
		}
    }
</script>
<style>
    .record .tips {
        background: #FFF9EA;
        line-height: 32px;
        padding: 0 12px;
        box-sizing: border-box;
    }
    .record .vux-table td,
    .record .vux-table th.text-left,
    .record .vux-table td,
    .record .vux-table td.text-left {
        text-align: left;
        padding-left: 16px;
        box-sizing: border-box;
        line-height: 2;
    }
    .record .vux-table td,
    .record .vux-table th.text-right,
    .record .vux-table td,
    .record .vux-table td.text-right {
        text-align: right;
        padding-right: 16px;
        box-sizing: border-box;
         line-height: 2;
    }
    record ._v-content {
        padding-bottom: 40px;
    }
    record .no-data-text {
        display: none;
    }
    .record .hot-rank {
        box-sizing: border-box;
        padding-left: 15px;
        background: #fff;
    }
    .record .hot-rank .icon-star {
        display: inline-block;
        width: 25px;
        height: 14px;
    }
    .record .hot-rank .icon-cash-back {
        display: inline-block;
    }
    .record .hot-rank .icon-pai {
        display: inline-block;
        width: 26px;
        height: 29px;
    }
</style>
