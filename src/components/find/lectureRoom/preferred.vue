<template>

  <div class="container has-header">

    <mheader :text="pageTitle"></mheader>

    <section class="mainCont">
      <img src="../../../assets/find/lectureRoom/preferred-banner.png" alt="">
      <div class="midCont">
        <div class="present">
          <ol>
            <li><i>期限短：</i>7天和14天短期项目， 灵活安排资金，快速收回本金</li>
            <li><i>门槛低：</i>最小出借金额100元，低门槛，出借便捷，自动回款</li>
            <li><i>收益稳定：</i>近七日历史年化收益率5%以上，灵活配置，收益稳定</li>
          </ol>
        </div>
        <ul>
          <li class="use">
            <h3>什么是亿宝优选</h3>
            <p>亿宝优选是亿宝贷为出借人提供的短期出借服务，出借人选择了亿宝优选项目，亿宝贷将为出借人自动匹配经亿宝贷风控严格审核通过的借款标，出借期限到期后，出借人收回本金和利息。</p>
          </li>
          <li class="use">
            <h3>亿宝优选包含的项目</h3>
            <p>目前亿宝贷的亿宝优选包含周周乐和双周盈，都是出借人非常中意的短期灵活的出借项目</p>
            <br/>

            <p><i>周周乐：</i>出借期限7天，近七日历史年化收益率5% ；</p>
            <p><i>双周盈：</i>出借期限14天，近七日历史年化收益率5.2%；</p>
            <br/>
            <img src="../../../assets/find/lectureRoom/preferred-pro.png" alt="">
            <br/>
            <span>出借流程：</span>
            <img src="../../../assets/find/lectureRoom/preferred-pro1.png" alt="">
          </li>
        </ul>
      </div>
      <div class="last">
        <!--<router-link to="/pro/yxlist">立即出借</router-link>-->
        <a href="javascript:;" @click="goYX">立即出借</a>
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
        pageTitle: "亿宝优选",
      }
    },
    metaInfo() {
      return {
        title: this.pageTitle
      }
    },
    methods: {
      goYX() { //调用iOS、Android、h5
        let sbType = this.storage.get('sbType');
        sbType ? (this.appBridge.sendData(sbType, 'goYX')) : (this.$router.push('/pro/yxlist'));
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
    margin-top: -50px;
  }

  .present, .use, .second {
    background-color: #fff;
    border-radius: 10px;
    position: relative;
    text-align: center;
  }

  .present {
    padding: 15px 25px;
    text-align: left;
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
    color: #FF665E;
    line-height: 22px;
    position: relative;
  }

  h3:after,
  h3:before {
    content: "";
    width: 12px;
    height: 12px;
    background: url("../../../assets/find/lectureRoom/icon1.png") no-repeat;
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
    font-size: 12px;
    color: #333333;
  }

  .use span {
    display: block;
    text-align: left;
    font-size: 14px;
    color: #FF665E;
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
