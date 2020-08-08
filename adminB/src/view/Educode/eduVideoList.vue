<template>
  <div>
    <Card>
      <p slot="title">视频库</p>
      <div>
        <Button type="default"
                shape="circle"
                icon="md-sync"
                @click="Break"></Button>
        <Divider type="vertical" />
        <Cascader :data="listW"
                  v-model="valueList"
                  change-on-select
                  style="width:160px; display: inline-block;"
                  placeholder="课程/章节"></Cascader>
        <Divider type="vertical" />

        <Input v-model="form.video_name"
               placeholder="视频名称"
               style="width: 120px; margin-right: 10px;" />
        <Divider type="vertical" />
        <Input v-model="form.video_alias"
               placeholder="视频别名"
               style="width: 120px; margin-right: 10px;" />
        <Divider type="vertical" />
        <Input v-model="form.id"
               placeholder="视频ID"
               style="width: 100px; margin-right: 10px;" />
        <Button type='primary'
                @click="seach"
                style="margin-right: 10px;">筛选</Button>
        <Button v-if="Auth.top[0]"
                :type='Auth.top[0].menu_type'
                style="margin-right: 10px;"
                @click="addVideo">{{Auth.top[0].menu_title}}</Button>
      </div>
      <Divider />
      <Table stripe
             size="small"
             :columns="columns"
             :data="data"></Table>

      <div style="padding: 20px 0; text-align: right;">
        <Page :total="total"
              @on-change="onChange"
              @on-page-size-change="onPageSizeChange"
              :current="form.page"
              :page-size="form.limit"
              size="small"
              show-total
              show-elevator
              show-sizer />
      </div>

      <!-- 添加 or 修改 -->
      <Modal v-model="modal"
             draggable
             :title="title"
             :width="640"
             :footer-hide="true">
        <div>
          <Form ref="formValidate"
                :model="formValidate"
                :rules="ruleValidate"
                :label-width="80">
            <FormItem label="课程/章节"
                      prop="valueList2">
              <Cascader :data="listW"
                        v-model="formValidate.valueList2"
                        placeholder="课程/章节"></Cascader>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择课程&章节</p>
            </FormItem>

            <FormItem label="视频名称"
                      prop="video_name">
              <Input v-model="formValidate.video_name"
                     placeholder="视频名称"></Input>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：输入该视频名称</p>
            </FormItem>
            <FormItem label="视频 vid"
                      prop="VideoId">
              <Input v-model="formValidate.VideoId"
                     placeholder="视频vid"></Input>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：阿里云的视频vid</p>
            </FormItem>
            <FormItem label="课程时长"
                      prop="video_time">
              <Input v-model="formValidate.video_time"
                     readonly
                     placeholder="课程时长"
                     style="width: 200px;"></Input> <Button type="primary"
                      @click="getTime"
                      style="margin-left: 10px">获取时长</Button>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：填写视频vid后点击按钮获取时长</p>
            </FormItem>

            <FormItem label="视频别名"
                      prop="video_alias">
              <Input v-model="formValidate.video_alias"
                     placeholder="视频别名"></Input>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：输入视频别名，用于方便检索</p>
            </FormItem>
            <FormItem>
              <div style="text-align: right;">
                <Button @click="handleReset('formValidate')">重置</Button>
                <Button type="primary"
                        @click="handleSubmit('formValidate')"
                        style="margin-left: 8px">提 交</Button>
              </div>
            </FormItem>
          </Form>
        </div>
      </Modal>

      <!-- 添加 or 修改讲义 -->
      <Modal v-model="modal2"
             draggable
             title="添加或修改讲义"
             :width="640"
             :footer-hide="true">
        <div>
          <Form ref="pdfForm"
                :label-width="80">
            <FormItem label="选择PDF">
              <Upload multiple
                      type="drag"
                      :action="uplodapath"
                      accept=".pdf"
                      :format="formatFile"
                      :max-size="1024"
                      name="file"
                      :show-upload-list="true"
                      :on-success="handleSuccess"
                      :on-format-error="handleFormatError"
                      :on-exceeded-size="handleMaxSize"
                      :before-upload="handleBeforeUpload">
                <div style="padding: 20px 0">
                  <Icon type="ios-cloud-upload"
                        size="52"
                        style="color: #3399ff"></Icon>
                  <p>点击或拖拽文件到此处上传</p>
                </div>
              </Upload>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：点击或拖拽PDF文件到此处上传</p>
            </FormItem>
          </Form>
        </div>
      </Modal>

      <!-- 添加 or 修改知识点 -->
      <Modal v-model="modal3"
             draggable
             title="添加或修改知识点"
             :width="800"
             :footer-hide="true">
        <div>
          <div style="padding-bottom: 15px;">
            <!-- <Cascader :data="list"
                      v-model="valueList3"
                      placeholder="项目/专业/课程"
                      style="display: inline-block; width: 250px;"
                      @on-change="seachKnow"></Cascader>
            <Divider type="vertical" /> -->
            <Cascader :data="list4"
                      v-model="valueList4"
                      change-on-select
                      placeholder="知识点章/知识点节"
                      style="display: inline-block; width: 250px;"
                      @on-change="seachKnow4"></Cascader>
            <Divider type="vertical" />
          </div>
          <Transfer :data="knowLsit"
                    :target-keys="targetKeys"
                    :list-style="listStyle"
                    :render-format="render"
                    :titles="['知识点列表', '已关联知识点']"
                    :operations="['取消关联','设置关联']"
                    @on-change="handleChange">
          </Transfer>
        </div>
      </Modal>
    </Card>
  </div>
</template>

<script>
import {
  knowNoList,
  knowVideoList,
  addKnowVideo,
  knowThreeLevel,
  getProjectMajor
} from "@/api/course";
import {
  eduVideoList,
  videoTime,
  addEduHandouts,
  delEduVideo,
  addEduVideo,
  putEduVideo
} from "@/api/Educode";

import { labelList } from "@/api/tags";
import { userPageRuleList } from "@/api/Answer";
import { eduCorSec2tree } from "@/api/Linkmenu";
import Fomat from "@/libs/fomat";
import config from "@/config";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      data: [],
      list: [],
      Auth: {
        right: [],
        top: []
      },
      tagsList: [],
      uplodapath: "",
      valueList: [],
      valueList2: [],
      valueList3: [],
      valueList4: [],
      list4: [],
      listW: [],
      formatFile: ["pdf"],
      total: 0,
      columns: [
        {
          title: "视频ID",
          key: "id",
          minWidth: 80,
          align: "center"
        },
        {
          title: "课程名称",
          key: "course_name",
          minWidth: 130,
          tooltip: true
        },
        {
          title: "章节名称",
          key: "section_name",
          minWidth: 150,
          tooltip: true
        },
        {
          title: "视频名称",
          key: "video_name",
          minWidth: 200,
          tooltip: true
        },
        {
          title: "视频别名",
          key: "video_alias",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "操作",
          key: "action",
          minWidth: 350,
          align: "center",
          render: (h, params) => {
            let btns = [];
            if (this.Auth.right.length > 0) {
              let listBtn = this.Auth.right;
              listBtn.forEach(v => {
                let obj = h(
                  "Button",
                  {
                    props: {
                      type: v.menu_type,
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.publicFun(v.key, params.row);
                      }
                    }
                  },
                  v.menu_title
                );
                if (params.row.is_addknow === 0) {
                  if (v.key != "c") btns.push(obj);
                } else {
                  if (v.key != "b") btns.push(obj);
                }
              });
            }
            return h("div", [...btns]);
          }
        }
        // {
        //   title: '配置知识点',
        //   key: 'is_addkonw',
        //   minWidth: 150,
        //   align: 'center',
        //   render: (h, params) => {
        //     if (params.row.is_addknow === 0) {
        //       return h('div', [
        //         h('Button', {
        //           props: {
        //             type: 'primary',
        //             size: 'small',
        //             ghost: true
        //           },
        //           on: {
        //             click: () => {
        //               this.addKnow(params.row)
        //             }
        //           }
        //         }, '添加')
        //       ])
        //     } else {
        //       return h('div', [
        //         h('Button', {
        //           props: {
        //             type: 'primary',
        //             size: 'small',
        //             ghost: true
        //           },
        //           on: {
        //             click: () => {
        //               this.addKnow(params.row)
        //             }
        //           }
        //         }, '修改')
        //       ])
        //     }
        //   }
        // },
        // {
        //   title: '配置讲义',
        //   key: 'handouts',
        //   minWidth: 150,
        //   align: 'center',
        //   render: (h, params) => {
        //     if (params.row.handouts) {
        //       return h('div', [
        //         h('Button', {
        //           props: {
        //             type: 'primary',
        //             size: 'small',
        //             ghost: true
        //           },
        //           on: {
        //             click: () => {
        //               this.lookPdf(params.row)
        //             }
        //           }
        //         }, '查看'),
        //         h('Divider', {
        //           props: {
        //             type: 'vertical'
        //           }
        //         }),
        //         h('Button', {
        //           props: {
        //             type: 'primary',
        //             size: 'small',
        //             ghost: true
        //           },
        //           on: {
        //             click: () => {
        //               this.addPdf(params.row)
        //             }
        //           }
        //         }, '修改')
        //       ])
        //     } else {
        //       return h('div', [
        //         h('Button', {
        //           props: {
        //             type: 'primary',
        //             size: 'small',
        //             ghost: true
        //           },
        //           on: {
        //             click: () => {
        //               this.addPdf(params.row)
        //             }
        //           }
        //         }, '添加')
        //       ])
        //     }
        //   }
        // },
        // {
        //   title: '操作',
        //   key: 'action',
        //   minWidth: 150,
        //   align: 'center',
        //   render: (h, params) => {
        //     return h('div', [
        //       h('Button', {
        //         props: {
        //           type: 'info',
        //           size: 'small'
        //         },
        //         style: {
        //           marginRight: '5px'
        //         },
        //         on: {
        //           click: () => {
        //             this.put(params.row)
        //           }
        //         }
        //       }, '修改'),
        //       h('Button', {
        //         props: {
        //           type: 'error',
        //           size: 'small'
        //         },
        //         on: {
        //           click: () => {
        //             this.remove(params.row)
        //           }
        //         }
        //       }, '删除')
        //     ])
        //   }
        // }
      ],
      modal: false,
      modal2: false,
      modal3: false,
      title: "",
      type: 1,
      formValidate: {
        id: "",
        video_name: "",
        play_num: "",
        section_id: "",
        course_id: "",
        VideoId: "",
        video_alias: "",
        video_time: "",
        valueList2: []
      },
      ruleValidate: {
        video_name: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "blur"
          }
        ],
        play_num: [{ required: true, validator: Fomat.Rules.Verifiy().num }],
        valueList2: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required
          }
        ],
        class_id: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "change"
          }
        ],
        VideoId: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "blur"
          }
        ],
        video_time: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Twoyes,
          }
        ]
      },
      form: {
        page: 1,
        limit: 10,
        course_id: "",
        section_id: "",
        video_name: "",
        id: "",
        video_alias: ""
      },

      row: null,
      knowLsit: [],
      knoblist: [],
      targetKeys: [],
      listStyle: {
        width: "300px",
        height: "500px"
      },
      clble: {
        project_id: "",
        major_id: "",
        course_id: ""
      },
      knowForm: {
        project_id: "",
        major_id: "",
        course_id: "",
        video_id: "",
        section_id: "",
        knob_id: ""
      }
    };
  },
  components: {},
  watch: {
    valueList(newValue, oldValue) {
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
    },
    "formValidate.valueList2"(newValue, oldValue) {
      if (newValue.length === 0) {
        this.formValidate.course_id = "";
        this.formValidate.section_id = "";
      } else if (newValue.length === 1) {
        this.formValidate.course_id = newValue[0];
        this.formValidate.section_id = "";
      } else {
        this.formValidate.course_id = newValue[0];
        this.formValidate.section_id = newValue[1];
      }
    },
    valueList3(newValue, oldValue) {
      if (newValue.length === 0) {
        this.knowForm.project_id = "";
        this.knowForm.major_id = "";
        this.knowForm.course_id = "";
        this.clble.project_id = "";
        this.clble.major_id = "";
        this.clble.course_id = "";
      } else if (newValue.length === 1) {
        this.knowForm.project_id = newValue[0];
        this.knowForm.major_id = "";
        this.knowForm.course_id = "";
        this.clble.project_id = newValue[0];
        this.clble.major_id = "";
        this.clble.course_id = "";
      } else if (newValue.length === 1) {
        this.knowForm.project_id = newValue[0];
        this.knowForm.major_id = newValue[1];
        this.knowForm.course_id = "";
        this.clble.project_id = newValue[0];
        this.clble.major_id = newValue[1];
        this.clble.course_id = "";
      } else {
        this.knowForm.project_id = newValue[0];
        this.knowForm.major_id = newValue[1];
        this.knowForm.course_id = newValue[2];
        this.clble.project_id = newValue[0];
        this.clble.major_id = newValue[1];
        this.clble.course_id = newValue[2];
        this.getknow(newValue[2]);
      }
    },
    valueList4(newValue, oldValue) {
      if (newValue.length === 0) {
        this.knowForm.section_id = "";
        this.knowForm.knob_id = "";
      } else if (newValue.length === 1) {
        this.knowForm.section_id = newValue[0];
        this.knowForm.knob_id = "";
      } else {
        this.knowForm.section_id = newValue[0];
        this.knowForm.knob_id = newValue[1];
      }
    }
  },
  methods: {
    ...mapMutations(["addTag", "setvideo"]),
    getTargetKeys(data) {
      let arr = [];
      data.forEach(val => {
        arr.push(val.key);
      });
      this.targetKeys = arr;
    },
    seachKnow() {
      this.knowForm.knob_id = "";
      this.knowForm.section_id = "";
      this.valueList4 = [];
      knowNoList(this.knowForm).then(res => {
        if (res.data.code === 200) {
          this.knowLsit = res.data.data;
          this.knoblist = res.data.data;
        }
      });
    },
    handleChange(newTargetKeys, direction, moveKeys) {
      let arr = [...newTargetKeys, ...moveKeys];
      let Znrr = [...new Set(newTargetKeys)];
      let Hnrr = [...new Set(arr)];
      addKnowVideo({
        video_id: this.row.id,
        know_id: direction === "left" ? Znrr.join(",") : Hnrr.join(",")
      }).then(res => {
        if (res.data.code === 200) {
          if (direction === "left") {
            this.targetKeys = newTargetKeys;
          } else {
            this.targetKeys = [...new Set(arr)];
          }
          this.$Message.success("添加知识点成功！");
          this.getData(this.form);
        }
      });
    },
    render(item) {
      return item.key + " - " + item.label;
    },

    Break() {
      this.form.page = 1;
      this.form.limit = 10;
      this.form.section_id = "";
      this.form.course_id = "";
      this.form.video_name = "";
      this.form.id = "";
      this.form.video_alias = "";
      this.form.valueList = [];
      this.getData(this.form);
    },
    seach() {
      this.getData(this.form);
    },
    addVideo() {
      this.type = 1;
      this.title = "添加视频";
      this.handleReset("formValidate");
      this.modal = true;
    },
    handleSuccess(res, file) {
      if (res.code === 200) {
        addEduHandouts({ id: this.row.id, handouts: res.data.file_url }).then(
          res => {
            this.$Message.success("讲义上传成功!");
            this.modal2 = false;
            this.getData(this.form);
          }
        );
      } else {
        this.$Message.success("请检查文件可用性!");
      }
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "文件格式不否",
        desc: "请上传 PDF 文件，即后缀为 pdf 的文件。"
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "文件超出限制大小",
        desc: "文件过大，请上传小于等于 1M 的文件。"
      });
    },
    handleBeforeUpload() {
      console.log("前方高能，我要开始上传了，请注意！");
    },
    getTime() {
      if (!this.formValidate.VideoId) {
        this.$Message.error("请先填写视频vid!");
        return;
      }
      videoTime({ VideoId: this.formValidate.VideoId }).then(res => {
        if (res.data.code === 200) {
          this.$Message.success("时长获取成功!");
          this.formValidate.video_time = res.data.data.video_time;
        } else {
          this.$Message.error("时长获取失败，请确认vid是否输入正确!");
        }
      });
    },
    seachKnow4() {
      knowNoList(this.knowForm).then(res => {
        if (res.data.code === 200) {
          let arr = [];
          let Arr = [];
          let Carr = [];
          res.data.data.forEach(val => {
            arr.push(val.key * 1);
          });
          Arr = [...new Set([...arr, ...this.targetKeys])];
          this.knoblist.forEach((item, key) => {
            Arr.forEach(e => {
              if (item.key === e) {
                Carr.push(item);
              }
            });
          });
          this.knowLsit = Carr;
        }
      });
    },
    onChange(val) {
      this.form.page = val;
      this.getData(this.form);
    },
    onPageSizeChange(val) {
      this.form.limit = val;
      this.getData(this.form);
    },
    handleSubmit(name) {
      console.log(this.formValidate)
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.type == 1) {
            addEduVideo(this.formValidate).then(res => {
              if (res.data.code === 200) {
                this.$Message.success("添加成功!");
                this.form.valueList2 = [];
                this.handleReset(name);
                this.modal = false;
                this.getData(this.form);
              }
            });
          } else {
            putEduVideo(this.formValidate).then(res => {
              if (res.data.code === 200) {
                this.$Message.success("修改成功!");
                this.handleReset(name);
                this.form.valueList2 = [];
                this.modal = false;
                this.getData(this.form);
              }
            });
          }
        } else {
          this.$Message.error("请认真填写后再提交!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
      this.form.valueList2 = [];
    },
    getAuth(name) {
      userPageRuleList({ menu_name: name }).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.Auth = rep.data;
        }
      });
    },

    getknow(id) {
      knob2Tree({ course_id: id }).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.list4 = rep.data;
        }
      });
    },
    publicFun(key, row) {
      switch (key) {
        case "c":
          this.row = row;
          this.valueList3 = [];
          this.valueList4 = [];
          this.knowForm.video_id = row.id;
          knowVideoList(this.knowForm).then(res => {
            if (res.data.code === 200) {
              this.knowLsit = res.data.data;
              this.getTargetKeys(res.data.data);
            }
          });
          this.modal3 = true;
          break;
        case "b":
          this.row = row;
          this.valueList3 = [];
          this.valueList4 = [];
          this.knowForm.video_id = row.id;
          knowVideoList(this.knowForm).then(res => {
            if (res.data.code === 200) {
              this.knowLsit = res.data.data;
              this.getTargetKeys(res.data.data);
            }
          });
          this.modal3 = true;
          break;
        case "d":
          window.open(row.handouts);
          break;
        case "e":
          this.row = row;
          this.modal2 = true;
          break;
        case "f":
          this.type = 2;
          this.title = "修改视频信息";
          // this.valueList2 = []
          // this.handleReset('formValidate')
          console.log(row);
          this.formValidate.id = row.id;
          this.formValidate.video_name = row.video_name;
          this.formValidate.course_id = row.course_id;
          this.formValidate.section_id = row.section_id;
          this.formValidate.valueList2 = [row.course_id, row.section_id];

          this.formValidate.VideoId = row.VideoId;
          this.formValidate.video_time = row.video_time;
          this.formValidate.play_num = row.play_num;
          this.formValidate.video_alias = row.video_alias;
          this.modal = true;
          break;
        case "g":
          this.$Modal.confirm({
            title: "温馨提示",
            content: "确认删除此视频吗？",
            onOk: () => {
              delEduVideo({ id: row.id }).then(res => {
                if (res.data.code === 200) {
                  this.$Message.success("删除成功!");
                  this.getData(this.form);
                }
              });
            }
          });
          break;
      }
    },

    getData(obj) {
      eduVideoList(obj).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.data = rep.data.data;
          this.total = rep.data.total * 1;
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
    // getProMajList() {
    //   proMjorCou3tree().then(res => {
    //     let rep = res.data
    //     if (rep.code === 200) {
    //       this.list = rep.data
    //     }
    //   })
    // },
    getQroMajList() {
      eduCorSec2tree().then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.listW = rep.data;
        }
      });
    }
  },
  mounted() {
  
    // this.form = this.$store.state.keepalive.video
    // this.valueList = [
    //   this.$store.state.keepalive.video.project_id,
    //   this.$store.state.keepalive.video.major_id
    // ]
    this.getList({ status: "", class_name: "" });

    this.getData(this.form);
    this.getQroMajList();
    this.getAuth(this.$route.name);
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
  },
  destroyed() {
    this.setvideo(this.form);
  }
};
</script>

<style lang="less">
</style>
