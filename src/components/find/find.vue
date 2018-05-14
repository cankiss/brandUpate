<template>

  <div class="container has-all">

    <mheader :showBack="false" :redTheme="true" :text="pageTitle"></mheader>

    <section class="main">

      <ul class="grid-links clearfix">
        <li v-for="(item, i) in gridLinksData" :key="i">
          <router-link :to="item.path">
            <img :src="item.url">
            <p class="font-size-14 font-999">{{item.name}}</p>
          </router-link>
        </li>
      </ul>

      <div class="activity-caption" v-if="activityData.length > 0">
        <p class="title font-size-16 text-center">热门活动</p>
        <p class="sub-title font-size-12 font-999 text-center">精彩活动 约惠专区</p>
      </div>

      <div v-infinite-scroll="getActivityData" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
        <ul class="activity-list">
          <li v-for="(item, i) in activityData" :key="i">
            <a :href="item.redirect ? item.redirect : 'javascript:;'">
              <p class="title font-size-16 red-text">{{item.name}}</p>
              <p class="date font-size-12 font-999">{{item.description}}　</p>
              <img class="img" :src="item.url">
              <p class="status font-size-12 red-text" :class="{statusEnd: item.status != 1}">{{item.status | bannerStatusFliter}}</p>
            </a>
          </li>
        </ul>
      </div>

      <load-more v-if="showLoadMoreFooterLine" class="find-load-more" :show-loading="false" :tip="loadMoreLineText" background-color="#f5f5f5"></load-more>

    </section>

    <mfooter :pageName="pageName"></mfooter>

  </div>

</template>

<script>

  import mheader from '../common/m-header.vue';
  import mfooter from '../common/m-footer.vue';
  import {LoadMore} from 'vux'

  export default {
    components: {
      mheader, mfooter, LoadMore
    },
    data() {
      return {
        pageTitle: '发现',
        pageName: 'find',
        busy: false,
        pageNum: 1,
        loadMoreLineText: '我是有底线的',
        showLoadMoreFooterLine: false,
        gridLinksData: [{
          path: '/find/memberClub/memberright',
          name: '',
          url: ''
        }, {
          path: '/home/invitFriend/2',
          name: '',
          url: ''
        }, {
          path: '/find/customerService',
          name: '',
          url: ''
        }, {
          path: '/find/aboutAPP',
          name: '',
          url: ''
        }, {
          path: '/find/lectureRoom',
          name: '',
          url: ''
        }, {
          path: '/find/suggest',
          name: '',
          url: ''
        }, {
          path: '/find/help/project',
          name: '',
          url: ''
        }, {
          path: '/find/wechat',
          name: '',
          url: ''
        }],
        activityData: []
      }
    },
    metaInfo() {
      return {
        title: this.pageTitle
      }
    },
    created() {
      this.getGridLinksData();
    },
    methods: {
      getGridLinksData() {
        this.$post('icon/getMenu', {use: 3}).then(res => {
          if (res.code == '200') {
            if (res.model && res.model.length > 0) {
              res.model.forEach((item, i) => {
                let tempItem = this.gridLinksData[parseInt(item.location) - 1];
                tempItem.name = item.name;
                tempItem.url = item.url;
                item.redirect && (tempItem.path = item.redirect);
              });
            } else {
              this.$vux.toast.show({type: 'text', text: '暂无菜单数据', position: 'middle', width: '60%'});
            }
          } else {
            this.$vux.toast.show({type: 'text', text: res.msg, position: 'middle', width: '60%'});
          }
        });
      },
      getActivityData() {
        this.busy = true;
        //setTimeout(() => {
        this.$post('icon/getHotActivity', {
          use: 3,
          pageNum: this.pageNum++,
          pageSize: 5
        }).then(res => {
          if (res.code == '200') {
            if (res.model && res.model.iconManagementList && res.model.iconManagementList.length > 0) {
              this.activityData = this.activityData.concat(res.model.iconManagementList);
              this.busy = false;
            } else {
              if (this.activityData.length == 0) {
                this.$vux.toast.show({type: 'text', text: '暂无活动数据', position: 'middle', width: '60%'});
              } else {
                this.showLoadMoreFooterLine = true;
              }
            }
          }
          else {
            this.$vux.toast.show({type: 'text', text: res.msg, position: 'middle', width: '60%'});
          }
        });
        //}, 1000);
      }
    }
  }

</script>

<style scoped>

  .grid-links {
    margin-bottom: 10px;
    background-color: #fff;
    padding-top: 20px;
  }

  .grid-links li {
    float: left;
    display: inline;
    width: 25%;
    margin-bottom: 15px;
  }

  .grid-links li img {
    display: block;
    width: 50px;
    height: 50px;
    margin: 0 auto;
  }

  .grid-links li p {
    margin-top: 5px;
    text-align: center;
  }

  .activity-caption {
    padding: 5px 0;
    background-color: #fff;
    border-bottom: 1px solid #f6f6f6;
  }

  .activity-caption .title {
    color: #000;
    position: relative
  }

  .activity-caption .title:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -3px;
    margin-left: -48px;
    width: 6px;
    height: 6px;
    background-image: linear-gradient(-180deg, #FF9F97 0%, #FF665E 100%);
    border-radius: 6px;
  }

  .activity-caption .title:after {
    content: '';
    position: absolute;
    top: 50%;
    right: 50%;
    margin-top: -3px;
    margin-right: -48px;
    width: 6px;
    height: 6px;
    background-image: linear-gradient(-180deg, #FF9F97 0%, #FF665E 100%);
    border-radius: 6px;
  }

  .activity-caption .sub-Title {
  }

  .activity-list {
  }

  .activity-list li {
    background-color: #fff;
    margin-bottom: 5px;
    padding: 10px 20px;
    position: relative;
  }

  .activity-list li .title {
    margin-bottom: 6px;
  }

  .activity-list li .date {
    margin-bottom: 5px;
  }

  .activity-list li .img {
    width: 100%;
  }

  .activity-list li .status {
    position: absolute;
    top: 25px;
    right: 20px;
    background-color: #fff;
    border: 1px solid #fe6862;
    border-radius: 2px;
    padding: 0 10px;
  }

  .activity-list li .status.statusEnd {
    color: #999;
    border-color: #999;
  }

</style>

<style>

  .find-load-more.weui-loadmore_line {
    line-height: 22px !important;
    margin: 22px auto 0 auto !important;
    border-top: 1px solid #d8d8d8 !important;
  }

  .find-load-more.weui-loadmore_line .weui-loadmore__tips {
    font-size: 16px !important;
    top: -13px !important;
  }

</style>
