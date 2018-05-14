<template>
	<div class="content-box">
		<!--首页的圆形-->
		<template v-if="isHomeComponent">
			<img src="~/assets/home/bank-deposit@2x.png"
           class="bank-deposit"
           alt=""
           @click="$router.push('/mine/setup/bankOpenAccount')" />
		</template>
		<!--买标时候的弹窗-->
		<template v-else>
			<div v-transfer-dom>
				<x-dialog v-model="showHideOnBlur" class="dialog-demo" hide-on-blur>
					<div class="img-box">
						<img src="~/assets/common/bank-deposit-bg.png" style="max-width:100%">
						<x-button class="open-now" text='立即开通' link='/mine/withdraw'></x-button>
					</div>
				</x-dialog>
			</div>
		</template>
	</div>
</template>

<script>
	import { XDialog,XButton } from 'vux'

	export default {
		name: "bankdeposit",
		components: {
			XDialog,
			XButton
		},
		data() {
			return {
				showHideOnBlur: true,
			}
		},
		props: {
			isHomeComponent: {
				type: Boolean,
				default: false
			},
		},
	}
</script>

<style scoped lang="less">
	.bank-deposit {
		position: fixed;
		bottom: 10%;
		width: 20%;
		right: 4%;
	}

	.dialog-demo {
		.img-box {
			height: auto;
			overflow: hidden;
		}
		.open-now {
			padding: 0px;
			position: absolute;
			bottom: 0;
			border: none;
			background-color: #ff665e;
			color: white;
			width: 50%;
			left: 25%;
			bottom: 5%;
			border-radius: 4px;
		}
	}
</style>
