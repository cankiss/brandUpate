<template>
    <div class="container has-header">
        <m-header :text="title"></m-header>
        <div class="content" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
            <div v-if="items.length" style="padding-bottom:80px">
              <div class="address-group" v-for="(item,i) in items" :key="i">
                <div class="address-info">
                    <flexbox>
                        <flexbox-item class="text-left">{{item.name}}</flexbox-item>
                        <flexbox-item class="text-right">{{item.mobile}}</flexbox-item>
                    </flexbox>
                    <p>{{item.provence}}{{item.city}}{{item.county}}{{item.address}}</p>
                </div>
                <div class="address-info address-option">
                    <p class="line-block">
                      <a href="javascript:void(0)" class="link-btn link-chosen" :class="{in:!!item.isDefault}"
                      @click="set(item.id)">{{!!item.isDefault ? '默认地址' : '设为默认'}}</a>
                    </p>
                    <p class="line-block text-right">
                      <a href="javascript:void(0)" class="link-btn link-edit" @click="edit(item)">编辑</a>
                      <a href="javascript:void(0)" class="link-btn link-delete" @click="del(item.id)">删除</a>
                    </p>
                </div>
              </div>
            </div>
            <div v-else style="height:200px">
              <no-data>暂无数据</no-data>
            </div>
            <footer>
              <button class="btn-set" @click="$router.push('/mine/setup/deliveryAddress/0')">添加新地址</button>
            </footer>
        </div>
    </div>
</template>
<script>
    import { XInput, Group, XButton, Cell, Flexbox, FlexboxItem, debounce} from "vux";
    import MHeader from "~/common/m-header";
    import NoData from "../../common/noData"
    export default {
        data() {
            return {
                title: "管理收货地址",
                busy:false,
                pageNum:1,
                items:[]
            }
        },
        methods: {
            set(addressId) {
              this.$mine('userReceivingAddress/setDefaultAddress',{addressId}).then(({code,msg}=res) => {
                code === '200' && this.items.forEach(item => {
                  item.id == addressId ? item.isDefault = 1 : item.isDefault = 0
                })
                code != '200' && this.$vux.toast.show({
                  type: "text",
                  text: msg,
                  position: "middle",
                  width:'80%'
                })
              })
            },
            edit(_json) {
              let _params = ['address','city','county','provence','name','mobile','id']
              this.$router.push(`/mine/setup/deliveryAddress/1?${this.jointUrl(_params,_json)}`)
            },
            del(addressId) {
                let me = this;
                me.$vux.confirm.show({
                    title: '温馨提示',
                    content: '确定要删除该地址吗？',
                    onConfirm() {
                      me.$mine('userReceivingAddress/deleteAddress',{addressId}).then(({code,msg}=res) =>{
                        code === '200' && me.items.forEach((item,i) => {
                          item.id == addressId && me.items.splice(i,1)
                        })
                        code != '200' && me.$vux.toast.show({
                          type: "text",
                          text: msg,
                          position: "middle",
                          width:'80%'
                        })
                      })
                    }
                });
            },
            jointUrl(_params,_json){
              return _params.map(item => `${item}=${window.decodeURIComponent(_json[item])}`).join('&')
            },
            loadMore:debounce(function() {
              this.$mine('userReceivingAddress/selectAddressList',{
                pageNum:this.pageNum++
              }).then(({model,code}=res) => {
                if(code === '200') {
                  model && model.list.length > 0 ?
                    this.items = this.items.concat(model.list)
                    : this.busy = true
                }
              })
            },300,{'leading': true,'trailing': false}),
        },
        components: {
            MHeader,
            Group,
            Cell,
            Flexbox,
            FlexboxItem,
            NoData
        }
    }
</script>
<style lang="less" scoped>
    .address-group {
        background: #fff;
        margin-bottom: 8px;
    }
    .address-info {
        border-bottom: 1px solid #D6D6D6;
        line-height: 40px;
        font-size: 14px;
        color: #333;
        padding: 0 15px;
    }
    .line-block {
        display: inline-block;
        width: 49%;
        padding: 5px 0;
    }
    .address-option {
        border-bottom: none;
    }
    .link-btn {
        display: inline-btn;
        width: 25px;
        height: 20px;
        padding-left: 20px;
        color: #333;
    }
    .link-btn+.link-btn {
        margin-left: 10px;
    }
    .link-chosen {
        background: url(~assets/mine/chosen_gray@2x.png) left center no-repeat;
        background-size: 16px 17px;
    }
    .link-chosen.in {
        background: url(~assets/mine/icon_chosen_nor@2x.png) left center no-repeat;
        background-size: 16px 17px;
        color: #FF665E;
    }
    .link-edit {
        background: url(~assets/mine/icon_edit@2x.png) left center no-repeat;
        background-size: 20px 19px;
    }
    .link-delete {
        background: url(~assets/mine/icon_gift_delete@2x.png) left center no-repeat;
        background-size: 20px 19px;
    }
    footer {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        max-width: 750px;
        margin: auto;
        height: 44px;
    }
    .btn-set {
        display: inline-block;
        width: 100%;
        height: 100%;
        border: none;
        line-height: 44px;
        font-size: 18px;
        color: #FFF;
        background: #FF665E;
    }
</style>
