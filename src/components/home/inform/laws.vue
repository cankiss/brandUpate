<template>
    <!--法律法规-->
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
                type:"regulations",
                url:"NewsNoticeInfoController/findInformation"
              }
            }
        },
        components:{
          notlist
        }
    }
</script>

<style scoped></style>
