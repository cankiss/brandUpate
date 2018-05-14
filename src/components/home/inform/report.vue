<template>
  <!--运营报告-->
    <div>
      <ul v-if="report.length > 0">
        <li v-for="item in report">
          <router-link v-bind='{to:"/home/inform/ifream/" + item.id}'>
            <p>{{ item.name }}</p>
            <img :src="item.url" alt="">
          </router-link>
        </li>
      </ul>
      <div v-else>
		    <noData></noData>
		  </div>
    </div>
</template>

<script>
		import noData from "../../common/noData.vue";
    export default {
        data(){
            return {
              report:[]
            }
        },
        methods:{
        	getReport(){
        		this.$post("icon/getReport",{use:3}).then(res=>{
        			console.log(res);
        			if(res.code == "200"){
        				this.report = res.model
        			}
        		})
        	}
        },
        created(){
        	this.getReport()
        },
        components:{
        	noData
        }
    }
</script>

<style scoped>
  li{margin-top:10px;background:#fff;padding:10px 14px 14px;}
  li p{font-size:15px;color:#333;margin-bottom:10px;}
  .no-data{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    }
    .no-data img{
      display: inline-block;
      margin:auto;
      width: 117px;
      height: 77px;
    }
    .no-data p{
      text-align: center
    }
</style>
