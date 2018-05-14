<template>
	<!--项目介绍-->
	<div class="introduce">
		<flexbox>
			<flexbox-item :span="1/3">近七日历史年化收益率
			</flexbox-item>
			<flexbox-item>
				{{introduce.rate+introduce.extraRate}}%
			</flexbox-item>
		</flexbox>
		<flexbox>
			<flexbox-item :span="1/3" v-if="type==1">锁定期限</flexbox-item>
			<flexbox-item :span="1/3" v-else>出借期限</flexbox-item>
			<flexbox-item>
				{{introduce.time||introduce.duration || introduce.termTime}} {{introduce.durationType||introduce.timeType |timeTypeFliter}}
			</flexbox-item>
		</flexbox>
		<flexbox>
			<flexbox-item :span="1/3">还款方式</flexbox-item>
			<flexbox-item>
				{{introduce.repaymentTypeZ}}
			</flexbox-item>
		</flexbox>
		<flexbox>
			<flexbox-item :span="1/3">募集期限</flexbox-item>
			<flexbox-item>
				3天
			</flexbox-item>
		</flexbox>
		<flexbox>
			<flexbox-item :span="1/3">起息日期</flexbox-item>
			<flexbox-item v-if="type==3">
					<p v-if="introduce.status>=7">
						{{introduce.interestDay*1000|creatTime}}
					</p>
					<p v-else>
						尚未起息
					</p>
			</flexbox-item>
			<flexbox-item v-else-if="type==2">
				以所出借单个借款标的为准
			</flexbox-item>
			<flexbox-item v-else>
				成功加入智投后开始计息
			</flexbox-item>
		</flexbox>
		<flexbox>
			<flexbox-item :span="1/3">到期日期</flexbox-item>
			<flexbox-item v-if="type==2">
				以所出借单个借款标的为准
			</flexbox-item>
			<flexbox-item v-else-if="type==3">
				<p v-if="introduce.status>=7">{{introduce.expireDay*1000|creatTime}}</p>
				<p v-else>起息日+{{introduce.time||introduce.duration || introduce.termTime}} {{introduce.durationType||introduce.timeType |timeTypeFliter}}</p>
			</flexbox-item>
            <flexbox-item v-else>
               锁定期到期前三天申请，债转完成后退出
            </flexbox-item>
		</flexbox>
		<flexbox>
			<flexbox-item :span="1/3">加入条件</flexbox-item>
			<flexbox-item>
				{{introduce.minInvestAmount}}元起,且以{{introduce.investProgress||introduce.investDegrees||100}}元的整数倍递增
			</flexbox-item>
		</flexbox>
		<flexbox>
			<flexbox-item :span="1/3">费用
			</flexbox-item>
			<flexbox-item>
				针对出借人亿宝贷收取适当费用
			</flexbox-item>
		</flexbox>
		<flexbox>
			<flexbox-item :span="1/3">出借上限</flexbox-item>
			<flexbox-item v-if="id=='XSB0002'">
				{{introduce.maxInvestAmount}}元
			</flexbox-item>
			<flexbox-item v-else>
				不限
			</flexbox-item>
		</flexbox>
        <flexbox orient="vertical" v-if="type==1">
            <flexbox-item>收益方式</flexbox-item>
            <flexbox-item style="line-height:1.5">
                退出项目时一次性收回本金和利息。根据近七日历史年化收益率和实际持有期限按本息复投计算收益。
            </flexbox-item>
        </flexbox>
        <flexbox orient="vertical" v-if="type==1">
            <flexbox-item>退出方式</flexbox-item>
            <flexbox-item style="line-height:1.5">
                锁定期限到期前3天内，您可主动申请退出该项目，系统将在锁定期限到期后为您进行债转，债转成功后自动退出；若不进行退出操作，系统将默认您继续持有，持续享有收益，后续可每月申请退出。
            </flexbox-item>
        </flexbox>
        <flexbox v-else>
			<flexbox-item :span="1/3">退出方式</flexbox-item>
			<flexbox-item class="text-left">
				出借人获得偿付之日自动退出
			</flexbox-item>
		</flexbox>
		<flexbox>
			<flexbox-item :span="1/3">保障方式</flexbox-item>
			<flexbox-item class="text-left" style="position:relative;">
				多重保障 <a class="icon-right" href="html/2DetailPage/multipleSecurity1.html"><img style="width:14px;" src="~assets/mine/icon_forward@2x.png" alt=""></a>
			</flexbox-item>
		</flexbox>
        
	</div>
</template>

<script>
	import {
		Tab,
		TabItem,
		Flexbox,
		FlexboxItem
	} from "vux"
	export default {
		components: {
			Tab,
			TabItem,
			Flexbox,
			FlexboxItem
		},
		data() {
			return {
				introduce: {},
				id: '',
				type: 1,
				name: '',
				urlConfig: {
					1: 'borrowZt/selectZhiTou',
					2: 'borrow/selectByProductId',
					3: 'borrow/selectBorrowByBorrowNid'
				}
			}
		},
		methods: {
			init() {
				this.id = this.$route.params.id;
				this.type = this.$route.params.type;
				this.name = this.$route.params.name;
				this.$emit('changeName', this.name)
				let postParamData = {};
				this.type == 3 ? (postParamData['borrowNid'] = this.id) : (postParamData['productId'] = this.id);
				this.$post(this.urlConfig[this.type], postParamData).then(res => {
					if(res.code == 200) {
						if(this.type == "1") {
							this.introduce = res.model.financeProductZt
						} else {
							this.introduce = res.model;
						}
					}
				})
			}
		},
		created() {
			this.init()
		},
		filters: {
			repayment(value) {
				if(value == 1) {
					return "一次性还本付息";
				} else if(value == 2) {
					return "等额本息";
				} else if(value == 3) {
					return "等本等息";
				} else {
					return "按月付息到期还本";
				}
			}
		}
	}
</script>

<style scoped>
	.introduce {
		background: #fff;
	}
	
	.introduce .vux-flexbox-item {
		padding: 5px 10px;
		line-height: 2.5;
		color: #333;
        box-sizing: border-box;
        margin-top: 0 !important;
	}
	.introduce .vux-flexbox{
		border-bottom: 1px solid #F2F2F2;
	}
	.introduce .vux-flexbox .vux-flexbox-item:first-child {
		color: #666;
	}
	.introduce .icon-right{
		position: absolute;
		top:0;
		bottom: 0;
		right: 20px;
		margin: auto;
		height: 20px;
		width: 20px;
	}
</style>