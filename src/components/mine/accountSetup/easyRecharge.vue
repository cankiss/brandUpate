<template>
  <div class="container has-header">
    <m-header :text='msg' :is-right='true' :more-html='seviceIcon'></m-header>
    <div style="padding-top:1px">
      <group>
        <x-input v-for='(item,index) in ipList1' :key="index"
          :title="item.title"
          :placeholder="item.ph"
          label-width="100px"></x-input>
      </group>
      <div class="recharge-tip font-size-12">
        <p class="font-999">请绑定本人银行卡，银行卡户名要求与实名信息一致</p>
        <span>查看支持银行</span>
      </div>
      <group>
        <x-input v-for='(item,index) in ipList2' :key="index"
          :title="item.title"
          :placeholder="item.ph"
          label-width="100px"></x-input>
      </group>
    </div>
    <key-board :isPay='false'></key-board>
    <div style="width:90%;margin:10px auto;">
      <XButton type='warn'>确认充值</XButton>
    </div>
  </div>
</template>
<script>
import MHeader from '~/common/m-header'
import KeyBoard from '~/common/keyBoard'
import { XInput , Group , XButton , Cell } from "vux";
export default {
  data(){
    return{
      msg:'便捷绑卡充值',
      seviceIcon:require('@/assets/mine/call@3x.png'),
      ipList1:[
        {
          title:'姓名',
          ph:'请输入姓名'
        },
        {
          title:'身份证号',
          ph:'请输入您的身份证号'
        }
      ],
      ipList2:[
        {
          title:'银行卡号',
          ph:'请输入银行卡号'
        },
        {
          title:'预留手机',
          ph:'请输入银行预留手机号'
        },
        {
          title:'充值金额',
          ph:'请输入不小于50元的金额'
        },
        {
          title:'交易密码',
          ph:'请设置平台6位数字交易密码'
        }
      ]
    }
  },
  components:{
    MHeader,
    XInput,
    Group,
    XButton,
    Cell,
    KeyBoard
  }
}
</script>
<style>
.weui-cells{
  margin-top: 0;
}
</style>

<style lang="less" scoped>
  .recharge-tip{
    padding: 5px;
    display: flex;
    justify-content: space-around;
    span{
      color: #43A0FF
    }
  }
</style>
