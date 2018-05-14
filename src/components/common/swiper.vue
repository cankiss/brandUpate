<template>
  <!--轮播图组件-->
	<div>
		<swiper loop auto :list="bannerList" :show-desc-mask="false" :show-dots="false" :aspect-ratio="180/375" @on-index-change="demo07_onIndexChange"></swiper>
	</div>
</template>

<script>
	import { Swiper,SwiperItem} from 'vux'
	export default{
		data(){
			return{}
		},
		components: {
    		Swiper
    	},
    	methods:{
    		demo07_onIndexChange (index) {
		      this.demo07_index = index
		    }
    	},
    	props:["bannerList"]
	}
</script>

<style scoped>
.copyright {
	font-size: 12px;
	color: #ccc;
	text-align: center;
}

.text-scroll {
	border: 1px solid #ddd;
	border-left: none;
	border-right: none;
}

.text-scroll p {
	font-size: 12px;
	text-align: center;
	line-height: 30px;
}

.black {
	background-color: #000;
}

.title {
	line-height: 100px;
	text-align: center;
	color: #fff;
}

.animated {
	animation-duration: 1s;
	animation-fill-mode: both;
}

.vux-indicator.custom-bottom {
	bottom: 30px;
}

@-webkit-keyframes fadeInUp {
	from {
		opacity: 0;
		transform: translate3d(0, 100%, 0);
	}
	100% {
		opacity: 1;
		transform: none;
	}
}

@keyframes fadeInUp {
	from {
		opacity: 0;
		transform: translate3d(0, 100%, 0);
	}
	100% {
		opacity: 1;
		transform: none;
	}
}

.fadeInUp {
	animation-name: fadeInUp;
}

.swiper-demo-img img {
	width: 100%;
}

</style>
