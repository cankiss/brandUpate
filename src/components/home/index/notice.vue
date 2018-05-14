<template>
  <!--平台公告组件-->
	<div class="not">
		<div class="img_icon">
      <router-link to="/home/systemList">
			  <img src="~/assets/home/home_sysinf_hovar@3x.png" alt="" />
      </router-link>
		</div>
		<div class="creed">
      <swiper auto loop height="30px" direction="vertical" :interval=2500 class="text-scroll" :show-dots="false">
        <swiper-item v-for="(item,index) in notice" :key="index">
          <router-link v-bind='{to:"/home/systemInfo/system/" + item.id}'>{{item.title}}<i></i></router-link>
        </swiper-item>
      </swiper>
		</div>
	</div>
</template>

<script>
  import { Swiper, SwiperItem } from 'vux'
	export default {
		components: {
      Swiper,
      SwiperItem
		},
		props:["notice"]
	}
</script>

<style scoped>
	.not{height:30px;background:#fff;border-bottom:solid 1px #e1e1e1;}
	.img_icon{float:left;width:14px;margin-left:15px;margin-top:10px;margin-right:6px;}
  .img_icon a{display:block;}
	.creed{overflow:hidden;line-height:30px;font-size:12px;}
  .creed a{display:block;color:#666;}
	.creed i{float:right;width:8px;height:12px;margin-right:10px;margin-top:9px;background:url(../../../assets/common/forword@2x.png) no-repeat;background-size:100% 100%;}
</style>
