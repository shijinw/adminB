<template>
  <div>
    <Card>
      <p slot="title">课程答疑回复</p>
      <Form ref="fromData" :model="fromData" :rules="ruleValidate" :label-width="80">
        <div class="tuer">
          <div class="content">
            <strong class="example">手机号码 :</strong>
            <span style="color:cornflowerblue">{{ fromData.mobile }}</span>
          </div>
          <div class="content">
            <strong class="example">课程名称 :</strong>
            <span style="color:cornflowerblue">{{ fromData.course_name }}</span>
          </div>
          <div class="content">
            <strong class="example">章节名称 :</strong>
            <span style="color:cornflowerblue">
              {{
              fromData.section_name
              }}
            </span>
          </div>
          <div class="content">
            <strong class="example">创建时间 :</strong>
            <span style="color:cornflowerblue">{{ fromData.create_time }}</span>
          </div>
          <div class="content">
            <strong class="example">回复状态 :</strong>
            <span style="color:cornflowerblue">
              {{
              fromData.reply_status === 1 ? "已回复" : "未回复"
              }}
            </span>
          </div>
          <div class="content">
            <strong class="example">提问端 :</strong>
            <span style="color:cornflowerblue">
              {{
              fromData.quiz_source === 1 ? "手机" : "pc端"
              }}
            </span>
          </div>
          <div style="width:92%;border:1px solid #9999;margin:10px auto;border-radius: 20px;">
            <div style="width:92%;margin:10px auto">
              <strong class="example">提问内容 :</strong>
              <Input
                v-model="fromData.quiz"
                type="textarea"
                placeholder="输入回复答案"
                :rows="2"
                style="width: 100%;color:cornflowerblue;float: left;"
                disabled
              />
            </div>
            <Button type="success" @click="lookVideo" style="margin-left:40px;margin-top:20px ">查看视频</Button>
            <div class="Icontent" style="width:100%;margin-top:20px " v-if="fromData.quiz_image">
              图片扩展 ：
              <div
                class="demo"
                v-for="(item, key) in fromData.quiz_image"
                :key="key"
                @click="handleView(item)"
              >
                <img class="imgs" :src="item" />
                <div class="demo-upload"></div>
              </div>
            </div>
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
              :disabled="fromData.z_quiz ? true : false"
            />
          </FormItem>
          <div class="Icontent" v-if="fromData.z_quiz">
            <p v-if="fromData.reply_image">图片扩展 ：</p>
            <div
              class="demo"
              v-for="(item, key) in fromData.reply_image"
              :key="key"
              @click="handleView(item)"
            >
              <img class="imgs" :src="item" />
              <div class="demo-upload"></div>
            </div>
          </div>
          <FormItem label="添加图片" v-else>
            <MyImages style="margin:25px" :loadList.sync="fromData.reply_image" All="All"></MyImages>
            <p
              style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;"
            >提示：图片比例暂未定义</p>
          </FormItem>
          <Modal title="图片预览" v-model="visible">
            <img :src="imgUrl" v-if="visible" style="width: 100%" />
          </Modal>
        </div>
        <!-- 追问部分 -->
        <div
          v-if="fromData.z_quiz ? true : false"
          style="width:92%;border:1px solid #9999;margin:10px auto;border-radius: 20px;"
        >
          <div style="width:92%;margin:10px auto">
            <strong class="example">追问提问内容 :</strong>
            <Input
              v-model="fromData.z_quiz"
              type="textarea"
              placeholder="输入回复答案"
              :rows="2"
              style="width: 100%;color:cornflowerblue; word-wrap: break-word;"
              disabled
            />
          </div>
          <div class="Icontent" v-if="fromData.z_quiz_image">
            图片扩展 ：
            <div
              class="demo"
              v-for="(item, key) in fromData.z_quiz_image"
              :key="key"
              @click="handleView(item)"
            >
              <img class="imgs" :src="item" />
              <div class="demo-upload"></div>
            </div>
          </div>
        </div>
        <div
          style="width:92%;border:1px solid #9999;margin:20px auto;border-radius: 20px;"
          v-if="fromData.z_quiz"
        >
          <FormItem label="追问回复" prop="z_reply_quiz" style="margin:10px auto;width:95%">
            <Input
              v-model="fromData.z_reply_quiz"
              type="textarea"
              placeholder="输入追问回复"
              :rows="3"
              style="width: 100%"
            />
          </FormItem>
          <FormItem label="追问图片" prop="z_reply_image">
            <MyImages style="margin:25px" :loadList.sync="fromData.z_reply_image" All="All"></MyImages>
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
import { couAnswerInfo, couReplyAnswer } from "@/api/Answer";
import MyImages from "../components/Images/MastImage";
import Fomat from "@/libs/fomat";
import config from "@/config";
import Viedo from "../components/video/Video.vue";

export default {
  data() {
    return {
      uplodapath: "/upload/Index/uploadImage",
      imageUrl: "",
      visible: false,
      visible1: false,
      imgUrl: "",
      uploadList3: [],

      fromData: {},
      video: {
        puttime: "",
        VideoT: "",
        CoverURL: ""
      },
      ruleValidate: {
        reply_quiz: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().ConRequired
          }
        ],
        z_reply_quiz: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().ConRequired
          }
        ],
        wx_img: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "blur"
          }
        ]
      }
    };
  },
  components: {
    MyImages,
    Viedo
  },

  methods: {
    handleView(url) {
      this.visible = true;
      this.imgUrl = url;
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
          couReplyAnswer({
            id: this.fromData.id,
            reply_quiz: this.fromData.reply_quiz,
            reply_image: Array.isArray(this.fromData.reply_image)? this.fromData.reply_image.join(",") : "",
            z_reply_quiz: this.fromData.z_reply_quiz,
            z_reply_image:this.fromData.z_reply_image,
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
          couReplyAnswer({
            id: this.fromData.id,
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
          this.fromData.quiz_image = rep.data.quiz_image
            ? rep.data.quiz_image.split(",")
            : "";
          this.fromData.reply_image = rep.data.reply_image
            ? rep.data.reply_image.split(",")
            : "";
          this.fromData.z_reply_image = rep.data.z_reply_image;

          this.fromData.z_quiz_image = rep.data.z_quiz_image
            ? rep.data.z_quiz_image.split(",")
            : "";
        } else if (rep.code === 412) {
          this.$Message.error(res.data.msg);
          this.$router.go(-1);
        }
      });
    }
  },

  mounted() {
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
