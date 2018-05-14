<template>
  <div class="container has-header has-footer">
    <m-header :text="msg" :isBack='!isShow'
    @leftBack="isShow === false ? isShow = !isShow : $router.go(-1)"></m-header>
    <p class="zhitou-title" :style="{'background':item.status == 6 ? '#d9d9d9' : ''}">
      智投编号：{{nid}}期
    </p>
    <div v-if='isShow'>
      <div style="border-bottom:1px solid #F2F2F2">
        <div class="zhitou-wrap">
          <flexbox>
            <flexbox-item :span='4'>
              <p>加入金额</p>
            </flexbox-item>
            <flexbox-item>
              <p class="font-999">{{item.amout}}元</p>
            </flexbox-item>
          </flexbox>
        </div>
      </div>
      <div style="border-bottom:1px solid #F2F2F2">
        <div class="zhitou-wrap">
          <flexbox>
            <flexbox-item :span='4'>
              <p>锁定期限</p>
            </flexbox-item>
            <flexbox-item>
              <p class="font-999">
                {{item.termTime}}{{item.timeType | timeTypeFliter}}{{item.count ? `(续投${item.count}次)` : ''}}
              </p>
            </flexbox-item>
          </flexbox>
        </div>
      </div>
      <div style="border-bottom:1px solid #F2F2F2">
        <div class="zhitou-wrap">
          <flexbox>
            <flexbox-item :span='4'>
              <p>加入时间</p>
            </flexbox-item>
            <flexbox-item>
              <p class="font-999">{{item.createTimeZ}}</p>
            </flexbox-item>
          </flexbox>
        </div>
      </div>
      <div style="border-bottom:1px solid #F2F2F2">
        <div class="zhitou-wrap">
          <flexbox>
            <flexbox-item :span='4'>
              <p>到期时间</p>
            </flexbox-item>
            <flexbox-item>
              <p class="font-999">{{item.expireDayZ}}</p>
            </flexbox-item>
          </flexbox>
        </div>
      </div>
      <div style="border-bottom:1px solid #F2F2F2">
        <div class="zhitou-wrap">
          <flexbox>
            <flexbox-item :span='4'>
              <p>出借状态</p>
            </flexbox-item>
            <flexbox-item>
              <p class="font-999">{{item.statusZ}}</p>
            </flexbox-item>
          </flexbox>
        </div>
      </div>
      <div style="border-bottom:1px solid #F2F2F2">
        <div class="zhitou-wrap">
          <flexbox>
            <flexbox-item :span='4'>
              <p>已退出</p>
            </flexbox-item>
            <flexbox-item>
              <p class="font-999">{{item.signoutAmout}}元</p>
            </flexbox-item>
          </flexbox>
        </div>
      </div>
      <div style="border-bottom:1px solid #F2F2F2">
        <div class="zhitou-wrap">
          <flexbox>
            <flexbox-item :span='4'>
              <p>回款方式</p>
            </flexbox-item>
            <flexbox-item>
              <p class="font-999">{{item.repaymentTypeZ}}</p>
            </flexbox-item>
          </flexbox>
        </div>
      </div>
      <div style="border-bottom:1px solid #F2F2F2" v-if="item.status < 5">
        <div class="zhitou-wrap">
          <flexbox>
            <flexbox-item :span='4'>
              <p>退出截止剩</p>
            </flexbox-item>
            <flexbox-item>
              <p class="red-text">{{item.remainDay}}天</p>
            </flexbox-item>
          </flexbox>
        </div>
      </div>
      <div>
        <div class="zhitou-wrap">
          <flexbox>
            <flexbox-item :span='4'>
              <p>退出方式</p>
            </flexbox-item>
            <flexbox-item>
              <p class="font-999">{{item.type && item.type == 1 ? '到期手动退出' : '到期自动退出'}}</p>
            </flexbox-item>
          </flexbox>
        </div>
      </div>
      <group>
        <cell title="投标项目" is-link @click.native='isShow = !isShow'></cell>
      </group>
      <div class="exit-btn" v-if="item.status < 5">
        <button class="btn-set"
          :class="{noQuit:item.isQuit == 0}"
          :disabled="item.isQuit == 0"
          @click="isPay = !isPay">申请退出</button>
      </div>
    </div>
    <div v-else>
      <div>
        <div class="detail-wrap">
          <div class="detail-title">
            <flexbox>
              <flexbox-item :span="1/3">
                <p>项目</p>
              </flexbox-item>
              <flexbox-item :span="1/3">
                <p>出借金额</p>
              </flexbox-item>
              <flexbox-item :span="1/3">
                <p>协议</p>
              </flexbox-item>
            </flexbox>
          </div>
          <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
            <div v-if="details.length">
              <div class="detail-content" v-for="(item,index) in details" :key="index">
                <flexbox :gutter="0">
                  <flexbox-item :span="1/3">
                    <div class="font-999" style="text-align:center">
                      <div>{{item.borrowName}}</div>
                      <div>{{item.termTime}}{{item.timeType | timeTypeFliter}}<i>&emsp;{{item.rate}}%</i></div>
                    </div>
                  </flexbox-item>
                  <flexbox-item :span="1/3">
                    <div class="font-999">
                      <p>{{item.inverstSuccessAmount | numToMoneyField}}元</p>
                    </div>
                  </flexbox-item>
                  <flexbox-item :span="1/3">
                    <div class="blue-text" style="text-align:center">
                      <a :href="item.url">{{item.isdebtTransfer == 1 ? "债转协议" : "借款协议"}}</a><br>
                      <a :href="item.agreementUrl" v-if="item.agreementUrl">出借人服务协议</a>
                    </div>
                  </flexbox-item>
                </flexbox>
              </div>
            </div>
            <div v-else>
              <no-data>暂无数据</no-data>
            </div>
          </div>
        </div>
      </div>
    </div>
    <key-board :is-pay="isPay" @close="isPay = !isPay" @pas-end="applyExit" ref="pay">
      <span class="font-size-16">退出本息合计</span>
      <span slot="explain"><i style="font-size:26px">{{totalAmount}}</i>元</span>
    </key-board>
    <m-dialog ref="dialog" @onHide="$router.go(-1)">
      退出成功！
    </m-dialog>
  </div>
</template>

<script>
  //separate js in exitZhitou.js
  import exitZhitou from './export'
  export default {
    ...exitZhitou
  }
</script>

<style lang="less" scoped>
  .zhitou-title {
    color: #fff;
    line-height: 32px;
    height: 32px;
    background: #FF665E;
    padding: 0 10px;
  }
  .zhitou-wrap {
    padding: 0 10px;
    background: #fff;
    p {
      height: 44px;
      line-height: 44px;
    }
  }
  .detail-wrap {
    background: #fff;
    p {
      text-align: center;
    }
    .detail-title {
      line-height: 38px;
      height: 38px;
      padding: 0 10px;
      border-bottom: 1px solid #f2f2f2;
    }
    .detail-content {
      border-bottom: 1px solid #f2f2f2;
      padding: 5px 10px;
      p {
        text-align: center;
      }
      .blue-text {
        &>a {
          color: #43a0ff
        }
      }
    }
  }
  .exit-btn {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding-top: 44px;
    button{
      display: inline-block;
      width: 100%;
      height: 100%;
      border: none;
      line-height: 44px;
      font-size: 18px;
      color: #FFF;
      outline: none;
      background: #FF665E;
    }
    .noQuit{
      background: #D8D8D8;
      color: #fff;
    }
  }
</style>
