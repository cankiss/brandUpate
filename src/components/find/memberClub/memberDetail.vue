<template>

  <div class="container has-header">

    <mheader :text="pageTitle"></mheader>

    <section class="main">

      <div class="member-detail">
        <div class="caption clearfix" v-if="list.length > 0">
          <div class="caption-label font-333">成长值明细</div>
          <div class="caption-value font-333">当前成长值：<span class="red-text">{{memberPoints}}</span> 点</div>
        </div>
        <div v-infinite-scroll="getList" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
          <ul class="member-detail-list">
            <li v-for="(item, i) in list" :key="i">
              <p class="detail-title font-size-14 font-333">{{item.typeName}}</p>
              <p class="detail-date font-size-12 font-999">{{item.recordTime}}</p>
              <p class="detail-value font-size-18 font-333">{{item.increment}}</p>
            </li>
          </ul>
        </div>
      </div>

      <load-more v-if="showLoadMoreFooterLine" class="memberDetail-load-more" :show-loading="false" :tip="loadMoreLineText" background-color="#f5f5f5"></load-more>

    </section>

  </div>

</template>

<script>


  import mheader from '../../common/m-header.vue';
  import {LoadMore} from 'vux'

  export default {
    components: {
      mheader, LoadMore
    },
    data() {
      return {
        pageTitle: '成长值明细',
        memberPoints: 0,
        list: [],
        busy: false,
        pageNum: 1,
        loadMoreLineText: '我是有底线的',
        showLoadMoreFooterLine: false
      }
    },
    metaInfo() {
      return {
        title: this.pageTitle
      }
    },
    methods: {
      getList() {
        this.busy = true;
        //setTimeout(() => {
        this.$post('member/getMemberPointRecord', {
          userId: this.storage.get('user_id'),
          pageNum: this.pageNum++,
          pageSize: 20
        }).then(res => {
          if (res.code == '200') {
            if (res.model && res.model.list && res.model.list.length > 0) {
              this.memberPoints = res.model.memberPoints;
              this.list = this.list.concat(res.model.list);
              this.busy = false;
            } else {
              if (this.list.length == 0) {
                this.$vux.toast.show({type: 'text', text: '暂无数据', position: 'middle', width: '60%'});
              } else {
                this.showLoadMoreFooterLine = true;
              }
            }
          } else {
            this.$vux.toast.show({type: 'text', text: res.msg, position: 'middle', width: '60%'});
          }
        });
        //}, 1000);
      }
    }
  }

</script>

<style scoped>

  .main {
    padding-top: 0;
  }

  .member-detail {
    margin: 0 10px 10px;
    background-color: #fff;
  }

  .member-detail .caption {
    margin: 0 10px;
    line-height: 60px;
    border-bottom: 1px solid #f5f5f5;
    padding: 0 10px;
  }

  .member-detail .caption-label {
    float: left;
    display: inline;
    font-size: 15px;
  }

  .member-detail .caption-value {
    float: right;
    display: inline;
    font-size: 15px;
  }

  .member-detail .caption-value span {
    font-size: 18px;
  }

  .member-detail-list {
    margin: 0 20px;
  }

  .member-detail-list li {
    position: relative;
    border-bottom: 1px solid #f5f5f5;
    padding: 10px 0;
  }

  .member-detail-list li:last-child {
    border-bottom: 0;
  }

  .member-detail-list li .detail-title {
    margin-bottom: 1px;
    line-height: 20px;
  }

  .member-detail-list li .detail-date {
    line-height: 18px;
  }

  .member-detail-list li .detail-value {
    position: absolute;
    top: 50%;
    right: 0;
    margin-top: -15px;
    height: 30px;
    line-height: 30px;
  }

</style>

<style>

  .memberDetail-load-more.weui-loadmore_line {
    line-height: 22px !important;
    margin: 22px auto 0 auto !important;
    border-top: 1px solid #d8d8d8 !important;
  }

  .memberDetail-load-more.weui-loadmore_line .weui-loadmore__tips {
    font-size: 16px !important;
    top: -13px !important;
  }

</style>
