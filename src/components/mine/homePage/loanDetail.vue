<template>
  <div class="load-detail-wrap">
    <p>出借明细</p>
    <div class="load-detail">
      <flexbox class="link-style">
        <flexbox-item>
          <router-link to='/mine/invest/zhitou'>
            <img src="~assets/mine/my_smartPro@2x.png" alt=""><br>
            <span>亿宝智投</span>
          </router-link>
        </flexbox-item>
        <flexbox-item>
          <router-link to='/mine/invest/optimization'>
            <img src="~assets/mine/my_shortpro@2x.png" alt=""><br>
            <span>亿宝优选</span>
          </router-link>
        </flexbox-item>
        <flexbox-item>
          <router-link to='/mine/invest/sanbiao'>
            <img src="~assets/mine/my_scatteredpro@2x.png" alt=""><br>
            <span>散标计划</span>
          </router-link>
        </flexbox-item>
      </flexbox>
    </div>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem } from "vux";
export default {
  components: {
    Flexbox,
    FlexboxItem
  }
};
</script>

<style lang="less" scoped>
.load-detail-wrap {
  background: #fff;
  margin-top: 10px;
  p {
    line-height: 40px;
    padding-left: 20px;
    border-bottom: 1px solid #f2f2f2;
  }
}
.link-style {
  text-align: center;
  padding: 10px 0 4px;
  img {
    display: inline-block;
    width: 38px;
    height: 30px;
  }
  span {
    color: #999999;
  }
}
</style>
