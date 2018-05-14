<template>

  <div class="container has-header">

    <mheader :text="pageTitle"></mheader>

    <section class="mainCont">
      <img src="../../../assets/find/lectureRoom/knowSecretary.png" alt="">
      <div class="midCont">
        <div class="present">
          <p class="title">了解投标小秘书</p>
          <div class=text-center><h3>“投标小秘书”是什么啊?</h3></div>
          <div class="txt clearfix">
            <div class="left"></div>
            <div class="right">
              <p class="text-left">“投标小秘书”是受用户委托，授权系统自动投标、自动复投的智能出借服务。“投标小秘书”在用户认可的标的范围内，对符合要求的标的进行自动投标。</p>
            </div>
          </div>
        </div>
        <div class="use">
          <h3>“投标小秘书”怎么使用啊?</h3>
          <p>第一步.“选择投标小秘书”</p>
          <img src="../../../assets/find/lectureRoom/money.png" alt="">
        </div>
        <div class="second">
          <p>第二步.完成一下设置开启“投标小秘书”</p>
          <ul>
            <li v-for="item in items">
              <p><span></span>{{item.title}}</p>
              <img :src="item.imgurl">
            </li>
          </ul>
        </div>
      </div>
      <div class="last">
        <!--<router-link to="/mine/secretary">立即设置</router-link>-->
        <a href="javascript:;" @click="goSecretary">立即设置</a>
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
        pageTitle: '投标小秘书',
        items: [{
          title: "请设置您每日投资的最大金额",
          imgurl: require("@/assets/find/lectureRoom/max.png")
        }, {
          title: "设置您自动出借的项目",
          imgurl: require("@/assets/find/lectureRoom/product.png")
        }, {
          title: "设置自动出借的次数",
          imgurl: require("@/assets/find/lectureRoom/numb.png")
        }, {
          title: "输入交易密码后勾选授权协议,保存选择后完成设置",
          imgurl: require("@/assets/find/lectureRoom/passw.png")
        }, {
          title: "选择“开启”或“关闭”自动出借功能",
          imgurl: require("@/assets/find/lectureRoom/borrow.png")
        }]
      }
    },
    metaInfo() {
      return {
        title: this.pageTitle
      }
    },
    methods: {
      goSecretary() { //调用iOS、Android、h5
        let sbType = this.storage.get('sbType');
        sbType ? (this.appBridge.sendData(sbType, 'goSecretary')) : (this.$router.push('/mine/secretary'));
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
    margin-top: -60px;
  }

  .present, .use, .second {
    background-color: #fff;
    border-radius: 10px;
    position: relative;
    text-align: center;
  }

  .present {
    padding: 30px 20px 0;
  }

  .present .title {
    background: url("../../../assets/find/lectureRoom/text_bg.png") 100% no-repeat;
    width: 178px;
    font-size: 18px;
    color: #fff;
    height: 39px;
    line-height: 39px;
    border-radius: 25px;
    position: absolute;
    top: -20px;
    left: 50%;
    margin-left: -89px;
    background-size: 100% 100%;
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

  .present .txt {
    width: 100%;
    margin-top: 15px;
    box-sizing: border-box;
    padding: 10px 0px;
  }

  .txt .left {
    width: 78px;
    height: 78px;
    background: url("../../../assets/find/lectureRoom/women.png") 100% no-repeat;
    background-size: 100% 100%;
    float: left;
  }

  .txt .right {
    width: 65%;
    float: right;
    font-size: 14px;
    color: #666666;
    line-height: 20px;
  }

  .use {
    padding: 15px 30px;
    margin-top: 15px;
    margin-bottom: 8px;
  }

  .use p, .second p {
    font-size: 14px;
    color: #333333;
    line-height: 20px;
  }

  .use p {
    margin: 15px;
  }

  .use img {
    width: 100%;
  }

  .second {
    padding: 10px 30px;
    margin-bottom: 10px;
  }

  .second p {
    margin: 15px 0;
  }

  .second ul {
    text-align: left;
  }

  .second li {
    position: relative;
    margin-bottom: 20px;
  }

  .second li p {
    margin: 10px 0;
  }

  .second li p:before {
    content: "";
    display: inline-block;
    border: 2px solid red;
    border-radius: 50%;
    position: absolute;
    left: -14px;
    top: 9px;
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
