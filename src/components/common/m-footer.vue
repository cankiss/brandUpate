<template>
  <div class="m-footer">
    <tabbar>
      <tabbar-item :selected="pageName=='home'" link="/">
        <img slot="icon" src="../../assets/demo/tab_home@2x.png">
        <img slot="icon-active" src="../../assets/demo/tab_home_selected@2x.png">
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item :selected="pageName=='pro'" link="/pro">
        <img slot="icon" src="../../assets/demo/tab_project@2x.png">
        <img slot="icon-active" src="../../assets/demo/tab_project_selected@2x.png">
        <span slot="label">项目</span>
      </tabbar-item>
      <tabbar-item :selected="pageName=='find'" link="/find">
        <img slot="icon" src="../../assets/demo/tab_find@2x.png">
        <img slot="icon-active" src="../../assets/demo/tab_find_selected@2x.png">
        <span slot="label">发现</span>
      </tabbar-item>
      <tabbar-item :selected="pageName=='mine'" link="/mine">
        <img slot="icon" src="../../assets/demo/tab_my@2x.png">
        <img slot="icon-active" src="../../assets/demo/tab_my_selected@2x.png">
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem, Group, Cell } from 'vux';

export default {
  name: 'mfooter',
  props:{
    pageName:{
      type:String,
      default:'home'
    }
  },
  components:{
    Tabbar,
    TabbarItem
  },
  data () {
    return {

    }
  }
}
</script>

<style>
  .m-footer{position: fixed; bottom: 0; left: 0; right: 0;max-width: 750px;margin:auto;}
  .m-footer .weui-tabbar{background-color: #fff;}
  .m-footer .weui-tabbar__icon{width: 24px; height: 24px;}
</style>
