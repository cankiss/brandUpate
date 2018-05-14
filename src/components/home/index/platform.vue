<template>
    <!--平台数据组件-->
    <div class="plat">
      <h5>平台数据</h5>
      <ul class="clearfix">
        <li>
          <p class="info">{{ myallplan.tendAllAcount }}</p>
          <p class="desc">累计撮合成交金额</p>
        </li>
        <li>
          <p class="info">{{ myallplan.profitWait }}</p>
          <p class="desc">为用户赚取收益</p>
        </li>
        <li>
          <p class="info">{{ myallplan.totalPeople }}</p>
          <p class="desc">注册用户</p>
        </li>
      </ul>
      <ol class="inform clearfix">
        <li>
          <img src="~/assets/home/home_moneygiveback@3x.png" alt="">
        </li>
        <li>
          <img src="~/assets/home/home_sefety@3x.png" alt="">
        </li>
        <li>
          <img src="~/assets/home/home_information@3x.png" alt="">
        </li>
      </ol>
    </div>
</template>

<script>
  export default{
    props:["myallplan"]
  }
</script>

<style scoped>
  .plat{background:#fff;}
  h5{height:40px;line-height:40px;font-size: 16px;color: #333333;border-bottom:solid 1px #f5f5f5;font-weight:normal;text-indent:15px;}
  .plat ul{padding:20px 0;}
  .plat ul li{float:left;width:33.3333%;text-align:center;border-right:solid 1px #F0F0F0;box-sizing:border-box;}
  .plat li:last-child{border-right:0;}
  .plat li p.info{font-size:18px;color:#333;}
  .plat li p.desc{font-size:12px;color:#999;}
  .inform{padding-bottom:14px;}
  .inform li{float:left;width:33.333%;box-sizing:border-box;padding:0 10px;}
</style>
