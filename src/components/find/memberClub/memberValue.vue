<template>

  <!--会员值明细-->
  <div>
    <div class="member" v-if="isShow">
      <div class="member_info">
        <div class="member_user clearfix">
          <div class="user_logo">
            <img src="../../../assets/find/portrait_user_login@2x.png">
          </div>
          <div class="user_info">
            <p class="user_name">{{ valueData.mobile }}</p>
            <div class="user_press clearfix">
              <div class="current_level" style="text-align: left;" v-if="(valueData.data.isMaxGrade == '1')">
                <p class="current_level_name">
                  {{`${valueData.data.memberName}&nbsp;&nbsp;${valueData.memberPoints}点`}}</p>
                <p class="current_level_branch">太棒了，您已达到最高等级!</p>
              </div>
              <div class="current_level" v-if="!(valueData.data.isMaxGrade == '1')">
                <p class="current_level_name">{{ valueData.data.memberName }}</p>
                <p class="current_level_branch">{{ valueData.data.rateDown }}</p>
              </div>
              <div class="press_level" v-if="!(valueData.data.isMaxGrade == '1')">
                <div class="current_press" :style="'width:' + valueData.memberPointsPercent + '%'">
                  <div class="press_ball">
                    <div class="even_worse" :class="{align_right: valueData.memberPointsPercent > 50}">还差<i
                      class="differ">{{ valueData.updateMemberShort }}</i>点
                    </div>
                  </div>
                </div>
              </div>
              <div class="next_level" v-if="!(valueData.data.isMaxGrade == '1')">
                <p class="next_level_name">{{ valueData.data.nextGradeMemberName }}</p>
                <p class="next_level_branch">{{ valueData.data.nextGradeRateDown }}</p>
              </div>
            </div>
          </div>
          <div class="press_logo">
            <img :src="valueData.data.memberPic">
            <span class="press_title">{{ valueData.data.memberName }}</span>
          </div>
        </div>
        <div class="check_detail clearfix">
          <a href="javascript:;" class="rising_grade">
            <span class="detail_name">{{ valueData.data.memberName }}</span>
            <!--<router-link to="/pro/ztlist" class="goBtn rising_btn">升等级</router-link>-->
            <a href="javascript:;" @click="goZhiTou" class="goBtn rising_btn">升等级</a>
          </a>
          <a href="javascript:;" class="see_details">
            <span class="detail_point"><i class="differ">{{ valueData.memberPoints }}</i>点</span>
            <!--<router-link to="/find/memberClub/detail" class="goBtn">看明细</router-link>-->
            <a href="javascript:;" @click="goMemberPointsDetails" class="goBtn">看明细</a>
          </a>
          <i class="detail_line"></i>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

  export default {
    data() {
      return {
        valueData: {},
        isShow: false
      }
    },
    methods: {
      goMemberPointsDetails() { //调用iOS、Android、h5
        let sbType = this.storage.get('sbType');
        sbType ? (this.appBridge.sendData(sbType, 'goMemberPointsDetails')) : (this.$router.push('/find/memberClub/detail'));
      },
      goZhiTou() { //调用iOS、Android、h5
        let sbType = this.storage.get('sbType');
        sbType ? (this.appBridge.sendData(sbType, 'goZhiTou')) : (this.$router.push('/pro/ztlist'));
      },
      getValues() {
        this.$post("member/getMemberPointInfo", {userId: this.storage.get("user_id")}).then(res => {
          if (res.code == "200") {
            this.valueData = res.model;
            this.isShow = true;
          } else {
            this.$vux.toast.show({
              type: 'text',
              text: res.msg,
              position: 'middle'
            });
          }
        })
      }
    },
    created() {
      this.getValues();
    }
  }

</script>

<style scoped>

  .member {
    background: #f5f5f5;
    padding: 16px 12px 6px 12px;
  }

  .member_info {
    background: url(../../../assets/find/member_bg.png) no-repeat 0 0;
    background-size: 100% 100%;
    padding-bottom: 20px;
  }

  .member_user {
    padding: 30px 0 0 30px;
    position: relative;
  }

  .user_logo {
    float: left;
    width: 58px;
    height: 58px;
    border-radius: 50%;
    overflow: hidden;
  }

  .user_logo img {
    display: block;
    width: 100%;
  }

  .user_info {
    float: left;
    margin-left: 15px;
  }

  .user_info .user_name {
    font-size: 16px;
    color: #FFFFFF;
  }

  .user_press {
    margin-top: 15px;
  }

  .current_level, .next_level {
    float: left;
    color: #fff;
    text-align: center;
  }

  .current_level_name, .next_level_name {
    font-size: 14px;
  }

  .current_level_branch, .next_level_branch {
    font-size: 12px;
  }

  .press_level {
    float: left;
    margin-left: 10px;
    margin-right: 10px;
    width: 130px;
    height: 3px;
    background: #fff;
    margin-top: 10px;
    border-radius: 10px;
    position: relative;
  }

  .current_press {
    display: block;
    width: 0;
    height: 3px;
    background-color: #ffdd7e;
    border-radius: 10px;
    line-height: 0;
    text-align: right;
  }

  .press_ball {
    position: relative;
    display: inline-block;
    width: 9px;
    height: 9px;
    background-color: #ffdd7e;
    border-radius: 50%;
    margin-top: -3px;
  }

  .even_worse {
    position: absolute;
    bottom: -22px;
    left: 0;
    height: 22px;
    font-size: 12px;
    color: #fff;
    line-height: 22px;
    white-space: nowrap;
  }

  .even_worse.align_right {
    left: auto;
    right: 0;
  }

  .press_logo {
    width: 94px;
    height: 34px;
    position: absolute;
    right: 0;
    top: 12px;
    background-image: linear-gradient(90deg, rgba(255, 255, 255, 0.84) 2%, rgba(255, 255, 255, 0.72) 39%, rgba(255, 255, 255, 0.44) 64%);
    border-radius: 34px 0 0 34px;
  }

  .press_logo img {
    width: 28px;
    height: 28px;
    float: left;
    margin-left: 10px;
    margin-top: 3px;
    position: relative;
    z-index: 9;
  }

  .press_title {
    float: left;
    width: 50px;
    height: 15px;
    background: url(../../../assets/find/icon_red.png) no-repeat;
    background-size: 100% 100%;
    margin-top: 10px;
    margin-left: -5px;
    color: #fff;
    font-size: 12px;
    line-height: 16px;
    text-indent: 9px;
  }

  .check_detail {
    margin-top: 30px;
    position: relative;
  }

  .check_detail a {
    float: left;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    font-size: 18px;
    position: relative;
  }

  .check_detail a.rising_grade {
    width: 46%;
  }

  .check_detail a.see_details {
    width: 54%;
  }

  .check_detail span {
    float: left;
    color: #fff;
    font-size: 14px;
    line-height: 24px;
    margin-left: 10px;
  }

  .check_detail span.detail_name {
    margin-left: 20px;
  }

  .check_detail span.btn,
  .check_detail .goBtn {
    position: absolute;
    top: 0;
    right: 10px;
    width: 63px;
    height: 24px;
    font-size: 14px;
    background: rgba(255, 255, 255, 0.26);
    border: 1px solid rgba(255, 255, 255, 0.37);
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    text-align: center;
    line-height: 24px;
    color: #fff;
    border-radius: 24px;
  }

  .check_detail .goBtn.rising_btn {
    right: 10px;
  }

  .detail_line {
    position: absolute;
    width: 2px;
    height: 20px;
    left: 46%;
    top: 50%;
    margin-left: -1px;
    margin-top: -10px;
    background: rgba(255, 255, 255, 0.63);
    box-shadow: 1px 0 0 0 rgba(255, 255, 255, 0.35);
  }

</style>
