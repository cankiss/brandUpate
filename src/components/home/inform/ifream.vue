<template>
  <!--运营报告-->
    <div class="container has-header">
      <mHeader :text="title"></mHeader>
      <iframe :src="ifarmUrl" frameborder=0 width="100%" height="100%"></iframe>
    </div>
</template>

<script>
    import mHeader from "../../common/m-header.vue"
    export default {
        data(){
            return {
              title:"运营报告",
              ifarmUrl:""
            }
        },
        methods:{
          getUrl(){
            let id = this.$route.params.url;
            this.$post("icon/getReport",{use:3}).then(res=>{
            	if(res.code == "200"){
            		let temp = res.model;
            		res.model.forEach((v,i)=>{
            			if(v.id == id){
            				this.ifarmUrl = v.redirect;
            				return;
            			}
            		})
            	}
            })
          }
        },
        created(){
          this.getUrl()
        },
        components:{
          mHeader
        }
    }
</script>

<style scoped>
  iframe{position:fixed;top:47px;left:0;right:0;bottom:0;}
</style>
