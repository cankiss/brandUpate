<template>
  <div class="notice-wrap">
    <div class="notice-info">
      <img src="~assets/mine/icon_notice@2x.png" alt="" class="img-icon">
      <span v-text='msg'></span>
      <img src="~assets/mine/icon_delete.png" class="notice-close" @click.stop="delMySelf">
    </div>
  </div>
</template>

<script>
  export default {
    props: ['msg'],
    methods:{
      delMySelf(){
        this.$emit('isNotice')
      }
    }
  }
</script>

<style lang='less' scoped>
  .notice-wrap{
    background: #FFF9EA;
    .notice-info{
      height: 32px;
      line-height: 32px;
      text-align: center;
      img{
        width: 14px;
        height: 12.6px;
        padding: 5px;
        display: inline-block;
        vertical-align: middle;
      }
      span{
        font-size:12px;
        color: #FF665E;
      }
      .notice-close{
        width: 10px;
        height: 10px;
      }
    }
  }
</style>

