<template>
    <!--注册弹窗-->
  <div v-transfer-dom>
    <x-dialog v-model="showDialogStyle" hide-on-blur :dialog-style="{width: '100%', 'background-color': 'transparent',overflow:'visible'}">
      <p v-if="isLogin" style="color:#fff;text-align:center;width:247px;margin:0 auto;position:relative;">
        <img :src="registerpop" alt="">
        <br/>
        <x-icon type="ios-close-outline" style="fill:#fff;position:absolute;top:0;right:0;" size="36" @click="showDialogStyle = false"></x-icon>
        <router-link to="/register/2" class="immediate">立即注册</router-link>
      </p>
      <p v-if="isRegistSuccess" style="color:#FE665E;font-size:22px;text-align:center;width:270px;margin:0 auto;background:#fff;padding:20px;border-radius: 8px;">
        注册成功<br/><br/>
        <flexbox justify="center">
          <flexbox-item :span="4">
            <div class="flex-demo">
              <img src="~/assets/home/redaight.png" alt="">
              <p>8888元体验金</p>
            </div>
          </flexbox-item>
          <flexbox-item  :span="1">
            <div class="flex-demo">
              <img src="~/assets/home/redadd.png" alt="">
            </div>
          </flexbox-item>
          <flexbox-item :span="4">
            <div class="flex-demo">
              <img src="~/assets/home/redfiv.png" alt="">
              <p>518元返现券</p>
            </div>
          </flexbox-item>
        </flexbox>
        <span style="font-size: 16px;color: #333333;">已放入您的口袋</span>
        <router-link to="/exCash" class="immediate">体验出借</router-link>
      </p>
      <p v-if="isExportGold" style="background:#fff;text-align:center;width:270px;margin:0 auto;position:relative;font-size:16px;color:#333;padding:30px 20px 16px;border-radius:8px;">
        <img src="~/assets/home/redobli.png" alt="" class="redobli">
        您账户里还有<br/>8888元体验金哦<br/>快去使用吧<br/><br/>
        <router-link to="/exCash" class="immediate">查看体验金</router-link>
      </p>
    </x-dialog>
  </div>
</template>

<script>
    import { XDialog,Flexbox,FlexboxItem, TransferDomDirective as TransferDom } from 'vux'
    export default {
        data(){
            return {
              showDialogStyle: false,
              isLogin:false,//是否显示注册弹窗
              isRegistSuccess:false,//是否显示注册成功弹窗
              registerpop:"",//接受后台传入的弹窗图片
              isExportGold:false//是否显示体验金弹窗
            }
        },
        directives: {
          TransferDom
        },
        created(){
          this.getLogin()
        },
        methods:{
          getLogin(){
            let user_id = this.storage.get("user_id");
            let register = this.storage.get("isRegisterSuccess");
            this.$post("newbieTask/unregisteredPopup").then(res=>{
              if(res.code == 200){
                if(res.model.isUse == "1"){
                  if(!user_id){
                    this.registerpop = res.model.imgUrl;
                    this.showDialogStyle = true;
                    this.isLogin = true;
                  }else if(register == "1"){
                    this.storage.set("isRegisterSuccess",2);//已经注册过啦
                    this.showDialogStyle = true;
                    this.isRegistSuccess = true;
                  }else{
                    let data = {
                      userId:user_id
                    };
                    this.$post("newbieTask/showUseStatusAlert",data).then(res=>{
                      if(res.code == 200){
                        if(res.model.isShow==1){
	                        if(!this.storage.get("isOnceLogin")){
	                          this.showDialogStyle = true;
	                          this.isExportGold = true;
	                          this.storage.set("isOnceLogin","1");
	                        }
                        };
                      };
                    });
                  };
                };
              }
            });
          }
        },
        components: {
          XDialog,
          Flexbox,
          FlexboxItem
        }
    }
</script>

<style scoped>
  .immediate{display:block;width:100%;height:40px;background: #FF665E;border-radius: 4px;margin:0 auto;line-height:40px;color:#fff;font-size:16px;}
  .flex-demo p{color:#666;font-size:12px;}
  .redobli{position:absolute;top:-35px;left:-10px;width:70px;}
</style>
