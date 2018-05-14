<template>
  <!--股东信息-->
  <div class="holder">
    <ul>
      <li>
        <img src="~/assets/home/icon_shareholders.png" alt="">
        <p><span>股东：</span>周伯云</p>
      </li>
      <li>
        <img src="~/assets/home/icon_shares.png" alt="">
        <p><span>股权占比：</span>100%</p>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data(){
      return {
      }
    }
  }
</script>

<style scoped>
  .holder ul{padding:0 20px;}
  .holder li{padding:10px 0;}
  .holder li img{width:50px;float:left;}
  .holder li p{color:#666;font-size:14px;line-height:50px;overflow:hidden;padding-left:20px;}
  .holder li p span{color:#333;}
</style>
