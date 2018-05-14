<template>
  <!--系统公告详情组件-->
    <div class="systemInfo container has-header" ref="systemInfo">
      <mHeader :text="title" ref="mheader"></mHeader>
      <h6>{{ information.title }}</h6>
      <p class="time" v-if="$route.params.columncode == 'regulations'">{{ information.modifyTime | momentTime }}</p>
      <p class="time" v-else-if="$route.params.columncode == 'system'">{{ information.uptime }}</p>
      <p class="time" v-else>{{ information.uptime | momentTime }}</p>
      <p class="content" v-html="information.content"></p>
    </div>
</template>

<script>
  import mHeader from "../../common/m-header.vue";
    export default {
        data(){
            return {
              title:"",
              information:{}
            }
        },
        mounted(){
          let height = window.innerHeight;
          let headheight = this.$refs.mheader.$el.clientHeight;
          let systemHeight = this.$refs.systemInfo.offsetHeight;
          if(systemHeight < height){
            this.$refs.systemInfo.style.height = height - headheight + "px";
          };
        },
        methods:{
          getQuery(){
            let queryid = this.$route.params.id;
            let querycolumncode = this.$route.params.columncode;
            let url = ""
            if(querycolumncode == "regulations"){
              this.title = "详情";
              url = ACTIVITYURL + "NewsNoticeInfoController/findDetailsInformation"
            }else if(querycolumncode == "system"){
            	this.title = "公告详情";
            	url = "icon/getReportById";
            }else{
              this.title = "公告详情";
              url = ACTIVITYURL + "NewsNoticeInfoController/findDetailsNotice"
            };
            let data = {
              id:queryid,
              columnCode:querycolumncode
            };
            if(querycolumncode == "system"){
            	data = {
            		reportId:queryid
            	};
            };
            this.$post(url,data).then(res=>{
              console.log(res);
              if(res.code == "200"){
              	if(querycolumncode == "system"){
		            	this.information = res.model
		            }else{
                	this.information = res.model.model.information || res.model.model.notice;
               	};
              }
            })
          }
        },
        created(){
          this.getQuery()
        },
        components:{
          mHeader
        },
        metaInfo() {
          return {
            title: this.title
          }
        }
    }
</script>

<style scoped>
  .systemInfo{background:#fff;}
  h6{text-align:center;font-size: 14px;color: #333;padding:20px 15px 0;font-weight:normal;}
  .time{text-align:center;font-size: 12px;color: #999;padding:10px 0;border-bottom:1px solid #E5E5E5;}
  .content{padding:10px 15px 0;font-size: 14px;color: #666666;background:#fff;}
</style>
