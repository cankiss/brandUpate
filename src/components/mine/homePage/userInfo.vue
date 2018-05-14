<template>
  <div>
    <div class="user-info" :style="isBg">
      <div class="user-wrap">
        <div style="position:relative">
          <img :src="userIcon" class="user-icon">
          <img :src="showIcon" v-show="showIcon">
        </div>
        <div class="user-info-show" style="margin-bottom:10px">
          <template v-if="isLogin">
            <x-button mini plain type="default"
            class="user-login"
            @click.native="$router.push('/login/2')">请登录</x-button>
            <div class="user-score">
              <div class="user-score-before">
                <span>铜盾</span><br>
                <span>1000</span>
              </div>
              <div class="user-progress">
                <x-progress :percent="0" :show-cancel="false"></x-progress>
              </div>
              <div class="user-score-after">
                <span>银盾</span><br>
                <span>2000</span>
              </div>
            </div>
          </template>
          <span v-else>{{item.mobile}}</span>
        </div>
        <div class="user-info-show" v-if="isMax === 0">
          <div class="user-score">
            <div class="user-score-before">
              <span>{{item.data.memberName}}</span><br>
              <span>{{item.memberPoints}}</span>
            </div>
            <div class="user-progress">
              <x-progress
              :percent="item.memberPointsPercent > 100 && 100"
              :show-cancel="false"></x-progress>
            </div>
            <div class="user-score-after">
              <span>{{item.data.nextGradeMemberName}}</span><br>
              <span>{{item.data.nextGradeRateDown}}</span>
            </div>
          </div>
        </div>
        <div class="user-info-show font-size-12" v-if="isMax === 1">
          <p>{{`${item.data.memberName}&emsp;${item.memberPoints}点`}}</p>
          <p>太棒了，您已达到最高等级!</p>
        </div>
        <router-link to='/mine/setup'>
          <img src="~assets/mine/icon_set@2x.png" class="user-setup">
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
  import { Flexbox, FlexboxItem, XButton, XProgress } from "vux";
  export default {
    components: {
      Flexbox,
      FlexboxItem,
      XButton,
      XProgress
    },
    data() {
      return {
        userIcon:require('@/assets/mine/portrait_user_login@2x.png'),
        isLogin:true,
        isBg:false,
        showIcon:'',
        isMax:'',
        item:{}
      }
    },
    created(){
      let user_id = this.storage.get('user_id')
      user_id && this._ajax()
      this.$http.post('icon/getBackground').then(({model,code}=res) => {
        if(code === '200' && model.background)
        this.isBg = `background:url(${model.background}) no-repeat center;
        background-size:cover`
      })
    },
    methods:{
      _ajax(){
        this.$mine('member/getMemberPointInfo').then(data => {
          data.code == '200' && this.init(data.model)
        })
      },
      init(data){
        this.item = data
        this.isLogin = false
        this.isMax = data.data.isMaxGrade - 0
        this.showIcon = data.data.memberPic
      }
    }
  }
</script>
<style lang="less">
  .user-info {
    background: #FF665E;
    height: 92px;
    padding: 30px;
    .user-icon {
      width: 50px;
      float: left;
      & + img{
        position: absolute;
        height: 18px;
        width: 18px;
        left: 32px;
        top: 32px;
      }
    }
    .user-wrap {
      padding-top: 21px;
      position: relative;
    }
    .user-login {
      height: 28px;
      width: 72px;
      font-size: 12px;
      color: #fff;
      border: 1px solid #fff;
      margin-bottom: 10px;
    }
    .user-info-show {
      width: 70%;
      margin: 0 auto;
      padding-left: 20px;
      float: left;
      color: #fff;
      .user-score {
        display: flex;
        justify-content: space-between;
        color: #fff;
        font-size: 12px;
        .user-score-before,.user-score-after{
          /*width: 24px;*/
        }
      }
      .user-progress {
        margin-top: 6px;
        width: 152px;
      }
    }
    .user-setup{
      width: 26px;
      height: 25px;
      position: absolute;
      right: 0;
      top:0;
    }
    .weui-progress__bar {
      height: 6px;
      border-radius: 100px;
      background: rgba(255, 255, 255, 0.31);
    }
    .weui-progress__inner-bar {
      background: #fff;
      border-radius: 100px;
    }
  }
</style>
