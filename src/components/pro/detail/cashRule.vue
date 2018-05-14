<template>
    <div class="container has-header has-footer cash-rule">
        <mheader :text="title">
        </mheader>
        <div>
            <flexbox class="rule-tl">
                <flexbox-item class="font-000" :span="1/7"></flexbox-item>
                <flexbox-item class="font-000 text-center" :span="3/5">
                    <img src="~assets/pro/icon_star_left.png" alt="" class="icon-star">
                    <span class="font-999">数据每五分钟更新一次</span>
                    <img src="~assets/pro/icon_star_right.png" alt="" class="icon-star">
                </flexbox-item>
                <flexbox-item class="text-right">
                </flexbox-item>
            </flexbox>
            <div class="rule-content">
                <p> 1、当日累计出借金额排名前三，且满10000元的用户，可分别获得相应奖励：
                </p>
                <p> 第一名{{x}}元，第二名{{y}}元，第三名{{z}}元。
                </p>
                <p> 2、当日累计出借金额若相同，以出借时间为准，取第一笔出借最早的用户。
                </p>
                <p> 3、本活动可与亿宝贷平台的其他活动同时参与（不包括亿宝贷与第三方合作推出的展示在第三方平台的其他活动）。
                </p>
                <p> 4、当日（00:00-23:59）累计出借金额排名前三的用户才可得奖励，实时数据不代表最终奖励名单，具体以当日结束后亿宝贷统计数据为准（数据每五分钟更新一次）。
                </p>
                <p> 5、活动奖励将在每个自然月结束后的10个工作日（不包含节假日）内完成发放，直接发放到用户的亿宝贷个人账户内，可提现。
                </p>
                <p> 6、活动过程中，如发现违规行为（使用作弊程序等），亿宝贷将取消该用户及其账号的奖励资格。
                </p>
            </div>
        </div>
    </div>
</template>
<script>
    import {
        Flexbox,
        FlexboxItem
    } from "vux"
    import mheader from "../../common/m-header.vue";
    export default {
        components: {
            mheader,
            Flexbox,
            FlexboxItem
        },
        data() {
            return {
                title: '奖励规则',
                x: 'X',
                y: 'Y',
                z: 'Z'
            }
        },
        created() {
            let tableInfoObj = {
                'SZY0001': {
                    x: 150,
                    y: 100,
                    z: 50
                },
                'YYY0002': {
                    x: 200,
                    y: 150,
                    z: 100
                },
                'JJF0002': {
                    x: 300,
                    y: 200,
                    z: 150
                },
                'SJY0002': {
                    x: 400,
                    y: 300,
                    z: 200
                },
                'NNZ0002': {
                    x: 600,
                    y: 400,
                    z: 300
                }
            }
            let pid = this.$route.params.id;
            let _item = tableInfoObj[pid];
            this.x = _item.x;
            this.y = _item.y;
            this.z = _item.z;
        }
    }
</script>
<style scoped>
    .cash-rule .icon-star {
        display: inline-block;
        width: 25px;
        height: 14px;
    }
    .rule-tl {
        padding: 20px 0;
        margin-top: 20px;
          background: #fff;
    }
    .rule-content {
        padding: 0 27px;
        line-height: 1.5;
        background: #fff;
        padding-bottom: 50px;
    }
</style>
