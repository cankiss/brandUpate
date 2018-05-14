<template>
	<div class="container has-header lendSuccess">
		<mheader :text="detail.productName">
			<span slot="rightHtml" @click="test" style="color:#43A0FF">完成</span>
		</mheader>

		<div class="msgWrap">
			<div class="msgCon">
				<icon type="success" is-msg></icon>
				<p>出借成功</p>
			</div>
			<flexbox class="reminderWrap">
				<flexbox-item :span="1/5">
					<flow orientation="vertical" style="height:175px;">
						<flow-state :title="lendS"></flow-state>
						<flow-line></flow-line>

						<flow-state>
							<p class="msgTxt" slot="title">
								今天开始起息<br><span style="color:#999;font-size:12px;">{{beginDate}}</span>
							</p>
						</flow-state>
						<flow-line></flow-line>

						<flow-state>
							<p slot="title">
								3天后可将收益提现<br><span style="color:#999;font-size:12px;">{{endDate}}</span>
							</p>
						</flow-state>
					</flow>
				</flexbox-item>
				<flexbox-item></flexbox-item>
			</flexbox>
		</div>

		<!-- reminder start -->
		<flexbox class="reminderWrap" v-if="!shiming">
			<flexbox-item :span="3/4">
				<div>温馨提示：实名绑卡后可将收益提现哦</div>
			</flexbox-item>
			<flexbox-item :span="1/4">
				<router-link class="realnameLink" to="/mine/setup/userAuth">去实名</router-link>
			</flexbox-item>
		</flexbox>
		<!-- reminder end -->

	</div>
</template>

<script>
	import { Icon, Flexbox, FlexboxItem } from 'vux'
	import { Flow, FlowState, FlowLine } from 'vux'
	import mheader from '../common/m-header.vue'
	export default {
		components: {
			Icon,
			Flow,
			FlowState,
			FlowLine,
			Flexbox,
			FlexboxItem,
			mheader
		},
		data() {
			return {
				detail: {
					productName: '出借成功'
				},
				lendS: '成功出借8888元体验金',
				Shipped: '<p class="msgTxt">开始起息<br><span style="color:#999;font-size:12px;">2017-10-27</span></p>',
				Done: '<p class="msgTxt">3天后可将收益提现<br><span style="color:#999;font-size:12px;">2017-10-30</span></p>',
				beginDate: '',
				endDate: '',
				userId: '',
				shiming:false,
				headerRight:'完成'
			}
		},
		methods:{
			test(){
				history.back();
			}
		},
		created() {
			this.userId = this.storage.get("user_id");
			this.$post(`newbieTask/getExperienceRecordInfo`, {
				userId: this.userId
			}).then(data => {
				if(data && data.code == '200') {
					this.beginDate = data.model.experienceStart;
					this.endDate = data.model.experienceEnd;
				}
			})
			this.$post(`user/selectUserStatus`, {
				id: this.userId
			}).then(data => {
				if(data && data.code == '200') {
					this.shiming = data.model.status >= 2
				} else {
//					this.$vux.alert('网络异常！')
				}
			})
		}

	}
</script>

<style>
	.msgWrap {
		margin-bottom: 10px;
		background: #fff;
	}
	
	.msgCon {
		padding: 22px 0 0;
		text-align: center;
		font-size: 16px;
		color: #43A0FF;
	}
	
	.msgCon p {
		margin-top: 5px;
	}
	
	.reminderWrap {
		padding: 10px;
		background: #fff;
	}
	
	.reminderWrap div {
		font-size: 14px;
		color: #333;
	}
	
	.realnameLink {
		display: inline-block;
		padding: 1px 10px;
		border: 1px solid #FF665E;
		border-radius: 4px;
		font-size: 12px;
		color: #FF665E;
	}
	/* override */
	
	.lendSuccess .weui-icon-success {
		color: #43A0FF;
	}
	
	.lendSuccess .weui-icon_msg {
		font-size: 50px;
	}
	
	.lendSuccess .weui-wepay-flow,
	.lendSuccess .weui-wepay-flow-auto {
		padding: 20px;
	}
	
	.lendSuccess .weui-wepay-flow__li_done .weui-wepay-flow__state {
		background-color: #fff;
		border: 2px solid #43A0FF;
	}
	
	.lendSuccess .weui-wepay-flow__title-right .msgTxt {
		line-height: 18px;
		padding-top: 20px;
		font-size: 14px;
		color: #666;
	}
	
	.lendSuccess .weui-wepay-flow__title-right .msgTxt span {
		font-size: 12px;
		color: #999;
	}
	
	.lendSuccess .weui-wepay-flow__li {
		width: 10px;
		height: 10px;
	}
	
	.lendSuccess .weui-wepay-flow__li .weui-wepay-flow__state {
		width: 10px;
		height: 10px;
		background-color: transparent;
		border: 2px solid #43A0FF;
	}
	
	.lendSuccess .weui-wepay-flow_vertical .weui-wepay-flow__line {
		width: 2px;
	}
	
	.lendSuccess .weui-wepay-flow__line {
		background-color: #43A0FF;
	}
</style>