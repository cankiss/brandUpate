<template>
  <div class="total-asset">
    <div class="total-money">
      <p class="font-999">总资产（元）</p>
      <p class="font-size-18">{{asset.totalAmount | numToMoneyField}}</p>
    </div>
    <div class="asset-chart" style="position:relative">
      <div id='main'></div>
      <div class="asset-info font-999 font-size-14">
        <div>
          <p>{{asset.lianlianAmout | numToMoneyField}}</p>
          <!-- Fuck producter wanted but find not come true,haha！ -->
          <!--<div>
             <group :gutter='0'>
              <cell
              :title="asset.frozenAmount | numToMoneyField"
              :border-intent="false"
              :arrow-direction="isShow ? 'up' : 'down'"
              @click.native="showContent"
              is-link
              ></cell>
            </group>
            <div class="slide font-size-12" :class="isShow ? 'animate':''">
              <div>
                <div>提现冻结<span>15000</span></div>
                <div>出借冻结<span>5000</span></div>
              </div>
            </div>
          </div>-->
          <p style="padding:5px 10px;">{{asset.frozenAmount | numToMoneyField}}</p>
          <p>{{asset.tendAmount | numToMoneyField}}</p>
        </div>
      </div>
    </div>
    <div class="anticipated-money">
      <p>预计收益&emsp;<span class="font-999">{{asset.profitWait | numToMoneyField}}</span></p>
      <p class="font-999 font-size-12">预计收益不等于实际收益，实际收益以最终退出金额为准。</p>
    </div>
  </div>
</template>

<script>
  import { Group, Cell } from "vux";
  export default {
    data(){
      return{
        isShow:false
      }
    },
    props:['asset'],
    components:{
      Cell,
      Group
    },
    created() {
      this.$nextTick(() => {
        this.assetChart(this.asset)
      })
    },
    methods: {
      /* showContent(){
        this.isShow = !this.isShow;
        main.style.height = this.isShow ? `${main.offsetHeight+20}px` : `${main.offsetHeight-60}px`
      }, */
    }
  }
</script>
