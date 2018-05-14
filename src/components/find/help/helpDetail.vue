<template>

  <div class="container has-header">

    <mheader :text="pageTitle" @rightMore="jumpCall">
      <img slot="rightHtml" src="../../../assets/common/call-gray.png">
    </mheader>

    <section class="main">

      <div class="help-detail-box">
        <p class="help-title font-size-14 font-333">{{currentData.title}}</p>
        <div class="help-content font-size-12 font-666" v-html="currentData.content"></div>
      </div>

    </section>

  </div>

</template>

<script>

  import mheader from '../../common/m-header.vue';

  export default {
    components: {
      mheader
    },
    data() {
      return {
        pageTitle: '帮助中心',
        currentData: {}
      }
    },
    metaInfo() {
      return {
        title: this.pageTitle
      }
    },
    created() {
      this.getData();
    },
    methods: {
      jumpCall() {
        this.$router.push('/find/customerService');
      },
      getData() {
        let helpId = this.$route.params.helpId;
        if (helpId) {
          this.$post('icon/getHelpById', {
            helpId: helpId
          }).then(res => {
            if (res.code == '200') {
              this.currentData = res.model;
            } else {
              this.$vux.toast.show({type: 'text', text: res.msg, position: 'middle', width: '60%'});
            }
          });
        } else {
          this.$vux.toast.show({type: 'text', text: '缺少参数', position: 'middle', width: '60%'});
        }
      }
    }
  }

</script>

<style scoped>

  .help-detail-box {
    background-color: #fff;
  }

  .help-title {
    padding: 10px 15px;
    line-height: 18px;
    border-bottom: 1px solid #f6f6f6;
  }

  .help-content {
    padding: 10px 15px 20px;
    line-height: 20px;
  }

</style>
