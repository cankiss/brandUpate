<template>
	<!--亿宝优选-->
	<flexbox class="list-group" orient="vertical">
		<listitem v-for="(item,key) in ztlist" :key="key" :item="item" @itemClcik="itemClick(item.productId)">
		</listitem>
		<flexbox-item class="list-item instructions">
			<flexbox orient="vertical">
				<flexbox-item class="text-center">
					<p class="text-center">
						亿宝优选
					</p>
					<p class="font-999 text-center">
						生财有道 小积累 大财富
					</p>
				</flexbox-item>
				<flexbox-item>
					<flexbox class="text-center">
						<flexbox-item :span="4">
							<p>
								<img :src="imgList.qedf" alt="">
							</p>
							<p class="font-999 font-size-12">
								短期项目
							</p>
						</flexbox-item>
						<flexbox-item :span="4">
							<p>
								<img :src="imgList.dcbz" alt="">
							</p>
							<p class="font-999 font-size-12">
								灵活配置
							</p>
						</flexbox-item>
						<flexbox-item :span="4">
							<p>
								<img :src="imgList.jlcf" alt="">
							</p>
							<p class="font-999 font-size-12">
								超低门槛
							</p>
						</flexbox-item>
					</flexbox>
				</flexbox-item>
			</flexbox>
		</flexbox-item>
	</flexbox>
</template>
<script>
	import {
		Flexbox,
		FlexboxItem
	} from "vux"
	import listitem from './listitem'
	export default {
		components: {
			Flexbox,
			FlexboxItem,
			listitem
		},
		props: {
			imgList: {
				type: Object,
				default: {

				}
			}
		},
		data() {
			return {
				ztlist: []
			}
		},
		methods: {
			itemClick(productId) {
				console.log(productId)
			},
			init() {
				this.$http.post('borrow/selectPoolBorrowXSB').then(res => {
					// var data = res.data;
					if(res.code == "200") {
						this.ztlist = res.model
					}
				})
			}
		},
		created() {
			this.init();
		}
	}
</script>
<style>

</style>
