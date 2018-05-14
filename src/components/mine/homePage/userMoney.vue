<template>
  <div>
    <flexbox class="user-moneny">
      <flexbox-item>
        <div>
          <span>资产总额</span><br>
          <span v-if='isShow'>{{item.totalAmount | numToMoneyField}}元</span>
          <span v-else>{{item === '0' ? item : '- -.- -'}}元</span>
        </div>
      </flexbox-item>
      <flexbox-item>
        <div>
          <span>冻结余额</span><br>
          <span v-if='isShow'>{{item.frozenAmount | numToMoneyField}}元</span>
          <span v-else>{{item === '0' ? item : '- -.- -'}}元</span>
        </div>
      </flexbox-item>
    </flexbox>
    <!--notice 组件-->
    <Message :msg='msg' v-if='msgList.length > 0' :notice="msgList" @delMesssageById="delMesssageById"></Message>
    <flexbox class="user-operator" :gutter='0'>
      <flexbox-item>
        <div>
          <span style="font-size:12px;color:#BABABA">可用余额</span><br>
          <span v-if='isShow'>{{item.availableCredit | numToMoneyField}}元</span>
          <span v-else>{{item === '0' ? item : '- -.- -'}}元</span>
        </div>
      </flexbox-item>
      <flexbox-item>
        <button class="user-withdraw"
        @click="status > 2 ? $router.push('/mine/withdraw') : $router.push('/mine/setup/userAuth')">提现</button>
        <button class="user-charge"
        @click="status > 2 ? $router.push('/mine/recharge') : $router.push('/mine/setup/userAuth')">充值</button>
      </flexbox-item>
    </flexbox>
  </div>
</template>
<script>
  import { Flexbox, FlexboxItem } from "vux";
  import Message from '../common/message.vue'
  // import notice from "../../home/index/notice.vue";
  export default {
    data(){
      return{
        msg:'您有1张返现券2017-10-27即将过期，请尽快使用',
        msgList:[],
        isShow:false,
        // isNotice:true,
        status:null,
        item:{}
      }
    },
    components: {
      Flexbox,
      FlexboxItem,
      Message
    },
    created(){
      let user_id = this.storage.get('user_id')
      if(user_id){
        this._ajax()
        this.getNotice()
        this.userStaus()
      }
    },
    methods:{
      _ajax(){
        this.$mine('userAcount/selectUserAcount').then(data => {
          data.code == '200' && this.init(data.model)
        })
      },
      userStaus(){
        let user_id = this.storage.get("user_id");
        this.$post('user/selectUserStatus',{id:user_id})
          .then(({code,model}=res) => {
            if(code === '200') this.status = model.status
        })
      },
      init(data){
        this.item = data === null ? "0" : data
        this.isShow = !this.isShow
      },
      getNotice(){
        this.$mine('newbieTask/getMessageBoxInfo').then(res => {
            if (res.code == 200){
              this.msgList = res.model;
              // this.msgList =[{messageType:1,message:'这是一条消息111111',id:1},{messageType:2,message:'这是一条消息22222',id:2},{messageType:1,message:'这是一条消息333333',id:3}]
            }
        })
      },
      delMesssageById(id){
        for(let i = 0;i < this.msgList.length; i++){
            if(this.msgList[i].id == id){
              this.msgList.splice(i,1)
              return;
            }
        }
      }
    }
  }
</script>

<style lang='less' scoped>
  .user-moneny {
    background: #FF7B74;
    color: #fff;
    padding: 3px 0;
    & div {
      text-align: center;
    }
  }
  .user-operator {
    background: #fff;
    padding: 3px 0;
    & div:nth-child(1) {
      padding-left: 20px;
    }
  }
  .user-withdraw {
    background: #FFFFFF;
    border: 1px solid #FF665E;
    border-radius: 4px;
    color: #FF665E;
    font-size: 16px;
    padding: 3px 17px;
  }
  .user-charge {
    background: #FF665E;
    border-radius: 4px;
    border: 1px solid #FF665E;
    color: #fff;
    font-size: 16px;
    padding: 3px 17px;
    margin-left: 6px;
  }
</style>
