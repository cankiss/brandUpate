<template>

  <div class="container has-header">

    <mheader :text="pageTitle"></mheader>

    <section class="mainCont">
      <img src="../../../assets/find/lectureRoom/upgrade.png" alt="">
      <div class="midCont">
        <ul>
          <li class="use">
            <h3>新手标加入亿宝智投</h3>
            <p> 新手标全新升级，加入亿宝智投，12%的近七日历史年化收益率，随时出借，仅限一次，上限5万</p>
            <br/>
            <p> 升级后的亿宝智投新手专享，最长可持有12个月。默认锁定期1个月，如第一个月锁定期到期前三天没申请退出会继续持有，接下来每个月都可申请退出，系统会在锁定到期日的次日发起退出</p>
            <br>
            <p>升级前出借的非亿宝智投的新手标不会自动续投，无需申请退出。</p>
          </li>
          <li class="use">
            <h3>加入亿宝智投后的好处</h3>
            <p style="font-weight: 700">加入亿宝智投后的新手专享，最长可持有12个月，近七日历史年化收益率12%</p>
            <br/>
            <p>新手专享锁定期到期后可继续持有的，续投期的每个月都能申请退出，资金灵活 </p>
            <br/>
            <p style="font-weight: 700">加入亿宝智投后，系统智能匹配标的，资金不站岗</p>
            <br/>
            <span>出借流程：</span>
            <img src="../../../assets/find/lectureRoom/upgrade-pro.png" alt="">
          </li>
        </ul>
      </div>
      <div class="last">
        <!--<router-link to="/pro/ztDetail/XSB0002">立即出借</router-link>-->
        <!--<router-link to="/pro/ztlist">立即出借</router-link>-->
        <a href="javascript:;" @click="goXSB">立即出借</a>
      </div>
    </section>

  </div>

</template>

<script>

  import mheader from '~/common/m-header.vue';

  export default {
    components: {
      mheader
    },
    data() {
      return {
        pageTitle: "新手标升级啦！",
      }
    },
    metaInfo() {
      return {
        title: this.pageTitle
      }
    },
    methods: {
      goXSB() { //调用iOS、Android、h5
        let sbType = this.storage.get('sbType');
        sbType ? (this.appBridge.sendData(sbType, 'goXSB')) : (this.$router.push('/pro/ztlist'));
      }
    }
  }

</script>

<style scoped>

  .mainCont {
    position: relative;
  }

  .midCont {
    width: 100%;
    box-sizing: border-box;
    padding: 0 15px;
    margin-top: -30px;
  }

  .use {
    background-color: #fff;
    border-radius: 10px;
    position: relative;
    text-align: center;
  }

  .present li {
    font-size: 14px;
    line-height: 20px;
    color: #333333;
    margin-bottom: 10px;
  }

  i {
    display: inline-block;
    color: #FF665E;
  }

  .present li:last-child {
    margin-bottom: 0px;
  }

  h3 {
    display: inline-block;
    font-size: 16px;
    color: #43A0FF;
    line-height: 22px;
    position: relative;
    margin-bottom: 15px;
  }

  h3:after,
  h3:before {
    content: "";
    width: 12px;
    height: 12px;
    background: url("../../../assets/find/lectureRoom/icon2.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 5px;
  }

  h3:before {
    left: -30px;
  }

  h3:after {
    right: -30px;
  }

  .use {
    padding: 10px 25px;
    margin-top: 15px;
    margin-bottom: 10px;
  }

  .use p {
    text-align: left;
    font-size: 14px;
    color: #333333;
  }

  .use span {
    display: block;
    text-align: left;
    font-size: 14px;
    color: #43A0FF;
    margin-bottom: 10px;
  }

  .use img {
    width: 100%;
  }

  .last {
    width: 100%;
    background-color: #FF665E;
    text-align: center;
    line-height: 44px;
  }

  .last a {
    display: block;
    color: #fff;
    font-size: 18px;
  }

</style>
