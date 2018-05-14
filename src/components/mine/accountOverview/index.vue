<template>
  <div class="container has-header overview">
    <m-header :text='msg'></m-header>
    <div style="padding-top:10px"></div>
    <div class="user-status clearfix">
      <div class="user-left" v-if='user'>
        <div style="position:relative">
          <img src="~assets/mine/portrait_user_login@2x.png" alt="" class="user-icon">
          <img :src="user.data.memberPic" v-show="user.data.memberPic">
        </div>
        <div style="text-align: center;margin-left:10px">
          <span class="font-size-16">{{user.mobile}}</span><br>
          <span class="font-999 font-size-12">{{user.memberPoints}}点成长值</span>
        </div>
      </div>
      <div class="user-right" v-if='risk'>
        <div style="text-align:right;margin-right:10px">
          <span class="font-size-14">{{riskType[risk.riskLevel]}}</span><br>
          <span class="font-size-12" style="color:#43A0FF" @click="toTest">{{risk.riskLevel > 0 ? '重新测' : '去测评'}}</span>
        </div>
        <img src="~assets/mine/icon_forward@2x.png" alt="" class="arrows-icon">
      </div>
    </div>
    <!-- 总资产（元） -->
    <div class="total-asset" v-if='asset'>
      <div class="total-money">
        <p class="font-999">总资产（元）</p>
        <p class="font-size-18">{{asset.totalAmount | numToMoneyField}}</p>
      </div>
      <div class="asset-chart" style="position:relative">
        <div id='main'></div>
        <div class="asset-info font-999 font-size-14">
          <div>
            <p>{{asset.lianlianAmout | numToMoneyField}}</p>
            <p style="padding:5px 10px;">{{asset.frozenAmount | numToMoneyField}}</p>
            <p>{{asset.cashWait | numToMoneyField}}</p>
          </div>
        </div>
      </div>
      <div class="anticipated-money">
        <p>预计收益&emsp;<span class="font-999">{{asset.profitWait | numToMoneyField}}</span></p>
        <p class="font-999 font-size-12">预计收益不等于实际收益，实际收益以最终退出金额为准。</p>
      </div>
    </div>
    <!--总资产 -->
    <div class="total-asset" v-if="asset">
      <div class="total-money">
        <p class="font-999">累计收益（元）</p>
        <p class="font-size-18">{{asset.profitAll | numToMoneyField}}</p>
      </div>
      <div>
        <div id='main-income' style="height:150px;padding:10px;"></div>
      </div>
    </div>
    <divider>亿宝贷</divider>
  </div>
</template>

<script>
  import { Divider } from "vux";
  import echarts from 'echarts'
  import MHeader from '~/common/m-header'
  export default {
    data() {
      return {
        msg: '账户总览',
        asset: null,
        user:null,
        risk:null,
        riskType:['保守型（默认）','稳健型','谨慎型','平衡型','进取型','激进型']
      }
    },
    components: {
      MHeader,
      Divider
    },
    metaInfo:{
			title: "账户总览"
		},
    mounted() {
      this.$mine('userAcount/selectUserAcountP').then(({code,model,msg}=res) => {
         if(code === '200') {
            this.asset = model
            this.$nextTick(() => {
              this.incomeChart(
              model.list.map(_ => `${Object.keys(_)[0]}月`),
              model.list.map(_ => Object.values(_)[0])
              )
              this.assetChart(model)
            })
         }else this.$vux.toast.show({
              type: "text",
              text: msg,
              position: "middle",
              width:'80%'
         })
      })
      this.$mine('member/getMemberPointInfo').then(({code,model}=res) => {
        if(code === '200') this.user = model
      })
      this.$mine('realUser/selectRealUserByUserId',{userDevice:'02'})
        .then(({code,model}=res) => {
          if(code === '200') this.risk = model
        })
    },
    methods:{
      toTest(){
        window.location.href="html/2DetailPage/fengxianpinggu.html";
      },
      incomeChart(month,money) {
        let incomeForAsset = echarts.init(document.getElementById('main-income')),
          option = {
            color: ['#96C8FA'],
            tooltip: {
              trigger: 'axis',
              axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            grid: {
              left: '2%',
              right: '2%',
              top: '12%',
              height:'80%',
              containLabel:true
            },
            xAxis: [{
              type: 'category',
              data: month,
              axisLabel:{
                color:'#999',
              },
              axisLine:{
                show:false,
                lineStyle:{
                  color:'#f2f2f2'
                }
              }
            }],
            yAxis: [{
              type: 'value',
              axisLabel:{
                color:'#999'
              },
              axisLine:{
                show:false,
                lineStyle:{
                  color:'#f2f2f2'
                }
              },
              splitLine:{
                lineStyle:{
                  color:'#f2f2f2'
                }
              }
            }],
            series: [{
              name: '累计收益',
              type: 'bar',
              barWidth: '60%',
              label:{
                 normal: {
                    show: true,
                    position: 'top',
                    color:'#FF665E'
                }
              },
              data:money
            }]
          }
        incomeForAsset.setOption(option)
      },
      assetChart(asset) {
        let chartForAsset = echarts.init(document.getElementById('main')),
          option = {
            title: {
              text: '总资产',
              textStyle:{
                fontSize:'12'
              },
              top:"38px",
              right:'7%'
            },
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
              orient: 'vertical',
              x: 'left',
              itemWidth:16,
              itemHeight:16,
              itemGap:20,
              padding:[5,0],
              data: ['可用金额', '冻结金额', '持有中出借']
            },
            series: [{
              name: "总资产（元）",
              type: 'pie',
              radius: ['50%', '70%'],
              center:['85%', '50%'],
              avoidLabelOverlap: false,
              silent:true,
              itemStyle: {
                normal: {
                  color: function(params) {
                    var colorList = ['#43A0FF', '#FBCA30', '#FF665E'];
                    return colorList[params.dataIndex]
                  }
                }
              },
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '12'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [
                {
                  value: asset.lianlianAmout,
                  name: '可用金额'
                },
                {
                  value: asset.frozenAmount,
                  name: '冻结金额'
                },
                {
                  value: asset.cashWait,
                  name: '持有中出借'
                }
              ]
            }]
        };
        chartForAsset.setOption(option)
      }
    }
  }
</script>
<style lang="less">
 .overview{
   .weui-cells:after,.weui-cells:before{
    display: none
    }
    .weui-cells{
      font-size:14px !important;
    }
    .weui-cell{
      padding: 0 10px !important;
    }
    .vux-cell-bd{
      width: 20px
    }
 }
</style>

<style lang="less" scoped>
  @import './totalIncome.less';
  @import './totalAsset.less';
  .user-icon {
      width: 50px;
      float: left;
      & + img{
        position: absolute;
        height: 18px;
        width: 18px;
        left: 28px;
        top: 26px;
      }
    }
</style>
