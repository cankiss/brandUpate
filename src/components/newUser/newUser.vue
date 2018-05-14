<template>
	<div class="container has-header welfare">
		<mheader :text="detail.productName">
		</mheader>

		<!-- banner start -->
		<div class="bannerWrap">
			<img src="~assets/welfare/banner.jpg">
		</div>
		<!-- banner end -->

		<!-- content start -->
		<div class="contentWrap">
			<!-- 任务一 start -->
			<div class="task1">
				<div class="taskTit"><img src="~assets/welfare/task1_tit.png"></div>
				<div class="taskCon">
					<p>完成新手注册，即可获得8888元体验金，以及518元返现券</p>
					<img class="taskImg" src="~assets/welfare/task01_reward.png">
					<div class="btnWrap">
						<a href="javascript:;" v-if="!userId||userId=='nologin'" @click="toReceive"><img src="~assets/welfare/btn_qlq.png"></a>
						<a href="javascript:;" v-else-if="!oldUser&&userId"><img src="~assets/welfare/btn_have.png"></a>
						<a href="javascript:;" v-else="userId"><img src="~assets/welfare/btn_jxxs.png"></a>

					</div>
				</div>
			</div>
			<!-- 任务一 end -->

			<!-- 任务二 start -->
			<div class="task2">
				<div class="taskTit"><img src="~assets/welfare/task2_tit.png"></div>
				<div class="taskCon">
					<p>完成实名绑卡，即可获得出借新手专享产品，<br>享受高收益的机会，已有{{newUserCount}}人加入新手专享</p>
					<img class="taskImg" src="~assets/welfare/task2_img.png">
					<div class="btnWrap">

						<a href="javascript:;" @click="invest">
							<img v-if="oldUser" src="~assets/welfare/btn_jxxs.png">
							<img v-else-if="!lended" src="~assets/welfare/btn_ljcj.png">
							<img v-else src="~assets/welfare/btn_bought.png"></a>
					</div>
				</div>
			</div>
			<!-- 任务二 end -->

			<!-- 任务三 start -->
			<div class="task3">
				<div class="taskTit"><img src="~assets/welfare/task3_tit.png"></div>
				<div class="taskCon">
					<img src="~assets/welfare/task3_img.png">
					<!-- <p class="taskConpOne">好友注册一年内的每笔投资，您都可获得<span>1.5%的返现奖励</span>，不封顶</p>
					<p class="taskConpTwo">您的好友再邀请好友完成注册并出借，您还可获得<span>0.5%的返现奖励</span>，不封顶</p> -->
				</div>
				<div class="btnWrap" style="margin-top:20px;">
					<!-- <a href="javascript:;"><img src="~assets/welfare/btn_qyq.png"></a> -->
					<a href="javascript:;" @click="urlJump"><img src="~assets/welfare/btn_qyq.png"></a>

				</div>
			</div>
			<!-- 任务三 end -->

			<!-- rule start -->
			<div class="ruleWrap">
				<dl>
					<dt>8888元体验金
						<p>8.8%年化收益，3天体验</p>
					</dt>
					<dd>
						规则：
						<ol>
							<li>新用户完成注册即可获得8888元体验金（仅限“体验标”项目），3天后预计收益6.43元；</li>
							<li>提取收益：成功出借亿宝贷任一项目（体验标除外），出借金额≥1000元，且项目满标起息后，可提取体验金收益到账户余额；</li>
							<li>用户登录后可在“我的—我的体验金”中查看体验金到账情况；</li>
							<li>体验金有效期：自发放之日起60天内使用有效。</li>
						</ol>
					</dd>
					<dt class="rule518">518返现券规则</dt>
					<dd>
						规则：
						<ol>
							<li>单笔出借满3000元，可使用30元返现券（限1个月项目，新手标除外）<br> 单笔出借满8000元，可使用60元返现券（仅限3个月项目）；
								<br> 单笔出借满20000元，可使用132元返现券（仅限6个月项目）；
								<br> 单笔出借满80000元，可使用296元返现券（仅限12个月项目）；
								<br>
							</li>
							<li>使用返现券出借并满标起息后，平台将以现金的形式发放至用户账户（可提现）；<br> 返现券有效期：自发放之日起30天内使用有效。
							</li>
						</ol>
					</dd>
				</dl>
			</div>
			<!-- rule end -->
		</div>
		<!-- content end -->

	</div>
</template>

<script>
	import mheader from '../common/m-header.vue'
	export default {
		components: {
			mheader
		},
		data() {
			return {
				detail: {
					productName: '新手福利三重奏'
				},
				//				api: 'http://llapi.dev2.001bank.com/llapi/v1/api/',
				userId: '',
				oldUser: false,
				lended: false,
				taskInfo: {

				},
				query: {

				},
				newUserCount: 0
			}
		},
		created() {
			this.init()
			if(this.userId && this.userId != 'nologin') {
				console.log(this.userId);
				this.isLend();
			}
		},
		methods: {
			urlJump(){
				let sbType = this.storage.get('sbType');
				if(sbType) {
					window.location.href="html/activity/inviteFriends/inviteFriends.html?a=1";
				}else{
					window.location.href="html/activity/inviteFriends/inviteFriends.html";
				}
			},
			getUserIdByURL() {
				let url = location.href.split('?')[1]; //获取url中"?"符后的字串
				let strs = url.split("&");
				for(let i = 0; i < strs.length; i++) {
					if(strs[i].substr(0, 6) == 'userId') {
						return encodeURI(strs[i].substr(7, strs[i].length));
					}

				}
				return null;
			},
			isLend() {
				// 投资状态
				this.$post('newbieTask/getNewbieTaskInfo', {
					userId: this.userId
				}).then(data => {
					if(data && data.code == 200) {
						this.taskInfo = data.model;
						if(this.taskInfo.isOldUser == 0) {
							if(this.taskInfo.mission2 == 1) {
								this.lended = true;
							}
						} else {
							this.oldUser = true;
						}
					}
				})
			},
			toReceive() {// 去注册
				if(this.userId) {
					return;
				};
				let sbType = this.storage.get('sbType');
        		sbType ? (this.appBridge.sendData(sbType, 'goRegister')) : (this.$router.push('/register/2'));
			},
			invest() {//跳转到新手标详情页
				if(!this.lended) {
					if(this.oldUser) {
						return;
					};
					let sbType = this.storage.get('sbType');
        			sbType ? (this.appBridge.sendData(sbType, 'goZTXSBDetail')) : (this.$router.push('/pro/ztDetail/zt/XSB0002'));
				};
			},
			init() {
				this.userId = this.storage.get("user_id");//获取用户ID
				this.$post('newbieTask/getInvestXsbCount').then(res => {//获取已有多少人加入新手标
					if(res.code == 200) {
						this.newUserCount = res.model;
					}
				})
			}
		}
	}
</script>

<style scoped>
	.bannerWrap img {
		width: 100%;
	}

	.contentWrap {
		padding-bottom: 50px;
		background: url(~assets/welfare/conbg.jpg) no-repeat;
		background-size: 100% 100%;
	}

	.task1 .taskTit {
		padding: 30px 0 20px 0;
	}

	.task3 .taskTit {
		margin-bottom: 30px;
	}

	.taskTit img {
		width: 100%;
	}

	.taskCon {
		font-size: 16px;
		color: #fff;
		position:relative;
	}
	
	.taskCon img{
		width:90%;
		margin:0 auto;
	}

	.taskCon p {
		padding: 0 32px 30px;
	}

	.task2 .taskCon p {
		padding: 22px 0 24px;
		text-align: center;
	}

	.taskImg {
		width: 100%;
	}

	.btnWrap {
		padding: 37px 0 23px;
		text-align: center;
	}

	.task3 .btnWrap {
		padding: 18px 0;
	}
	
	.task3 p{
		position:absolute;
		top:60%;
		color:#fff;
		width:35%;
		padding:0;
		font-size:12px;
	}
	
	.task3 p.taskConpOne{
		left:10px;
	}
	
	.task3 p.taskConpTwo{
		right:10px;
	}
	
	.task3 p span{
		color:#fff814;
	}

	.btnWrap img {
		display: inline-block;
		width: 53%;
	}

	.ruleWrap {
		padding: 16px 0 25px;
		background: url(~assets/welfare/rule_bg.png) no-repeat;
		background-size: 100% 100%;
		color: #fff;
	}

	.ruleWrap dl {
		width: 88%;
		margin: 0 auto;
	}

	.ruleWrap dt {
		text-align: center;
		font-size: 14px;
	}

	.ruleWrap dt.rule518 {
		margin-top: 14px;
	}

	.ruleWrap dt p {
		font-size: 12px;
	}

	.ruleWrap dd {
		padding-left: 15px;
		font-size: 12px;
	}

	.ruleWrap ol,
	.ruleWrap li {
		list-style: decimal;
	}
</style>
