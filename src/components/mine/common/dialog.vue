<template>
    <div v-transfer-dom>
      <x-dialog v-model='showDialog' hide-on-blur :dialog-style="{'width':'270px','border-radius':'8px'}"
      @on-hide="onHide">
        <div class="dialog-contain">
          <img src='~assets/mine/icon_success_1@2x.png'></img>
          <div>
            <p style="color:#43A0FF">
              <slot></slot>
            </p>
            <div>
              <slot name="info"></slot>
            </div>
          </div>
        </div>
      </x-dialog>
    </div>
</template>
<script>
import {  XDialog ,TransferDomDirective as TransferDom } from "vux";
export default {
  data(){
    return{
      showDialog:false
    }
  },
  directives:{
    TransferDom
  },
  components:{
    XDialog
  },
  methods:{
    onHide(){
      this.$emit('onHide')
    }
  }
}
</script>
<style lang="less" scoped>
  .dialog-contain{
    text-align: center;
    padding: 27px 10px;
    img{
      width: 50px;
      height: 50px;
      display: inline-block;
    }
  }
</style>
