<template>
	<div class="container has-header">
		<m-header :text='msg'></m-header>
		<div style="height:3px;"></div>
		<div class="first-secretary" v-if="status == 0">
			<img src="~assets/mine/assist_none@2x.png" alt="">
			<p class="font-999 font-size-16" style="text-align:center">您暂未设置过 投标小秘书</p>
			<div class="secretary-setup">
				<x-button type="warn" @click.native="$router.push({name:'autoInvest'})">立即设置</x-button>
			</div>
		</div>
		<div class="first-secretary" v-else>
			<div class="hove-set-secretary clearfix">
				<p><span>我的投标小秘书</span><i v-if="status == 1">（使用中）</i><i v-else>（已关闭）</i><br/>最近更新时间：{{information.updateTimeZ}}</p>
				<button v-if="status == 1" @click="closesecretary">关闭小秘书</button>
				<button v-else @click="isPay=true">开启上次设置</button>
			</div>
			<div class="v-flexbox">
				<div class="flex-demo" :class="{flexDemoDone:status == 2}">
					<h5>{{ information.amount }}元</h5>
					<p>每日自动投标<br/>最大金额</p>
				</div>
				<div class="flex-demo" :class="{flexDemoDone:status == 2}">
					<h5>{{ markname }}</h5>
					<p>每日自动<br/>投标项目</p>
				</div>
				<div class="flex-demo" :class="{flexDemoDone:status == 2}">
					<h5>{{ information.validityType | validity }}</h5>
					<p>设置自动投标<br/>有效期</p>
				</div>
			</div>
			<div class="secretary-setup">
				<x-button type="warn" @click.native="$router.push({name:'autoInvest'})">重新设置</x-button>
			</div>
		</div>
		<div class="what-secretary">
			<div class="what-secretary-wrap">
				<span><i></i>投标小秘书是什么</span>
				<router-link to="/mine/secretary/explain">
					<img src="~assets/mine/icon_question@2x.png" alt="">
				</router-link>
			</div>
			<div class="four-icon clearfix">
				<div v-for="(item,index) in items" :key="index">
					<img :src="item.imgUrl" alt="">
					<p class="font-666" v-html="item.title"></p>
				</div>
			</div>
		</div>
		<!--数字键盘-->
		<keyBoard :isPay="isPay" :payTitle="payTitle" class="investrestart" @pas-end='padEnd' @close='isPay = !isPay' ref="investrestart">
			<p name="explain" style="font-size: 14px;color: #000000;">开启后立即生效，立即开启。</p>
		</keyBoard>
		<!--弹窗-->
		<div v-transfer-dom class="closeSecretDialog">
			<x-dialog v-model="showScrollBox" hide-on-blur class="dialog-demo">
				<div style="padding:26px 0 20px;color:#666;font-size:16px;">
					<img src="~/assets/mine/icon_success_1@2x.png" alt="" class="icon_img">
					<p style="color: #43A0FF;">关闭成功！</p>
					<p>如需重新开启可单击右上角<br/>开启上次设置按钮或重新设置按钮</p>
				</div>
			</x-dialog>
		</div>
	</div>
</template>
<script>
	import MHeader from '~/common/m-header';
	import { XButton, XDialog, TransferDomDirective as TransferDom } from "vux";
	import keyBoard from '~/common/keyBoard';
	import md5 from '../../../config/md5.js';
	export default {
		directives: {
			TransferDom
		},
		data() {
			return {
				msg: '投标小秘书', //标题
				isPay: false, //是否显示虚拟键盘
				payTitle: "开启上次设置", //虚拟键盘标题
				showScrollBox: false, //是否显示弹窗
				status: "", //小秘书状态
				information:"",//小秘书信息
				markname:"",//标的名字
				items: [{
						imgUrl: require('@/assets/mine/icon_1@2x.png'),
						title: '不再为抢不到<br/>标的而烦恼'
					},
					{
						imgUrl: require('@/assets/mine/icon_2@2x.png'),
						title: '自动出借优质<br/>短期稳定标的'
					},
					{
						imgUrl: require('@/assets/mine/icon_3@2x.png'),
						title: '傻瓜式理财<br/>坐享收益'
					},
					{
						imgUrl: require('@/assets/mine/icon_4@2x.png'),
						title: '钱滚钱，让资金<br/>不再闲置'
					}
				]
			}
		},
		created() {
			this.getInvest()
		},
		methods: {
			getInvest() { //请求小秘书状态
				let id = this.storage.get("user_id");
				this.$post("autoInvest/selectStatus",{userId:id}).then(res=>{
					console.log(res);
					if(res.code == 200){
						if(res.model != null){
						    this.status = res.model.status;
						    this.information = res.model;
						    this.markname = res.model.productName;
						}else{
							this.status = 0;
						}
					}else{//未设置小秘书
						this.status = 0;
					};
				});
			},
			padEnd(val) { //密码输入完毕发送ajax请求
				let data = {
					userId:this.storage.get("user_id"),
					transactionPassword:md5(val)
				};
				this.$post("autoInvest/reset",data).then(res=>{
					console.log(res);
					if(res.code == 200){
						this.$refs.investrestart.$payStatus(true);
						this.status = 1;
					}else if(res.code == 204){//判断上次设置的标的已下架
						this.$vux.toast.show({
			              type:'text',
			              text: res.msg,
			              width:'80%'
			            });
			            this.$router.push("/mine/secretary/setup");
					}else{
						this.$vux.toast.show({
			              type:'text',
			              text: res.msg,
			              width:'80%'
			            });
			      		this.$refs.investrestart.$payStatus(false);
					};
				});
			},
			closesecretary() { //关闭小秘书
				this.$mine("autoInvest/close").then(res=>{
					console.log(res);
					if(res.code == 200){
						this.showScrollBox = true;
						this.status = 2;
					}else{
						this.$vux.toast.show({
			              type:'text',
			              text: res.msg,
			              width:'80%'
			            });
					};
				});
			}
		},
		filters:{
			validity(value){
				if(value == "1"){
					return "仅用一次";
				}else if(value == "2"){
					return "长期有效";
				};
			}
		},
		components: {
			MHeader,
			XButton,
			keyBoard,
			XDialog
		}
	}
</script>
<style lang="less" scoped>
	.first-secretary {
		padding-bottom: 20px;
		background: #fff;
		img {
			width: 223px;
			height: 136px;
			padding-top: 10px;
			margin: 0 auto;
		}
		.secretary-setup {
			width: 90%;
			margin: 10px auto;
		}
	}
	
	.hove-set-secretary {
		padding: 20px;
		p {
			float: left;
			font-size: 11px;
			color: #999999;
			span {
				font-size: 17px;
				color: #333333;
			}
		}
		button {
			float: right;
			padding: 0 10px;
			height: 26px;
			background: #fff;
			border: solid 1px #43A0FF;
			color: #43A0FF;
			font-size: 12px;
			border-radius: 30px;
			outline: none;
		}
	}
	
	.v-flexbox {
		display: flex;
		justify-content: center;
		margin-bottom: 20px;
		.flex-demo {
			width: 100px;
			padding: 10px 0;
			border: 1px solid #FF665E;
			border-radius: 4px;
			margin-left: 6px;
			text-align: center;
			color: #FF665E;
			font-size: 12px;
			h5 {
				font-size: 18px;
				height:28px;
				font-weight: normal;
			}
		}
		.flexDemoDone {
			border: solid 1px #ccc;
			color: #666;
		}
	}
	
	.what-secretary {
		margin-top: 5px;
		padding: 10px 5px;
		background: #fff;
		.what-secretary-wrap {
			display: flex;
			justify-content: space-between;
			border-bottom: 1px solid #f2f2f2;
			padding: 5px;
			span {
				i {
					width: 4px;
					height: 15px;
					background: #FF665E;
					margin-right: 10px;
					vertical-align: sub;
					display: inline-block;
				}
			}
			img {
				width: 18px;
				height: 18px;
				display: inline-block;
			}
		}
		.four-icon {
			width: 100%;
			text-align: center;
			padding: 21px 0;
			margin: 0 auto;
			div {
				float: left;
				width:50%;
				box-sizing:border-box;
				margin-bottom: 20px;
				img {
					width: 94px;
					height: 94px;
					margin:0 auto;
				}
				p {
					text-align:center;
				}
			}
		}
	}
	
	.icon_img {
		width: 50px;
		display: block;
		margin: 0 auto;
	}
	
</style>
<style>
	.closeSecretDialog .dialog-demo .weui-dialog{
		border-radius:8px;
	}
</style>