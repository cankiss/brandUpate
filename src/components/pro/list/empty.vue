<template>
    <flexbox class="empty">
          <flexbox-item class="text-center">
                <img :src="emptyImg" alt="">
          </flexbox-item>
    </flexbox>
</template>
<script>
    import {Flexbox,
        FlexboxItem,
        XProgress
    } from "vux"
    export default {
        components: {
            Flexbox,
            FlexboxItem,
        },
        data(){
            return {
                emptyImg:require('../../../assets/mine/nonedata_gray@3x.png')
            }
        }
    }
</script>
<style>
    .empty img{
        display: inline-block;
        max-width: 50%;
        margin: 40px auto;
    }
</style>
