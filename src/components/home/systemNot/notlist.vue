<template>
    <!--公告列表组件-->
    <div>
      <ul v-if="list.length > 0" id="infoList" v-infinite-scroll="landMore" infinite-scroll-disabled="busy" infinite-scroll-distance="50">
        <li v-for="(item,index) in list" :key="index">
          <h6>{{ item.title }}</h6>
          <p>{{ item.summary }}</p>
          <div class="clearfix">
            <span v-if="columncode.type == 'regulations'">{{ item.modifyTime | momentTime }}</span>
            <span v-else-if="columncode.type == 'annount'">{{ item.uptime | momentTime }}</span>
            <span v-else>{{ item.uptime }}</span>
            <router-link v-bind='{to:"/home/systemInfo/"+ (item.columncode || columncode.type) + "/" + item.id}'>查看详情＞</router-link>
          </div>
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
              list:[],//渲染列表
              pages:1,//当前页数
              totalpage:"",//总页数
              showCount:10,//每页显示多少条
              busy: true
            }
        },
        created(){
          this.getList()
        },
        methods:{
          getList(){
          	console.log(this.columncode);
          	if(this.columncode.type == "system"){//系统公告
          		let data ={
          			use:3,
          			pageNum:this.pages,
          			pageSize:this.showCount
          		};
          		this.$post("icon/getNoticeList",data).then(res=>{
          			console.log(res);
          			if(res.code == "200"){
          				this.totalpage = res.model.totalPage;
          				this.list = this.list.concat(res.model.noticeList);
	                	this.busy = false;
          			}
          		});
          	}else{
	            let data={
	              columnCode:this.columncode.type,
	              showCount:this.showCount,
	              currentPage:this.pages
	            };
	            const temp = [];
	            this.$post( ACTIVITYURL + this.columncode.url,data).then(res=>{
	              console.log(res);
	              if(res.code == "200"){
	                this.totalpage = res.model.model.totalPage;
	                let stroe = res.model.model.informationList || res.model.model.noticeList;
	                for(let i = 0; i < stroe.length; i++){
	                  temp.push(stroe[i]);
	                };
	                this.list = this.list.concat(temp);
	                this.busy = false;
	              };
	            });
           };
          },
          landMore(){
            this.busy = true;
            // 多次加载数据
            setTimeout(() => {
              this.pages ++;
              if(this.pages > this.totalpage){
                return;
              };
              this.getList(true);
            }, 1000);
          }
        },
        components:{
        	noData
        },
        props:["columncode"]
    }
</script>

<style scoped>
  ul{padding-top:10px;}
  li{background:#fff;margin-bottom:10px;padding-left:15px;font-size:14px;padding-bottom:10px;}
  h6{height:35px;line-height:35px;font-weight:normal;border-bottom:solid 1px #f5f5f5;color:#333;text-indent:6px;font-size:14px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
  p{padding:10px 10px;color:#999;}
  .clearfix span{float:left;font-size:12px;color:#999;margin-left:10px;}
  .clearfix a{color:#FF665E;font-size:12px;float:right;margin-right:13px;}
</style>
