<template>
  <m-header :text="msg" @rightMore="$router.push('/find/customerService')">
    <div slot="rightHtml">
      <img src="~assets/mine/call@3x.png" alt="">
    </div>
  </m-header>
</template>
<script>
import MHeader from "~/common/m-header";
export default {
  props:['msg'],
  components:{
    MHeader
  }
}
</script>
