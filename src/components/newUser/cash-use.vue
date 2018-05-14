<template>
  <div class="ex-use-tips">
    <div class="font-666 ex-tt">体验金使用流程</div>
    <div class="ex-use-box">
      <div class="ex-use-in in-l">
        <div v-for="(img,index) in imgs" :key="index" :class="img + ' ex-img'"></div>
      </div>
      <div class="ex-use-in in-r">
        <div v-for="(tip,index) in useTips" :key="index" class="ex-tip-item">
          <div class="font-666">{{tip.main}}</div>
          <div class="font-999">{{tip.det}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'cash-use',
    data() {
      return {
        imgs: ['ex-img-01', 'ex-img-02', 'ex-img-03', 'ex-img-04', 'ex-img-05'],
        useTips: [{
          'main': '使用体验金出借',
          'det': '使用体验金出借指定的体验标项目'
        }, {
          'main': '出借3天后收益到期',
          'det': '到期后体验金收回'
        }, {
          'main': '提取收益',
          'det': '收益到账后，进行实名绑卡可直接提取收益到您的银行账户'
        }]
      }
    }
  }
</script>

<style lang="less" scoped>
  .ex-use-tips {
    margin-top: 0.8rem;
    background-color: #ffffff;
    padding: 10px 8px 50px;
    .ex-tt {
      font-size: 16px;
    }
    .ex-use-box {
      .ex-use-in {
        display: inline-block;
        vertical-align: top;
        margin-top: 10px;
        box-sizing: border-box;
        &.in-l {
          width: 9%;
          .ex-img {
            background-size: 100%;
            background-position: center;
            background-repeat: no-repeat;
            width: 100%;
            &.ex-img-01 {
              height: 31px;
              background-image: url("../../assets/new-user/1.png");
            }
            &.ex-img-02, &.ex-img-04 {
              height: 30px;
              background-image: url("../../assets/new-user/bullet.png");
              background-size: auto 100%;
            }
            &.ex-img-03 {
              height: 28px;
              background-image: url("../../assets/new-user/2.png");
            }
            &.ex-img-05 {
              height: 28px;
              background-image: url("../../assets/new-user/3.png");
            }
          }
        }
        &.in-r {
          width: 89%;
          padding-left: 3px;
          box-sizing: border-box;
          .ex-tip-item {
            margin-bottom: 14px;
            .font-999 {
              font-size: 12px;
            }
          }
        }
      }
    }
  }
</style>
