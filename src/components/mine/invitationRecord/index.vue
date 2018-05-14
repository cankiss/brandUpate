<template>
  <div class="container has-header">
    <m-header :text="msg"></m-header>
    <tab :line-width="4" bar-active-color="#FF6E66" custom-bar-width="30px" defaultColor="#BFBFBF" active-color="#333333">
      <tab-item :selected="$route.path.indexOf('inviteRecord') > -1"
         @on-item-click="$router.replace('/mine/invite/inviteRecord')">
        <span class="font-size-16">邀请注册</span>
      </tab-item>
      <tab-item :selected="$route.path.indexOf('investRecord') > -1"
        @on-item-click="$router.replace('/mine/invite/investRecord')">
        <span class="font-size-16">出借成功</span>
      </tab-item>
    </tab>
    <router-view></router-view>
  </div>
</template>

<script>
  import { Tab, TabItem} from "vux";
  import MHeader from '~/common/m-header'
  import NoData from '../common/noData'
  export default {
    computed:{
      msg(){
        return this.$route.path.indexOf('inviteRecord') > -1 ? '邀请记录' : '出借记录'
      }
    },
    components: {
      MHeader,
      NoData,
      Tab,
      TabItem
    }
  }
</script>

<style lang="less" scoped>

</style>
