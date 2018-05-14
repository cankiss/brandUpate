<template>
  <div class="container has-header">
    <m-header :text='msg'></m-header>
    <div style="height:1px"></div>
    <div class="invest-project">
      <div class="invest-project-wrap">
        <span><i></i>每日投标项目</span>
      </div>
      <div class="optimise-invest">
        <span class="font-666">亿宝优选</span>
        <div class="optimise-wrap">
          <div class="optimise-content" v-for="(item,index1) in list1" :key="index1" @click="isActive = item.productId" :class="{active:isActive === item.productId}">
            <p class="font-666 font-size-16">{{item.productName}}</p>
            <p class="font-999">{{item.duration}}{{item.durationType | timeTypeFliter}}<span style="margin-left:5px">{{item.rate}}%</span></p>
            <img v-if="isActive === item.productId" src="~/assets/mine/icon_chosen@2x.png" alt="" class="corner">
          </div>
        </div>
      </div>
      <!-- <div class="smart-invest">
        <span class="font-666">亿宝智投</span>
        <div class="optimise-wrap">
          <div class="optimise-content" v-for="(item,index2) in list2" :key="index2" @click="isActive = item.productId" :class="{active:isActive === item.productId}">
            <p class="font-666 font-size-16">{{item.productName}}</p>
            <p class="font-999">{{item.duration}}{{item.durationType | timeTypeFliter}}<span style="margin-left:5px;">{{item.rate}}%</span></p>
            <img v-if="isActive === item.productId" src="~/assets/mine/icon_chosen@2x.png" alt="" class="corner">
          </div>
        </div>
      </div> -->
    </div>
    <div class="max-invest">
      <div class="max-invest-wrap">
        <span><i></i>每日投标最大金额</span>
      </div>
      <label class="user-input">
          <span>￥</span>
          <input type="text" v-model="amount" @input="getInput">
          <span>元</span>
        </label>
    </div>
    <div class="period-invest">
      <div class="period-invest-wrap">
        <span><i></i>小秘书有效期</span>
      </div>
      <div class="period-select">
        <div class="period-content" v-for="(item,index3) in list" :key="index3" @click="isActive3 = item.type" :class="{active:isActive3 === item.type}">
          <p class="font-size-18 font-666">{{item.title}}</p>
          <img v-if="isActive3 === item.type" src="~/assets/mine/icon_chosen@2x.png" alt="" class="corner">
        </div>
      </div>
    </div>
    <div class="check-protocol">
        <label><input type="checkbox" v-model="isChecked"><i @click="getAgree">✓</i></label>
        <span class="font-size-12">我已阅读并同意<a style="color:#43A0FF" ref="javascript:;" @click="toUrl">《投标授权书》</a></span>
    </div>
    <div class="confirm-btn">
      <x-button type='warn' @click.native='getOpen'>确&nbsp;&nbsp;定</x-button>
    </div>
    <div>
      <key-board :isPay='isOpen' :payTitle="payTitle" @close='isOpen = !isOpen' @pas-end='padEnd' class="investrestart" ref="investrestart">
        <div>请先进行交易密码验证。</div>
      </key-board>
    </div>
  </div>
</template>

<script>
  import MHeader from '~/common/m-header'
  import CheckBox from '~/common/checkBox'
  import KeyBoard from '~/common/keyBoard'
  import { XButton } from "vux";
  import md5 from '../../../config/md5.js';
  import ybdConfig from "../../../config/config.js"
  export default {
    data() {
      return {
        msg: '小秘书设置',
        isActive: "",//选择的标
        isActive3: 1,//选择的有效期
        isChecked:true,//是否同意
        isOpen:false,//是否开启虚拟键盘
        maxAmount:"",//最大投资金额
        minAmount:"",//最小投资金额
        investProgress:"",
        amount:"",//投资金额
        payTitle:"开启小秘书",
        list: [{//小秘书有效期
            title: '仅用一次',
            type:1
          },
          {
            title: '长期有效',
            type:2
          }
        ],
        list1: [],//亿宝优选
        list2: []//亿宝智投
      }
    },
    components: {
      MHeader,
      CheckBox,
      KeyBoard,
      XButton
    },
    methods:{
      getAgree(){
        this.isChecked = !this.isChecked;
      },
      toUrl(){
      	console.log(ybdConfig.investTool);
      	location.href = ybdConfig.investTool;
      },
      padEnd(val){//密码输入完毕发送ajax请求
        let data = {
        	userId:this.storage.get("user_id"),//用户ID
        	productId:this.isActive,//标的ID
        	amount:this.amount,//投资金额
        	validityType:this.isActive3,//有效期类型： 1.一次性 2.长期有效
        	status:1,//状态： 1.启用 2.停用
        	ischecked:this.isChecked ? 1 : 0,//是否勾选协议：1.是 0.否
        	transactionPassword:md5(val)//交易密码
        }
      	this.$post("autoInvest/insertOrUpdateAutoInvest",data).then(res=>{
      		console.log(res);
      		if(res.code == 200){
      			this.$refs.investrestart.$payStatus(true);
      			let _this = this;
      			setTimeout(()=>{
      				_this.$router.push("/mine/secretary");
      			},800);
      		}else if(res.code == 1400 || res.code == 6220){
      			this.$vux.toast.show({
              type:'text',
              text: '请先实名并且设置交易密码',
              width:'80%'
            });
      			this.$refs.investrestart.$payStatus(false);
      		}else{
      			this.$vux.toast.show({
              type:'text',
              text: res.msg,
              width:'80%'
            });
      			this.$refs.investrestart.$payStatus(false);
      		}
      	});
      },
      getInput(){//金额输入框限制输入
        if(!/^-?\d+\.?\d{0,2}$/.test(this.amount)){
          var s = this.amount;
          this.amount=s.substring(0,s.length-1);
        };
        console.log(this.amount);
      },
      getList(){
      	let id = this.storage.get("user_id");
        this.$post("autoInvest/findAutoInvestNew",{userId:id}).then(res=>{
          console.log(res);
          if(res.code == "200"){
          	this.list1 = res.model.TB;
          	this.isActive = this.list1[0].productId;//亿宝优选产品列表
          	this.maxAmount = res.model.maxInvestAmount - 0;//最大投资金额
          	this.minAmount = res.model.minInvestAmount - 0;//最小投资金额
          	this.investProgress = res.model.investProgress;
          	this.list2 = res.model.ZT;//
          }
        })
      },
      getOpen(){
        let amount = this.amount.replace(/\s/,"");
        if(amount >= this.minAmount && amount <= this.maxAmount){
        	if(amount % this.investProgress != 0) {
        		this.$vux.toast.show({
              type:'text',
              text: '出借金额必须是' + this.investProgress +'的整数倍',
              width:'80%'
           	});
						return;
					};
          if(this.isChecked){
            this.isOpen = true;
          }else{
            this.$vux.toast.show({
              type:'text',
              text: `请阅读并同意《投标授权书》`,
              width:'80%'
            });
          }
        }else{
          this.$vux.toast.show({
            type:'text',
            text: `出借金额必须是：${this.minAmount}~${this.maxAmount}之间的正整数`,
            width:'80%'
          });
        }
      }
    },
    created(){
      this.getList()
    }
  }
</script>

<style lang="less" scoped>
  .invest-project,
  .max-invest,
  .period-invest {
    background: #fff;
    padding: 10px;
    margin-top: 5px;
    .active {
      border-color: #FD655D !important;
      p {
        color: #FF665E !important;
      }
    }
    .invest-project-wrap,
    .max-invest-wrap,
    .period-invest-wrap {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #f2f2f2;
      padding: 5px 0;
      span {
        i {
          width: 4px;
          height: 15px;
          background: #FF665E;
          margin-right: 10px;
          vertical-align: sub;
          display: inline-block;
        }
      }
    }
    .optimise-invest,
    .smart-invest {
      display: flex;
      justify-content: space-around;
      padding: 10px 0;
      .optimise-wrap {
        display: flex;
        justify-content: space-between;
        width: 220px;
        flex-wrap: wrap;
      }
      .optimise-content {
        width: 100px;
        height: 44px;
        border: 1px solid #ccc;
        border-radius: 6px;
        padding: 2px 0;
        text-align: center;
        margin-bottom: 10px;
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
  .user-input {
    display: block;
    border-bottom: 1px solid #eeeeee;
    width: 90%;
    margin: 20px auto 0;
    font-size:24px;
    input {
      border: 0;
      outline: none;
      height: 26px;
      width: 200px;
      font-size:24px;
    }
     ::-webkit-input-placeholder {
      padding-left: 10px;
    }
  }
  .period-select {
    display: flex;
    justify-content: space-around;
    padding: 10px 0 0 5px;
  }
  .period-content {
    padding: 5px 15px;
    border: 1px solid #ccc;
    border-radius: 6px;
    position:relative;
    .corner{
      position:absolute;
      right:0;
      bottom:0;
      width:22px;
    }
  }
  .check-protocol {
    padding: 10px 20px 52px;
    label {
      font-size: 12px;
      cursor: pointer;
      i {
        font-size: 12px;
        font-style: normal;
        font-weight: bold;
        display: inline-block;
        width: 12px;
        height: 12px;
        text-align: center;
        line-height: 12px;
        color: #f5f5f5;
        vertical-align: middle;
        margin: -2px 2px 1px 0px;
        border: #FF665E 1px solid;
      }
      input[type='checkbox']{
        display: none;
      }
      input[type="checkbox"]:checked + i{color:#FF665E;}
    }
  }

  .confirm-btn{
    position: fixed;
    max-width:750px;
    bottom: 0;
    width: 100%;
  }
</style>
