<template>
  <div class="container has-header">
    <mHeader :text="title" :showBack="showBack" @rightMore="rightMore">
      <p slot="rightHtml" style="color:#000;">完成</p>
    </mHeader>
    <!--出借成功-->
    <div class="lendSuccess">
      <img src="~/assets/pro/icon_success_1@2x.png" alt="">
      <p>出借成功</p>
      <p class="price">{{ amount | numToMoneyField}}元</p>
    </div>
    <!--出借记录-->
    <group class="landrecord">
      <cell v-for="(item,index) in record" :key="index" :title="item.title" :link="{path:item.link}">
        <span slots="inline-desc" v-html="item.desc"></span>
      </cell>
    </group>
    <!--猜你喜欢-->
    <load-more :show-loading="false" :tip="gress" background-color="#f5f5f5" class="guess"></load-more>
    <!--热门推荐-->
    <div class="hotremond">
      <h6><span v-if="havecoupon">您有优惠券可使用</span><span v-else>热门推荐</span></h6>
      <div class="flexbox">
        <div class="flexchildren" v-for="(item,index) in hotDark" :key="index" @click="gotodetail(item)">
          <ul>
            <li class="markname"><span v-show="havecoupon">{{ item.coupon}}</span>{{ item.name }}</li>
            <li class="markrate">{{ item.rate }}</li>
            <li class="markdesc">近七日历史年化收益率</li>
            <li class="markdata">锁定期限{{ item.duration }}{{item.durationType|timeTypeFliter}}</li>
          </ul>
        </div>
      </div>
      <router-link to="/pro">查看更多></router-link>
    </div>
  </div>
</template>
<script>
  import mHeader from "../../common/m-header.vue"
  import { Cell, Group } from 'vux'
  import { LoadMore } from 'vux'
  export default {
      data(){
        return{
          title:"出借成功",//网页标题
          gress:"猜你喜欢",//猜你喜欢
          lendmomey:"6000",//出借金额
          showBack:false,//不显示返回按钮
          amount:0,
          investName:'',
          record:[//出借记录
            {title:"出借记录", desc:"周周乐", link:"/mine/invest"},
            {title:"成长值奖励", desc:"成长值将在起息后更新", link:"/find/memberClub/memberright"}
          ],
          hotDark:[
            // {name:"年年涨",rate:"10.8%",data:"12",coupon:"138"},
            // {name:"年年涨",rate:"10.8%",data:"12",coupon:"138"}
          ],
          havecoupon:false
        }
      },
      methods:{
        rightMore(){
          this.$router.push({path:'/pro'});
        },
        getHot(){
           this.$mine('information/hotRecommendation').then( res => {
             if(res.code == 200){
               let model = res.model;
               for(let i=0;i < model.length;i++){
                this.hotDark.push({
                  name:model[i].productName,
                  rate:(model[i].rate+model[i].extraRate)+'%',
                  duration:model[i].duration,
                  flag:model[i].flag,
                  productId:model[i].productId,
                  durationType:model[i].durationType,
                  coupon:  model[i].couponAmount ?  parseInt(model[i].couponAmount) : 0
                })
               }
               if(model[0]&&model[0].sign==1){
                 this.havecoupon = true;
               }
             }
           } )
        },
        gotodetail(item){
          let type = item.flag == 1 ? 'zt' : 'pro';
          let url = `/pro/ztDetail/${type}/${item.productId}`;
          this.$router.push({path:url});
        }
      },
      created(){
        this.amount = this.$route.query.amount
        this.investName = this.$route.query.investName
        this.record[0]["desc"] = this.investName
        this.getHot()
      },
      components:{
        mHeader,
        Cell,
        Group,
        LoadMore
      },
      metaInfo() {
        return {
          title: this.title
        }
      }
  }
</script>
<style scoped>
  /*出借成功*/
  .lendSuccess{background:#fff;text-align:center;padding:22px 0 12px;}
  .lendSuccess img{width:50px;margin:0 auto;}
  .lendSuccess p{font-size: 16px;color: #43A0FF;}
  .lendSuccess p.price{font-size: 24px;color: #333333;}
  /*热门推荐*/
  .hotremond{background:#fff;padding:10px 0;text-align:center;}
  .hotremond h6{font-size: 14px;text-align:left;color: #333333;padding-left:20px;margin-bottom:10px;}
  .flexbox{display:flex;justify-content:flex-start;flex-wrap: wrap;padding-left: 20px;}
  .flexchildren{width:150px;padding:20px 0;border:solid 1px #efefef;margin-top: 10px;}
  .flexchildren:nth-of-type(2n+2){margin-left: 20px;}
  .markname{font-size: 16px;color: #333333;}
  .markrate{font-size: 24px;color: #FF665E;}
  .markdesc{font-size: 12px;color: #999999;}
  .markdata{font-size: 14px;color: #666666;}
  .hotremond a,.markrate,.markdata{margin-top:10px;}
  .hotremond a{font-size: 16px;color: #43A0FF;display:inline-block;}
  .markname span{display:inline-block;width:28px;height:20px;background:url(../../../assets/pro/icon_sale.png) no-repeat;background-size:100% 100%;vertical-align: middle;color:#fff;font-size:12px;line-height:20px;padding-left:15px;margin-right:5px;}
</style>
<style>
  /*出借记录*/
  .landrecord .weui-cell:before{left:0;}
  .landrecord .vux-cell-primary p{display:inline-block;width:92px;color:#999;}
  .landrecord .weui-cell__ft{text-align:left;flex:3;}
  .landrecord .weui-cell__ft i{color: #ff766f;}
  /*猜你喜欢*/
  .guess.weui-loadmore_line{margin-top:1.5em;border-top:solid 1px #d8d8d8;margin-bottom:0;}
  .guess.weui-loadmore_line .weui-loadmore__tips{background:url(../../../assets/pro/icon_like@2x.png) no-repeat 10px center;background-size:18px 16px;padding:0 10px 0 32px;font-size:16px;}
</style>
