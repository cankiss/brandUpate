<template>
  <!--平台公告组件-->
	<div class="not">
		<div class="img_icon">
			  <img src="~assets/mine/icon_notice@2x.png" alt="" />
		</div>
		<div class="creed">
      <swiper auto loop height="30px" direction="horizontal" :interval=2000 class="text-scroll" :show-dots="false">
        <swiper-item v-for="(item,index) in notice" :key="index">
          <p>{{item.message}}<i @click="del(item.id)"></i></p>
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
        props:["notice"],
        methods:{
           del(id){
               this.$mine('newbieTask/updateMessageStatus',{messageId:id}).then(res => {
                   if (res.code == 200){
                       this.$emit("delMesssageById",id)
                   }
               })
           } 
        }
	}
</script>

<style scoped>
	.not{height:30px;background:#fff;border-bottom:solid 1px #e1e1e1;}
	.img_icon{float:left;width:14px;margin-left:15px;margin-top:10px;margin-right:6px;}
  .img_icon p{display:block;}
	.creed{overflow:hidden;line-height:30px;font-size:12px;}
  .creed p{display:block;color: #FF665E;}
	.creed i{float:right;width:12px;height:12px;margin-right:10px;margin-top:9px;background:url(~assets/mine/icon_delete.png) no-repeat;background-size:100% 100%;}
</style>
