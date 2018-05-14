<template>

  <div class="container has-header">

    <mheader :text="pageTitle"></mheader>

    <section class="main" style="padding-bottom: 61px;">

      <img src="../../../assets/find/customerService/banner.jpg">

      <ul class="service-main clearfix">
        <li>
          <div class="wrap">
            <p class="caption">客服电话<a href="tel:400-091-8080" class="btn">呼叫</a></p>
            <p class="sub-caption">400-091-8080</p>
          </div>
        </li>
        <li>
          <div class="wrap">
            <p class="caption">客服邮箱
              <button class="btn" :data-clipboard-text="email">复制</button>
            </p>
            <p class="sub-caption">{{email}}</p>
          </div>
        </li>
      </ul>

      <ul class="service-list">
        <li>
          <span class="caption">客服QQ1</span>
          <span class="content">{{qqA}}</span>
          <button class="btn" :data-clipboard-text="qqA">复制</button>
        </li>
        <li>
          <span class="caption">客服QQ2</span>
          <span class="content">{{qqB}}</span>
          <button class="btn" :data-clipboard-text="qqB">复制</button>
        </li>
        <li>
          <span class="caption">官方微信</span>
          <span class="content">{{wechat}}</span>
          <button class="btn" :data-clipboard-text="wechat">复制</button>
        </li>
        <li>
          <span class="caption">新浪微博</span>
          <span class="content">{{sina}}</span>
          <button class="btn" :data-clipboard-text="sina">复制</button>
        </li>
      </ul>

      <p class="service-time font-size-12 font-999 text-center">
        <span class="font-size-14">服务时间</span><br>9:00-21:00 周一到周日（法定节假日除外）
      </p>

    </section>

  </div>

</template>

<script>

  import mheader from '../../common/m-header.vue';

  let clipboard = require('clipboard');

  export default {
    components: {
      mheader
    },
    data() {
      return {
        pageTitle: '客服助手',
        email: 'kefu@001bank.com',
        qqA: '4000223030',
        qqB: '2765858100',
        wechat: '亿宝金服',
        sina: '亿宝贷'
      }
    },
    metaInfo() {
      return {
        title: this.pageTitle
      }
    },
    mounted() {
      let _this = this;
      _this.$nextTick(() => {
        let clipboardObj = new clipboard('[data-clipboard-text]');
        clipboardObj.on('success', function (e) {
        	e.clearSelection();
          _this.$vux.toast.show({
            type: 'text',
            text: '复制成功',
            position: 'middle',
            width:"60%"
          });
        });
        clipboardObj.on('error', function (e) {
          _this.$vux.toast.show({
            type: 'text',
            text: '您的浏览器暂不支持<br>复制功能，请长按复制',
            position: 'middle',
            width:"60%"
          });
        });

      });
    }
  }

</script>

<style scoped>

  .service-main {
    margin: 10px 0;
    background-color: #fff;
  }

  .service-main li {
    float: left;
    display: inline;
    box-sizing: border-box;
    width: 50%;
    padding: 25px 0 25px 64px;
  }

  .service-main li:first-child {
    background: url("../../../assets/find/customerService/call.png") no-repeat 17px center;
    background-size: 30px 28px;
  }

  .service-main li:last-child {
    background: url("../../../assets/find/customerService/email.png") no-repeat 17px center;
    background-size: 30px 23px;
  }

  .service-main li:first-child .wrap {
    border-right: 1px solid #eee;
  }

  .service-main li .wrap .caption {
    font-size: 14px;
    color: #333;
  }

  .service-main li .wrap .caption .btn {
    display: inline-block;
    width: auto;
    height: 20px;
    margin: 0;
    padding: 0;
    border: 0;
    margin-left: 5px;
    padding: 0 10px;
    background-color: #FF665E;
    border-radius: 4px;
    font-size: 12px;
    color: #fff;
    text-align: center;
    line-height: 20px;
  }

  .service-main li .wrap .sub-caption {
    font-size: 12px;
    color: #999;
  }

  @media (max-width: 374px) {
    .service-main li {
      padding-left: 40px;
    }

    .service-main li:first-child {
      background-position-x: 5px;
    }

    .service-main li:last-child {
      background-position-x: 5px;
    }
  }

  .service-list {
    background-color: #fff;
  }

  .service-list li {
    padding: 10px 10px 10px 16px;
    border-bottom: 1px solid #f6f6f6;
    position: relative;
  }

  .service-list li:last-child {
    border-bottom: 0;
  }

  .service-list li .caption {
    font-size: 14px;
    color: #666;
  }

  .service-list li .content {
    margin-left: 30px;
    font-size: 14px;
    color: #333;
  }

  .service-list li .btn {
    position: absolute;
    top: 50%;
    right: 10px;
    width: auto;
    height: auto;
    margin: 0;
    padding: 0;
    border: 0;
    background-color: #fff;
    padding: 0 10px;
    border: 1px solid #FF665E;
    border-radius: 4px;
    font-size: 12px;
    color: #FF665E;
    text-align: center;
    height: 20px;
    line-height: 20px;
    margin-top: -10px;
  }

  .service-time {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 10px 0;
    background-color: #f5f5f5;
  }

</style>
