<template>
  <div>
    <Card>
      <p slot="title">课程答疑修改</p>
      <Form ref="fromData" :model="fromData" :rules="ruleValidate" :label-width="80">
        <div class="tuer">
          <div class="content">
            <strong class="example">手机号码 :</strong>
            <span style="color:cornflowerblue">{{fromData.mobile}}</span>
          </div>
          <div class="content">
            <strong class="example">课程名称 :</strong>
            <span style="color:cornflowerblue">{{fromData.course_name}}</span>
          </div>
          <div class="content">
            <strong class="example">章节名称 :</strong>
            <span style="color:cornflowerblue">{{fromData.section_name}}</span>
          </div>
          <div class="content">
            <strong class="example">创建时间 :</strong>
            <span style="color:cornflowerblue">{{fromData.create_time}}</span>
          </div>
          <div class="content">
            <strong class="example">回复状态 :</strong>
            <span style="color:cornflowerblue">{{fromData.reply_status===1?"已回复":"未回复"}}</span>
          </div>
          <div class="content">
            <strong class="example">提问端 :</strong>
            <span style="color:cornflowerblue">{{fromData.quiz_source===1?"手机":"pc端"}}</span>
          </div>
          <div style="width:92%;border:1px solid #9999;margin:10px auto;border-radius: 20px;">
            <div style="width:92%;margin:10px auto">
              <FormItem label="提问问题" prop="quiz">
                <Input v-model="fromData.quiz" type="textarea" placeholder="输入需要修改的提问问题" :rows="3" />
              </FormItem>
            </div>
            <Button type="success" @click="lookVideo" style="margin-left:40px;margin-top:20px ">查看视频</Button>
            <FormItem label="提问图片" style="width:92%;margin:10px auto">
              <Images style="margin:25px" :loadList="fromData.quiz_image" All="All"></Images>
            </FormItem>
          </div>
        </div>
        <!-- 回复部分 -->
        <div style="width:92%;border:1px solid #9999;margin:20px auto;border-radius: 20px;">
          <FormItem label="回复提问" prop="reply_quiz" style="margin:20px auto;width:95%">
            <Input
              v-model="fromData.reply_quiz"
              type="textarea"
              placeholder="输入回复答案"
              :rows="3"
              style="width: 100%"
            />
          </FormItem>
          <FormItem label="回复图片" style="width:92%;margin:10px auto">
            <Images style="margin:25px" :loadList="fromData.reply_image" All="All"></Images>
          </FormItem>
        </div>
        <!-- 追问部分 -->
        <div
          v-if="fromData.z_quiz?true:false"
          style="width:92%;border:1px solid #9999;margin:10px auto;border-radius: 20px;"
        >
          <div style="width:92%;margin:10px auto">
            <FormItem label="追问提问" prop="z_quiz">
              <Input v-model="fromData.z_quiz" type="textarea" placeholder="输入追问提问问题" :rows="3" />
            </FormItem>
          </div>
          <FormItem label="追问提问图片" style="width:92%;margin:10px auto" :label-width="90">
            <Images style="margin:25px" :loadList="fromData.z_quiz_image" All="All"></Images>
          </FormItem>
        </div>
        <div
          style="width:92%;border:1px solid #9999;margin:20px auto;border-radius: 20px;"
          v-if="fromData.z_quiz"
        >
          <FormItem label="追问回复" prop="z_reply_quiz" style="margin:20px auto;width:95%">
            <Input
              v-model="fromData.z_reply_quiz"
              type="textarea"
              placeholder="输入追问回复"
              :rows="3"
              style="width: 100%"
            />
          </FormItem>
          <FormItem label="追问回复图片" style="width:92%;margin:10px auto" :label-width="90">
            <Images style="margin:25px" :loadList="fromData.z_reply_image" All="All"></Images>
          </FormItem>
        </div>
        <FormItem>
          <div style="text-align: center;">
            <Button
              type="success"
              @click="handleSubmit"
              style="margin-left: 8px;width:130px;height:45px;margin-right: 100px"
            >提 交</Button>
          </div>
        </FormItem>
      </Form>
    </Card>
    <Modal title="视频预览" v-model="visible1" @on-visible-change="modas">
      <Viedo ref="mychild" :url="video.CoverURL" :VideoT="video.VideoT" />
    </Modal>
  </div>
</template>

<script>
import { couAnswerInfo, putCouReplyAnswer } from "@/api/Answer";
import Images from "../components/Images/MastImage";
import Fomat from "@/libs/fomat";
import config from "@/config";
import Viedo from "../components/video/Video.vue";
import { isArray } from "util";

export default {
  data() {
    return {
      uplodapath: "/upload/Index/uploadImage",
      imageUrl: "",
      visible: false,
      visible1: false,
      imgUrl: "",
      uploadList3: [],

      fromData: {
        id: "",
        quiz: "",
        z_quiz: "",
        quiz_image: "",
        z_quiz_image: "",
        reply_quiz: "",
        reply_image: "",
        z_reply_quiz: "",
        z_reply_image: ""
      },
      video: {
        puttime: "",
        VideoT: "",
        CoverURL: ""
      },
      ruleValidate: {
        quiz: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required
          }
        ],
        z_quiz: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required
          }
        ],
        reply_quiz: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required
          }
        ]
      }
    };
  },
  components: {
    Images,
    Viedo
  },

  methods: {
    handleView(url) {
      this.imgUrl = url;
      this.visible = true;
    },
    handleBeforeUpload() {
      const check = this.uploadList3.length < 3;
      if (!check) {
        this.$Message.warning("上传图片不可超过三张，请核对");
      }
      return check;
    },
    handleRemove3(file) {
      let fileList = this.uploadList3;
      this.uploadList3.splice(fileList.indexOf(file), 1);
    },
    handleSuccess3(res, file) {
      if (res.code === 200) {
        let obj = {
          name: file.name,
          url: res.data.image_url
        };
        this.uploadList3.push(obj);
        this.imageUrl = res.data.image_url;
      }
    },
    handleFormatError(file) {
      this.$Message.warning(
        "文件 “" + file.name + "” 格式错误, 请上传 jpg 或 png."
      );
    },

    handleMaxSize(file) {
      this.$Message.warning("文件 “" + file.name + "” 太大, 不要超过 512k.");
    },

    lookVideo() {
      this.visible1 = true;

      this.$refs.mychild.cuureVideo(this.video.puttime);
    },
    modas(val) {
      if (!val) {
        this.$refs.mychild.lookVideo();
      }
    },
    handleSubmit() {
      this.fromData.id = this.$route.query.id;
      if (this.fromData.z_quiz) {
        if (this.fromData.z_reply_quiz) {
          putCouReplyAnswer({
            id: this.fromData.id,
            quiz: this.fromData.quiz,
            z_quiz: this.fromData.z_quiz,
            quiz_image: this.fromData.quiz_image,
            z_quiz_image: this.fromData.z_quiz_image,
            reply_quiz: this.fromData.reply_quiz,
            reply_image: this.fromData.reply_image,
            z_reply_quiz: this.fromData.z_reply_quiz,
            z_reply_image: this.fromData.z_reply_image
          }).then(res => {
            let rep = res.data;
            if (rep.code === 200) {
              this.$Message.success("追问回复成功，请注意查看");
              this.$router.go(-1);
            }
          });
        } else {
          this.$Message.error("追问回复内容不可小于10个字，请核对");
        }
      } else {
        if (this.fromData.reply_quiz) {
          putCouReplyAnswer({
            id: this.fromData.id,
            quiz: this.fromData.quiz,
            z_quiz: "",
            quiz_image: this.fromData.quiz_image,
            z_quiz_image: "",
            reply_quiz: this.fromData.reply_quiz,
            reply_image: this.fromData.reply_image,
            z_reply_quiz: "",
            z_reply_image: ""
          }).then(res => {
            let rep = res.data;
            if (rep.code === 200) {
              this.$Message.success("回复成功，请注意查看");
              this.$router.go(-1);
            }
          });
        } else {
          this.$Message.error("回复内容不可小于10个字，请核对");
        }
      }
    },
    getData() {
      couAnswerInfo({ id: this.$route.query.id }).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.fromData = rep.data;
          this.video.CoverURL = rep.data.video_info.PlayURL;
          this.video.VideoT = rep.data.video_info.Title;
          this.video.puttime = rep.data.video_time;
        } else if (rep.code === 412) {
          this.$Message.error(res.data.msg);
          this.$router.go(-1);
        }
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
    this.$nextTick(() => {
      this.getData();
    });
  }
};
</script>

<style lang="less" scoped>
.example {
  font-family: "Microsoft YaHei";
  font-size: 12px;
  font-weight: 600;
}

.tuer {
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
}
.Icontent {
  width: 92%;
  display: flex;
  margin-top: 20px;
  margin-left: 50px;
  justify-content: left;
}
.demo {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin: 15px;
}
.demo-upload {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo:hover .demo-upload {
  display: block;
}
.imgs {
  width: 60px;
  height: 60px;
}
.content {
  width: 300px;
  margin-top: 20px;
  margin-right: 100px;
  margin-left: 50px;
}
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
