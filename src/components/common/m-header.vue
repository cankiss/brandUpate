<template>

  <div class="m-header" v-if="showHeader" :class="{redThemeClass: redTheme}">
    <x-header :title="text" @on-click-back="leftBack"
              :left-options="{backText: '', preventGoBack: isBack, showBack: showBack}">
      <div slot="right" @click="rightMore">
        <slot name="rightHtml"></slot>
      </div>
    </x-header>
  </div>

</template>

<script>

  import {XHeader} from 'vux'

  export default {
    name: 'mheader',
    components: {
      XHeader
    },
    props: {
      text: {
        type: String,
        default: '首页'
      },
      showBack: {
        type: Boolean,
        default: true
      },
      isBack: {
        type: Boolean,
        default: false
      },
      redTheme: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        showHeader: true
      }
    },
    methods: {
      leftBack() {
        this.$emit('leftBack')
      },
      rightMore() {
        this.$emit('rightMore')
      },
      checkIsApp() {
        let isApp = this.storage.get('sbType');
        console.log(`isApp: ${isApp}`);
        return isApp;
      }
    },
    created() {
      (this.checkIsApp()) && (this.showHeader = false);
    },
    mounted() {
      (this.checkIsApp()) && (document.getElementsByClassName('container')[0].style.marginTop = '0');
    }
  }

</script>

<style>

  .m-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    max-width: 750px;
    margin: auto;
  }

  .m-header .vux-header {
    background-color: #fff;
    border-bottom: 1px solid #e6e6e6;
  }

  .m-header .vux-header .vux-header-left .left-arrow:before {
    border-color: #5f5f5f;
  }

  .m-header .vux-header .vux-header-title {
    color: #333;
  }

  .m-header .vux-header .vux-header-right img {
    width: 20px;
  }

  .redThemeClass .vux-header {
    background-color: #ff665e;
    border-bottom: 1px solid #ff665e;
  }

  .redThemeClass .vux-header .vux-header-title {
    color: #fff;
  }

</style>

