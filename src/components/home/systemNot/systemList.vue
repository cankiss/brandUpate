<template>
    <!--系统公告列表组件-->
    <div class="container has-header">
      <mHeader :text="title"></mHeader>
      <notlist :columncode="columncode"></notlist>
    </div>
</template>

<script>
    import mHeader from "../../common/m-header.vue";
    import notlist from "./notlist.vue";
    export default {
        data(){
            return {
              title:"系统公告",
              columncode:{
              	type:"system",
              	url:"icon/getFunctionalArea"
              }
            }
        },
        components:{
          mHeader,
          notlist
        },
        metaInfo() {
          return {
            title: this.title
          }
        }
    }
</script>

<style scoped>
</style>
