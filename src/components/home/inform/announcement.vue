<template>
    <!--平台公告-->
    <div>
      <notlist :columncode="columncode"></notlist>
    </div>
</template>

<script>
  import notlist from "../systemNot/notlist.vue";
    export default {
        data(){
            return {
              columncode:{
                type:"annount",
                url:"NewsNoticeInfoController/findNotice"
              }
            }
        },
        components:{
          notlist
        }
    }
</script>

<style scoped></style>
