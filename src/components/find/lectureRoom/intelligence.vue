<template>

  <div class="container has-header">

    <mheader :text="pageTitle"></mheader>

    <section class="mainCont">
      <img src="../../../assets/find/lectureRoom/intelligence.png" alt="">
      <div class="midCont">
        <div class="present">
          <ol>
            <li><i>1</i>系统根据出借人选择的锁定期，智能匹配标的，投标效率高</li>
            <li><i>2</i>锁定期内回款自动复投，提高资金使用效率，有效避免资金站岗</li>
            <li><i>3</i>进入续投期后每月可申请退出，资金灵活、流动性好</li>
          </ol>
        </div>
        <ul>
          <li class="use" v-for="item in items">
            <h3>{{item.title}}</h3>
            <p>{{item.txt}}</p>
            <img :src="item.imgurl">
          </li>
        </ul>
      </div>
      <div class="last">
        <!--<router-link to="/pro/ztlist">立即出借</router-link>-->
        <a href="javascript:;" @click="goZT">立即出借</a>
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
        pageTitle: "亿宝智投",
        items: [{
          title: "什么是亿宝智投",
          txt: "亿宝贷接受出借人的委托，在募集期内由系统在出借人确定的出借额度内，根据出借人自主选择并确定的出借条件，搜索已经通过亿宝贷发布的项目，并由亿宝贷系统自动完成可出借资金与符合出借条件的项目之间的匹配，同时亿宝贷接受出借人的委托，在出借人选择的亿宝智投项目的锁定期内，就出借人收到的借款人支付的本金及利息再次按出借人选择的出借条件匹配新的项目，以完成回款复投的服务。\n" +
          "您申请退出亿宝智投后，系统将在锁定期到期后次日自动为您进行债权转让，成功转让相应债权或相应借款项目到期视为您退出成功。",
          imgurl: require("@/assets/find/lectureRoom/borrow2.png")
        }, {
          title: "什么是亿宝智投锁定期?",
          txt: "亿宝贷为出借人提供亿宝智投服务后，出借人持有亿宝贷系统为其匹配的借款标或债权转让标的最短期限，自投入服务的资金成功出借之日起算。",
          imgurl: require("@/assets/find/lectureRoom/intellPro.png")
        }, {
          title: "亿宝智投项目如何续投？",
          txt: "锁定期到期前三日，亿宝贷平台会提醒出借人，锁定期即将到期，若出借人不主动申请退出，则默认为续投，续投锁定期均为一个月，续投期间近七日历史年化收益率不变。",
          imgurl: require("@/assets/find/lectureRoom/intellPro1.png")
        }, {
          title: "亿宝智投如何在锁定期进行资产匹配？",
          txt: "加入亿宝智投后，亿宝贷会根据出借人自主选择的锁定期限，为出借人匹配到经由亿宝贷风控审核通过的符合条件的借款标或债权转让标。",
        }]
      }
    },
    metaInfo() {
      return {
        title: this.pageTitle
      }
    },
    methods: {
      goZT() { //调用iOS、Android、h5
        let sbType = this.storage.get('sbType');
        sbType ? (this.appBridge.sendData(sbType, 'goZT')) : (this.$router.push('/pro/ztlist'));
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
    position: relative;
    margin-left: 30px;
  }

  .present li i {
    display: inline-block;
    width: 24px;
    height: 24px;
    line-height: 24px;
    border-radius: 50%;
    color: #59ABFF;
    background-color: #EBF4FE;
    text-align: center;
    position: absolute;
    top: 7px;
    left: -36px;
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
    padding: 15px 25px;
    margin-top: 15px;
    margin-bottom: 10px;
  }

  .use p {
    text-align: left;
    margin: 15px 0;
    font-size: 14px;
    color: #333333;
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
