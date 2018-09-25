<!--
Description 发布动态
@authors Benny
@date    2018-04-23 10:31:30
@version 1.0.0
-->
<template>
  <div id="dynamic_create">
    <mt-field  v-model="dynamicContent" placeholder="发表您的动态" type="textarea" rows="4" ></mt-field>
    <uploader @getFiles='getImageList' @removeFiles='removeImage'></uploader>
    <div class="btn-wrapper">
        <mt-button class='btn-send' size="large" type="primary" @click="send">发布</mt-button>
    </div>
  
  </div>
</template>

<script>
import { Indicator, Toast } from "mint-ui";
import uploader from "./Upload";

export default {
  name: "DynamicCreate",
  data() {
    return {
      dynamicContent: "", //动态内容
      imgList: [], //已上传的图片集合
      FilecodeList: [],
      isSubmit: false
    };
  },
  methods: {
    getImageList(files) {
      this.$nextTick(() => {
        for (let i = 0, len = files.length; i < len; i++) {
          this.imgList.push(files[i].src.split("base64,")[1]);
          //上传图片
          //   this._getFileCode({
          //     Base64Str: files[i].src.split("base64,")[1],
          //     AttachmentType: this.$enums.AttachmentType.Activity
          //   });
        }
      });
    },
    //删除图片
    removeImage(index) {
      this.imgList.splice(index, 1);
    },

    //上传图片获取fileCode (目前该方法没调用，供参考)
    _getFileCode(obj) {
      // Indicator.open(this.lang.dynamic_publishing);
      this.$http
        .post(this.$profileApi.Shared_UploadImage, obj)
        .then(data => {
          if (data.Rstatus) {
            this.FilecodeList.push(data.Rdata);
          } else {
            // Toast(this.lang.dynamic_upload_fail);
          }
        })
        .catch(err => {
          //   Toast(this.lang.dynamic.dynamic_net_error);
        });
    },

    //创建动态 (发布动态的请求)
    createDynamic(arr) {
      this.isSubmit = true;
      this.$http
        .post(this.$profileApi.Dynamic_CreateDynamic, {
          Subject: this.dynamicContent,
          Files: arr
        })
        .then(data => {
          this.isSubmit = false;
          if (data.Rstatus) {
            // Toast(this.lang.dynamic_publish_ok);
            this.$router.back();
          } else {
            // Toast(this.lang.dynamic_publish_fail);
          }
        })
        .catch(err => {
          //   Toast(this.lang.dynamic_net_error);
        });
    },

    //发布事件
    send() {
      Toast("提交信息在控制台里～图片地址是压缩后的base64地址");
      console.log("内容" + this.dynamicContent);
      console.log(this.imgList);

      //   if (this.dynamicContent.trim() == "" && this.imgList.length === 0) {
      //     // Toast(this.lang.dynamic_content_no_null);
      //     return;
      //   }
      //   //当图片还没上传成功
      //   let self = this;
      //   var timer = setInterval(function() {
      //     if (
      //       self.FilecodeList &&
      //       self.imgList &&
      //       self.FilecodeList.length < self.imgList.length
      //     ) {
      //       // Indicator.open(self.lang.dynamic_uploading)
      //       self.isSubmit = true;
      //     } else {
      //       clearInterval(timer);
      //       // Indicator.close();
      //       self.createDynamic(self.FilecodeList);
      //     }
      //   }, 200);
    }
  },
  components: {
    uploader
  }
};
</script>

<style lang="less" scoped>
//发布动态
#dynamic_create {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #fff;
}
#dynamic_create canvas {
  background: #000 !important;
}
.btn-send {
  margin: 22px;
  display: block;
  width: 100%;
}
.btn-wrapper {
  display: flex;
}
#dynamic_create .mint-cell {
  border: none;
}
</style>
