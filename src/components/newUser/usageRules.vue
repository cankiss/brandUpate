<template>
	<div class="container has-header usageRules">
		<mheader :text="detail.productName">
        </mheader>
		
		<!-- ruleCon start -->
		<div class="ruleCon">
			<h3>体验金规则</h3>
			<dl>
				<dt>1.什么是体验金？</dt>
				<dd>体验金是亿宝贷平台的虚拟现金，仅限出借体验标时使用，不可提现，不可用于其他用途。</dd>
				<dt>2.怎样使用体验金？</dt>
				<dd>
					<p>获得体验金的用户，使用体验金出借指定的“体验标”可获得现金收益</p>
					<p>到期后体验金将收回，收益会发放至您的账户余额，收益可提现</p>
					<p>体验金8888元只能一次性出借“体验标”，不可拆分</p>
					<p>体验金有效期：自发放之日起60天内使用有效</p>
					<p>体验金收益计算公式：体验金金额*体验标年化收益率*出借期限（天）/365（天）</p>
				</dd>
				<dt>3.如何提现？</dt>
				<dd>收益到账后，可前去我的账户中提现，收益发放记录可前往“我的-资金流水”中查看</dd>
			</dl>
		</div>
		<!-- ruleCon end -->

		<!-- ruleUseProcess start -->
		<div class="ruleUseProcess">
			<h3>体验金使用流程</h3>
			

			<flexbox>
				<flexbox-item :span="1/9" align="flex-start">
					<img class="process1" src="~assets/new-user/1.png">
					<img class="sbullet" src="~assets/new-user/sbullet.png">
					<img class="process2" src="~assets/new-user/2.png">
					<img class="sbullet" src="~assets/new-user/sbullet.png">
					<img class="process3" src="~assets/new-user/3.png">
				</flexbox-item>
				<flexbox-item :span="8/9">
					<div class="processList">
						<dl>
							<dt>使用体验金出借</dt>
							<dd>使用体验金出借指定的体验标项目</dd>
							<dt>出借3天后收益到期</dt>
							<dd>到期后体验金收回，收益到账</dd>
							<dt>提取收益</dt>
							<dd>收益到账后，进行实名绑卡可直接提取收益到您的银行账户</dd>
						</dl>
					</div>
				</flexbox-item>
			</flexbox>
		</div>
		<!-- ruleUseProcess end -->

	</div>
</template>

<script>
	import { Flexbox, FlexboxItem } from 'vux'
	import mheader from '../common/m-header.vue'
	export default {
		components:{
			Flexbox,
    		FlexboxItem,
			mheader
		},
		data () {
			return {
				detail:{
					productName: '体验金使用规则'
				}
			}
		}
	}
</script>
<style scoped>
	.ruleCon{
		margin-bottom: 10px;
		background: #fff;
	}
	.ruleCon dt,.ruleCon dd{
		padding: 3px 5%;
	}
	.ruleCon h3{
		padding: 3px 5% 0;
		text-align: left;
		font-size: 16px;
	}
	.ruleCon dt{
		font-size: 15px;
		font-weight: 700;
	}
	.ruleCon dd{
		padding-bottom: 10px;
		font-size: 14px;
		color: #999;
		border-bottom: 1px solid #eee;
	}
	.ruleUseProcess{
		padding: 8px 5%;
		background: #fff;
	}
	.ruleUseProcess h3{
		margin-bottom: 10px;
		font-size: 16px;
		font-weight: 400;
		color: #666;
	}
	.vux-flexbox{
		align-items: flex-start;
		-webkit-align-items: flex-start;
	}
	.process1,.process2,.process3{
		width: 31px;
	}
	.sbullet{
		width: 8px;
		height: 24px;
		margin: 5px 13px;
	}
	.processList dt{
		font-size: 14px;
		color: #666;
	}
	.processList dd{
		margin-bottom: 18px;
		font-size: 12px;
		color: #999;
	}
</style>