<template>
  <div class="user-pay">
    <p>奖励优惠</p>
    <grid :cols="2">
      <grid-item v-for="(item,index) in items" :key="index">
        <router-link :to="item.link">
          <div class="grid-center">
            <img :src="item.imgUrl" slot="icon" alt="">
            <div>
              <span>{{item.title}}</span><br>
              <span>{{Array.isArray(item.state) ? `${item.state[0]}   ${item.state[1]}`: item.state }}</span>
            </div>
          </div>
        </router-link>
      </grid-item>
    </grid>
  </div>
</template>
<script>
import { Grid , GridItem } from "vux";
export default {
    data(){
      return{
        items:[
          {
            imgUrl:require('@/assets/mine/icon_invite@2x.png'),
            title:'我的邀请',
            state:'邀小伙伴一起加入',
            link:'/mine/invite'
          },
          {
            imgUrl:require('@/assets/mine/icon_gift@2x.png'),
            title:'我的优惠券',
            state:'各种优惠嗨不停',
            link:'/mine/myCoupon'
          }
        ]
      }
    },
    components: {
      Grid,
      GridItem
    }
};
</script>
<style lang='less' scoped>
  .user-pay {
    background: #fff;
    margin-top: 10px;
    p {
      line-height: 40px;
      padding-left: 20px;
    }
    .grid-center{
      display: flex;
      padding-left: 10px;
      img{
        width: 24px;
        height: 24px;
        margin: auto 0;
      }
      div{
        color: #333;
        margin-left: 10px;
        span:nth-child(3){
          color: #999;
          white-space: nowrap;
        }
      }
    }
  }
</style>

