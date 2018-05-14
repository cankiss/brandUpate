<template>
    <!--公司简介-->
    <div class="company">
      <ul class="clearfix brief">
        <li v-for="(item,index) in brief" :key="index" class="clearfix">
          <img :src="item.icon" alt="">
          <p>
            <span>{{item.desc}}</span><br/>{{item.title}}
          </p>
        </li>
      </ul>
      <p class="duce">亿宝贷(www.001bank.com)是善林（上海）金融信息服务有限公司旗下的互联网金融平台。总部于2013年注册于上海自贸区，注册资本人民币12亿元(实缴)；位于繁华的上海张江高科技园区，为国内较早开展互联网金融业务的公司之一。				
      </p>
      <!--基本信息-->
      <group class="companyfold">
        <cell
          :title="foldtitle"
          is-link
          :border-intent="false"
          :arrow-direction="showContentfold ? 'up' : 'down'"
          @click.native="showContentfold = !showContentfold"></cell>
        <div class="slide" :class="showContentfold?'animate':''">
          <fold></fold>
        </div>
      </group>
      <!--组织架构-->
      <group class="companyfold">
        <cell
          :title="structtitle"
          is-link
          :border-intent="false"
          :arrow-direction="showContentstruct ? 'up' : 'down'"
          @click.native="showContentstruct = !showContentstruct"></cell>
        <div class="slide" :class="showContentstruct?'animate':''">
          <struct></struct>
        </div>
      </group>
      <!--股东信息-->
      <group class="companyfold">
        <cell
          :title="holdertitle"
          is-link
          :border-intent="false"
          :arrow-direction="showContentholder ? 'up' : 'down'"
          @click.native="showContentholder = !showContentholder"></cell>
        <div class="slide" :class="showContentholder?'animate':''">
          <holder></holder>
        </div>
      </group>
      <!--高管信息-->
      <group class="companyfold">
        <cell
          :title="seniortitle"
          is-link
          :border-intent="false"
          :arrow-direction="showContentsenior ? 'up' : 'down'"
          @click.native="showContentsenior = !showContentsenior"></cell>
        <div class="slide" :class="showContentsenior?'animate':''">
          <senior></senior>
        </div>
      </group>
      <!--员工信息-->
      <group class="companyfold">
        <cell
          :title="stafftitle"
          is-link
          :border-intent="false"
          :arrow-direction="showContentstaff ? 'up' : 'down'"
          @click.native="showContentstaff = !showContentstaff"></cell>
        <div class="slide staffslide" :class="showContentstaff?'animate':''">
          <staff></staff>
        </div>
      </group>
    </div>
</template>

<script>
    import fold from "./fold.vue";
    import struct from "./struct.vue";
    import holder from "./holder.vue";
    import senior from "./senior.vue";
    import staff from "./staff.vue";
    import { Cell,Group } from 'vux'
    export default {
        data(){
            return {
              foldtitle:"基本信息",
              structtitle:"组织架构",
              holdertitle:"股东信息",
              seniortitle:"高管信息",
              stafftitle:"员工信息",
              showContentfold:false,
              showContentstruct:false,
              showContentholder:false,
              showContentsenior:false,
              showContentstaff:false,
              brief:[
                {
                  icon:require("@/assets/home/icon_setup.png"),
                  desc:"2013年",
                  title:"成立于"
                },
                {
                  icon:require("@/assets/home/icon_location.png"),
                  desc:"上海",
                  title:"总部位于"
                },
                {
                  icon:require("@/assets/home/icon_capital.png"),
                  desc:"12亿",
                  title:"注册资本"
                },
                {
                  icon:require("@/assets/home/icon_staff.png"),
                  desc:"300+员工",
                  title:"员工人员"
                }
              ]
            }
        },
        components:{
          fold,
          struct,
          holder,
          senior,
          staff,
          Cell,
          Group
        }
    }
</script>

<style scoped>
  .brief{background:#fff;}
  .brief li{float:left;width:50%;box-sizing:border-box;padding:10px 0 10px 30px;}
  .brief li img{float:left;width:50px;}
  .brief li p{color:#999;font-size:12px;padding-left:20px;float:left;text-align:center;}
  .brief li span{color:#333;font-size:14px;line-height:25px;}
  .duce{background:#fff;padding:12px 20px;font-size: 14px;color: #666666;}
</style>
<style>
  /*vux组件样式*/
  .companyfold .weui-cells{margin-top:10px !important;}
  .companyfold .weui-cell{border-bottom:solid 1px #e5e5e5;}
  /*.myfold .weui-cell_access .weui-cell__ft{width:22px;height:22px;padding:0;border:solid 1px #C8C8CD;border-radius:50%;}*/
  .companyfold .weui-cell_access .weui-cell__ft:after{width:24px;height:24px;border-width:0 0 0 0;background:url(../../../assets/home/icon_down.png) no-repeat;background-size:100% 100%;margin-top:-12px;}
  .companyfold .weui-cell_access .weui-cell__ft.vux-cell-arrow-down:after{transform:matrix(0.71, 0.71, -0.71, 0.71, 0, 0) rotate(-45deg);}
  .companyfold .weui-cell_access .weui-cell__ft.vux-cell-arrow-up:after{transform:matrix(0.71, 0.71, -0.71, 0.71, 0, 0) rotate(-225deg);}
  .sub-item {color: #888;}
  .slide {padding: 0 20px;overflow: hidden;max-height: 0;transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;}
  .staffslide{padding:0;}
  .animate {max-height: 9999px;transition-timing-function: cubic-bezier(0.5, 0, 1, 0);transition-delay: 0s;}
</style>
