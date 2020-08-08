<template>
  <div>
    <Card>
      <p slot="title">后续教育课程章节列表</p>
      <div>
        <Button type="default"
                shape="circle"
                icon="md-sync"
                @click="seach"></Button>
        <Divider type="vertical" />
        <Button type='primary'
                style="margin-right: 10px;"
                @click="addSec">添加章节</Button>
      </div>
      <Divider />
      <Table stripe
             size="small"
             :columns="columns"
             :data="data"></Table>
    </Card>

    <!-- 添加 -->
    <Modal v-model="modal"
           draggable
           scrollable
           title="添加章节"
           :footer-hide="true">
      <div>
        <Form ref="projectForm"
              :model="projectForm"
              :rules="ruleProject"
              :label-width="80">
          <input type="text"
                 name="test"
                 style="display:none" />
          <FormItem label="章节名称"
                    prop="section_name">
            <Input v-model="projectForm.section_name"
                   placeholder="请输入章节名称"
                   type="text"></Input>
          </FormItem>
          <FormItem>
            <div style="text-align: right;">
              <Button @click="handleReset('projectForm')"
                      style="margin-right: 8px">重 置</Button>
              <Button type="primary"
                      @click="handleSubmit('projectForm')">提 交</Button>
            </div>
          </FormItem>
        </Form>
      </div>
    </Modal>

    <!-- 修改 -->
    <Modal v-model="modal2"
           draggable
           scrollable
           title="修改章节"
           :footer-hide="true">
      <div>
        <Form ref="projectForm2"
              :model="projectForm2"
              :rules="ruleProject"
              :label-width="80">
          <FormItem label="章节名称"
                    prop="section_name">
            <Input v-model="projectForm2.section_name"
                   placeholder="请输入章节名称"></Input>
          </FormItem>
          <FormItem>
            <div style="text-align: right;">
              <Button @click="handleReset2('projectForm2')"
                      style="margin-right: 8px">重 置</Button>
              <Button type="primary"
                      @click="handleSubmit2('projectForm2')">提 交</Button>
            </div>
          </FormItem>
        </Form>
      </div>
    </Modal>

    <!-- 添加 or 修改视频 -->
    <Modal v-model="modal3"
           draggable
           title="关联或移除视频"
           :width="800"
           :footer-hide="true">
      <div>
        <div style="padding-bottom: 15px;">
          <Cascader :data="list"
                    v-model="valueList3"
                    placeholder="项目/专业"
                    style="display: inline-block; width: 140px;"
                    @on-change="seachKnow"></Cascader>
          <Divider type="vertical" />
          <Select v-model="videoForm.class_id"
                  clearable
                  placeholder="标签"
                  style="width: 120px;"
                  @on-change="seachKnow">
            <Option v-for="item in tagsList"
                    :value="item.id"
                    :key="item.id">{{ item.class_name }}</Option>
          </Select>
          <Divider type="vertical" />
          <Input v-model="videoForm.id"
                 placeholder="视频ID"
                 style="width: 120px;"
                 @on-blur="seachKnow"></Input>
          <Divider type="vertical" />
          <Input v-model="videoForm.video_name"
                 placeholder="视频名称"
                 style="width: 120px;"
                 @on-blur="seachKnow"></Input>
          <Divider type="vertical" />
          <Input v-model="videoForm.video_alias"
                 placeholder="视频别名"
                 style="width: 120px;"
                 @on-blur="seachKnow"></Input>
        </div>
        <Transfer :data="videoList"
                  :target-keys="targetKeys"
                  :list-style="listStyle"
                  :render-format="render"
                  :titles="['ID-视频名', '已关联视频']"
                  :operations="['取消关联','设置关联']"
                  @on-change="handleChange">
        </Transfer>
      </div>
    </Modal>

    <!-- 视频排序 -->
    <Modal v-model="modal4"
           mask
           title="视频排序"
           :width="840"
           :footer-hide="true">
      <div>
        <Divider type="vertical" />
        <Input v-model="carmform.video_name"
               placeholder="视频名称"
               style="width: 200px; margin-right: 10px;" />
        <Divider type="vertical" />
        <Input v-model="carmform.video_alias"
               placeholder="视频别名"
               style="width: 200px; margin-right: 10px;" />
        <Button type='primary'
                @click="Sortseach"
                style="margin-right: 10px;">搜索</Button>
        <Table stripe
               style="margin-top:10px"
               size="small"
               :columns="columns2"
               :data="data2"></Table>
      </div>
    </Modal>

    <!-- 试卷绑定 -->
    <Modal v-model="modal5"
           draggable
           title="试卷绑定"
           :width="640"
           :footer-hide="true">
      <div>
        <Form ref="shijuanForm"
              :model="shijuanForm"
              :rules="ruleProject"
              :label-width="80">
          <FormItem label="选择试卷">
            <Select v-model="shijuanForm.paper_id"
                    clearable
                    placeholder="试卷">
              <Option v-for="item in shijuanList"
                      :value="item.id"
                      :key="item.id">{{ item.paper_name }}</Option>
            </Select>
          </FormItem>
          <FormItem>
            <div style="text-align: right;">
              <Button @click="handleReset3('shijuanForm')"
                      style="margin-right: 8px">重 置</Button>
              <Button type="primary"
                      @click="handleSubmit3('shijuanForm')">绑 定</Button>
            </div>
          </FormItem>
        </Form>
      </div>
    </Modal>
    <!-- 添加 or 修改讲义 -->
    <Modal v-model="modals"
           draggable
           title="添加或修改讲义"
           :width="640"
           :footer-hide="true">
      <div>
        <Form ref="pdfForm"
              :label-width="80">
          <FormItem label="添加PDF">
            <Input v-model="handouts"
                   placeholder="请输入链接地址"></Input>
            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：输入PDF文件链接地址</p>
          </FormItem>
        </Form>
        <div style="text-align: right;">
          <Button type="info"
                  @click="handsumbit"
                  style="margin-right: 8px">添 加</Button>
        </div>
      </div>
    </Modal>

  </div>
</template>

<script>
import { getProjectMajor, sectionPaper, paperList } from "@/api/course";
import {
  getEduSection,
  addEduSection,
  putEduSection,
  eduSecNoViList,
  eduSecVideoList,
  addEduSectionVideo,
  eduSectionMove,
  EduSecHandouts,
  statusEduSection,
  delEduSection,
  eduSectionVideoMove
} from "@/api/Educode";
import config from "@/config";
import { mapMutations } from "vuex";
import { labelList } from "@/api/tags";
import { isNumber } from "util";
export default {
  data() {
    return {
      data: [],
      modal3: false,
      modal4: false,
      modal5: false,
      carmform: {
        course_id: this.$route.query.id,
        section_id: "",
        video_name: "",
        video_alias: ""
      },
      Row: "",
      handouts: "",
      modals: false,
      uplodapath: "",
      formatFile: ["pdf"],
      data2: [],
      columns2: [
        {
          title: "ID",
          key: "id",
          minWidth: 80
        },

        {
          title: "视频名称",
          key: "video_name",
          minWidth: 200,
          tooltip: true
        },
        {
          title: "视频VID",
          key: "VideoId",
          minWidth: 210
        },
        {
          title: "排序",
          key: "sort",
          minWidth: 150,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    marginRight: "10px"
                  }
                },
                params.row.sort
              ),
              h(
                "Button",
                {
                  props: {
                    type: "dashed",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.up2(params.row);
                    }
                  }
                },
                "上移"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "dashed",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.down2(params.row);
                    }
                  }
                },
                "下移"
              )
            ]);
          }
        }
      ],
      list: [],
      tagsList: [],
      valueList3: [],
      projectForm: {
        course_id: "",
        section_name: ""
      },
      projectForm2: {
        id: "",
        section_name: ""
      },
      shijuanForm: {
        paper_id: "",
        section_id: ""
      },
      ruleProject: {
        section_name: [
          { required: true, message: "请输入章节名称", trigger: "blur" }
        ]
      },
      modal: false,
      modal2: false,
      form: {
        course_id: this.$route.query.id
      },
      columns: [
        {
          title: "课程章ID",
          key: "id",
          minWidth: 90,
          align: "center"
        },
        {
          title: "课程名称",
          key: "course_name",
          minWidth: 110,
          tooltip: true
        },
        {
          title: "章节名称",
          key: "section_name",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "章节状态",
          key: "status",
          minWidth: 80,
          tooltip: true,
          render: (h, params) => {
            let texts = "";
            let color = "";
            if (params.row.status == 1) {
              texts = "上架";
              color = "#019beb";
            } else if (params.row.status == 2) {
              texts = "下架";
              color = "red";
            }
            return h(
              "div",
              {
                style: {
                  color: color
                }
              },
              texts
            );
          }
        },
       

        {
          title: "视频排序",
          key: "is_video",
          minWidth: 100,
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small",
                    ghost: true
                  },
                  on: {
                    click: () => {
                      this.comeSort(params.row);
                    }
                  }
                },
                "排序"
              )
            ]);
          }
        },
        {
          title: "排序",
          key: "sort",
          minWidth: 140,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    marginRight: "10px"
                  }
                },
                params.row.sort
              ),
              h(
                "Button",
                {
                  props: {
                    type: "dashed",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.up(params.row);
                    }
                  }
                },
                "上移"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "dashed",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.down(params.row);
                    }
                  }
                },
                "下移"
              )
            ]);
          }
        },
        {
          title: "操作",
          key: "action",
          minWidth: 300,
          align: "center",
          render: (h, params) => {
            let texts = "";
            let color = "";
            if (params.row.status == 2) {
              texts = "上架";
              color = "success";
            } else if (params.row.status == 1) {
              texts = "下架";
              color = "warning";
            }
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.upload(params.row);
                    }
                  }
                },
                "讲义上传"
              ),
              h(
                "Button",
                {
                  props: {
                    type: color,
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.ceeken(params.row);
                    }
                  }
                },
                texts
              ),
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.put(params.row);
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
                  on: {
                    click: () => {
                      this.remove(params.row);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      videoForm: {
        project_id: "",
        major_id: "",
        class_id: "",
        id: "",
        video_name: "",
        video_alias: ""
      },
      videoList: [],
      VideoList: [],
      targetKeys: [],
      row: "",
      listStyle: {
        width: "300px",
        height: "500px"
      },
      shijuanList: []
    };
  },
  components: {},
  watch: {
    valueList3(newValue, oldValue) {
      if (newValue.length === 0) {
        this.videoForm.project_id = "";
        this.videoForm.major_id = "";
      } else if (newValue.length === 1) {
        this.videoForm.project_id = newValue[0];
        this.videoForm.major_id = "";
      } else {
        this.videoForm.project_id = newValue[0];
        this.videoForm.major_id = newValue[1];
      }
    }
  },
  methods: {
    ...mapMutations(["addTag"]),
    addSec() {
      this.modal = true;
    },
    comeSort(row) {
      this.carmform.section_id = row.id;
      this.getSortlist(this.carmform);
      this.modal4 = true;
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        this.projectForm.course_id = this.$route.query.id;

        addEduSection(this.projectForm).then(res => {
          if (res.data.code === 200) {
            this.$Message.success("添加章节成功!");
            this.getData(this.form);
            this.handleReset(name);
            this.modal = false;
          }
        });
      });
    },
    Sortseach() {
      this.getSortlist(this.carmform);
    },
    upload(row) {
      this.modals = true;
      this.Row = row.id;
      this.handouts = row.handouts;
    },
    handsumbit() {
      EduSecHandouts({ id: this.Row, handouts: this.handouts }).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.$Message.success("添加链接成功");
          this.modals = false;
        } else if (rep.code === 405) {
          this.$Message.error("链接无效，请添加正确的格式！");
        }
      });
    },
    lookupload(row) {
      window.open(row.handouts);
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    handleSubmit2(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          putEduSection(this.projectForm2).then(res => {
            if (res.data.code === 200) {
              this.$Message.success("修改章节成功!");
              this.getData(this.form);
              this.handleReset2(name);
              this.modal2 = false;
            }
          });
        } else {
          this.$Message.error("请输入后再提交!");
        }
      });
    },
    handleReset2(name) {
      this.$refs[name].resetFields();
    },
    handleSubmit3(name) {
      if (!this.shijuanForm.paper_id) {
        this.$Message.error("请选择试卷!");
        return;
      }
      this.shijuanForm.section_id = this.row.section_id;
      sectionPaper(this.shijuanForm).then(res => {
        if (res.data.code === 200) {
          this.$Message.success("试卷绑定成功!");
          this.getData(this.form);
          this.handleReset3(name);
          this.modal5 = false;
        }
      });
    },
    handleReset3(name) {
      this.$refs[name].resetFields();
    },
    seach() {
      this.getData(this.form);
    },
    up(row) {
      eduSectionMove({ id: row.id, move_status: 1 }).then(res => {
        if (res.data.code === 200) {
          this.$Message.success("上移成功!");
          this.getData(this.form);
        } else if (res.data.code === 405) {
          this.$Message.success("无法移动，已经第一了!");
        }
      });
    },
    down(row) {
      eduSectionMove({ id: row.id, move_status: 2 }).then(res => {
        if (res.data.code === 200) {
          this.$Message.success("下移成功!");
          this.getData(this.form);
        } else if (res.data.code === 405) {
          this.$Message.success("无法移动，已经最后了!");
        }
      });
    },
    getSortlist(obj) {
      // course_id: this.$route.query.id,
      //   section_id: row.id,
      //   video_name: '',
      //   video_alias: ''
      eduSecVideoList(obj).then(res => {
        if (res.data.code === 200) {
          this.data2 = res.data.data;
        }
      });
    },
    up2(row) {
      eduSectionVideoMove({ id: row.id, move_status: 1 }).then(res => {
        if (res.data.code === 200) {
          this.$Message.success("上移成功!");
          this.getSortlist(this.carmform);
        } else if (res.data.code === 405) {
          this.$Message.success("无法移动，已经第一了!");
        }
      });
    },
    ceeken(row) {
      statusEduSection({
        id: row.id,
        status: row.status === 1 ? "2" : "1"
      }).then(res => {
        if (res.data.code === 200) {
          this.$Message.success(res.data.msg);
          this.getData(this.form);
        } else if (res.data.code === 405) {
          this.$Message.warning(res.data.msg);
        }
      });
    },

    down2(row) {
      eduSectionVideoMove({ id: row.id, move_status: 2 }).then(res => {
        if (res.data.code === 200) {
          this.$Message.success("下移成功!");
          this.getSortlist(this.carmform);
        } else if (res.data.code === 405) {
          this.$Message.success("无法移动，已经最后了!");
        }
      });
    },
    remove(row) {
      this.$Modal.confirm({
        title: "温馨提示",
        content: "是否确认删除此章节？",
        onOk: () => {
          delEduSection({ id: row.id }).then(res => {
            if (res.data.code === 200) {
              this.$Message.success("删除成功!");
              this.getData(this.form);
            }
          });
        }
      });
    },
    put(row) {
      this.projectForm2.id = row.id;
      this.projectForm2.section_name = row.section_name;
      this.modal2 = true;
    },
    getData(obj) {
      getEduSection(obj).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.data = rep.data;
        }
      });
    },
    getList(obj) {
      labelList(obj).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.tagsList = rep.data;
        }
      });
    },
    getProMajList() {
      getProjectMajor().then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.list = rep.data;
        }
      });
    },
    getVideoList(obj) {
      eduSecNoViList(obj).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          let arr = [];
          let Arr = [];
          let Carr = [];
          res.data.data.forEach(val => {
            arr.push(val.key * 1);
          });

          Arr = [...new Set([...arr, ...this.targetKeys])];

          this.VideoList.forEach((item, key) => {
            Arr.forEach(e => {
              if (item.key === e) {
                Carr.push(item);
              }
            });
          });

          this.videoList = Carr;
        }
      });
    },
    getTargetKeys() {
      eduSecVideoList({
        course_id: this.$route.query.id,
        section_id: this.row.id,
        video_name: "",
        video_alias: ""
      }).then(res => {
        if (res.data.code === 200) {
          let arr = [];
          if (res.data.data.length) {
            res.data.data.forEach(val => {
              arr.push(val.key);
            });
          }
          this.videoList = res.data.data;
          this.targetKeys = arr;
        }
      });
    },
    seachKnow() {
      this.getVideoList(this.videoForm);
    },
    handleChange(newTargetKeys, direction, moveKeys) {
      const newArr = newTargetKeys.filter(item => !moveKeys.includes(item));
      let Conarr = [...newArr, ...moveKeys];
      addEduSectionVideo({
        course_id: this.$route.query.id,
        section_id: this.row.id,
        video_id: Conarr.join(),
        relevant: direction === "left" ? 2 : 1
      }).then(res => {
        if (res.data.code === 200) {
          this.getTargetKeys();
          this.getData(this.form);
        }
      });
    },
    render(item) {
      return item.key + " ___ " + item.label;
    },
    addVideo(row) {
      this.row = row;
      this.videoForm.project_id = "";
      this.videoForm.major_id = "";
      this.videoForm.class_id = "";
      this.valueList3 = [];
      this.getTargetKeys();
      eduSecNoViList(this.videoForm).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.VideoList = rep.data;
        }
      });
      this.modal3 = true;
    },
    getPaperList() {
      paperList({ project_id: "", major_id: "", paper_name: "" }).then(res => {
        if (res.data.code === 200) {
          this.shijuanList = res.data.data;
        }
      });
    },
    bindPaper(row) {
      this.row = row;
      this.getPaperList();
      this.modal5 = true;
    }
  },
  mounted() {
    this.getData(this.form);
    this.getList({ status: "", class_name: "" });
    this.getProMajList();
    if (process.env.NODE_ENV === "production") {
      switch (document.domain) {
        case "dests.youcaiwx.cn":
          this.uplodapath = `${config.baseUrl.test}/upload/Index/uploadFile`;
          break;
        case "ycdb.youcaiwx.cn":
          this.uplodapath = `${config.baseUrl.pro}/upload/Index/uploadFile`;
          break;
        default:
          this.uplodapath = "https://dest.youcaiwx.cn/upload/Index/uploadFile";
          break;
      }
    } else {
      this.uplodapath = "https://dest.youcaiwx.cn/upload/Index/uploadFile";
    }
  }
};
</script>

<style lang="less">
</style>
