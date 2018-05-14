<template>
	<!--首页标的组件-->
	<div class="welfare">
		<h5>{{wfers.head}}</h5>
		<ul>
			<li class="clearfix" v-for="(item,index) in wfers.list" :key="index">
				<div @click="gotodetail(item)" class="clearfix">
					<h6>{{ item.productName }}<span v-for="code in item.label" :class="{blue:item.productId != 'XSB0002'}">{{ code }}</span><!--<i>{{ label}}</i>--></h6>
					<div class="fl">
						<p class="return">{{ item.rate }}<span>%</span></p>
						<p class="desc">近七日历史年化收益率</p>
					</div>
					<div class="fr">
						<p class="locking">{{item.productType | typeFile}}<span>{{ item.duration }}{{item.durationType | timeTypeFliter}}</span><br/><i>{{item.repaymentTypeZ}}</i></p>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default{
		data(){
			return{}
		},
		methods:{
			productFill(value){
				switch (value){
					case "0":return "pro";
					break;
					case "1":return "zt";
					break;
				}
      },
      gotodetail(item){
          let type = item.flag == 1 ? 'zt' : 'pro';
          let url = `/pro/ztDetail/${type}/${item.productId}`;
          this.$router.push({path:url});
        }
		},
		filters:{
			typeFile(value){
				if(value == 1 || value == 2){
					return "到期退出";
				}else{
					return "出借期限";
				};
			},
			productFill(value){
				if(value == 1){
					return "zt";
				}
			}
		},
		props:["wfers"]
	}
</script>

<style scoped>
	.welfare{background:#fff;margin-bottom:10px;}
	h5,h6{font-weight:normal;}
	h5{height:35px;line-height:35px;text-indent:15px;font-size:16px;color:#333;}
	.welfare li{border-top:solid 1px #f5f5f5;padding-top:10px;padding-bottom:20px;}
	.welfare li a{display:block;}
	.welfare li h6{padding-left:25px;font-size:14px;color:#333;}
	.welfare li h6 span,.welfare li h6 i{display:inline-block;padding:0 5px;border-radius:2px;margin-left:5px;font-size:12px;}
  .welfare li h6 span{border:solid 1px #FC6C69;color:#FC6C69;}
  .welfare li h6 span.blue{border:solid 1px #43A0FF;color: #43A0FF;margin-left:19px;}
	.welfare li .fl{float:left;}
	.welfare li .fr{float:right;width:50%;}
	.welfare li .fr,.welfare li .fl{width:50%;padding-top:10px;}
	.welfare li .fr{padding-top:30px;}
	.welfare li p.return{padding-left:30px;color:#FF665E;font-size:36px;}
	.welfare li p.return span{font-size:14px;}
	.welfare li p.desc{padding-left:20px;font-size:12px;color:#999;}
	.welfare li p.locking{padding-left:35px;border-left:solid 1px #ebebeb;font-size:14px;color:#999;line-height:20px;}
	.welfare li p.locking span,.welfare li p.locking i{color:#333;}
	.welfare li p.locking span{margin-left:7px;}
</style>
