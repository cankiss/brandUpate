<template>

  <div class="container has-header">

    <mheader :text="pageTitle"></mheader>

    <section class="main">

      <div v-infinite-scroll="getList" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
        <ul class="content">
          <li v-for="(item, i) in lectureRoomData" :key="i">
          <!--<li v-for="(item, i) in items" :key="i">-->
            <a :href="item.redirect ? item.redirect : 'javascript:;'">
              <div class="txt clearfix">
                <span class="title">{{item.name}}</span>
                <span class="more">查看更多</span>
              </div>
              <img :src="item.url">
            </a>
          </li>
        </ul>
      </div>

      <load-more v-if="showLoadMoreFooterLine" class="lectureRoom-load-more" :show-loading="false" :tip="loadMoreLineText" background-color="#f5f5f5"></load-more>

    </section>

  </div>

</template>


<script>

  import mheader from '~/common/m-header.vue';
  import {LoadMore} from 'vux'

  export default {
    components: {
      mheader, LoadMore
    },
    data() {
      return {
        pageTitle: '投标小讲堂',
        busy: false,
        pageNum: 1,
        loadMoreLineText: '我是有底线的',
        showLoadMoreFooterLine: false,
        lectureRoomData: []/*,
        items: [{
          url: require('@/assets/find/lectureRoom/xiaomishu.png'),
          name: "投标小秘书",
          redirect: "http://192.168.10.161:8080/#/find/lectureRoom/secretary"

        }, {
          url: require('@/assets/find/lectureRoom/intell.png'),
          name: "亿宝智投",
          redirect: "http://192.168.10.161:8080/#/find/lectureRoom/intelligence"
        }, {
          url: require('@/assets/find/lectureRoom/short.png'),
          name: "亿宝优选",
          redirect: "http://192.168.10.161:8080/#/find/lectureRoom/preferred"
        }, {
          url: require('@/assets/find/lectureRoom/upgrade.png'),
          name: "新手标升级啦！",
          redirect: "http://192.168.10.161:8080/#/find/lectureRoom/upgrade"
        }]*/
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
        this.$post('icon/getLecture', {
          use: 3,
          pageNum: this.pageNum++,
          pageSize: 5
        }).then(res => {
          if (res.code == '200') {
            if (res.model && res.model.iconManagementList && res.model.iconManagementList.length > 0) {
              this.lectureRoomData = this.lectureRoomData.concat(res.model.iconManagementList);
              this.busy = false;
            } else {
              if (this.lectureRoomData.length == 0) {
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

  .content {
    width: 100%;
  }

  .content li {
    width: 100%;
    background-color: #fff;
    box-sizing: border-box;
    padding: 8px 12px 12px;
    margin-bottom: 10px;
  }

  .content li > a {
    display: block;
    color: #333;
  }

  .content .txt {
    margin-bottom: 8px;
  }

  .txt .title {
    font-size: 16px;
  }

  .txt .more {
    width: 68px;
    display: inline-block;
    border: 1px solid #43A0FF;
    border-radius: 15px;
    color: #43A0FF;
    float: right;
    text-align: center;
    font-size: 12px;
    margin-top: 3px;
  }

  .content li img {
    box-sizing: border-box;
    width: 100%;
    padding: 0 18px;
    height: auto;
  }

</style>

<style>

  .lectureRoom-load-more.weui-loadmore_line {
    line-height: 22px !important;
    margin: 22px auto 0 auto !important;
    border-top: 1px solid #d8d8d8 !important;
  }

  .lectureRoom-load-more.weui-loadmore_line .weui-loadmore__tips {
    font-size: 16px !important;
    top: -13px !important;
  }

</style>
