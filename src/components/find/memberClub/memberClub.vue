<template>

  <div class="container has-header">

    <mheader :text="pageTitle" :isBack="isBack" @rightMore="jumpGrade" @leftBack="leftBack">
      <img slot="rightHtml" src="../../../assets/common/icon_question.png">
    </mheader>

    <!--会员明细-->
    <memberValue></memberValue>

    <section class="main">

      <!--tab切换-->
      <ul class="clearfix">
        <li :class="{current: isCurrent}">
          <router-link to="/find/memberClub/memberright">会员权益</router-link>
        </li>
        <li :class="{current: notCurrent}">
          <router-link to="/find/memberClub/growsystem">成长体系</router-link>
        </li>
      </ul>

      <router-view></router-view>

    </section>

    <!--<footer><router-link to="/">去升级</router-link></footer>-->

  </div>

</template>

<script>

  import mheader from '../../common/m-header.vue';
  import memberValue from "./memberValue.vue";

  export default {
    components: {
      mheader,
      memberValue
    },
    data() {
      return {
        pageTitle: '会员俱乐部',
        isCurrent: true,
        notCurrent: false,
        isBack: true
      }
    },
    methods: {
      leftBack() {
        this.$router.push("/find");
      },
      jumpGrade() {
        this.$router.push('/find/memberClub/grade')
      },
      getCurrent() {
        if (this.$route.name == "memberright") {
          this.isCurrent = true;
          this.notCurrent = false;
        } else {
          this.isCurrent = false;
          this.notCurrent = true;
        }
      }
    },
    created() {
      this.getCurrent()
    },
    metaInfo() {
      return {
        title: this.pageTitle
      }
    },
    watch: {
      $route: function (newval, oldval) {
        if (newval.name == "memberright") {
          this.isCurrent = true;
          this.notCurrent = false;
        } else {
          this.isCurrent = false;
          this.notCurrent = true;
        }
      }
    }
  }

</script>

<style scoped>

  /*tab切换*/
  .main ul {
    padding-left: 12px;
    border-bottom: solid 1px #E4E4E4;
  }

  .main li {
    float: left;
    height: 32px;
    width: 120px;
    background: #fff;
    box-shadow: 0 -2px 4px 0 rgba(219, 219, 219, 0.50);
    border-radius: 8px 8px 0 0;
    text-align: center;
    line-height: 32px;
    position: relative;
    border-radius: 8px 8px 0 0;
  }

  .main li:last-child {
    left: -10px;
  }

  .main li a {
    color: #FF4547;
    display: block;
    width: 100%;
    height: 100%;
  }

  .main li.current {
    background: #FF665E;
    box-shadow: 0 -2px 4px 0 #FDB1B2;
    color: #fff;
    z-index: 9;
  }

  .main li.current a {
    color: #fff;
  }

  /*底部*/
  /*footer{height:44px;width:100%;position:fixed;left:0;bottom:0;}
  footer a{display:block;max-width:750px;height:100%;background: #FF665E;text-align:center;line-height:44px;color:#fff;font-size:18px;margin:0 auto;}*/

</style>
