<template>
  <!--高管信息-->
  <div class="senior">
    <swiper loop height="205px" direction="horizontal" :interval=2000 class="text-scroll" :show-dots="true" dots-position="center" :dots-class="mydots">
      <swiper-item><p><span>周伯云<i>法人</i></span><br/><em>北京大学EMBA学位，2006年起涉足地产和建筑行业，先后创办了佳伦地产和隆盛地产等公司，2008年进入金融业，在北京创立了高通盛融基金公司，后开始布局小额贷款公司等金融领域，2013年创立善林金融。</em></p></swiper-item>
      <swiper-item><p><span>陶剑勇<i>CEO</i></span><br/><em>上海财经大学IMBA硕士，曾负责多家大型电商平台市场、运营、产品管理工作，2015年担任你我贷COO，整体负责你我贷线上运营工作，现担任亿宝贷CEO。</em></p></swiper-item>
      <swiper-item><p><span>杜春生<i>技术总监</i></span><br/><em>毕业于华东师范大学计算机专业，曾在快钱支付、银生宝支付、你我贷等支付平台和互联网金融平台担任首席架构师，现担任亿宝贷的技术总监。</em></p></swiper-item>
      <swiper-item><p><span>李虎<i>运营总监</i></span><br/><em>东华大学信息管理与信息系统本科，上海市优秀毕业生，获得多项大奖，曾在友邦中国区担任项目经理，负责多项重大项目的管理和运营，现担任亿宝贷的运营总监。</em></p></swiper-item>
      <swiper-item><p><span>樊文玺<i>风险总监</i></span><br/><em>毕业于河南大学金融学本科学士，曾在中国银行、通联支付、平安付等银行和金融集团担任风险主管和风险总监职位，目前担任亿宝贷风险总监。</em></p></swiper-item>
      <swiper-item><p><span>杨猛<i>金融产品总监</i></span><br/><em>硕士毕业于沈阳理工大学工程力学专业，本科主修应用数学，对数字敏感；曾任职于小赢理财负责金融产品设计，目前担任亿宝贷金融产品部总监。</em></p></swiper-item>
    </swiper>
  </div>
</template>

<script>
  import { Swiper, SwiperItem } from 'vux'
  export default {
    data(){
      return {
        mydots:"mydots"
      }
    },
    components:{
      Swiper,
      SwiperItem
    }
  }
</script>

<style>
  .senior{padding:15px 0 0;}
  .senior p{height:174px;background:url(~assets/home/bg_personnel.png) no-repeat;background-size:100% 100%;padding:0 12px;}
  .senior p span{line-height:40px;color:#fff;font-size:16px;padding-left:5px;}
  .senior p span i{font-size:12px;margin-left:12px;}
  .senior p em{font-size:14px;color:#666;}
  .vux-slider > .vux-indicator > a > .vux-icon-dot{width:8px;height:8px;border-radius:4px;}
  .vux-slider > .vux-indicator.mydots > a > .vux-icon-dot{background-image: linear-gradient(40deg, rgba(154,217,250,0.17) 0%, rgba(97,178,244,0.20) 100%);}
  .vux-slider > .vux-indicator.mydots > a > .vux-icon-dot.active{background-image: linear-gradient(40deg, #9AD9FA 0%, #61B2F4 100%);}
</style>
