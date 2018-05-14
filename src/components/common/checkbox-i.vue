<template>
    <label :for="name" class="box-group" @click="checkClick">
            <i :class="[ischeckbox ?'checkbox':'',value === isTrueValue ? 'active' : '']">
            </i>
            <input v-if="ischeckbox" type="checkbox" :name="name" :value="value">
            <input v-else type="radiobox" :name="name" :value="value">
        </label>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      default: "name"
    },
    ischeckbox: {
      type: Boolean,
      default: true
    },
    value:{
        type:String,
        default:'false'
    },
    isTrueValue:{
        type:String,
        default:'true'
    },
    isFalseValue:{
        type:String,
        default:'false'        
    }
  },
  data() {
      return{

      }
  },
  methods:{
      checkClick(){
          this.$emit('checkClick')
      }
  }
};
</script>
<style scoped>
.box-group{
    display: inline-block;
    width: 15px;
    height: 15px;
    position: relative;
    overflow: hidden;
}
.box-group i{
    position: absolute;
    left: 0;
    right: 0;
    top:0;
    bottom:0;
    margin: auto;
    border-radius:2px;
    border:1px solid #FF665E; 
}
.box-group input{
    position: absolute;
    top: 20px;
    left: 20px;
}
.box-group i.radiobox{
    border-radius: 50%;
}
.box-group i::after{
    content:'✓';
    display: inline-block;
    color: #FF665E;
    width:12px;
    height: 12px;
    /* background: url('~assets/pro/icon_right.png') center no-repeat; */
    /* background-size:cover; */
    position: absolute;
    left: 2px;
    right: 0;
    top:-7px;
    bottom:0;
    margin: auto;
    display: none;
}
.box-group i.active::after{
    display: inline-block;
}
</style>

