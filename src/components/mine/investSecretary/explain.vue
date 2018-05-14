<template>
  <!--小秘书说明-->
    <div class="container has-header">
      <MHeader :text='msg' ref="mheader"></MHeader>
      <div class="explain" ref="explain">
        <ul>
          <li>1.设置投标小秘书时需阅读并同意<a href="javascript:;" @click="toUrl">《投标授权书》</a></li>
          <li>2.系统根据您设置的条件，当判断到有符合条件的规则时即为您自动投标，减少资金站岗现象，提高资金利用率。</li>
          <li>3.根据您设定的投标项目，系统自动判断预期年化收益区间。</li>
          <li>4.如您的账户余额资金剩余低于100元，则不进行自动投标，投标小秘书只出借整数金额。</li>
          <li>5.设置的出借金额为每日最大出借金额，具体出借可能根据资产情况进行调整，第二天恢复额度。</li>
          <li>6.您可以选择设置投标小秘书一次有效或长期有效。长期有效则会给您长期自动投标，如一次有效则只自动投标一次。</li>
        </ul>
      </div>
    </div>
</template>

<script>
    import MHeader from '~/common/m-header';
    import ybdConfig from "../../../config/config.js";
    export default {
        data(){
            return {
              msg:"投标小秘书说明"
            }
        },
        methods:{
        	toUrl(){
		      	console.log(ybdConfig.investTool);
		      	location.href = ybdConfig.investTool;
		      },
          getHeight(){
            let screenHeight = window.innerHeight;
            let headerHeight = this.$refs.mheader.$el.clientHeight;
            this.$refs.explain.style.height = screenHeight - headerHeight + "px";
          }
        },
        mounted(){
          this.getHeight()
        },
        components:{
          MHeader
        }
    }
</script>

<style lang="less" scoped>
  .explain{
    border-top:solid 4px #f5f5f5;
    background:#fff;
    padding:20px;
    font-size: 14px;
    color: #999999;
    box-sizing:border-box;
    ul{
    	background:#fff;
    	}
    li{
      margin-bottom:10px;
    }
    a{
      color:#ffc732;
    }
  }
</style>
