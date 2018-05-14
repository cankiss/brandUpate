<template>
    <!--风险体系-->
    <div>
      <!--风险管理架构-->
      <div class="formDataCommon">
        <h4>风险管理架构</h4>
        <div class="formDataBox">
          <ul class="clearfix framework">
            <li v-for="item in framework">
              <div class="framimg">
                <img :src="item.img" alt="">
              </div>
              <p>{{ item.title }}</p>
            </li>
          </ul>
        </div>
      </div>
      <!--风险评估流程、风险预警管理情况、催收制度-->
      <div class="formDataCommon">
        <h4>风险评估流程、风险预警管理情况、催收制度</h4>
        <div class="formDataBox">
          <ul class="clearfix">
            <li class="clearfix risk">
              <div class="imgLink">
                <div class="scroll"><i></i></div>
                <div class="line"></div>
                <div class="scroll"><i></i></div>
                <div class="line"></div>
                <div class="scroll"><i></i></div>
              </div>
              <div class="wordpress">
                <div class="parag">
                  <p class="title">贷前源头把控／大数据对接／FICO决策</p>
                  <p class="article">信审—关联检查；信息核查；信息过滤<p/>
                  <p class="article">不同产品区分授信；细分借款客群；排除高风险行业；审批复核。<p/>
                  <p class="article">反欺诈分析—大数据对接；规则拦截；业务数据分析；疑点排查</p>
                </div>
                <div class="parag">
                  <p class="title">贷中预警跟进</p>
                  <p class="article">异常监控：经营异常；行为异常；新增不良信息<p/>
                  <p class="article">定期跟踪：贷中回访；还款能力重估。<p/>
                  <p class="article">风险预警：风险等级预警</p>
                </div>
                <div class="parag">
                  <p class="title">到期催收体系</p>
                  <p class="article">逾期前：短信提醒<p/>
                  <p class="article">逾期初：电话催收、短信（信函）催收<p/>
                  <p class="article">严重逾期：外放催收、提交诉讼</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
              framework:[
                {
                  img:require("@/assets/home/icon_risk.png"),
                  title:"风险政策室"
                },
                {
                  img:require("@/assets/home/icon_approve.png"),
                  title:"授信审批室"
                },
                {
                  img:require("@/assets/home/icon_survey.png"),
                  title:"风险调查室"
                },
                {
                  img:require("@/assets/home/icon_analysis.png"),
                  title:"风险数据分析室"
                },
                {
                  img:require("@/assets/home/icon_collect.png"),
                  title:"催收管理室"
                }
              ]
            }
        }
    }
</script>

<style scoped>
  /*公用样式*/
  .formDataCommon h4{height:46px;background-image: linear-gradient(40deg, #61B2F4 0%, #9AD9FA 100%);font-size:16px;color:#fff;padding-left:20px;font-weight:normal;line-height:34px;}
  .formDataBox{padding:0 3% 30px;background:#fff;}
  .formDataBox ul{background: #FFFFFF;box-shadow: 0 2px 4px 0 rgba(132,132,132,0.31);border-radius: 4px;position:relative;top:-11px;padding:20px 0;}
  .formDataBox ul.framework li{float:left;width:33.3333%;text-align:center;}
  .formDataBox ul.framework li .framimg{height:40px;padding-top:10px;}
  .formDataBox ul.framework li img{width:40px;margin:0 auto;vertical-align: middle;}
  .formDataBox ul.framework li:nth-child(5) img{width:32px;}
  .formDataBox ul.framework li p{padding:10px 0;color:#333;font-size:14px;}
  /*风险*/
  .imgLink{float:left;margin-left:2.8%;width:16;}
  .scroll{width:16px;height:16px;border-radius:50%;background:#DAECFF;margin:0 auto;position:relative;}
  .scroll i{position:absolute;width:8px;height:8px;border-radius:50%;background: #43A0FF;left:4px;top:4px;}
  .line{width:3px;height:150px;background:#61B2F4;margin:0 auto;}
  .wordpress{overflow:hidden;padding-left:10px;}
  .parag{font-size:14px;height:160px;}
  .parag:last-child{height:auto;}
  .parag .title{color:#333;}
  .parag .article{color:#999;}
</style>
