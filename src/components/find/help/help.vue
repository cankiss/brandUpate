<template>

  <div class="container has-header">

    <mheader :text="pageTitle" @rightMore="jumpCall" :isBack="isBack" @leftBack="leftBack">
      <img slot="rightHtml" src="../../../assets/common/call-gray.png">
    </mheader>

    <section class="main">

      <p class="caption font-size-14 font-333">热门问题</p>

      <ul class="hotHelpList clearfix">
        <li v-for="(item, i) in hotHelpList" :key="i">
          <router-link :to="item.path" class="font-size-14 font-999">{{item.keyword}}</router-link>
        </li>
      </ul>

      <p class="caption">问题分类</p>

      <tab class="help-tab" :line-width=6 defaultColor="#333" active-color="#333" :animate="false" v-model="index">
        <tab-item class="vux-center" :selected="index === i" v-for="(item, i) in tabs" :key="i" :active-class="`active-${item.tabName}`" :data-tabName="`tabName-${item.tabName}`">{{item.title}}</tab-item>
      </tab>

      <swiper class="help-swiper" v-model="index" :show-dots="false" @on-index-change="onIndexChange">
        <swiper-item v-for="(item, i) in tabs" :key="i">
          <div class="tab-swiper vux-center">
            <group>
              <cell v-for="(t, j) in item.list" :key="j" :title="`${j+1}. ${t.title}`" :link="{path: t.path}" :border-intent="false"></cell>
            </group>
          </div>
        </swiper-item>
      </swiper>

    </section>

  </div>

</template>

<script>

  import mheader from '../../common/m-header.vue';
  import {Tab, TabItem, Swiper, SwiperItem, Group, Cell} from 'vux';

  export default {
    components: {
      mheader, Tab, TabItem, Swiper, SwiperItem, Group, Cell
    },
    data() {
      return {
        pageTitle: '帮助中心',
        isBack: true,
        index: 0,
        hotHelpList: [],
        tabs: {
          project: {
            title: '项目相关',
            index: 0,
            tabName: 'project',
            list: []
          },
          business: {
            title: '业务相关',
            index: 1,
            tabName: 'business',
            list: []
          },
          account: {
            title: '账户相关',
            index: 2,
            tabName: 'account',
            list: []
          }
        }
      }
    },
    metaInfo() {
      return {
        title: this.pageTitle
      }
    },
    created() {
      this.getData();
      this.renderData();
    },
    watch: {
      $route: function () {
        this.renderData();
      }
    },
    methods: {
      jumpCall() {
        this.$router.push('/find/customerService');
      },
      leftBack() {
        this.$router.push("/find");
      },
      getPath(index) {
        let tabName = '';
        for (let keyName in this.tabs) {
          if (this.tabs[keyName].index == index) {
            tabName = this.tabs[keyName].tabName;
            break;
          }
        }
        return `/find/help/${tabName}`;
      },
      onIndexChange(index) {
        this.$router.push(this.getPath(index));
      },
      getData() {
        this.$post('icon/getHelp', {pageNum: 1, pageSize: 9999}).then(res => {
          if (res.code == '200') {

            //获取热门问题
            let hotData = [];
            res.model.hot.forEach((item, i) => {
              hotData.push({
                keyword: item.keyword,
                path: `/find/help/${item.columncode}/${item.id}`
              });
            });
            this.hotHelpList = hotData;

            //获取每个分类的问题
            for (let keyName in this.tabs) {
              let tempData = [];
              res.model[keyName].helpCenterList.forEach((item, i) => {
                tempData.push({
                  title: item.title,
                  path: `/find/help/${item.columncode}/${item.id}`,
                });
              });
              this.tabs[keyName].list = tempData;
            }

            let projectNum = this.tabs.project.list.length;
            let businessNum = this.tabs.business.list.length;
            let accountNum = this.tabs.account.list.length;

            let temp = [projectNum, businessNum, accountNum];
            let maxNum = Math.max.apply(null, temp);
            document.querySelector(".vux-swiper").style.height = maxNum * 44 + "px";

          } else {
            this.$vux.toast.show({type: 'text', text: res.msg, position: 'middle', width: '60%'});
          }
        });
      },
      renderData() {
        let tabName = this.$route.params.tabName;
        if (tabName && this.tabs[tabName]) {
          this.index = this.tabs[tabName].index;
        }
      }
    }
  }

</script>

<style scoped>

  .caption {
    padding: 5px 10px 10px;
  }

  .hotHelpList {
    padding: 0 0 0 15px;
  }

  .hotHelpList li {
    float: left;
    display: inline;
    margin: 0 15px 15px 0;
  }

  .hotHelpList li a {
    display: block;
    box-sizing: border-box;
    padding: 0 18px;
    line-height: 30px;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #f7f7f7;
    box-shadow: 0 2px 5px 0 rgba(228, 228, 228, 0.50);
  }

</style>

<style>

  .help-tab .active-project {
    border-color: #FF665E !important;
  }

  .help-tab .active-business {
    border-color: #BBD7FF !important;
  }

  .help-tab .active-account {
    border-color: #FFCD7C !important;
  }

  .help-tab.vux-tab {
    height: 88px !important;
    margin-bottom: 10px !important;
  }

  .help-tab.vux-tab .vux-tab-item {
    position: relative;
    background: none !important;
    padding-top: 44px !important;
  }

  .help-tab.vux-tab .vux-tab-item + .vux-tab-item:before {
    content: '';
    display: block;
    position: absolute;
    top: 13px;
    bottom: 6px;
    width: 1px;
    background-color: #f1f1f1;
    overflow: hidden;
    font-size: 0;
    line-height: 0;
  }

  .help-tab.vux-tab .vux-tab-item[data-tabName="tabName-project"] {
    background: url(../../../assets/find/help/project.png) no-repeat center 24px !important;
    background-size: 32px 28px !important;
  }

  .help-tab.vux-tab .vux-tab-item[data-tabName="tabName-business"] {
    background: url(../../../assets/find/help/business.png) no-repeat center 23px !important;
    background-size: 33px 31px !important;
  }

  .help-tab.vux-tab .vux-tab-item[data-tabName="tabName-account"] {
    background: url(../../../assets/find/help/account.png) no-repeat center 23px !important;
    background-size: 30px 30px !important;
  }

  .help-swiper.vux-slider {
  }

  .help-swiper.vux-slider .vux-swiper {
  }

  .help-swiper.vux-slider .vux-swiper .vux-swiper-item {
  }

  .help-swiper.vux-slider .vux-swiper .vux-swiper-item .tab-swiper {
  }

  .help-swiper.vux-slider .vux-swiper .vux-swiper-item .tab-swiper .weui-cells {
    margin-top: 0 !important;
  }

  .help-swiper.vux-slider .vux-swiper .vux-swiper-item .tab-swiper .weui-cells .vux-cell-primary {
    width: 90%;
  }

  .help-swiper.vux-slider .vux-swiper .vux-swiper-item .tab-swiper .weui-cells .vux-cell-primary .vux-label {
    font-size: 14px;
    color: #333;
    overflow: hidden;
    width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

</style>
