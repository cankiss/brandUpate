<template>
	<div class="questionList">
		<group v-for="(question,index) in  questionList" :key="index">
			<cell :title="question.title" is-link :border-intent="false" :arrow-direction="question.showContent ? 'up' : 'down'" @click.native="question.showContent = !question.showContent"></cell>
			<template v-if="question.showContent">
					<cell-box :border-intent="false" class="sub-item">
						<div  v-html="question.content"></div>
					</cell-box>
</template>
		</group>
        <footer>
              <x-button plain type="primary" style="border-radius:99px;" @click.native="gohelp">前往帮助中心了解更多</x-button>
        </footer>
	</div>
</template>
<script>
	import {
		Cell,
		CellBox,
		CellFormPreview,
		Group,
		Badge,
		XButton
	} from "vux"
	export default {
		props: {
			sbType: {
				type: String,
				default: null
			}
		},
		components: {
			Cell,
			CellBox,
			CellFormPreview,
			Group,
			Badge,
			XButton
		},
		data() {
			return {
				id: '',
				type: 1,
				name: '',
				a: 2,
				questionList: [{
					title: '问题标题',
					content: '问题内容',
					showContent: false
				}]
			}
		},
		methods: {
			init() {
				this.id = this.$route.params.id;
				this.type = this.$route.params.type;
				this.name = this.$route.params.name;
				this.a = this.$route.query.a;
				this.$emit('changeName', this.name);
				this.$post('icon/getHelpByProductId', {
					pageNum: 1,
					pageSize: 9999,
					productId: this.id
				}).then(res => {
					if (res.code == 200) {
						//  this.questionList = res.model.project.helpCenterList;
						this.questionList = [];
						for (let i = 0; i < res.model.length; i++) {
							this.questionList.push({
								title: res.model[i].title,
								content: res.model[i].content,
								showContent: false
							})
						}
						console.log(this.questionList);
					}
				})
			},
			gohelp() {
				// let sbType = this.$route.query.sbType || this.sbType||this.storage.get("sbType");
				// let sbType = this.storage.get("sbType");
				this.$router.push({
						path: '/find/help/project'
				})
				// if (sbType) {
				// 	this.$router.push({
				// 		path: '/find/help/project'
				// 		// query: {
				// 		// 	a: this.a,
				// 		// 	sbType: sbType
				// 		// }
				// 	})
				// }else{
				// 	this.$router.push({
				// 		path: '/find/help/project'
				// 	})					
				// }
			}
		},
		created() {
			this.init()
		},
		mounted() {},
	}
</script>
<style scoped>
	.tips {
		background: #FFF9EA;
		line-height: 32px;
		padding: 0 12px;
		box-sizing: border-box;
	}
	.vux-table td,
	.vux-table th.text-left,
	.vux-table td,
	.vux-table td.text-left {
		text-align: left;
		padding-left: 16px;
		box-sizing: border-box;
	}
	.vux-table td,
	.vux-table th.text-right,
	.vux-table td,
	.vux-table td.text-right {
		text-align: right;
		padding-right: 16px;
		box-sizing: border-box;
	}
	._v-content {
		padding-bottom: 40px;
	}
	.no-data-text {
		display: none;
	}
	footer {
		left: 0;
		right: 0;
		bottom: 10px;
		margin: 20px auto;
	}
	footer .weui-btn {
		background: #FEF8F8;
		border: 1px solid #FE675F;
		border-radius: 85px;
		font-size: 14px;
		color: #FF665E;
		width: 188px !important;
		height: 36px;
		line-height: 36px;
	}
	.questionList {
		padding-bottom: 50px;
	}
</style>