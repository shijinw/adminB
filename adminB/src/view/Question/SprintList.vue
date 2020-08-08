<template>
  <div>
    <Card>
      <p slot="title">冲刺训练营列表</p>
      <div>
        <Button type="default"
                shape="circle"
                icon="md-sync"
                @click="seach"></Button>
        <Divider type="vertical" />
        <Cascader :data="list"
                  v-model="valueList"
                  change-on-select
                  style="width:240px; display: inline-block;"
                  placeholder="项目/专业"></Cascader>
        <Divider type="vertical" />
        <Select v-model="formValidate.paper_type"
                clearable
                style="width:90px"
                placeholder="题目类型">
          <Option v-for="item in formatFile"
                  :value="item.id"
                  :key="item.id">{{
            item.name
          }}</Option>
        </Select>
        <Divider type="vertical" />

        <Select v-model="formValidate.status"
                clearable
                placeholder="状态"
                style="width:100px">
          <Option v-for="item in formatkeat"
                  :value="item.id"
                  :key="item.id">{{
            item.name
          }}</Option>
        </Select>

        <Divider type="vertical" />

        <Input v-model="formValidate.id"
               placeholder="试卷ID"
               style="width: 70px;magin-left:30px" />

        <Divider type="vertical" />

        <Input v-model="formValidate.paper_name"
               placeholder="组卷名称"
               style="width: 80px" />

        <Divider type="vertical" />

        <Select v-model="formValidate.difficulty"
                clearable
                placeholder="难易度"
                style="width:100px">
          <Option v-for="item in formatpink"
                  :value="item.name"
                  :key="item.id">{{ item.name }}</Option>
        </Select>

        <div style="float:right">
          <Button type="primary"
                  @click="seachKnow"
                  style="margin-right: 10px;">筛选</Button>
          <Button v-if="Auth.top[0]"
                  :type="Auth.top[0].menu_type"
                  style="margin-left: 10px"
                  @click="addKnow">{{ Auth.top[0].menu_title }}</Button>
        </div>
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
              :current="formValidate.page"
              :page-size="formValidate.limit"
              size="small"
              show-total
              show-elevator
              show-sizer />
      </div>
    </Card>
    <Modal v-model="modal3"
           mask
           scrollable
           title="试题列表"
           :footer-hide="true"
           :width="1200">
      <div>
        <Button type="primary"
                @click="Addlist"
                style="margin-right: 10px;">添加试题</Button>
        <span>选择{{ paperNum.seles }}条 </span> --
        <span>共{{ paperNum.selesall }}条</span>
        <Table stripe
               size="small"
               :columns="columns0"
               :data="data0"
               style="margin-top:10px"></Table>
      </div>
    </Modal>
    <!-- 添加试题 -->
    <Modal v-model="modal2"
           scrollable
           title="添加试题"
           :width="1000"
           :footer-hide="true"
           @on-visible-change="changevalue">
      <div>
        <Button type="default"
                shape="circle"
                icon="md-sync"
                @click="seachQ"></Button>
        <Divider type="vertical" />
        <Cascader :data="Klist"
                  v-model="KvalueList"
                  change-on-select
                  style="width:220px; display: inline-block;"
                  placeholder="项目/专业/知识点"></Cascader>
        <Divider type="vertical" />
        <Input v-model="Manage.question_keyword"
               placeholder="题干关键字"
               style="width: 100px; margin-right: 10px;" />
        <Divider type="vertical" />
        <Input v-model="Manage.question_id"
               placeholder="题目ID"
               style="width: 80px; margin-right: 10px;" />
        <Divider type="vertical" />
        <Input v-model="Manage.remark"
               placeholder="备注名"
               style="width: 80px" />
        <Divider type="vertical" />

        <Button type="primary"
                @click="seachW"
                style="margin-right: 10px;">搜索</Button>

        <Table ref="table"
               size="small"
               :columns="columns1"
               :data="data1"
               @on-selection-change="selectionStu"
               @on-select-cancel="selectionCancel"
               @on-select-all-cancel="CselectionAll"
               @on-select-all="selectionAll"
               style="margin-top:15px"></Table>
        <div style="padding: 20px 0; text-align: right;">
          <Page :total="total1"
                @on-change="AonChange"
                @on-page-size-change="AonPageSizeChange"
                :current="Manage.page"
                :page-size="Manage.limit"
                size="small"
                show-total
                show-elevator
                show-sizer />
        </div>
        <Button type="primary"
                @click="ADDsles"
                style="margin-right: 10px;">确认选择</Button>
        <Divider type="vertical" /> 选择{{ chnageChaked }}条 共{{
          paperNum.selesall
        }}条
      </div>
    </Modal>
  </div>
</template>

<script>
import { proMjor2tree, zkProMjorCou3tree, knob2Tree } from "@/api/Linkmenu";
import { userPageRuleList } from "@/api/Answer";
import excel from "@/libs/excel";
import {
  sprintList,
  getPlate,
  statusSprintPaper,
  sprintContentExport,
  addCachePaper,
  sprQueList,
  sprPaperQueMove,
  testSprPaperList,
  delSprPaperQue,
  addSprPaperQuestion,
  sprintPaperMove
} from "@/api/question";
import Fomat from "@/libs/fomat";
import { labelList } from "@/api/tags";

import { mapMutations } from "vuex";
export default {
  data() {
    return {
      data: [],
      list: [],
      rows: "",
      Klist: [],
      Slist: [],
      KvalueList: [],
      modal0: false,
      starttime: "",
      chnageChaked: 0,
      endtime: "",
      data1: [],
      data0: [],
      total1: 0,
      Sele_id: [],
      tagsList: [],
      courseId: "",
      valueList: [],
      valueList2: [],
      valueList3: [],
      Auth: {
        right: [],
        top: []
      },
      paperNum: {
        seles: 0,
        selesall: 0,
        selestor: 0
      },
      PaperNum: {
        seles: 0,
        selesall: ""
      },
      formatkeat: [
        {
          id: 1,
          name: "有效"
        },
        {
          id: 2,
          name: "作废"
        }
      ],
      formatFile: [
        {
          id: 1,
          name: "单选 "
        },
        {
          id: 2,
          name: "论述题"
        }
      ],
      formatlate: [],
      formatpink: [
        {
          id: 1,
          name: "A"
        },
        {
          id: 2,
          name: "B"
        },
        {
          id: 3,
          name: "C"
        }
      ],
      total: 0,
      columns: [
        {
          title: "试卷ID",
          key: "id",
          minWidth: 60
        },

        {
          title: "试卷名称",
          key: "paper_name",
          minWidth: 110,
          tooltip: true
        },

        {
          title: "试题类型",
          key: "paper_type",
          minWidth: 100,
          tooltip: true,
          render: (h, params) => {
            let text = "";
            let color = "";
            if (params.row.paper_type === 1) {
              text = "单选";
              color = "#019beb";
            } else {
              text = "论述题";
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
          title: "开始时间",
          key: "start_time",
          minWidth: 90,
          tooltip: true,
          align: "center"
        },
        {
          title: "结束时间",
          key: "end_time",
          minWidth: 90,
          tooltip: true,
          align: "center"
        },
        {
          title: "状态",
          key: "status",
          minWidth: 80,
          tooltip: true,
          render: (h, params) => {
            let text = "";
            let color = "";
            if (params.row.status === 1) {
              text = "正常";
              color = "#019beb";
            } else {
              text = "作废";
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
          title: "操作",
          key: "is_addkonw",
          minWidth: 340,
          align: "center",
          render: (h, params) => {
            let btns = [];
            if (this.Auth.right.length > 0) {
              let listBtn = this.Auth.right;
              listBtn.forEach(e => {
                let obj = h(
                  "Button",
                  {
                    props: {
                      type: e.menu_type,
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.publicFun(e.key, params.row);
                      }
                    }
                  },
                  e.menu_title
                );
                if (params.row.status == 2) {
                  if (e.key != "d") btns.push(obj);
                } else {
                  if (e.key != "e") btns.push(obj);
                }
              });
            }
            return h("div", [...btns]);
            // let texts = ''
            // let color = ''
            // if (params.row.status === 1) {
            //   texts = '作废'
            //   color = 'error'
            // } else if (params.row.status === 2) {
            //   texts = '有效'
            //   color = 'success'
            // }
            // return h('div', [
            //   h('Button', {
            //     props: {
            //       type: 'primary',
            //       size: 'small'

            //     },
            //     style: {
            //       marginRight: '10px'
            //     },
            //     on: {
            //       click: () => {
            //         this.LookKnow(params.row)
            //       }
            //     }
            //   }, '查看试题'),
            //   h('Button', {
            //     props: {
            //       type: 'info',
            //       size: 'small'

            //     },
            //     style: {
            //       marginRight: '10px'
            //     },
            //     on: {
            //       click: () => {
            //         this.putKnow(params.row)
            //       }
            //     }
            //   }, '修改'),
            //   h('Button', {
            //     props: {
            //       type: 'warning',
            //       size: 'small'

            //     },
            //     style: {
            //       marginRight: '10px'
            //     },
            //     on: {
            //       click: () => {
            //         this.cache(params.row)
            //       }
            //     }
            //   }, '缓存'),
            //   h('Button', {
            //     props: {
            //       type: color,
            //       size: 'small'

            //     },
            //     on: {
            //       click: () => {
            //         this.remove(params.row)
            //       }
            //     }
            //   }, texts)
            // ])
          }
        }
      ],
      columns0: [
        {
          title: "试卷内容ID",
          key: "id",
          minWidth: 90
        },

        {
          title: "专业分类",
          key: "major_name",
          minWidth: 100,
          tooltip: true
        },
        {
          title: "题干",
          key: "question_keyword",
          minWidth: 180,
          tooltip: true,
          align: "center"
        },
        {
          title: "知识点名称",
          key: "know_name",
          minWidth: 120,
          tooltip: true,
          align: "center"
        },
        {
          title: "创建日期",
          key: "create_time",
          minWidth: 120
        },
        {
          title: "排序值",
          key: "sort",
          minWidth: 90,
          tooltip: true
        },

        {
          title: "状态",
          key: "status",
          minWidth: 80,
          tooltip: true,
          render: (h, params) => {
            let text = "";
            let color = "";
            if (params.row.status === 1) {
              text = "正常";
              color = "#019beb";
            } else {
              text = "无效";
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
          title: "操作",
          minWidth: 230,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "10px"
                  },
                  on: {
                    click: () => {
                      this.Papermove(params.row);
                    }
                  }
                },
                "上移"
              ),
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
                      this.Paperup(params.row);
                    }
                  }
                },
                "下移"
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
                      this.delSprPaperQue(params.row);
                    }
                  }
                },
                "移除"
              )
            ]);
          }
        }
      ],
      columns1: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "试题ID",
          key: "id",
          minWidth: 80,
          align: "center"
        },

        {
          title: "专业分类",
          key: "major_name",
          minWidth: 100,
          tooltip: true
        },
        {
          title: "题干",
          key: "question_keyword",
          minWidth: 180,
          tooltip: true,
          align: "center"
        },
        {
          title: "知识点名称",
          key: "know_name",
          minWidth: 120,
          tooltip: true,
          align: "center"
        },
        {
          title: "创建日期",
          key: "create_time",
          minWidth: 120
        },
        {
          title: "备注",
          key: "remark",
          minWidth: 120
        }
      ],

      modal: false,
      modal2: false,
      modal3: false,
      title: "",
      type: 1,
      formValidate: {
        page: 1,
        limit: 10,
        project_id: "",
        major_id: "",
        paper_type: "",
        id: "",
        paper_name: "",
        status: "",
        plate_id: "",
        difficulty: ""
      },
      Manage: {
        page: 1,
        limit: 10,
        project_id: "",
        major_id: "",
        know_id: "",
        course_id: "",
        question_id: "",
        section_id: "",
        knob_id: "",
        question_keyword: "",
        paper_id: "",
        remark: ""
      },
      ruleValidate: {
        paper_type: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "blur"
          }
        ],
        project_id: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "change"
          }
        ],
        status: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "change"
          }
        ],
        difficulty: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "blur"
          }
        ],
        plate_id: [
          {
            requireplate_idd: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "blur"
          }
        ],
        paper_name: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "blur"
          }
        ],
        id: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "blur"
          }
        ]
      },
      form: {
        page: 1,
        limit: 10,
        project_id: "",
        course_id: "",
        know_id: "",
        type_id: "",
        question_type: "",
        status: "",
        id: "",
        question_stem: ""
      },
      row: null,
      knowLsit: []
    };
  },
  components: {},
  watch: {
    valueList(newValue, oldValue) {
      if (newValue.length === 0) {
        this.formValidate.project_id = "";
        this.formValidate.major_id = "";
        this.formValidate.know_id = "";
      } else if (newValue.length === 1) {
        this.formValidate.project_id = newValue[0];
        this.formValidate.major_id = newValue[1];
        this.formValidate.know_id = "";
      } else {
        this.formValidate.project_id = newValue[0];
        this.formValidate.major_id = newValue[1];
        this.formValidate.know_id = newValue[2];
      }
    },
    KvalueList(newValue, oldValue) {
      if (newValue.length === 0) {
        this.Manage.section_id = "";
        this.Manage.knob_id = "";
      } else if (newValue.length === 1) {
        this.Manage.section_id = newValue[0];
        this.Manage.knob_id = "";
      } else {
        this.Manage.section_id = newValue[0];
        this.Manage.knob_id = newValue[1];
      }
    }
  },
  methods: {
    ...mapMutations(["addTag"]),
    getProMajList() {
      proMjor2tree().then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.list = rep.data;
        }
      });
    },
    seachKnow() {
      this.getData(this.formValidate);
    },
    Export() {
      this.modal0 = true;
    },
    // 添加试题
    Addlist() {
      this.getknow(this.courseId);
      this.getData2(this.Manage);
      this.modal2 = true;
    },
    seachW() {
      this.getData2(this.Manage);
    },

    Papermove(row) {
      sprPaperQueMove({ id: row.id, move_status: 1 }).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.$Message.success(res.data.msg);
          this.getData1(this.rows);
        } else if (res.data.code === 405) {
          this.$Message.warning(res.data.msg);
        }
      });
    },
    getknow(id) {
      knob2Tree({ course_id: id }).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.Klist = rep.data;
        }
      });
    },
    Paperup(row) {
      sprPaperQueMove({ id: row.id, move_status: 2 }).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.$Message.success(res.data.msg);
          this.getData1(this.rows);
        } else if (res.data.code === 405) {
          this.$Message.warning(res.data.msg);
        }
      });
    },

    seachQ() {
      this.Manage.page = 1;
      this.Manage.limit = 10;
      this.Manage.project_id = "";
      this.Manage.major_id = "";
      this.Manage.know_id = "";
      this.Manage.question_id = "";
      this.Manage.question_keyword = "";

      this.valueList2 = [];
      this.getData2(this.Manage);
    },
    delSprPaperQue(row) {
      delSprPaperQue({ id: row.id }).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.$Message.success(res.data.msg);
          this.getData1(this.rows);
        } else if (res.data.code === 405) {
          this.$Message.warning(res.data.msg);
        }
      });
    },
    addKnow() {
      const route = {
        name: "addSprintPaper",
        meta: {
          title: `添加训练营试卷`
        }
      };
      this.addTag({
        route: route,
        type: "push"
      });
      this.$router.push(route);
    },
    seach() {
      this.formValidate.page = 1;
      this.formValidate.limit = 10;
      this.formValidate.project_id = "";
      this.formValidate.major_id = "";
      this.formValidate.know_id = "";
      this.formValidate.question_type = "";
      this.formValidate.status = "";
      this.formValidate.id = "";
      this.formValidate.question_stem = "";
      this.valueList = [];
      this.getData(this.formValidate);
    },

    onChange(val) {
      this.formValidate.page = val;

      this.getData(this.formValidate);
    },
    onPageSizeChange(val) {
      this.formValidate.limit = val;

      this.getData(this.formValidate);
    },
    AonChange(val) {
      this.Manage.page = val;
      this.getData2(this.Manage);
    },
    AonPageSizeChange(val) {
      this.Manage.limit = val;
      this.getData2(this.Manage);
    },
    handleReset(name) {
      this.$refs[name].resetFields();
      this.valueList2 = [];
    },

    getList(obj) {
      labelList(obj).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.tagsList = rep.data;
        }
      });
    },

    getData(obj) {
      sprintList(obj).then(res => {
        let rep = res.data;

        if (rep.code === 200) {
          this.data = rep.data.data;
          this.total = rep.data.total * 1;
        }
      });
    },
    getData1(row) {
      sprQueList({ paper_id: row.id }).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.data0 = rep.data.data;
          this.paperNum.selesall = rep.data.question_num;
          this.paperNum.seles = rep.data.data.length;
          this.paperNum.selestor = rep.data.data.length;
          this.courseId = rep.data.course_id;
        }
      });
    },
    ADDsles() {
      let arr = this.Sele_id.join(",");
      addSprPaperQuestion({ question_id: arr, paper_id: this.rows.id }).then(
        res => {
          let rep = res.data;
          if (rep.code === 200) {
            this.getData1(this.rows);
            this.modal2 = false;

            this.Manage.page = 1;
            this.Manage.limit = 10;
            this.Manage.project_id = "";
            this.Manage.major_id = "";
            this.Manage.know_id = "";
            this.Manage.question_id = "";
            this.Manage.question_keyword = "";

            this.valueList2 = [];
            this.$Message.success(res.data.msg);
            this.Sele_id = [];
          }
          if (rep.code === 405) {
            this.$Message.error(
              `数量不能大于  ${this.paperNum.selesall}条，请查看总数`
            );
          }
        }
      );
    },
    getData2(obj) {
      this.Manage.paper_id = this.rows.id;
      testSprPaperList(obj).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.paperNum.selesall = rep.data.question_num;
          this.paperNum.seles = rep.data.at_question_num;
          this.total1 = rep.data.total * 1;
          if (this.Sele_id.length) {
            this.chnageChaked = this.Sele_id.length + rep.data.at_question_num;
          } else {
            this.chnageChaked = rep.data.at_question_num;
          }
          let arr = rep.data.data;
          arr.forEach(val => {
            if (this.Sele_id.length > 0) {
              this.Sele_id.forEach(key => {
                if (key === val.id) {
                  val._checked = true;
                }
              });
            }
          });
          this.data1 = arr;
        }
      });
    },
    publicFun(key, row) {
      if (key === "b") {
        this.getData1(row);
        this.rows = row;
        this.modal3 = true;
      }
      if (key === "c") {
        const route = {
          name: "putSprintPaper",
          meta: {
            title: `${row.id}-修改训练营试卷`
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
      }
      // if (key === "d") {
      //   addCachePaper({ paper_id: row.id }).then(res => {
      //     let rep = res.data;
      //     if (rep.code === 200) {
      //       this.$Message.success(res.data.msg);
      //       this.getData(this.formValidate);
      //     } else if (res.data.code === 405) {
      //       this.$Message.warning(res.data.msg);
      //     }
      //   });
      // }
      if (key === "d") {
        statusSprintPaper({
          id: row.id,
          status: row.status === 1 ? "2" : "1"
        }).then(res => {
          let rep = res.data;
          if (rep.code === 200) {
            this.$Message.success(res.data.msg);
            this.getData(this.formValidate);
          } else if (res.data.code === 405) {
            this.$Message.warning(res.data.msg);
          }
        });
      }
      if (key === "e") {
        statusSprintPaper({
          id: row.id,
          status: row.status === 1 ? "2" : "1"
        }).then(res => {
          let rep = res.data;
          if (rep.code === 200) {
            this.$Message.success(res.data.msg);
            this.getData(this.formValidate);
          } else if (res.data.code === 405) {
            this.$Message.warning(res.data.msg);
          }
        });
      }
      if (key === "g") {
        sprintPaperMove({
          id: row.id,
          move_status: 1
        }).then(res => {
          let rep = res.data;
          if (rep.code === 200) {
            this.$Message.success(res.data.msg);
            this.getData(this.formValidate);
          } else if (res.data.code === 405) {
            this.$Message.warning(res.data.msg);
          }
        });
      }
      if (key === "h") {
        sprintPaperMove({
          id: row.id,
          move_status: 2
        }).then(res => {
          let rep = res.data;
          if (rep.code === 200) {
            this.$Message.success(res.data.msg);
            this.getData(this.formValidate);
          } else if (res.data.code === 405) {
            this.$Message.warning(res.data.msg);
          }
        });
      }
      if (key === "N") {
        sprintContentExport({ paper_id: row.id }).then(res => {
          if (res.data.code === 200) {
            if (res.data.data instanceof Array) {
              const params = {
                title: [
                  "试题ID",
                  "课程名称",
                  "题干",
                  "题干图片",
                  "试题类型",
                  "状态",
                  "备注",
                  "版块名称",
                  "知识点名称",
                  "创建时间",
                  "试题来源",
                  "解析"
                ],
                key: [
                  "id",
                  "course_name",
                  "question_stem",
                  "question_stem_img",
                  "question_type",
                  "status",
                  "remark",
                  "plate_name",
                  "know_name",
                  "create_time",
                  "queston_source",
                  "analysis"
                ],
                data: res.data.data,
                autoWidth: true,
                filename: row.paper_name
              };
              excel.export_array_to_excel(params);
              this.starttime = "";
              this.endtime = "";
              this.modal1 = false;
            } else {
              this.$Message.error(res.data.data);
            }
          } else if (res.data.code === 405) {
            this.$Message.error("您必选项目专业,该次导出失败");
          }
        });
      }
    },
    getAuth(name) {
      userPageRuleList({ menu_name: name }).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.Auth = rep.data;
        }
      });
    },
    getplate() {
      getPlate().then(res => {
        let rep = res.data;
        let Arr = [];
        let arr = [2, 3];
        if (rep.code === 200) {
          rep.data.forEach(e => {
            arr.forEach(item => {
              if (item === e.id) {
                Arr.push(e);
              }
            });
          });
        }
        this.formatlate = Arr;
      });
    },
    changevalue() {
      testSprPaperList(this.Manage).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.paperNum.selesall = rep.data.question_num;
          this.paperNum.seles = rep.data.at_question_num;
          this.total1 = rep.data.total * 1;
          this.Sele_id = [];
          this.data1 = rep.data.data;
        }
      });
    },
    // 选中
    selectionStu(arr) {
      if (this.paperNum.seles >= this.paperNum.selesall) {
        this.$Message.error(`已选择数量不能大于  ${this.paperNum.selesall}`);
      } else {
        let list = arr.map(item => item.id);
        if (list.length > 0) {
          list.forEach(v => {
            this.Sele_id.push(v);
          });
        }
        this.Sele_id = Array.from(new Set(this.Sele_id));
        if (this.paperNum.seles) {
          this.chnageChaked = this.Sele_id.length + this.paperNum.seles;
        } else {
          this.chnageChaked = this.Sele_id.length;
        }
      }
    },
    // 全选添加
    selectionAll(arr, row) {
      let Arr = [];
      this.data1.forEach(val => {
        Arr.push(val.id);
      });
      if (this.paperNum.seles + Arr.length >= this.paperNum.selesall) {
        this.$Message.error(`已选择数量不能大于  ${this.paperNum.selesall}`);
      } else {
        let list = arr.map(item => item.id);
        if (list.length > 0) {
          list.forEach(v => {
            this.Sele_id.push(v);
          });
        }
        this.Sele_id = Array.from(new Set(this.Sele_id));
        if (this.paperNum.seles) {
          this.chnageChaked = this.Sele_id.length + this.paperNum.seles;
        } else {
          this.chnageChaked = this.Sele_id.length;
        }
      }
    },
    // 全选删除
    CselectionAll(arr, row) {
      let Arr = [];
      this.data1.forEach(val => {
        Arr.push(val.id);
      });
      this.Sele_id = this.Sele_id.filter(item => !Arr.includes(item));
      if (this.paperNum.seles) {
        this.chnageChaked = this.Sele_id.length + this.paperNum.seles;
      } else {
        this.chnageChaked = this.Sele_id.length;
      }
    },
    // 取消
    selectionCancel(arr, row) {
      this.Sele_id.splice(this.Sele_id.findIndex(v => v === row.id), 1);
      if (this.paperNum.seles) {
        this.chnageChaked = this.Sele_id.length + this.paperNum.seles;
      } else {
        this.chnageChaked = this.Sele_id.length;
      }
    },
    getProMajType() {
      zkProMjorCou3tree().then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.Slist = rep.data;
        }
      });
    }
  },
  mounted() {
    this.getData(this.formValidate);
    this.getProMajList();
    this.getplate();
    this.getAuth(this.$route.name);
  }
};
</script>

<style lang="less"></style>
