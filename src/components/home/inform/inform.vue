<template>
  <!--信息披露-->
    <div class="container has-header">
      <mHeader :text="title" :isBack="isBack" @leftBack="leftBack"></mHeader>
      <!--tabbar-->
      <div style="background:#fff;">
        <div style="width: 100%;overflow:scroll;background:#fff;" id="scrollbar">
          <tab style="width:550px;background:#fff;" bar-active-color="rgba(255,255,255,0)" active-color="#FF665E" :line-width="2" :custom-bar-width="getBarWidth" v-model="index">
            <tab-item v-for="(item,index) in list2" :selected="demo2 === index" :key="index"><router-link :to="item.link" @click="changeDemo2(item)">{{item.name}}</router-link><i></i></tab-item>
          </tab>
        </div>
        <!--<swiper v-model="index" height="100px" :show-dots="false">
          <swiper-item v-for="(item, index) in list2" :key="index">
            <div class="tab-swiper vux-center">{{item}} Container</div>
          </swiper-item>
        </swiper>-->
      </div>
      <router-view></router-view>
    </div>
</template>

<script>
    import mHeader from "../../common/m-header.vue";
    import { Tab, TabItem, Swiper, SwiperItem } from 'vux';
    export default {
        data(){
            return {
              title:"信息披露",
              list2: [
                {
                  name:"公司简介",
                  link:"/home/inform/company"
                },
                {
                  name:"平台数据",
                  link:"/home/inform/formdata"
                },
                {
                  name:"风险体系",
                  link:"/home/inform/riskSystem"
                },
                {
                  name:"运营报告",
                  link:"/home/inform/report"
                },
                {
                  name:"平台公告",
                  link:"/home/inform/annment"
                },
                {
                  name:"法律法规",
                  link:"/home/inform/laws"
                }
              ],
              demo2: '',
              index: 0,
              isBack:true,
              getBarWidth: function (index) {
                return (1) * 30 + 'px'
              }
            }
        },
        methods: {
          leftBack(){
            this.$router.push("/");
          },
          getUrl(){
            let url = this.$route.path;
            this.list2.forEach((v,i)=>{
                if(v.link == url){
                this.demo2 = i;
                return;
              }
            });
            console.log(this.demo2);
          },
          changeDemo2(index){
            this.demo2 = index;
          },
          getScroll(){
            if(this.demo2 >= 3){
              let moment = document.getElementById("scrollbar");
              moment.scrollLeft = 300;
            }
          }
        },
        created(){
          this.getUrl()
        },
        mounted() {
          this.getScroll()
        },
        components:{
          mHeader,
          Tab,
          TabItem,
          Swiper,
          SwiperItem
        },
        metaInfo: {
          title: '信息披露'
        },
        metaInfo() {
          return {
            title: this.title
          }
        },
        watch:{
          "$route":function(newval,oldval){
            if(newval.name == "company"){
              this.demo2 = 0;
              console.log(this.demo2);
            }else if(newval.name == "formdata"){
              this.demo2 = 1;
            }else if(newval.name == "riskSystem"){
              this.demo2 = 2;
            }else if(newval.name == "report"){
              this.demo2 = 3;
            }else if(newval.name == "annment"){
              this.demo2 = 4;
            }else if(newval.name == "laws"){
              this.demo2 = 5;
            };
          }
        }
    }
</script>

<style lang="less" scoped>
  @import '~vux/src/styles/1px.less';
  @import '~vux/src/styles/center.less';
  .box {
    padding: 15px;
  }
  .active-6-1 {
    color: rgb(252, 55, 140) !important;
    border-color: rgb(252, 55, 140) !important;
  }
  .active-6-2 {
    color: #04be02 !important;
    border-color: #04be02 !important;
  }
  .active-6-3 {
    color: rgb(55, 174, 252) !important;
    border-color: rgb(55, 174, 252) !important;
  }
  .tab-swiper {
    background-color: #fff;
    height: 100px;
  }
  .vux-tab-bar-inner{
    box-shadow: 0 2px 2px 0 #FD958F;
    border-radius: 100px;
  }
  .vux-tab .vux-tab-item{
    position:relative;
  }
  .vux-tab .vux-tab-item i{
    position:absolute;
    width:30px;
    height:2px;
    left:50%;
    bottom:2px;
    margin-left:-15px;
    border-radius:20px;
  }
  .vux-tab .vux-tab-item a{
    color:#333;
    display:block;
    width:100%;
    height:100%;
  }
  .vux-tab .vux-tab-item.vux-tab-selected a{
    color:#FF665E;
  }
  .vux-tab .vux-tab-item.vux-tab-selected i{
    background:#FF665E;
    box-shadow: 0 2px 2px 0 #FD958F;
  }
</style>
