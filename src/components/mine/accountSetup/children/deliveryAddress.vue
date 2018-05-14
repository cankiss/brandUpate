<template>
  <div class="container has-header has-footer">
    <m-header :text='msg' @leftBack="isGoback" :isBack="isBack"></m-header>
    <group>
      <x-input
      title="收货人"
      placeholder="请输入收货人姓名"
      label-width="200"
      :max="20"
      v-model="items.name">
      </x-input>

      <x-input
      title="联系电话"
      placeholder="请输入收货人电话"
      label-width="200"
      :max="11"
      is-type="china-mobile"
      ref="inputMobile"
      v-model="items.mobile">
      </x-input>

      <x-address
      title="所在地区"
      v-model="address"
      :raw-value="isEdit"
      :list="addressData"
      @on-shadow-change="onShadowChange"
      placeholder="请选择"></x-address>

      <x-textarea :max="200" placeholder="请填写详细地址，不少于5个字" v-model="items.address"></x-textarea>
    </group>
    <div style="margin-top:10px" v-if="!isEdit">
      <group>
        <x-switch title="设置默认" v-model="items.value" ></x-switch>
      </group>
    </div>
    <div v-else>
      <group>
        <cell>
          <span slot="title" style="color:#FF665E" @click="delAddress(items.id)">删除地址</span>
        </cell>
      </group>
    </div>
    <div class="save-address">
      <x-button type="warn" @click.native="saveAddress(items)">保&emsp;存</x-button>
    </div>
    <m-dialog ref="dialog" @onHide="$router.go(-1)">
      {{isEdit ? '修改地址成功！': '添加新地址成功！'}}
    </m-dialog>
  </div>
</template>
<script>
import MHeader from '~/common/m-header'
import { Group, XInput, XTextarea, Cell, XSwitch, XAddress,ChinaAddressV4Data, XButton} from "vux";
import MDialog  from '../../common/dialog'
export default {
  data(){
    return {
      addressData: ChinaAddressV4Data,
      address:[],
      isBack:true,
      isEdit:this.$route.params.id === '1',
      items:{
        name:'',
        mobile:'',
        address:'',
        provence:'',
        city:'',
        county:'',
        value:true
      }
    }
  },
  components:{
    MHeader,
    XInput,
    XTextarea,
    Group,
    Cell,
    XSwitch,
    XAddress,
    XButton,
    MDialog
  },
  computed:{
    msg() {
      return this.isEdit ? '编辑地址' : '添加新地址'
    }
  },
  created(){
   if(Object.keys(this.$route.query).length > 0){
      this.items = this.$route.query
      this.items.value = true
      this.address = `${this.items.provence}-${this.items.city}-${this.items.county}`.split('-')
   }
  },
  methods:{
    isGoback(){
      let me = this
      me.$vux.confirm.show({
        title: '温馨提示',
        content: me.isEdit ? '修改了信息还未保存，确认现在返回吗？' : '您还未保存，确认现在返回吗？',
        onConfirm() {
          me.$router.go(-1)
        }
      });
    },
    onShadowChange (ids, names) {
      this.items.provence = names[0]
      this.items.city = names[1]
      this.items.county = names[2]
    },
    delAddress(addressId){
      let me = this;
      me.$vux.confirm.show({
          title: '温馨提示',
          content: '确定要删除该地址吗？',
          onConfirm() {
            me.$mine('userReceivingAddress/deleteAddress',{addressId}).then(({code,msg}=res) =>{
              code === '200' && me.$router.go(-1)
              code != '200' &&
              this.$vux.toast.show({
                type: "text",
                text: msg,
                position: "middle",
                width:'80%'
              })
          })
        }
      })
    },
    saveAddress(_json){
      let isSubmit = true
      Object.values(_json).forEach(item => {
        if(item === ''){
          this.$vux.toast.show({
            type: "text",
            text: '请填写完整',
            position: "middle",
            width:'80%'
          })
          isSubmit = !isSubmit
        }
      })

      if(isSubmit && this.$refs.inputMobile.valid){
        let {value:isDefault,id:addressId} = _json
        delete _json.value
        delete _json.id
        if(!this.isEdit){
          this.$mine('userReceivingAddress/addAddress',
          Object.assign(_json,{isDefault:(isDefault-0).toString()})).then(({code,msg}=res) =>{
            if(code === '200') this.$refs.dialog.showDialog = true
            else this.$vux.toast.show({
              type: "text",
              text: msg,
              position: "middle",
              width:'80%'
            })
          })
        }else{
          this.$mine('userReceivingAddress/updateAddress',
          Object.assign(_json,{isDefault:(isDefault-0).toString(),addressId})).then(({code,msg}=res) => {
            if(code === '200') this.$refs.dialog.showDialog = true
            else this.$vux.toast.show({
              type: "text",
              text: msg,
              position: "middle",
              width:'80%'
            })
          })
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.save-address{
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
