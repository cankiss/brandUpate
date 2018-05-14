<template>
  <label><input type="checkbox"><i>✓</i></label>
</template>

<script>
  export default {
  }
</script>

<style lang="less" scoped>
  label {
    font-size: 12px;
    cursor: pointer;
    i {
      font-size: 12px;
      font-style: normal;
      font-weight: bold;
      display: inline-block;
      width: 12px;
      height: 12px;
      text-align: center;
      line-height: 12px;
      color: #fff;
      vertical-align: middle;
      margin: -2px 2px 1px 0px;
      border: #FF665E 1px solid;
    }
    input[type='checkbox'] {
      display: none;
    }
    input[type="checkbox"]:checked+i {
      color: #FF665E;
    }
  }
</style>
