<template>
  <!--员工信息-->
  <div class="staff">
    <swiper :loop="true" height="265px" direction="horizontal" :interval=2000 class="text-scroll" :show-dots="true" dots-position="center">
      <swiper-item>
        <div class="eacher">
          <h6 class="title">员工年龄结构</h6>
          <div id="myChart" style="height: 200px;"></div>
        </div>
      </swiper-item>
      <swiper-item>
        <div class="eacher">
          <h6 class="title">员工学历结构</h6>
          <div id="myChart2" style="height: 200px;"></div>
        </div>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import { Swiper, SwiperItem } from 'vux'
  import echarts from "echarts"
  export default {
    data(){
      return {
        mydots:"mydots"
      }
    },
    mounted(){
      this.drawLine();
    },
    methods: {
      drawLine(){
        // 基于准备好的dom，初始化echarts实例
        var myChartHtml = document.getElementById('myChart');
        myChartHtml.style.width = document.body.clientWidth + 'px';
        var myChart2Html = document.getElementById('myChart2');
        myChart2Html.style.width = document.body.clientWidth + 'px';
        let myChart = echarts.init(myChartHtml);
        let myChart2 = echarts.init(myChart2Html);
        var list1={
          agecount:255 ,   //员工总数
          age1:1 ,         //小于20
          age2:193,        //20-30
          age3:60,         //30-40
          age4:1           //40以上
        };
        var list2={
          agecount:255 ,   //员工总数
          xueli1:112 ,         //大专及以下
          xueli2:130,        //本科
          xueli3:13         //硕士及以上
        };
        var dataage=["小于20岁","20-30岁","30-40岁","40岁以上"];
        var dataxueli=["大专及以下","本科","硕士及以上"];
        var age1=(list1.age1/list1.agecount).toFixed(3);
        var age2=(list1.age2/list1.agecount).toFixed(3);
        var age3=(list1.age3/list1.agecount).toFixed(3);
        var age4=(list1.age4/list1.agecount).toFixed(3);
        var xueli1=(list2.xueli1/list2.agecount).toFixed(3);
        var xueli2=(list2.xueli2/list2.agecount).toFixed(3);
        var xueli3=(list2.xueli3/list2.agecount).toFixed(3);
        // 绘制图表
        var option = {
          title:{
            text: '员工人数：255人',
            x: '68%',
            y: '0',
            textStyle: {
              fontWeight: 'normal',
              fontSize: 12
            }
          },
          tooltip: {
            show:false,
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          /*legend: {//右侧标注
           orient: 'vertical',
           top:"60px",
           left:'65%',
           data: dataage
           },*/
          series: [
            {
              center:["50%","60%"],
              itemStyle: {
                normal: {
                  color: function(params) {
                    // build a color map as your need.
                    var colorList = [
                      '#43A0FF', '#86CD00','#FFC100','#FF665E'
                    ];
                    return colorList[params.dataIndex]
                  }
                }
              },
              name:'亿宝贷员工年龄',
              type:'pie',
              selectedMode: 'single',
              radius: ['35%', '65%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: true,
                  position: '',
                  formatter:'{b|{b}}\n{d|{d}%}',
                  padding:[0,-50],
                  rich: {
                    b: {
                      lineHeight: 18,
                      align: 'center'
                    },
                    d: {
                      lineHeight: 18,
                      align: 'center'
                    },
                  }
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '12',
                    fontWeight: 'normal',
                    color:'#fff'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: true,
                  length:20,
                  length2:50
                }
              },
              data:[
                {value:list1.age1, name:'小于20岁'},
                {value:list1.age2, name:'20-30岁'},
                {value:list1.age3, name:'30-40岁'},
                {value:list1.age4, name:'40岁以上'}
              ]
            }
          ]
        };
        var option2 = {
          title:{
            text: '员工学历',
            x: '65%',
            y: '10px',
            textStyle: {
              fontWeight: 'normal',
              fontSize: 12
            }
          },
          tooltip: {
            show:false,
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          /*legend: {//右侧标注
           orient: 'vertical',
           top:"60px",
           left:'68%',
           data: dataxueli
           },*/
          series: [
            {
              center:["50%","60%"],
              itemStyle: {
                normal: {
                  color: function(params) {
                    // build a color map as your need.
                    var colorList = [
                      '#43A0FF', '#86CD00','#FFC100','#FF665E'
                    ];
                    return colorList[params.dataIndex]
                  }
                }
              },
              name:'亿宝贷员工学历',
              type:'pie',
              selectedMode: 'single',
              radius: ['35%', '65%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: true,
                  position: '',
                  formatter:'{b|{b}}\n{d|{d}%}',
                  padding:[0,-60],
                  rich: {
                    b: {
                      lineHeight: 18,
                      align: 'center'
                    },
                    d: {
                      lineHeight: 18,
                      align: 'center'
                    },
                  }
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '12',
                    fontWeight: 'normal',
                    color:'#fff'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: true,
                  length:20,
                  length2:60
                }
              },
              data:[
                {value:list2.xueli1, name:'大专及以下'},
                {value:list2.xueli2, name:'本科'},
                {value:list2.xueli3, name:'硕士及以上'}
              ]
            }
          ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        myChart2.setOption(option2);
      }
    },
    components:{
      Swiper,
      SwiperItem
    }
  }
</script>

<style>
  .eacher .title{width:100%;text-align:center;font-size:15px;color:#333;font-weight:normal;padding:10px 0 0;}
  .vux-slider > .vux-indicator > a > .vux-icon-dot{width:8px;height:8px;border-radius:4px;}
  .vux-slider > .vux-indicator > a > .vux-icon-dot{background: rgba(255,102,94,0.20);}
  .vux-slider > .vux-indicator > a > .vux-icon-dot.active{background: #FF665E;}
</style>
