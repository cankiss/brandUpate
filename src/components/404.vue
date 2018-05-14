<template>
    <div id="not-found"></div>
</template>
<script>
    export default {
      data(){
        return{}
      },
      mounted(){
        let _script = document.createElement('script'),
            _dom = document.querySelector('#not-found');
            _script.setAttribute('src','//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js');
        this.$nextTick(()=>{
          _dom.appendChild(_script)
        })
      }
    }
</script>
<style>

</style>