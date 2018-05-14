<template>
  <div id="app">
    <loading v-model="isLoading" />
    <router-view/>
  </div>
</template>

<script>
import { Loading } from 'vux'
import { mapState } from 'vuex'
export default {
  name: 'app',
  components:{
    Loading
  },
  computed:{
    ...mapState({
      isLoading: state => state.vuxLoading.isLoading
    })
  }
}
</script>

<style lang='less'>
  @import '~vux/src/styles/reset.less';
  @import './assets/css/common.css';
</style>
