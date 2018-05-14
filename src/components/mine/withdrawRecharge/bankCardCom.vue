<template>
  <div class="user-card-padding">
    <div class="user-card-container">
      <div class="user-card-wrap font-333" v-for="(item,i) in bankInfo" :key="i">
        <div class="bank-info">
          <div>
            <img :src="item.mapUrl" alt="" style="width:34px;height:34px;display:inline-block">
            <p class="font-size-18">{{item.bankName}}</p>
          </div>
          <p class="font-size-12 font-666">借记卡</p>
        </div>
        <div class="user-card-info">
          <div>
            <p>{{item.toAccName | nameHidden}}</p>
            <p>{{item.toAccNo | bankCodeHidden}}</p>
          </div>
          <div class="delCard">
            <slot name="delCard"></slot>
          </div>
        </div>
        <div class="explain-show">
          <slot name="cardExplain"></slot>
        </div>
      </div>
    </div>
    <div class="font-size-12 font-666" style="padding:5px" v-for="(item,i) in bankInfo" :key="i">
      <div v-if='isRecharge'>
        <p>单笔限额{{item.singerMaxAmount - 0 | bigMoneyCheck}}，
          单日限额{{item.singerDayAmount - 0| bigMoneyCheck}}，
          单月限额{{item.singerMonthAmount - 0| bigMoneyCheck}}</p>
        <p style="color:#bbb">{{`(适用于${item.bankName}普通卡用户)`}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        items:[]
      }
    },
    props:{
      isRecharge:{
        type:Boolean,
        default:false
      },
      bankInfo:{
        type:Array,
        default:[]
      }
    }
  }
</script>

<style lang="less" scoped>
.user-card-padding{
  padding: 0 5px;
  box-sizing: border-box;
  .user-card-container {
    width: 80%;
    background: #fff;
    margin: 10px auto;
    border-radius: 12px;
    border: 1px solid #D4D4D4;
    padding: 0 15px;
    .user-card-wrap {
      padding: 10px 15px;
      position: relative;
      .explain-show {
        position: absolute;
        right: -40px;
        top: 50%;
      }
      .bank-info {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #E6E6E6;
        padding: 10px 0;
        div > img,p{
          float: left;
        }
        div > p{
          margin-left: 10px;
        }
        p {
          line-height: 30px;
        }
      }
      .user-card-info {
        margin-top: 50px;
        display: flex;
        justify-content: space-between;
        .delCard{
          width: 100%;
          text-align: right;
          align-self: flex-end;
          color:#FF665E
        }
      }
    }
  }
}
</style>
