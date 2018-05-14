<template>
	<!--首页-->
	<div class="container has-footer">
		<div class="indexHead" v-show="isShow">
			<mheader class="homePageTitle" :text="pageTitle" :isBack="isBack" @leftBack="leftBack"></mheader>
		</div>
		<!--顶部轮播-->
		<div class="banner" ref="banner">
			<swiper :bannerList="bannerList"></swiper>
		</div>
		<!--平台公告-->
		<notice :notice="announcement"></notice>
		<!--首页导航-->
		<div class="nev">
			<ul class="clearfix">
				<li v-for="(item,key) in nev" :key="key">
					<router-link :to="item.redirect">
						<img :src="item.url" />
						<p>{{ item.name }}</p>
					</router-link>
				</li>
			</ul>
		</div>
		<!--新手礼包-->
		<div class="novice" v-if="noticebanner.length > 0">
			<a :href="noticebanner[0].redirect || 'javascript:;'">
				<img :src="noticebanner[0].url" />
			</a>
		</div>
		<!--新手福利-->
		<!-- <welfare :wfers="newswf" v-if="newswf.list.length != 0"></welfare> -->
		<!--热门推荐-->
		<welfare :wfers="hotwf"></welfare>
		<!--平台数据-->
		<platform :myallplan="myallplan"></platform>
		<!--footer菜单-->
		<mfooter></mfooter>
		<!--网站公告-->
		<div class="notice">市场有风险 出借需谨慎<br/>网络出借不等于存款 请合理选择出借项目 最终收益以实际为准</div>
		<!--注册弹窗-->
		<registerpops></registerpops>
		<!--银行存管小球-->
		 <bankdeposit v-if="false" :isHomeComponent="true"></bankdeposit>
	</div>
</template>

<script>
	import swiper from "../common/swiper.vue";
	import mfooter from "../common/m-footer.vue";
	import mheader from "../common/m-header.vue";
	import notice from "./index/notice.vue";
	import welfare from "./index/welfare.vue";
	import platform from "./index/platform.vue";
	import registerpops from "./index/registerpops.vue";
	import bankdeposit from '../common/bank-deposit.vue';

	export default {
		data() {
			return {
				pageTitle: '亿宝贷',
				isBack: true,
				bannerList: [],
				isShow: false,
				nev: [],
				newswf: { //新手福利列表
					head: "新手福利",
					list: []
				},
				hotwf: { //热门推荐列表
					head: "热门推荐",
					list: []
				},
				myallplan: [], //平台数据
				announcement: [], //平台公告
				noticebanner: [], //广告位
				isShowBankDeposit: false
			}
		},
		created() {
			this.getSwiper(),
			this.getIcon(),
			this.getArea(),
			this.getLoginStatus()
		},
		methods: {
			getSwiper() {
				this.$post("banner/selectIndexbanner?use=3&sspt=2").then(res => {
					if(res.code == 200) {
						let modeles = res.model.banner;
						modeles.forEach((v) => {
							let temp = {};
							temp.url = v.redirect;
							temp.img = v.url;
							temp.title = v.description;
							this.bannerList.push(temp);
						});
						console.log(this.bannerList);
					}
				})
			},
			menu() {
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
				var bannerHeight = document.querySelector(".banner").offsetHeight;
				if(scrollTop >= bannerHeight) {
					this.isShow = true;
				} else {
					this.isShow = false;
				};
			},
			leftBack() {
				this.$router.push("/home/systemList");
			},
			getIcon() {
				this.$post("icon/getFunctionArea",{userId:this.storage.get("user_id")}).then(res => {
					if(res.code == "200") {
						let temp = [];
						res.model.beginnerWelfare.forEach((v, i) => { //新手福利
							if(v != null) {
								if(v.label == '""' || v.label == "") {
									v.label = [];
								} else {
									v.label = v.label.split(",");
								};
								temp.push(v);
							};
						});
						this.newswf.list = temp;
						let temphot = [];
						res.model.hotRecommendation.forEach((v, i) => { //热门推荐
							if(v != null) {
								if(v.label == '""' || v.label == "") {
									v.label = [];
								} else {
									v.label = v.label.split(",");
								};
								temphot.push(v);
							};
						});
						this.hotwf.list = temphot;
						this.myallplan = res.model.allPlan;
					}
				})
			},
			getArea() {
				this.$post("icon/getFunctionalArea", {
					use: 3
				}).then(res => {
					console.log(res);
					if(res.code == "200") {
						let mentArr = res.model.platformAnnouncement.noticeList;
						if(mentArr && mentArr.length == 2) {
							let sertArr = [];
							sertArr.push(mentArr[0]);
							sertArr.push(mentArr[1]);
							mentArr = mentArr.concat(sertArr);
						};
						this.announcement = mentArr;
						this.noticebanner = res.model.indexBanner;
						let temp = [];
						if(res.model.iconAndUrl.length > 0) {
							temp = res.model.iconAndUrl;
						};
						this.nev = temp;
					}
				})
			},
			getLoginStatus() {
				if(this.storage.get("loginStatus")) { //若未登录,已登录且已开户,则不显示此入口
					this.isShowBankDeposit = true;
				}
			}
		},
		mounted() {
			window.addEventListener('scroll', this.menu)
		},
		destroyed() { //离开页面时移除监听滚动事件，否则会报错
			window.removeEventListener('scroll', this.menu)
		},
		components: {
			swiper,
			notice,
			welfare,
			platform,
			mheader,
			mfooter,
			registerpops,
			bankdeposit
		},
		metaInfo() {
			return {
				title: this.pageTitle
			}
		}
	}
</script>

<style scoped>
	.indexHead {
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		z-index: 99;
	}
	/*首页导航*/

	.nev {
		height: 100px;
		background: #fff;
		margin-bottom: 10px;
	}

	.nev li {
		float: left;
		width: 33.3333%;
		text-align: center;
		padding-top: 18px;
	}

	.nev li img {
		width: 50px;
		height: 50px;
		;
		margin: 0 auto;
	}

	.nev li p {
		color: #333;
		line-height: 20px;
		font-size: 14px;
	}
	/*新手礼包*/

	.novice {
		margin-bottom: 10px;
	}
	/*网站公告*/

	.notice {
		text-align: center;
		padding: 10px 0;
		font-size: 12px;
		color: #B6B6B6;
	}
</style>

<style>
	.homePageTitle .left-arrow {
		background: url("../../assets/home/home_sysinf_hovar@3x.png") no-repeat!important;
		background-size: 100%!important;
	}

	.homePageTitle .left-arrow:before {
		border-color: transparent!important;
	}

	.homePageTitle .vux-header .vux-header-left .left-arrow {
		width: 22px;
		height: 22px;
		top: 0;
	}
</style>
