<template>

  <div class="container has-header suggest-container">

    <mheader :text="pageTitle" :isBack="isBack" @leftBack="leftBack"></mheader>

    <section class="main">

      <dl class="suggest">
        <dt class="caption font-size-14 font-666">请选择反馈问题类型</dt>
        <dd class="box type-box">
          <checker class="suggest-type-checker" v-model="suggestType" default-item-class="suggest-type-default" selected-item-class="suggest-type-selected" :radio-required="true">
            <checker-item v-for="item in suggestTypeList" :key="item.id" :value="item.id">{{item.name}}</checker-item>
          </checker>
        </dd>
        <dt class="caption font-size-14 font-666">问题和意见</dt>
        <dd class="box">
          <group class="suggest-group">
            <x-textarea v-model="suggestContent" :max="contentMax" :autosize="true" placeholder="请描述您使用亿宝贷时遇到的问题和建议，若功能异常，上传页面截图更快解决哦！"></x-textarea>
          </group>
        </dd>
        <dt class="caption font-size-14 font-666">添加图片（选填、提供问题截图）</dt>
        <dd class="box upload-box">
          <p class="upload-tip font-size-14 font-999">请上传{{uploadImgList.length}}/{{uploadImgMax}}张以内图片</p>
          <div class="upload-wrap clearfix">
            <img class="previewer-img-item" v-for="(item, i) in uploadImgList" :key="i" :src="item.src" @click="show(i)">
            <div class="upload-add" v-if="uploadImgList.length < uploadImgMax"><input type="file" accept="image/*" class="upload-input" @change="inputFileChange"></div>
          </div>
          <div v-transfer-dom>
            <previewer class="suggest-previewer" :list="uploadImgList" ref="previewer" :options="options">
              <template slot="button-before">
                <button title="Delete" class="pswp__button pswp__button--delete" @click.prevent.stop="removeImg"><i class="weui-icon-delete"></i></button>
              </template>
            </previewer>
          </div>
        </dd>
      </dl>

      <div class="suggest-button">
        <x-button action-type="button" type="warn" @click.native="submitSuggest">提交</x-button>
      </div>

    </section>

  </div>

</template>

<script>

  import mheader from '../../common/m-header.vue';
  import {Checker, CheckerItem, Group, XTextarea, XButton, stringTrim, Previewer, TransferDom} from 'vux';

  let lrz = require('lrz'); //图片压缩和图片方向较正插件

  export default {
    directives: {
      TransferDom
    },
    components: {
      mheader, Checker, CheckerItem, Group, XTextarea, XButton, Previewer
    },
    data() {
      return {
        pageTitle: '我要反馈',
        isBack: true,
        userId: this.storage.get('user_id'),
        suggestTypeList: [],
        suggestType: 0,
        suggestContent: '',
        contentMin: 20,
        contentMax: 500,
        uploadImgList: [],
        uploadImgMax: 5, //最大上传图片个数
        uploadImgSize: 2097152, //系统自动压缩后图片不能大于2m
        options: {
          getThumbBoundsFn(index) {
            // find thumbnail element
            let thumbnail = document.querySelectorAll('.previewer-img-item')[index]
            // get window scroll Y
            let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
            // optionally get horizontal scroll
            // get position of element relative to viewport
            let rect = thumbnail.getBoundingClientRect()
            // w = width
            return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
            // Good guide on how to get element coordinates:
            // http://javascript.info/tutorial/coordinates
          },
          isClickableElement: function (el) {
            return /pswp__button--delete/.test(el.className)
          }
        }
      }
    },
    metaInfo() {
      return {
        title: this.pageTitle
      }
    },
    created() {
      this.getSuggestType();
    },
    methods: {
      leftBack() {
        this.$router.push("/find");
      },
      getSuggestType() {
        this.$post('opinionFeedback/selectList').then(res => {
          if (res.code == '200') {
            if (res.model.length > 0) {
              this.suggestTypeList = res.model;
              this.suggestType = this.suggestTypeList[0].id;
            } else {
              this.$vux.toast.show({type: 'text', text: '暂无数据', position: 'middle', width: '60%'});
            }
          } else {
            this.$vux.toast.show({type: 'text', text: res.msg, position: 'middle', width: '60%'});
          }
        });
      },
      inputFileChange(event) {

        let inputFile = event.srcElement;

        if (inputFile.files.length < 1) {
          this.$vux.toast.show({type: 'text', text: '没有可上传的文件', position: 'middle', width: '60%'});
          inputFile.value = '';
          return false;
        }

        if (!(/^image\/\w+$/.test(inputFile.files[0].type))) {
          this.$vux.toast.show({type: 'text', text: '只能上传图片', position: 'middle', width: '60%'});
          inputFile.value = '';
          return false;
        }

        //压缩图片
        lrz(inputFile.files[0], {quality: 0.5}).then(rst => {

          if (rst.fileLen <= this.uploadImgSize) {

            let fd = new FormData();
            fd.append('userId', this.userId);
            fd.append('file', rst.file, rst.origin.name);

            this.$http.post('opinionFeedback/uploadOpinionFeedback', fd).then(res => {
              if (res.code == '200') {
                this.uploadImgList.push({src: res.model.url});
                this.$vux.toast.show({type: 'success', text: '上传成功', position: 'middle'});
              } else {
                this.$vux.toast.show({type: 'text', text: res.msg, position: 'middle', width: '60%'});
              }
            });

            inputFile.value = '';

          } else {
            this.$vux.toast.show({type: 'text', text: `单张图片大小<br>不能超过${this.uploadImgSize / 1024 / 1024}M`, position: 'middle', width: '60%'});
            inputFile.value = '';
            return false
          }

        });

      },
      show(index) {
        this.$refs.previewer.show(index);
      },
      removeImg() {
        let currentIndex = this.$refs.previewer.getCurrentIndex();
        this.$refs.previewer.close();
        this.uploadImgList.splice(currentIndex, 1);
      },
      submitSuggest() {

        let me = this;

        if (this.suggestType <= 0) {
          this.$vux.toast.show({type: 'text', text: '请选择反馈问题类型', position: 'middle', width: '60%'});
          return false;
        }

        if (this.suggestContent.length < this.contentMin) {
          this.$vux.toast.show({type: 'text', text: `请详细描述问题和意见<br>且需要大于${this.contentMin}个字`, position: 'middle', width: '60%'});
          return false;
        }

        if (this.suggestContent.length > this.contentMax) {
          this.$vux.toast.show({type: 'text', text: `问题和意见<br>最多${this.contentMax}个字符`, position: 'middle', width: '60%'});
          return false;
        }

        let param = {
          userId: this.userId,
          type: this.suggestType,
          content: this.suggestContent
        };

        //如果有上传图片
        if (this.uploadImgList.length > 0) {
          let tempUrl = [];
          this.uploadImgList.forEach(item => {
            tempUrl.push(item.src);
          });
          param.url = tempUrl.join(',');
        }

        this.$post('opinionFeedback/submitMessage', param).then(res => {

          if (res.code == '200') {
            this.$vux.toast.show({
              type: 'success', text: '问题提交成功', position: 'middle', onHide() {
                me.$router.push("/find");
              }
            });
          } else {
            this.$vux.toast.show({type: 'text', text: res.msg, position: 'middle', width: '60%'});
          }

        });

      }
    }
  }

</script>

<style scoped>

  .suggest {
  }

  .suggest .caption {
    margin-bottom: 10px;
    padding: 0 10px;
  }

  .suggest .box {
    margin-bottom: 10px;
    padding: 20px 20px;
    background-color: #fff;
  }

  .suggest .box.type-box {
    padding-right: 0;
    padding-bottom: 0;
  }

  .suggest .box.upload-box {
    padding-top: 10px;
  }

  .suggest .upload-tip {
    margin-bottom: 10px;
  }

  .suggest .upload-wrap {
  }

  .suggest .upload-wrap .previewer-img-item {
    float: left;
    width: 44px;
    height: 44px;
    border-radius: 4px;
    margin-right: 10px;
  }

  .suggest .upload-wrap .upload-add {
    float: left;
    width: 44px;
    height: 44px;
    overflow: hidden;
    background: url("../../../assets/find/suggest/icon_upload.png") no-repeat 0 0;
    background-size: 100% 100%;
    cursor: pointer;
  }

  .suggest .upload-wrap .upload-add .upload-input {
    cursor: pointer;
    width: 100%;
    height: 100%;
    line-height: 100%;
    opacity: 0;
    filter: alpha(opacity=0);
  }

</style>

<style>

  .suggest-container .m-header {
    z-index: auto !important;
  }

  .suggest-type-checker {
  }

  .suggest-type-checker .suggest-type-default {
    box-sizing: border-box;
    height: 30px;
    margin: 0 20px 20px 0;
    padding: 0 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    color: #666;
    line-height: 28px;
  }

  .suggest-type-checker .suggest-type-selected {
    color: #FD655D;
    border-color: #FD655D;
    background: url(../../../assets/common/icon_chosen.png) no-repeat right bottom;
    background-size: 18px 18px;
  }

  .suggest-group .weui-cells {
    margin-top: 0;
  }

  .suggest-group .weui-cells:before,
  .suggest-group .weui-cells:after {
    display: none;
  }

  .suggest-group .weui-cells .weui-cell {
    padding: 0;
  }

  .suggest-group .weui-cells .weui-cell .weui-textarea {
    font-size: 14px;
    color: #666;
    line-height: 20px;
  }

  .suggest-group .weui-cells .weui-cell .weui-textarea::placeholder {
    color: #999;
  }

  .suggest-button {
    padding: 20px 10px !important;
  }

  .suggest-previewer .pswp__button--delete {
    width: 44px !important;
    height: 44px !important;
    margin-right: 20px !important;
    float: right !important;
    background: none !important;
  }

  .suggest-previewer .pswp__button--delete .weui-icon-delete {
    font-size: 18px !important;
    color: #fff !important;
  }

  .suggest-previewer .pswp__button--share,
  .suggest-previewer .pswp__button--fs,
  .suggest-previewer .pswp__button--zoom {
    display: none !important;
  }

</style>
