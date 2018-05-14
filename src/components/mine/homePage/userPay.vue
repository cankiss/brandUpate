<template>
  <div class="user-pay">
    <p>资金交易</p>
    <grid :cols="2">
      <grid-item v-for="(item,index) in items" :key="index">
        <router-link :to='item.link'>
          <div class="grid-center">
            <img :src="item.imgUrl" slot="icon" alt="">
            <div :style="{'margin-left':index === 2 || index === 0 ? '5px' : '10px'}">
              <span>{{item.title}}</span><br>
              <span>{{Array.isArray(item.state) ? `${item.state[0]} ${item.state[1]}`: item.state }}</span>
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
            imgUrl:require('@/assets/mine/icon_account@2x.png'),
            title:'账户总览',
            state:['看总账', '知概况'],
            link:'/mine/overview'
          },
          {
            imgUrl:require('@/assets/mine/icon_money@2x.png'),
            title:'资金流水',
            state:'资金动向全知道',
            link:'/mine/record'
          },
          {
            imgUrl:require('@/assets/mine/icon_assist@2x.png'),
            title:'投标小秘书',
            state:['自动投标', '资金不站岗'],
            link:'/mine/secretary'
          },
          {
            imgUrl:require('@/assets/mine/icon_exeprience@2x.png'),
            title:'体验金',
            state:'新手福利不容错过',
            link:'/exCash'
          },
          {
            imgUrl:require('@/assets/mine/expect.png'),
            title:'尽情期待',
            state:'更多精彩探索中',
            link:''
          }
        ]
      }
    },
    components: {
      Grid,
      GridItem
    },
    created(){
      if(this.storage.get('user_id'))
      this.$mine('newbieTask/invisibleMyExperience').then(({code,model}=res) => {
        if(code === '200' && model.isShow == 0) this.items.splice(4,1)
        else this.items.splice(3,1)
      })
      else this.items.splice(4,1)
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

