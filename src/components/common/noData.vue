<template>
  <div class="no-data">
    <!-- 暂未匹配到数据 -->
    <img src="~assets/mine/nonedata_gray@2x.png" alt="">
    <p class="font-999 font-size-16">
      <slot>暂无数据</slot>
    </p>
  </div>
</template>
<script>
export default {

}
</script>
<style lang='less' scoped>
  .no-data{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    img{
      display: inline-block;
      margin:auto;
      width: 117px;
      height: 77px;
    }
    p{
      text-align: center
    }
  }
</style>
