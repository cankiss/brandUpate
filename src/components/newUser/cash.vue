<template>
	<div @click="hideAbTip()">
		<div v-if="status===5||status===1" class="ex-box">
			<div :class="['ex-big', status===1 ? 'red-text' : 'font-999']">8888<span>元</span>
				<span v-if="status===5" class="ex-disab">已失效</span>
			</div>
			<div>我的体验金</div>
			<div class="ex-tips">
				<span>◆</span>
				<ul>
					<li>体验金是亿宝贷平台的虚拟现金，</li>
					<li>使用体验金出借指定的体验标可获得现金收益。</li>
					<li>体验金有效期至 {{expiryDate}}</li>
				</ul>
			</div>
		</div>

		<div v-if="status!==1&&status!==5" class="ex-c-box">
			<div class="c-tb">
				<div class="tbc font-666">我的体验金</div>
				<div class="tbc big font-ccc">8888<span>元</span></div>
				<div class="tbc c-status">已使用</div>
			</div>
			<div class="c-tb">
				<div class="tbc font-666">我的收益</div>
				<div class="tbc big red-text">6.43<span>元</span></div>

				<div v-if="status===4" class="tbc c-status">
					<div class="">
						已提取
						<button class="c-qst-icon" @click.stop="showAbTip()">
              <div class="c-ab-trg" v-if="abTipShow"></div>
              <div class="c-ab-tip" v-if="abTipShow">
                体验金收益已提取到您的账户余额，可去“我的账户”体现，查看收益发放记录可去“我的资金流水”中查看。
              </div>
            </button>
					</div>
				</div>

				<div v-if="status<=3" class="tbc">
					<x-button class="c-tq-btn" mini plain @click.native="getCash()" v-if="status==3">去提取</x-button>
					<span style="color: #333;font-size: 12px;" v-if="status==2">未到账，出借后{{experienceTerm}}天到账</span>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
	import XButton from "../../../node_modules/vux/src/components/x-button/index.vue";

	export default {
		components: {
			XButton
		},
		name: 'cash',
		props: {
			available: {
				type: Boolean,
				default: true
			},
			rented: {
				type: Boolean,
				default: false
			},
			cashStatus: {
				type: Boolean,
				default: false
			},
			userId: {
				type: String,
				default: '',
				required: true
			},
			status:{
				type: Number,
				default: 1			
			},experienceTerm:{
				type:Number,
				default:3
			},
			expiryDate:{
				type:String,
				default:''
			}
		},
		data() {
			return {
				abTipShow: false,
				shiming: false,
				data:{
					
				}
			}
		},
		methods: {
			showAbTip() {
				this.abTipShow = true
			},
			hideAbTip() {
				this.abTipShow = false
			},
			statusCheck(status) {
				console.log(2);
				this.status = status;
			},
			getCash() { //去提取
				let router =  this.$router;
				if(!this.shiming) {
					this.$vux.alert.show({
						content: '您尚未完成实名绑卡，完成后即可将收益提现至账户余额',
						buttonText: '去实名',
						onHide() {
							//去实名
							router.push({
								path: "/mine/setup/userAuth"
							})
						}
					})
				} else {
					this.$post('newbieTask/drawExperienceEarnings', {
						userId: this.userId
					}).then(data => {
						if(data && data.code == '200') {
							this.$vux.alert.show({
								content: '提取成功！'
							});
							this.$emit("changeStatus",4)
						} else {
							this.$vux.alert.show({
								content: data.msg
							})
						}
					})
				}
			}
		},
		created() {
			console.log(this.rented)
			this.$post(`user/selectUserStatus`, {
				id: this.userId
			}).then(data => {
				if(data && data.code == '200') {
					this.shiming = data.model.status >= 2
				} else {
					this.$vux.alert('网络异常！')
				}
			})
//			this.$post(`newbieTask/getExperienceRecordInfo`, {
//				userId: this.userId
//			}).then(data => {
//				if(data.code == '200') {
//					this.data =data.model;
//					this.status = data.model.status;
//					this.status = 5;
//					if(this.status==4){
//						this.cashStatus = true
//					}
//				}
//			})
		}
	}
</script>

<style lang="less" scoped>
	.ex-box {
		text-align: center;
		background-color: #ffffff;
		padding: 30px 0 5px;
		.ex-big {
			font-size: 36px;
			position: relative;
			span {
				font-size: 14px;
			}
			.ex-disab {
				padding-left: 20px;
				color: #333333;
				position: absolute;
				top: 26px;
				right: 75px;
			}
		}
		.ex-tips {
			text-align: left;
			padding: 0 10px;
			color: #999999;
			margin-top: 20px;
			span {
				float: left;
				display: block;
				width: 15px;
			}
			ul {
				list-style: none;
				font-size: 10px;
				float: left;
			}
			&:after {
				display: block;
				clear: both;
				content: "";
			}
		}
	}
	
	.ex-c-box {
		padding: 25px 0 20px;
		background-color: #ffffff;
		.c-tb {
			display: table;
			width: 100%;
			.tbc {
				&:first-child {
					padding-left: 30px;
				}
				&:last-child {
					width: 38%;
				}
				display: table-cell;
				vertical-align: middle;
				&.c-status {
					font-size: 12px;
					color: #4b4b4b;
					padding-top: 12px;
				}
				&.big {
					font-size: 30px;
					span {
						font-size: 12px;
						color: #cccccc;
					}
				}
				&.font-ccc {
					color: #cccccc;
				}
				.c-tq-btn {
					width: 60px;
					height: 26px;
					padding: 0;
					color: #ff665e;
					border: 1px solid #FF665E;
					font-size: 12px;
				}
				.c-qst-icon {
					width: 15px;
					height: 15px;
					background: url("../../assets/new-user/qst.png") center no-repeat, #ffffff;
					background-size: 100%;
					display: inline-block;
					vertical-align: middle;
					margin-left: 5px;
					border: none;
					position: relative;
					.c-ab-tip {
						width: 204px;
						height: 60px;
						background-color: #fdf2cc;
						color: #999999;
						font-size: 12px;
						position: absolute;
						left: -132px;
						top: 22px;
						padding: 5px;
						border-radius: 4px;
						z-index: 12;
					}
					.c-ab-trg {
						width: 14px;
						height: 14px;
						transform: rotate(45deg);
						background-color: #fdf2cc;
						position: absolute;
						top: 18px;
						z-index: 11;
					}
				}
			}
		}
	}
</style>