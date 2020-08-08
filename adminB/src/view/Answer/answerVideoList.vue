<template>
  <div>
    <Card>
      <p slot="title">课程视频列表</p>
      <div style="display: flex;flex-wrap: wrap;width: 100%; align-items: center;">
        <Button type="default" shape="circle" icon="md-sync" @click="seachNow('form')"></Button>
        <Divider type="vertical" />
        <Cascader
          :data="Courselist"
          v-model="valueList"
          change-on-select
          style="width:280px; display: inline-block;"
          placeholder="课程/章节"
        ></Cascader>
        <Divider type="vertical" />
        <Input
          v-model="form.video_name"
          placeholder="视频名称"
          style="width: 180px; margin-right: 10px;"
        />
        <Divider type="vertical" />
        <Input v-model="form.id" placeholder="视频id" style="width: 90px; margin-right: 10px;" />
        <Divider type="vertical" />
        <Input
          v-model="form.video_alias"
          placeholder="视频别名"
          style="width: 180px; margin-right: 10px;"
        />
        <Button type="primary" @click="seach('form')" tyle="margin-right: 10px;">搜索</Button>
      </div>
      <Divider />
      <Table ref="table" size="small" :columns="columns" :data="data"></Table>
      <div style="padding: 20px 0; text-align: right;">
        <Page
          :total="total"
          @on-change="onChange"
          @on-page-size-change="onPageSizeChange"
          :current="form.page"
          :page-size="form.limit"
          size="small"
          show-total
          show-elevator
          show-sizer
        />
      </div>
      <!-- 查看视频答疑列表 -->
      <Modal v-model="Answerlsit" mask title="查看视频答疑列表" :width="1300" footer-hide>
        <div style="display: flex;flex-wrap: wrap;width: 100%;align-items: center;">
          <Button type="default" shape="circle" icon="md-sync" @click="seachNow('cursefrom')"></Button>
          <Divider type="vertical" />
          <Input v-model="cursefrom.video_id" placeholder="视频ID" style="width: 3.2rem" />
          <Divider type="vertical" />
          <Input v-model="cursefrom.answer_id" placeholder="答疑ID" style="width:3.2rem" />
          <Divider type="vertical" />
          <DatePicker
            type="date"
            @on-change="getStime"
            format="yyyy-MM-dd"
            placeholder="开始时间"
            style="width: 5.5rem"
          ></DatePicker>
          <Divider type="vertical" />
          <DatePicker
            type="date"
            @on-change="getEtime"
            format="yyyy-MM-dd"
            placeholder="结束时间"
            style="width: 5.5rem"
          ></DatePicker>
          <Divider type="vertical" />
          <Input v-model="cursefrom.reply_quiz" placeholder="回复内容" style="width: 10.5rem" />
          <Divider type="vertical" />
          <Input v-model="cursefrom.quiz" placeholder="提问内容" style="width: 10.5rem" />
          <Divider type="vertical" />
          <Select
            v-model="cursefrom.reply_user_id"
            clearable
            placeholder="回复老师"
            style="width:5.2rem"
          >
            <Option v-for="item in teacherList" :value="item.id" :key="item.id">{{ item.truename }}</Option>
          </Select>
          <Divider type="vertical" />
          <Select v-model="cursefrom.is_elite" clearable placeholder="是否精华" style="width:5.5rem">
            <Option v-for="item in Stick" :value="item.id" :key="item.id">
              {{
              item.name
              }}
            </Option>
          </Select>
          <Divider type="vertical" />
          <Select v-model="cursefrom.is_stick" clearable placeholder="是否置顶" style="width:5.2rem">
            <Option v-for="item in Elite" :value="item.id" :key="item.id">
              {{
              item.name
              }}
            </Option>
          </Select>
          <Divider type="vertical" />
          <Button type="primary" @click="seach('cursefrom')" style="margin-right: 5px;">筛选</Button>
        </div>
        <Divider />
        <Table stripe size="small" :columns="Answercolumns" :data="AnswerData"></Table>

        <div style="padding: 20px 0; text-align: right;">
          <Page
            :total="Answertotal"
            @on-change="AnsweronChange"
            @on-page-size-change="AnsweronPageSizeChange"
            :current="cursefrom.page"
            :page-size="cursefrom.limit"
            size="small"
            show-total
            show-elevator
            show-sizer
          />
        </div>
      </Modal>

      <!-- 查看答疑内容 -->
      <Modal
        v-model="modal1"
        mask
        title="查看答疑内容"
        :width="600"
        footer-hide
        @on-visible-change="changeTag"
      >
        <div class="tuer">
          <div class="content">
            <strong class="example">手机号码 :</strong>
            <span style="color:cornflowerblue;font-size:15px" v-text="fromData.mobile"></span>
          </div>
          <div class="content">
            <strong class="example">课程名称 :</strong>
            <span style="color:cornflowerblue;font-size:15px" v-text="fromData.course_name"></span>
          </div>
          <div class="content">
            <strong class="example">章节名称 :</strong>
            <span style="color:cornflowerblue;font-size:15px" v-text="fromData.section_name"></span>
          </div>
          <div class="content">
            <strong class="example">创建时间 :</strong>
            <span style="color:cornflowerblue;font-size:15px" v-text="fromData.create_time"></span>
          </div>
          <div class="content">
            <strong class="example">回复状态 :</strong>
            <span style="color:cornflowerblue;font-size:15px">
              {{
              fromData.reply_status === 1 ? "已回复" : "未回复"
              }}
            </span>
          </div>
          <div class="content">
            <strong class="example">提问端 :</strong>
            <span style="color:cornflowerblue;font-size:15px">
              {{
              fromData.quiz_source === 1 ? "手机" : "pc端"
              }}
            </span>
          </div>
          <div class="content">
            <strong class="example">回复人姓名 :</strong>
            <span style="color:cornflowerblue;font-size:15px" v-text="fromData.reply_user_name"></span>
          </div>
          <div class="content">
            <strong class="example">回复时间 :</strong>
            <span style="color:cornflowerblue;font-size:15px" v-text="fromData.reply_time"></span>
          </div>
          <div style="1000px">
            <Button type="primary" @click="lookVideo" style="margin-right: 10px;">查看视频</Button>
          </div>
          <div
            style="border:1px solid #8888;margin:10px auto;width:96%;border-radius: 15px;"
            v-if="fromData.quiz"
          >
            <div style="margin:10px 20px">
              <strong class="example">提问内容 :</strong>
              <span
                style="color:cornflowerblue;font-size:15px;word-wrap: break-word;"
                v-text="fromData.quiz"
              ></span>
            </div>
            <div class="Icontent" style="width:100%" v-if="fromData.quiz_image">
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
          <div
            style="border:1px solid #8888;margin:10px auto;width:96%;border-radius: 15px;"
            v-if="fromData.reply_quiz"
          >
            <div style="margin:10px 20px" v-if="fromData.reply_quiz">
              <strong class="example">回复内容 :</strong>
              <span
                style="color:cornflowerblue;font-size:15px;word-wrap: break-word;"
                v-html="fromData.reply_quiz"
              ></span>
              <div class="Icontent" style="width:100%" v-if="fromData.reply_image">
                图片扩展 ：
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
            </div>
          </div>
          <div
            style="border:1px solid #8888;margin:10px auto;width:96%;border-radius: 15px;"
            v-if="fromData.z_quiz"
          >
            <div style="margin:10px 20px">
              <strong class="example">追问内容 :</strong>
              <span
                style="color:cornflowerblue;font-size:15px;word-wrap: break-word;"
                v-text="fromData.z_quiz"
              ></span>
            </div>
            <div class="Icontent" style="width:100%" v-if="fromData.z_quiz_image">
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
            style="border:1px solid #8888;margin:10px auto;width:96%;border-radius: 15px;"
            v-if="fromData.z_reply_quiz"
          >
            <div style="margin:10px 20px" v-if="fromData.z_reply_quiz">
              <strong class="example">回复内容 :</strong>
              <span
                style="color:cornflowerblue;font-size:15px;word-wrap: break-word;"
                v-html="fromData.z_reply_quiz"
              ></span>
              <div class="Icontent" style="width:100%" v-if="fromData.z_reply_image">
                图片扩展 ：
                <div
                  class="demo"
                  v-for="(item, key) in fromData.z_reply_image"
                  :key="key"
                  @click="handleView(item)"
                >
                  <img class="imgs" :src="item" />
                  <div class="demo-upload"></div>
                </div>
              </div>
            </div>
          </div>
          <div style="margin: 0 auto;">
            <Checkbox
              label="置顶"
              border
              style="background: #3ddef3"
              v-model="AnswerElitefrom.is_stick"
            >置顶</Checkbox>
            <Checkbox
              label="推荐"
              border
              style="margin-left:10px;background: #3ddef3"
              v-model="AnswerElitefrom.is_elite"
            >精华</Checkbox>
          </div>
        </div>
        <Modal class="modal" title="查看图片" v-model="visible">
          <img :src="imageUrl" v-if="visible" style="width: 100%" />
        </Modal>
        <Modal title="视频预览" v-model="Videovisible" @on-visible-change="modas">
          <Viedo ref="mychild" :url="fromData.CoverURL" :VideoT="fromData.VideoT" />
        </Modal>
      </Modal>
    </Card>
  </div>
</template>

<script>
import {
  answerVideoList,
  couAnswerList,
  getAnswerUser,
  lookCouAnswer,
  putAnswerJhZd,
  delCouAnswer
} from "@/api/Answer";
import { couSec2Tree } from "@/api/Linkmenu";
import { mapMutations } from "vuex";
import Viedo from "../components/video/Video.vue";
export default {
  data() {
    return {
      data: [],
      total: 0,
      Answertotal: 0,
      fromData: [],
      Answerlsit: false,
      AnswerElitefrom: {
        answer_type: "",
        answer_id: "",
        is_elite: false,
        is_stick: false
      },
      Courselist: [],
      valueList: [],
      teacherList: [],
      Answercolumns: [
        {
          title: "ID",
          key: "id",
          minWidth: 60
        },
        {
          title: "是否精华",
          key: "is_elite",
          minWidth: 90,
          tooltip: true,
          render: (h, params) => {
            let text = "";
            let color = "";
            if (params.row.is_elite === 1) {
              text = "精华";
              color = "green";
            } else {
              text = "非精华";
              color = "red";
            }
            return h("div", [
              h(
                "span",
                {
                  style: {
                    color: color
                  }
                },
                text
              )
            ]);
          }
        },
        {
          title: "是否置顶",
          key: "is_stick",
          minWidth: 90,
          tooltip: true,
          render: (h, params) => {
            let text = "";
            let color = "";
            if (params.row.is_stick === 1) {
              text = "置顶";
              color = "green";
            } else {
              text = "非置顶";
              color = "red";
            }
            return h("div", [
              h(
                "span",
                {
                  style: {
                    color: color
                  }
                },
                text
              )
            ]);
          }
        },
        {
          title: "手机号",
          key: "mobile",
          minWidth: 110,
          tooltip: true
        },
        {
          title: "提问问题",
          key: "quiz",
          minWidth: 120,
          tooltip: true,
          align: "center"
        },

        {
          title: "章节名称",
          key: "section_name",
          minWidth: 110,
          tooltip: true,
          align: "center"
        },

        {
          title: "答疑状态",
          key: "lock_course",
          minWidth: 90,
          tooltip: true,
          render: (h, params) => {
            let text = "";
            let color = "";
            if (params.row.reply_status === 2) {
              if (params.row.lock_course === 1) {
                text = "正在答疑";
                color = "#019beb";
              } else {
                text = "无人答疑";
                color = "red";
              }
            } else if (params.row.z_reply_status === 2) {
              if (params.row.lock_course === 1) {
                text = "正在答疑";
                color = "#019beb";
              } else {
                text = "无人答疑";
                color = "red";
              }
            } else {
              text = "答疑完成";
              color = "#000";
            }
            return h("div", [
              h(
                "span",
                {
                  style: {
                    color: color
                  }
                },
                text
              )
            ]);
          }
        },
        {
          title: "回复人",
          key: "reply_user_name",
          minWidth: 90,
          tooltip: true,
          align: "center"
        },
        {
          title: "回复时间",
          key: "reply_time",
          minWidth: 110,
          tooltip: true,
          align: "center"
        },
        {
          title: "操作",
          key: "is_addkonw",
          minWidth: 300,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small"
                  },
                  style: {
                    marginRight: "10px"
                  },
                  on: {
                    click: () => {
                      this.Answerlook(params.row);
                    }
                  }
                },
                "查看答疑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "warning",
                    size: "small"
                  },
                  style: {
                    marginRight: "10px"
                  },
                  on: {
                    click: () => {
                      this.PutAnswer(params.row);
                    }
                  }
                },
                "修改"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "10px"
                  },
                  on: {
                    click: () => {
                      this.RemoveAnswer(params.row);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      AnswerData: [],
      Elite: [{ id: 1, name: "置顶" }, { id: 2, name: "不置顶" }],
      Stick: [{ id: 1, name: "精华" }, { id: 2, name: "非精华" }],
      imageUrl: "",
      visible: false,
      Videovisible: false,
      modal1: false,
      cursefrom: {
        limit: 10,
        page: 1,
        answer_id: "",
        reply_quiz: "",
        quiz: "",
        reply_user_id: "",
        start_time: "",
        end_time: "",
        video_id: "",
        is_elite: "",
        is_stick: "",
        reply_status: 1
      },
      form: {
        page: 1,
        limit: 10,
        course_id: "",
        section_id: "",
        status: "",
        video_name: "",
        id: "",
        video_alias: ""
      },
      columns: [
        {
          title: "视频ID",
          key: "video_id",
          minWidth: 80
        },

        {
          title: "视频名称",
          key: "video_name",
          minWidth: 150,
          tooltip: true
        },

        {
          title: "课程名称",
          key: "course_name",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "章节名称",
          key: "section_name",
          minWidth: 150,
          tooltip: true
        },
        {
          title: "答疑数量",
          key: "answer_num",
          minWidth: 90,
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          minWidth: 100,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.Videolook(params.row);
                    }
                  }
                },
                "查看全部答疑列表"
              )
            ]);
          }
        }
      ],

      list: [
        {
          id: 1,
          value: "正式学员"
        },
        {
          id: 3,
          value: "毕业学员"
        },
        {
          id: 4,
          value: "注册学员"
        }
      ]
    };
  },
  components: {
    Viedo
  },
  watch: {
    valueList(newValue) {
      if (newValue.length === 0) {
        this.form.course_id = "";
        this.form.section_id = "";
      } else if (newValue.length === 1) {
        this.form.course_id = newValue[0];
        this.form.section_id = "";
      } else {
        this.form.course_id = newValue[0];
        this.form.section_id = newValue[1];
      }
    }
  },
  methods: {
    ...mapMutations(["addTag"]),
    seachNow(name) {
      if (name === "form") {
        this.form.page = 1;
        this.form.limit = 10;
        this.form.course_id = "";
        this.form.section_id = "";
        this.form.status = "";
        this.form.video_name = "";
        this.form.id = "";
        this.form.video_alias = "";
        this.valueList = [];
        this.getData(this.form);
      } else if (name === "cursefrom") {
        this.cursefrom.page = 1;
        this.cursefrom.limit = 10;
        this.cursefrom.answer_id = "";
        this.cursefrom.reply_quiz = "";
        this.cursefrom.quiz = "";
        this.cursefrom.reply_user_id = "";
        this.cursefrom.video_id = "";
        this.cursefrom.start_time = "";
        this.cursefrom.end_time = "";
        this.cursefrom.is_elite = "";
        this.cursefrom.is_stick = "";
        this.getData(this.form);
      }
    },
    seach(name) {
      if (name === "form") {
        this.getData(this.form);
      } else if (name === "cursefrom") {
        this.getVideolook(this.cursefrom);
      }
    },
    onChange(val) {
      var self = this;
      self.form.page = val;
      self.getData(self.form);
    },
    onPageSizeChange(val) {
      var self = this;
      self.form.limit = val;
      self.getData(self.form);
    },
    AnsweronChange(val) {
      this.cursefrom.page = val;
      this.getVideolook(this.cursefrom);
    },
    AnsweronPageSizeChange(val) {
      this.cursefrom.limit = val;
      this.getVideolook(this.cursefrom);
    },
    getStime(startime) {
      this.cursefrom.start_time = startime;
    },
    getEtime(startime) {
      this.cursefrom.end_time = startime;
    },
    //修改答疑
    PutAnswer(row) {
      const route = {
        name: "putCAnwer",
        meta: {
          title: `${row.id} - 课程答疑修改`
        },
        query: {
          id: row.id
        }
      };
      this.addTag({
        route: route,
        type: "push"
      });
      this.$router.push(route);
    },
    //删除答疑
    RemoveAnswer(row) {
      delCouAnswer({ id: row.id }).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.$Message.error("本条答疑删除成功！");
          this.getQdata(this.cursefrom);
        }
      });
    },
    Answerlook(row) {
      lookCouAnswer({ id: row.id }).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.modal1 = true;
          this.AnswerElitefrom.answer_id = rep.data.id;
          this.fromData.mobile = rep.data.mobile;
          this.fromData.course_name = rep.data.course_name;
          this.fromData.section_name = rep.data.section_name;
          this.fromData.create_time = rep.data.create_time;
          this.fromData.reply_status = rep.data.reply_status;
          this.fromData.quiz_source = rep.data.quiz_source;
          this.fromData.reply_user_name = rep.data.reply_user_name;
          this.fromData.reply_time = rep.data.reply_time;
          this.fromData.quiz = rep.data.quiz;

          this.AnswerElitefrom.is_elite = rep.data.is_elite == 1 ? true : false;
          this.AnswerElitefrom.is_stick = rep.data.is_stick == 1 ? true : false;

          this.fromData.CoverURL = rep.data.video_info.PlayURL;
          this.fromData.VideoT = rep.data.video_info.Title;
          this.fromData.puttime = rep.data.video_time;
          this.fromData.quiz_image = rep.data.quiz_image
            ? rep.data.quiz_image.split(",")
            : "";
          this.fromData.reply_quiz = rep.data.reply_quiz;
          this.fromData.reply_image = rep.data.reply_image
            ? rep.data.reply_image.split(",")
            : "";
          this.fromData.z_quiz = rep.data.z_quiz;
          this.fromData.z_quiz_image = rep.data.z_quiz_image
            ? rep.data.z_quiz_image.split(",")
            : "";
          this.fromData.z_reply_quiz = rep.data.z_reply_quiz;
          this.fromData.z_reply_image = rep.data.z_reply_image
            ? rep.data.z_reply_image.split(",")
            : "";
        }
      });
    },
    changeTag(val) {
      if (val == false) {
        putAnswerJhZd({
          answer_type: 1,
          answer_id: this.AnswerElitefrom.answer_id,
          is_elite: this.AnswerElitefrom.is_elite ? 1 : 2,
          is_stick: this.AnswerElitefrom.is_stick ? 1 : 2
        }).then(res => {
          let rep = res.data;
          if (rep.code === 200) {
            this.$Message.success("你已修改推荐信息，请注意查看");
            this.getVideolook(this.cursefrom);
          }
        });
      }
    },
    getVideolook(obj) {
      couAnswerList(obj).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.AnswerData = rep.data.data;
          this.Answertotal = rep.data.total;
        }
      });
    },
    lookVideo() {
      this.Videovisible = true;
      this.$refs.mychild.cuureVideo(this.fromData.puttime);
    },
    modas(val) {
      if (!val) {
        this.$refs.mychild.lookVideo();
      }
    },
    Videolook(row) {
      this.cursefrom.video_id = row.video_id;
      this.getVideolook(this.cursefrom);
      this.Answerlsit = true;
    },
    getcouSec2Tree() {
      couSec2Tree().then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.Courselist = rep.data;
        }
      });
    },
    handleView(val) {
      this.visible = true;
      this.imageUrl = val;
    },
    getData(obj) {
      answerVideoList(obj).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.total = rep.data.total;
          this.data = rep.data.data;
        }
      });
    },
    getThear() {
      getAnswerUser().then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.teacherList = rep.data;
        }
      });
    }
  },
  mounted() {
    this.getData(this.form);
    this.getcouSec2Tree();
    this.getThear();
  }
};
</script>

<style lang="less" scoped>
.example {
  font-family: "Microsoft YaHei";
  font-size: 15px;
  font-weight: 600;
}

.tuer {
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
}
.Icontent {
  width: 700px;
  display: flex;
  margin-top: 20px;
  margin-right: 100px;
  margin-left: 20px;
  justify-content: left;
  color: red;
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
  width: 400px;
  margin: 10px 50px 0 20px;
}
</style>
