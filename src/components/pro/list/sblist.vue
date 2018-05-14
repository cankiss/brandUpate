<template>
  <!--散标列表-->
    <flexbox class="list-group" orient="vertical">
        <listitem v-for="(item,key) in list" :key="key" :item="item" @itemClcik="itemClick(item.borrowNid)">
        </listitem>
        <flexbox-item v-show="list.length > 0" class="list-item instructions">
            <flexbox orient="vertical">
            	<flexbox-item class="text-center">
					<p class="text-center">
						散标计划
					</p>
					<p class="font-999 text-center">
						灵活出借 闲散资金动起来
					</p>
				</flexbox-item>
            </flexbox>
            <flexbox class="text-center">
                <flexbox-item :span="4">
                    <p>
                        <img :src="imgList.qedf" alt="">
                    </p>
                    <p class="font-999 font-size-12">
                        灵活配置
                    </p>
                </flexbox-item>
                <flexbox-item :span="4">
                    <p>
                        <img :src="imgList.dcbz" alt="">
                    </p>
                    <p class="font-999 font-size-12">
                        严选项目
                    </p>
                </flexbox-item>
                <flexbox-item :span="4">
                    <p>
                        <img :src="imgList.zjld" alt="">
                    </p>
                    <p class="font-999 font-size-12">
                        多重保障
                    </p>
                </flexbox-item>
            </flexbox>
        </flexbox-item>
        <empty v-show="list.length <= 0">

        </empty>
    </flexbox>
</template>
<script>
    import {
        Flexbox,
        FlexboxItem
    } from "vux"
    import listitem from './listitem'
    import empty from './empty'
    export default {
        components: {
            Flexbox,
            FlexboxItem,
            listitem,
            empty
        },
        props: {
            imgList: {
                type: Object,
                default: {
                }
            }
        },
        data() {
            return {
                list: []
            }
        },
        methods: {
            itemClick(borrowNid) {
                console.log(borrowNid)
            },
            init() {
                this.$http.post('borrow/selectHomePageSanBiao').then(res => {
                    // var data = res.data;
                    if (res.code == "200") {
                        this.list = res.model
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

