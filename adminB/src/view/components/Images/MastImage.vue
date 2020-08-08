
<template>
  <div class="course_img">
    <div
      class="demo-upload-list"
      :class="[isActive?'Demo-upload-list':'']"
      v-for="(item, index) in Uploadlist"
      :key="index"
    >
      <template>
        <img :src="item" />
        <div class="demo-upload-list-cover">
          <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
          <Icon type="ios-trash-outline" @click.native="handleRemove3(item)"></Icon>
        </div>
      </template>
    </div>
    <Upload
      ref="upload"
      :show-upload-list="false"
      :before-upload="handleBeforeUpload"
      :on-success="handleSuccess3"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      :format="['jpg','jpeg','png']"
      :max-size="2048"
      type="drag"
      :action="uplodapath"
      name="image"
      style="display: inline-block;width:58px;"
    >
      <div style="width: 58px;height:58px;line-height: 58px;">
        <Icon type="ios-camera" size="20"></Icon>
      </div>
    </Upload>
    <Modal title="图片预览" v-model="visible">
      <img :src="imgUrl" v-if="visible" style="width: 100%" />
    </Modal>
  </div>
</template>
<style scoped>
.Demo-upload-list {
  width: 520px !important;
  height: 360px !important;
  line-height: 360px !important;
}
.course_img .demo-upload-list {
  display: inline-block;
  width: 180px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.course_img .demo-upload-list img {
  width: 100%;
}
.course_img .demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.course_img .demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.course_img .demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
.handremove {
  position: absolute;
  right: 0;
  top: 6.037736rem;
}
</style>

<script>
import config from "@/config";
export default {
  props: {
    loadList: {
      type: String,
      default: ""
    },
    All: {
      type: String,
      default: "One"
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      uplodapath: "/upload/Index/uploadImage",
      Uploadlist: this.loadList ? this.loadList.split(",") : [],
      visible: false,
      imgUrl: "",
      show: true
    };
  },
  watch: {
    loadList(val) {
      this.Uploadlist = val ? val.split(",") : [];
    }
  },
  methods: {
    handleView(url) {
      this.imgUrl = url;
      this.visible = true;
    },
    handleBeforeUpload() {
      console.log("准备上传");
    },
    handleRemove3(file) {
      let fileList = this.Uploadlist;
      this.Uploadlist.splice(fileList.indexOf(file), 1);
      this.$emit("update:loadList", this.Uploadlist.join(","));
    },
    handleSuccess3(res) {
      if (res.code === 200) {
        if (this.All === "One") this.Uploadlist = [];
        if (this.Uploadlist.length <= 2) {
          this.Uploadlist.push(res.data.image_url);
          this.$emit("update:loadList", this.Uploadlist.join(","));
        } else {
          this.$Notice.warning({
            title: "文件大小验证",
            desc: "该表单不可超过3张图片"
          });
        }
      }
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "文件格式验证",
        desc: "文件 “" + file.name + "” 格式错误, 请上传 jpg 或 png."
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "文件大小验证",
        desc: "文件 “" + file.name + "” 太大, 不要超过 2m"
      });
    }
  },
  mounted() {
    if (process.env.NODE_ENV === "production") {
      switch (document.domain) {
        case "dests.youcaiwx.cn":
          this.uplodapath = `${config.baseUrl.test}/upload/Index/uploadImage`;
          break;
        case "ycdb.youcaiwx.cn":
          this.uplodapath = `${config.baseUrl.pro}/upload/Index/uploadImage`;
          break;
        default:
          this.uplodapath = "/upload/Index/uploadImage";
          break;
      }
    } else {
      this.uplodapath = "/upload/Index/uploadImage";
    }
  }
};
</script>
