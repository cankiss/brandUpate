<template>
  <!--智投列表-->
    <flexbox class="list-group" orient="vertical">
        <listitem v-for="(item,key) in ztlist" :key="key" :item="item" @itemClcik="itemClick(item.productId)">
        </listitem>
        <flexbox-item class="list-item instructions">
            <flexbox orient="vertical">
                <flexbox-item class="text-center">
                    <p class="text-center">
                        亿宝智投
                    </p>
                    <p class="font-999 text-center">
                        智能匹配标的 多重保障
                    </p>
                </flexbox-item>
                <flexbox-item>
                    <flexbox class="text-center">
                        <flexbox-item :span="4">
                            <p>
                                <img :src="imgList.znpp" alt="">
                            </p>
                            <p class="font-999 font-size-12">
                                智能匹配
                            </p>
                        </flexbox-item>
                        <flexbox-item :span="4">
                            <p>
                                <img :src="imgList.zdxt" alt="">
                            </p>
                            <p class="font-999 font-size-12">
                                自动续投
                            </p>
                        </flexbox-item>
                        <flexbox-item :span="4">
                            <p>
                                <img :src="imgList.zjbzg" alt="">
                            </p>
                            <p class="font-999 font-size-12">
                                资金不站岗
                            </p>
                        </flexbox-item>
                    </flexbox>
                </flexbox-item>
            </flexbox>
        </flexbox-item>
    </flexbox>
</template>
<script>
    import {
        Flexbox, FlexboxItem
    } from "vux"
    import listitem from './listitem'
    export default {
        components: {
            Flexbox,
            FlexboxItem,
            listitem
        },
        props: {
            imgList: {
               type:Object,
               default:{

               }
            }
        },
        data() {
            return {
                ztlist: []
            }
        },
        methods: {
            itemClick(productId) {
                console.log(productId)
            },
            init(){
                this.$http.post('borrowZt/selectHomePageZhiTouXSB').then(res => {
                    // var data = res.data;
                    if (res.code == "200") {
                        this.ztlist = res.model
                    }
                })
            }
        },
        created() {
            this.init();
        }
    }
</script>
<style>

</style>

