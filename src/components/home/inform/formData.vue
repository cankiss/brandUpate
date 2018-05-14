<template>
  <!--平台数据-->
    <div>
      <!--数据截至时间-->
      <div class="ofTime">数据截止：{{ endTime }}&nbsp;&nbsp;24:00:00</div>
      <!--平台交易数据-->
      <div class="formDataCommon">
        <h4>平台交易数据</h4>
        <div class="formDataBox">
          <ul class="clearfix terrace">
            <li>
              <p class="amount">{{ transaction[0] | toLowcase}}元</p>
              <p class="cumulative">累计成交金额<span class="dirageIcon" @click="getdirage"><img src="~/assets/home/pic_icon_i.png"><span class="dirage" v-show="dirage">累计成交金额：投资人出借成功（已起息）的本金，债转记录在内。</span></span></p>
            </li>
            <li>
              <p class="amount">{{ transaction[1] | toLowcase}}元</p>
              <p class="cumulative">累计为用户赚取</p>
            </li>
            <li>
              <p class="amount">{{ transaction[2] | toLowcase}}笔</p>
              <p class="cumulative">累计成交笔数</p>
            </li>
          </ul>
        </div>
      </div>
      <!--产品数据-->
      <div class="formDataCommon">
        <h4>产品数据</h4>
        <div class="formDataBox">
          <ul class="clearfix prog">
            <li>
              <p class="amount">{{ transaction[3] | toLowcase}}元</p>
              <p class="cumulative">累计借贷金额<span class="dirageIcon" @click="getprodig"><img src="~/assets/home/pic_icon_i.png"><span class="dirage" v-show="prodig">累计借贷金额：指自网贷机构成立起，经网贷机构撮合完成的借款项目的本金总合。债转的交易不计算在内。</span></span></p>
            </li>
            <li>
              <p class="amount">{{ transaction[4] | toLowcase}}笔</p>
              <p class="cumulative">累计借贷笔数</p>
            </li>
            <li>
              <p class="amount">{{ transaction[5] | toLowcase}}元</p>
              <p class="cumulative">借贷余额</p>
            </li>
            <li>
              <p class="amount">{{ transaction[6] | toLowcase}}笔</p>
              <p class="cumulative">借贷余额笔数</p>
            </li>
          </ul>
        </div>
      </div>
      <!--前十大借款人-->
      <div class="topTen">
        <h5 class="topTenTitle">前十大借款人</h5>
        <table>
          <thead>
            <tr>
              <th>用户名</th>
              <th>借贷余额（元）</th>
              <th>占比</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in topTen" :key="index">
              <td>{{index | addZero}}  {{item.qsdRealName}}</td>
              <td>{{item.qsdLoanAmt | toLowcase}}</td>
              <td>{{item.qsdScale | toPersion}}</td>
            </tr>
          </tbody>
        </table>
        <div class="topTenPerson">
          <h5 class="topTenTitle">前十大借款人占比</h5>
          <ul class="press">
            <li class="fl" ref="fl"></li>
            <li class="fr" ref="fr"></li>
          </ul>
          <div class="pesssDesc clearfix">
            <span class="red"><em></em>其他<i>{{ surplus }}</i></span>
            <span class="blue"><em></em>前十<i>{{ totalLv }}</i></span>
          </div>
        </div>
      </div>
      <!--出借人信息-->
      <div class="formDataCommon">
        <h4>出借人信息</h4>
        <div class="formDataBox">
          <ul class="clearfix prog lender">
            <li>
              <p class="amount">{{ transaction[7] | toLowcase}}人</p>
              <p class="cumulative">累计出借人数量</p>
            </li>
            <li>
              <p class="amount">{{ transaction[8] | toLowcase}}人</p>
              <p class="cumulative">当前出借人数量</p>
            </li>
          </ul>
        </div>
      </div>
      <!--每月出借人数-->
      <div class="mouthPerson">
        <h4>每月出借人数</h4>
        <div class="con-dw clearfix">
          <p class="dw1">单位（人）</p>
          <div class="years">
            <select id="cjyear" v-model="indexId" v-on:change="formdatascj">
              <option v-for="item in cjyear" v-bind:value="item.name">{{ item.name }}</option>
            </select>
            年
          </div>
        </div>
        <div id="main1" style="height:210px;"></div>
      </div>
      <!--借款人信息-->
      <div class="formDataCommon">
        <h4>借款人信息</h4>
        <div class="formDataBox">
          <ul class="clearfix prog lender">
            <li>
              <p class="amount">{{ transaction[9] | toLowcase}}人</p>
              <p class="cumulative">累计借贷人数量</p>
            </li>
            <li>
              <p class="amount">{{ transaction[10] | toLowcase}}人</p>
              <p class="cumulative">当前借款人数量</p>
            </li>
          </ul>
        </div>
      </div>
      <!--每月借款人数-->
      <div class="mouthPerson">
        <h4>每月借款人数</h4>
        <div class="con-dw clearfix">
          <p class="dw1">单位（人）</p>
          <div class="years">
            <select id="cjyear" v-model="sjkId" v-on:change="formdatasjk">
              <option v-for="item in cjyear" v-bind:value="item.name">{{ item.name }}</option>
            </select>
            年
          </div>
        </div>
        <div id="main2" style="height:210px;"></div>
      </div>
      <!--平台关联关系借款情况-->
      <div class="formDataCommon">
        <h4>平台关联关系借款情况</h4>
        <div class="formDataBox">
          <ul class="clearfix prog lender">
            <li>
              <p class="amount">{{ transaction[11] | toLowcase}}元</p>
              <p class="cumulative">关联关系借款余额</p>
            </li>
            <li>
              <p class="amount">{{ transaction[12] | toLowcase}}笔</p>
              <p class="cumulative">关联关系借款余额笔数</p>
            </li>
          </ul>
        </div>
      </div>
      <!--逾期数据-->
      <div class="formDataCommon">
        <h4>逾期数据</h4>
        <div class="formDataBox">
          <ul class="clearfix prog">
            <li>
              <p class="amount">{{ transaction[13] | toLowcase}}元</p>
              <p class="cumulative">逾期金额</p>
            </li>
            <li>
              <p class="amount">{{ transaction[14] | toLowcase}}笔</p>
              <p class="cumulative">逾期笔数</p>
            </li>
            <li>
              <p class="amount">{{ transaction[15] | toLowcase}}元</p>
              <p class="cumulative">逾期90天以上金额</p>
            </li>
            <li>
              <p class="amount">{{ transaction[16] | toLowcase}}笔</p>
              <p class="cumulative">逾期90天以上笔数</p>
            </li>
          </ul>
        </div>
      </div>
      <!--平台关联关系借款情况-->
      <div class="formDataCommon">
        <h4>代偿情况</h4>
        <div class="formDataBox">
          <ul class="clearfix prog lender">
            <li>
              <p class="amount">{{ transaction[17] | toLowcase}}元</p>
              <p class="cumulative">代偿余额</p>
            </li>
            <li>
              <p class="amount">{{ transaction[18] | toLowcase}}笔</p>
              <p class="cumulative">代偿笔数</p>
            </li>
          </ul>
        </div>
      </div>
      <!--底部-->
      <div class="formFooter">
        <load-more :show-loading="false" background-color="#fff" tip="亿宝贷数据"></load-more>
      </div>
    </div>
</template>

<script>
    import { LoadMore } from 'vux'
    import echarts from "echarts"
    export default {
        data(){
            return {
              endTime:"",
              transaction:[],
              dirage:false,
              prodig:false,
              topTen:{},
              surplus:"",
              totalLv:"",
              indexId:"2017",
              sjkId:"2017",
              cjyear:[
                {id:2,name:2017},
                {id:1,name:2016}
              ]
            }
        },
        created(){
          this.getData(),
          this.formdatascj(),
          this.formdatasjk()
        },
        methods:{
           getData(){
             this.$post( PlatformData + "ActivityReportController/ptData").then(res=>{
               if(res.code == 200){
                let model = res.model;
                this.endTime = model.end_date;//显示时间
                let temp = [];
                temp.push(model.lj_invest_amt);//累积成交金额
                temp.push(model.lj_user_amt);//累积为用户赚取
                temp.push(model.lj_success_acount);//累积成交笔数
                temp.push(model.lj_loan_amt);//累积借贷金额
                temp.push(model.lj_loan_acount);//累积借贷笔数
                temp.push(model.lj_loan_suramt);//借贷余额
                temp.push(model.loan_suramt_acount);//借贷余额笔数
                temp.push(model.lj_invest_acount);//累计出借人数量
                temp.push(model.now_invest_acount);//当前出借人数量
                temp.push(model.lj_jd_acount);//累积借贷人数量
                temp.push(model.now_jk_acount);//当前借款人数量
                temp.push(model.glgx_loan_amt);//关联关系借款余额
                temp.push(model.glgx_loan_amt_count);//关联关系借款余额笔数
                temp.push(model.expire_amt);//逾期金额
                temp.push(model.expire_acount);//逾期笔数
                temp.push(model.expire_nine_month_amt);//逾期90天以上金额
                temp.push(model.expire_nine_month_acount);//逾期90天以上笔数
                temp.push(model.agency_amt);//代偿金额
                temp.push(model.agency_acount);//代偿笔数
                this.transaction = temp;
                this.topTen = model.topTens;//前十大借款人
                this.$refs.fl.style.width = model.other_scale * 100 + "%";
                this.$refs.fr.style.width = model.qs_scale * 100 + "%";
                this.surplus = (model.other_scale * 100).toFixed(2) + "%";
                this.totalLv = (model.qs_scale * 100).toFixed(2) + "%";
              }
            })
           },
          formdatascj(){
            var year= this.indexId;
            this.$post( PlatformData + "ActivityReportController/ptDataLj",{year:year,type:"9"}).then(res=>{
              if(res.code == 200){
                var myChartHtml = document.getElementById('main1');
                myChartHtml.style.width = document.body.clientWidth - 30 + 'px';
                var list=res.model;
                var listjky = new Array(12)
                listjky=[];
                if(list!=null) {
                  /*for(var i=0;i<list.length;i++) {
                    var times=(list[i].dt).substring(4)-1;
                    listjky[times]=list[i].cn;
                  };*/
                  for(let k in list){
                  	var times = k.substr(2,4) - 1;
                  	listjky[times]=list[k];
                  }
                };
                //每月出借人数
                var myChart1 = echarts.init(document.getElementById('main1'));
                var option1 = {
                  tooltip: {
                    axisPointer: {
                      type: 'cross',
                      label: {
                        backgroundColor: '#6a7985'
                      }
                    }
                  },
                  legend: {
                    data: ['每月出借人数']
                  },
                  grid: {
                    left: '3%',
                    right: '4%',
                    top: '10%',
                    containLabel: true
                  },
                  xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月','8月', '9月', '10月', '11月', '12月']
                  }],
                  yAxis: [{
                    type: 'value'
                  }],
                  series: [
                    {
                      name:"每月出借人数",
                      type: 'line',
                      stack: '每月出借人数',
                      label: {
                        normal: {
                          show: true,
                          position: 'top'
                        }
                      },
                      itemStyle: {
                        normal: {
                          color: '#61b2f4'
                        }
                      },
                      areaStyle: {
                        normal: {
                          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#61b2f4'
                          }, {
                            offset: 1,
                            color: '#fff'
                          }])
                        }
                      },
                      data: listjky
                    }
                  ]
                };
                myChart1.setOption(option1);
              };
            })
          },
          formdatasjk(){
            var year= this.sjkId;
            this.$post( PlatformData + "ActivityReportController/ptDataLj",{year:year,type:"6"}).then(res=>{
              if(res.code == 200){
              var myChartHtml = document.getElementById('main2');
              myChartHtml.style.width = document.body.clientWidth - 30 + 'px';
              var list=res.model;
              var listjky = new Array(12)
              listjky=[];
              if(list!=null) {
                /*for(var i=0;i<list.length;i++) {
                  var times=(list[i].dt).substring(4)-1;
                  listjky[times]=list[i].cn;
                };*/
                for(let k in list){
                  	var times = k.substr(2,4) - 1;
                  	listjky[times]=list[k];
                  }
              };
              //每月借款人数
              var myChart1 = echarts.init(document.getElementById('main2'));
              var option1 = {
                tooltip: {
                  axisPointer: {
                    type: 'cross',
                    label: {
                      backgroundColor: '#6a7985'
                    }
                  }
                },
                legend: {
                  data: ['每月借款人数']
                },
                grid: {
                  left: '3%',
                  right: '4%',
                  top: '10%',
                  containLabel: true
                },
                xAxis: [{
                  type: 'category',
                  boundaryGap: false,
                  data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月','8月', '9月', '10月', '11月', '12月']
                }],
                yAxis: [{
                  type: 'value'
                }],
                series: [
                  {
                    name:"每月借款人数",
                    type: 'line',
                    stack: '每月借款人数',
                    label: {
                      normal: {
                        show: true,
                        position: 'top'
                      }
                    },
                    itemStyle: {
                      normal: {
                        color: '#61b2f4'
                      }
                    },
                    areaStyle: {
                      normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                          offset: 0,
                          color: '#61b2f4'
                        }, {
                          offset: 1,
                          color: '#fff'
                        }])
                      }
                    },
                    data: listjky
                  }
                ]
              };
              myChart1.setOption(option1);
            };
          })

          },
          getdirage(){
            this.dirage = !this.dirage;
          },
          getprodig(){
            this.prodig = !this.prodig;
          }
        },
        filters:{
          toLowcase(number){
            return (number + "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          },
          toPersion(number){
            return (number * 100).toFixed(2) + "%";
          },
          addZero(number){
            number = number + 1;
            if(number < 10){
              number = "0" + number;
            };
            return number
          },
          millionyuan(value){
          	return (value / 10000).toFixed(2);
          }
        },
        components:{
          LoadMore
        }
    }
</script>

<style scoped>
  .ofTime{height:24px;line-height:24px;background:#FFF9EA;padding-left:12px;font-size:12px;color:#666;margin-bottom:6px;}
  /*组件公用样式*/
  .formDataCommon h4{height:46px;background-image: linear-gradient(40deg, #61B2F4 0%, #9AD9FA 100%);font-size:16px;color:#fff;padding-left:20px;font-weight:normal;line-height:34px;}
  .formDataBox{padding:0 3% 30px;background:#fff;}
  .formDataBox ul{background: #FFFFFF;box-shadow: 0 2px 4px 0 rgba(132,132,132,0.31);border-radius: 4px;position:relative;top:-11px;padding:20px 0;}
  /*平台数据*/
  .formDataBox li{float:left;width:33.3333%;box-sizing:border-box;border-right:solid 1px #f5f5f5;text-align:center;}
  .formDataBox .terrace li:last-child{border-right:0;}
  .formDataBox li p.amount{font-size: 14px;color: #43A0FF;}
  .formDataBox li p.cumulative{font-size: 12px;color: #999;}
  .formDataBox li p .dirageIcon{display:inline-block;width:12px;height:12px;margin-left:2px;vertical-align:middle;position:relative;}
  .formDataBox li p.cumulative .dirage{position:absolute;width:222px;border: 1px solid #E9E9E9;box-shadow: 0 2px 2px 0 rgba(132,132,132,0.31);border-radius: 4px;color:#666;font-size:12px;line-height:25px;background:#fff;text-align:left;padding:0 10px;left:50%;margin-left:-100px;bottom:-64px;}
  .formDataBox li p.cumulative .dirage:before,.formDataBox li p.cumulative .dirage:after{content:"";position:absolute;width:0;height:0;border:solid 10px transparent;left:50%;margin-left:-33px;}
  .formDataBox li p.cumulative .dirage:before{border-bottom-color:#E9E9E9;top:-20px;}
  .formDataBox li p.cumulative .dirage:after{border-bottom-color:#fff;top:-19px;}
  /*产品数据*/
  .formDataBox .prog li{width:50%;}
  .formDataBox .prog li:nth-child(1),.formDataBox .prog li:nth-child(2){margin-bottom:20px;}
  .formDataBox .prog li:nth-child(2n){border-right:0;}
  .formDataBox .prog li p.cumulative .dirage{width:290px;}
  .formDataBox .prog li p.cumulative .dirage:before,.formDataBox .prog li p.cumulative .dirage:after{margin-left:-66px;}
  /*前十大借款人*/
  .topTen{background:#fff;padding:0 18px;}
  .topTenTitle{font-size:16px;color:#666;font-weight:normal;padding-left:5px;margin-bottom:10px;}
  table{width:100%;border-collapse:collapse;border:solid 1px #A0D1F8;}
  table th{height:40px;background: #A0D1F8;color:#fff;font-size:14px;font-weight:normal;border-right:1px solid #fff;}
  table th:last-child{border-right:0;}
  table td{text-align:center;font-size:14px;color:#666;padding:5px 0;}
  .topTenPerson{margin-top:25px;}
  .topTenPerson .topTenTitle{color:#333;}
  .topTenPerson .press{height:32px;}
  .topTenPerson .press li{float:left;height:32px;}
  .topTenPerson .press li.fl{background:#FF8882;}
  .topTenPerson .press li.fr{background:#8CCCFF;}
  .pesssDesc{margin-top:10px;padding-bottom:20px;}
  .pesssDesc span{float:left;font-size:14px;color:#666;margin-right:40px;}
  .pesssDesc span em{display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:10px;}
  .pesssDesc span.red em{background:#FF8882;}
  .pesssDesc span.blue em{background:#8CCCFF;}
  .pesssDesc span i{margin-left:10px;}
  .pesssDesc span.red i{color: #FF8882;}
  .pesssDesc span.blue i{color: #8CCCFF;}
  /*出借人信息*/
  .formDataBox .prog.lender li:nth-child(1),.formDataBox .prog.lender li:nth-child(2){margin-bottom:0;}
  /*每月出借人数*/
  .mouthPerson{background:#fff;padding:0 15px;}
  .mouthPerson h4{font-size: 16px;color: #333333;font-weight:normal;padding-left:10px;}
  .con-dw{margin-top:15px;}
  .con-dw .dw1{float:left;font-size:10px;color:#999;}
  .con-dw .years{float:right;}
  /*底部*/
  .formFooter{padding:0 0 30px;background:#fff;}
  .formFooter .weui-loadmore_line{margin-top:0;margin-bottom:0;}
</style>
