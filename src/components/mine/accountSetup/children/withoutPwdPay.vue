<template>
  <div class="container has-header">
    <m-header :text='msg' @leftBack="interceptGoback" :isBack='isBack'></m-header>
    <div style="margin:10px 0">
      <group>
        <x-switch title="小额免密支付" v-model="value" @on-change="isOpen"></x-switch>
      </group>
    </div>
    <div class="without-moneny" :class="{grayscale:!value}" v-if="!isWithout">
      <div class="without-wrapper">
        <div class="without-select">
          <div class="without-content" v-for="(item,index) in items" :key="index"
          @click="without = index" :class="{active:without === index}">
            <p class="font-size-16 font-666">{{item}}元/笔</p>
            <img v-show="without === index" src="~/assets/mine/icon_chosen@2x.png" alt="" class="corner">
          </div>
        </div>
      </div>
    </div>
    <div class="without-moneny" style="margin:10px 0" v-else>
      <div class="without-wrapper">
        <p style="padding:10px 0">免密支付金额：{{isWithout.amount}}元／笔</p>
        <p style="padding:10px 0" class="line-block text-right">
          <a href="javascript:void(0)" class="link-btn link-edit" @click="edit">编辑</a>
        </p>
      </div>
    </div>
    <div class="without-explain">
      <p class="font-size-12 font-999">账户余额支付出借项目金额<=每笔免密金额，且当日小额免密</p>
      <p class="font-size-12 font-999">支付总金额<=2000元时，无需输入支付密码。</p>
    </div>
    <div style="width:90%;margin:20px auto 0" :class="{grayscale:!value}" v-if="!isWithout">
      <x-button type="warn" @click.native="value ? isPay = true : isPay = false">保&nbsp;存</x-button>
    </div>
    <key-board :is-pay='isPay' @close='isPay = !isPay'  @pas-end='submit' ref="pay"
    :payTitle='isEdit ? "确认修改" : "确认开启"  '>
      <span class="font-size-16">免密金额</span>
      <span slot="explain"><i style="font-size:26px">{{items[without]}}.00</i>元/笔</span>
    </key-board>
    <m-dialog ref="dialog" @onHide="$router.go(-1)">
      {{isEdit ? '修改免密支付成功！' : '设置免密支付成功！'}}
    </m-dialog>
  </div>
</template>
<script>
import { XSwitch, Group, XButton} from "vux";
import MHeader from "~/common/m-header";
import KeyBoard from "~/common/keyBoard"
import md5 from '@/config/md5'
import MDialog from '../../common/dialog'
export default {
  data(){
    return {
      msg:'小额免密支付',
      without:0,
      value:false,
      isWithout:false,//判断是否开通过免密支付
      isBack:false,
      isEdit:false,
      isPay:false,
      items:[]
    }
  },
  components:{
    MHeader,
    Group,
    XSwitch,
    XButton,
    KeyBoard,
    MDialog
  },
  created(){
    this.$post('freePayment/getFreePaymentList').then(({code,model}=res) =>{
      if(code === '200') this.items = model
    })
    this.$mine('freePayment/getFreePaymentByUserId').then(({code,model}=res) => {
      if(code === '200' && model) {
        this.isBack = true
        this.value = true
        this.isWithout = model
        this.without = this.items.indexOf(model.amount+'')
      }
    })
  },
  methods:{
    interceptGoback(){
      let me = this;
      me.$vux.confirm.show({
        title: '温馨提示',
        content: '您还未保存，确认现在返回吗？',
        onConfirm() {
          me.$router.go(-1)
        }
      })
    },
    edit(){
      this.isWithout = false
      this.isEdit = true
      this.isBack = true
    },
    isOpen(value){
      this.isEdit && this.isWithout &&
        this.$mine('freePayment/modifyFreePayment',{
          type:value ? '1' : '2'
        }).then(({code,msg}=res) => {
          if(code === '200'){
            this.$refs.dialog.showDialog = true
          }else this.$vux.toast.show({
            type:"text",
            text: msg,
            position: "middle",
            width:'80%'
          })
        })
    },
    submit(value){
      let _url = this.isEdit ? 'freePayment/modifyFreePayment' : 'freePayment/setFreePayment' ,
          _json =  { amount:this.items[this.without], transactionPassword:md5(value)}

      this.$mine(_url,Object.assign(_json,this.isEdit ? {type:this.isEdit ? '3' : '1'} : {}))
      .then(res => {
        if(res.code == '200'){
          this.$refs.pay.$payStatus(true)
          this.$refs.dialog.showDialog = true
          this.isBack = false
        }else{
          this.$refs.pay.$payStatus(false)
          this.$vux.toast.show({
            text:res.msg,
            type:'text',
            width:'80%'
          })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .without-moneny{
    background: #fff;
    .without-wrapper{
      padding: 10px;
      .line-block{
        display: inline-block;
        width: 100%;
        border-top: 1px solid #f2f2f2;
        .link-btn {
          display: inline-btn;
          width: 25px;
          padding-left: 20px;
          color: #333;
        }
        .link-edit {
          background: url(~assets/mine/icon_edit@2x.png) left center no-repeat;
          background-size: 20px 22px;
        }
      }
      .without-select{
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
          .without-content {
            width: 100px;
            height: 10px;
            border: 1px solid #ccc;
            border-radius: 6px;
            padding: 3px 0 15px;
            text-align: center;
            margin: 10px 0;
            position:relative;
              .corner{
                position:absolute;
                right:0;
                bottom:0;
                width:22px;
              }
        }
      }
    }
  }
  .without-explain{
    width: 90%;
    margin: 10px auto;
  }
  .active {
      border-color: #FD655D !important;
      p {
        color: #FF665E !important;
      }
    }
  .grayscale{
    filter:grayscale(1);
  }
</style>
