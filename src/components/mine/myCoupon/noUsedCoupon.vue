<template>
    <div>
        <couponItem v-for="(item,index) in couponList" :key="index" :couponDetail="item">
        </couponItem>
    </div>
</template>
<script>
    import couponItem from './couponItem.vue'
    export default {
        data() {
            return {
                couponList: [],
                userId:''
            }
        },
        components: {
            couponItem
        },
        methods:{
            getCouponList(){
                 this.$store.dispatch('changeCouponList', {userId:this.userId,status:1}).then(res => {
                     if(res.code==200){
                         this.couponList = res.model.list;
                     }
                 })
            },
            init(){
                this.userId = this.storage.get("user_id");
                this.getCouponList();
            }
        },
        created(){
            this.init();
            this.$emit('changeTabPath',1)
        }
    }
</script>
<style>

</style>
