
<template>
  <div>
    <Card>
      <p slot="title">组卷模考列表</p>
      <div>
        <Button type="default"
                shape="circle"
                icon="md-sync"
                @click="seach"></Button>
        <Divider type="vertical" />
        <Cascader :data="list"
                  v-model="valueList"
                  change-on-select
                  style="width:120px; display: inline-block;"
                  placeholder="项目/专业"></Cascader>
        <Divider type="vertical" />
        <Select v-model="formValidate.mock_type"
                clearable
                style="width:90px"
                placeholder="题目类型">
          <Option v-for="item in formatFile"
                  :value="item.id"
                  :key="item.id">{{ item.name }}</Option>
        </Select>
        <Divider type="vertical" />

        <Select v-model="formValidate.status"
                clearable
                placeholder="状态"
                style="width:100px">
          <Option v-for="item in formatkeat"
                  :value="item.id"
                  :key="item.id">{{ item.name }}</Option>
        </Select>

        <Divider type="vertical" />

        <Input v-model="formValidate.mock_name"
               placeholder="组卷名称"
               style="width: 80px" />

        <div style="float:right">
          <Button type='primary'
                  @click="seachKnow"
                  style="margin-right: 10px;">筛选</Button>
          <Button v-if="Auth.top[0]"
                  :type='Auth.top[0].menu_type'
                  style="margin-left: 10px;"
                  @click="addKnow">{{Auth.top[0].menu_title}}</Button>
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
              :current="form.page"
              :page-size="form.limit"
              size="small"
              show-total
              show-elevator
              show-sizer />
      </div>
    </Card>

    <Modal v-model="modal3"
           scrollable
           title="知识点组建"
           :width="700"
           :footer-hide="true">
      <div>
        <div style="padding-bottom: 15px;">
          <Cascader :data="knoblist"
                    v-model="knobvalueList"
                    change-on-select
                    placeholder="知识点章/知识点节"
                    style="display: inline-block; width: 180px;"
                    @on-change="seachKnowA"></Cascader>
          <Divider type="vertical" />
        </div>
        <Transfer :data="data3"
                  :target-keys="targetKeys3"
                  :list-style="listStyle"
                  :render-format="render3"
                  :titles="['未组建知识点','已组建知识点']"
                  :operations="['取消关联','设置关联']"
                  @on-change="handleChange3"></Transfer>

      </div>
    </Modal>
    </Modal>
    <!-- 试题 -->
    <Modal v-model="modal2"
           scrollable
           title="知识点列表"
           :width="900"
           :footer-hide="true">
      <div>
        <div>
          <p>当前试卷总题数为{{question_num}} ————已选择题目数为<span style="color:red">{{event}}</span></p>
        </div>
        <Table ref="table"
               size="small"
               :columns="columns1"
               :data="data1"></Table>

      </div>
    </Modal>
  </div>
</template>

<script>
import { knowThreeLevel, knowNoList } from "@/api/course";
import {
  addMockKnow,
  putMockKnowNum,
  getPlate,
  delMockKnow,
  statusMock,
  addCachePaper,
  mockKnowList,
  paperQueMove,
  paperQueList,
  delPaperQue,
  mockList
} from "@/api/question";
import Fomat from "@/libs/fomat";
import { proMjor2tree, zkProMjorCou3tree, knob2Tree } from "@/api/Linkmenu";
import { labelList } from "@/api/tags";
import { userPageRuleList } from "@/api/Answer";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      data: [],
      list: [],
      rows: "",
      Klist: [],
      Slist: [],
      modal0: false,
      question_num: "",
      listStyle: {
        width: "250px",
        height: "300px"
      },
      data1: [],
      data0: [],
      Auth: {
        right: [],
        top: []
      },
      knoblist: [],
      knobvalueList: [],
      total1: 0,
      data3: [],
      tagsList: [],
      valueList: [],
      valueList2: [],
      courselist: [],
      targetKeys3: [],
      mock_id: "",
      event: "",
      paperNum: {
        seles: 0,
        selesall: ""
      },
      PaperNum: {
        mock_id: "",
        know_id: "",
        course_id: "",
        status: ""
      },
      formatkeat: [
        {
          id: 1,
          name: "有效"
        },
        {
          id: 2,
          name: "无效"
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
          title: "ID",
          key: "id",
          minWidth: 60
        },
        {
          title: "项目名称",
          key: "project_name",
          minWidth: 100,
          tooltip: true
        },
        {
          title: "专业名称",
          key: "major_name",
          minWidth: 100,
          tooltip: true
        },
        {
          title: "组卷名称",
          key: "mock_name",
          minWidth: 110,
          tooltip: true
        },
        {
          title: "创建日期",
          key: "create_time",
          minWidth: 150
        },

        {
          title: "模考类型",
          key: "mock_type",
          minWidth: 100,
          tooltip: true,
          render: (h, params) => {
            let text = "";
            let color = "";
            if (params.row.mock_type === 1) {
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
          key: "is_addkonw",
          minWidth: 300,
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
                  if (e.key != "e") btns.push(obj);
                } else {
                  if (e.key != "f") btns.push(obj);
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
            //         this.putKnow(params.row)
            //       }
            //     }
            //   }, '修改'),
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
            //         this.setKnow(params.row)
            //       }
            //     }
            //   }, '知识点组建'),
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
            //         this.actions(params.row)
            //       }
            //     }
            //   }, '规则查看'),

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

      columns1: [
        {
          title: "试题ID",
          key: "id",
          minWidth: 60
        },

        {
          title: "知识点名",
          key: "label",
          minWidth: 150,
          tooltip: true
        },
        {
          title: "题库数量",
          key: "at_question_num",
          minWidth: 80,
          tooltip: true,
          align: "center"
        },

        {
          title: "取题数",
          key: "remark",
          minWidth: 120,
          render: (h, params) => {
            return h("div", [
              h("Input", {
                props: {
                  size: "small",
                  placeholder: "学员备注",
                  value: params.row.num
                },
                style: {},
                on: {
                  "on-blur": () => {
                    this.putRemark(event, params.row);
                  }
                }
              })
            ]);
          }
        },
        {
          title: "操作",
          key: "is_addkonw",
          minWidth: 100,
          align: "center",
          render: (h, params) => {
            return h("div", [
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
                      this.delKnow(params.row);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],

      modal: false,
      modal2: false,
      modal3: false,
      title: "",
      type: 1,
      formValidate: {
        page: 1,
        limit: 6,
        project_id: "",
        major_id: "",
        mock_type: "",
        mock_name: "",
        status: ""
      },
      Manage: {
        project_id: "",
        major_id: "",
        course_id: "",
        section_id: "",
        knob_id: ""
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
        limit: 6,
        project_id: "",
        major_id: "",
        mock_type: "",
        mock_name: "",
        status: ""
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
      } else if (newValue.length === 1) {
        this.formValidate.project_id = newValue[0];
        this.formValidate.major_id = newValue[1];
      } else {
        this.formValidate.project_id = newValue[0];
        this.formValidate.major_id = newValue[1];
      }
    },
    knobvalueList(newValue, oldValue) {
      if (newValue.length === 0) {
        this.Manage.section_id = "";
        this.Manage.knob_id = "";
      } else if (newValue.length === 1) {
        this.Manage.section_id = newValue[0];
        this.Manage.knob_id = newValue[1];
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
      mockList(this.formValidate).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.data = rep.data.data;
          this.total = rep.data.total * 1;
        }
      });
    },
    seachKnowA(row) {
      this.getDatas(this.Manage);
    },
    Export() {
      this.modal0 = true;
    },
    // 添加试题
    render3(item) {
      return item.key + " - " + item.label;
    },
    seachW() {
      this.getData2(this.Manage);
    },

    cache(row) {
      addCachePaper({ paper_id: row.id }).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.$Message.success(res.data.msg);
          this.getData(this.form);
        } else if (res.data.code === 405) {
          this.$Message.warning(res.data.msg);
        }
      });
    },
    Papermove(row) {
      paperQueMove({ id: row.id, move_status: 1 }).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.$Message.success(res.data.msg);
          this.getData1(this.rows);
        } else if (res.data.code === 405) {
          this.$Message.warning(res.data.msg);
        }
      });
    },
    Paperup(row) {
      paperQueMove({ id: row.id, move_status: 2 }).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.$Message.success(res.data.msg);
          this.getData1(this.rows);
        } else if (res.data.code === 405) {
          this.$Message.warning(res.data.msg);
        }
      });
    },

    handleChange3(newTargetKeys, direction, moveKeys) {
      this.targetKeys3 = newTargetKeys;
      this.PaperNum.know_id = newTargetKeys.join(",");
      direction === "left"
        ? (this.PaperNum.status = 2)
        : (this.PaperNum.status = 1);
      addMockKnow(this.PaperNum).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.modal3 = false;
          this.$Message.success("添加知识点成功，请注意查看");
        }
      });
    },
    getknob(id) {
      knob2Tree({ course_id: id }).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.knoblist = rep.data;
        }
      });
    },
    delPaperQue(row) {
      delPaperQue({ id: row.id }).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.$Message.success(res.data.msg);
          this.getData1(this.rows);
        } else if (res.data.code === 405) {
          this.$Message.warning(res.data.msg);
        }
      });
    },
    getDatas(obj) {
      knowNoList(obj).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          let arr = [];
          let Arr = [];
          let Carr = [];
          rep.data.forEach(val => {
            arr.push(val.key * 1);
          });
          Arr = [...new Set([...arr, ...this.targetKeys3])];
          this.courselist.forEach((item, key) => {
            Arr.forEach(e => {
              if (item.key === e) {
                Carr.push(item);
              }
            });
          });

          this.data3 = Carr;
        }
      });
    },
    addKnow() {
      const route = {
        name: "Add_Composition",
        meta: {
          title: `添加试卷`
        }
      };
      this.addTag({
        route: route,
        type: "push"
      });
      this.$router.push(route);
    },
    getmocks(id) {
      mockKnowList({ mock_id: id }).then(res => {
        let rep = res.data;
        let arr = [];
        if (rep.code === 200) {
          if (rep.data.data.length) {
            rep.data.data.forEach(item => {
              arr.push(item.key);
            });
          }
        }
        this.data3 = rep.data.data;
        this.targetKeys3 = arr;
      });
    },
    putRemark(el, row) {
      let event = el.target.value;
      if (event > this.question_num) {
        this.$Message.error("调取题目数量失败，不可超过总题库数量");
      } else {
        putMockKnowNum({
          mockknow_id: row.id,
          mock_id: this.mock_id,
          num: event
        }).then(res => {
          let rep = res.data;
          if (rep.code === 200) {
            this.event = rep.data.at_all_number;
            this.$Message.success("选择题数规则成功，请注意查看");
          } else if (rep.code === 405) {
            this.$Message.error(rep.msg);
          }
        });
      }
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
      this.form.page = val;
      this.Manage.page = val;
      this.getData(this.form);
    },
    onPageSizeChange(val) {
      this.form.limit = val;
      this.Manage.limit = val;
      this.getData(this.form);
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
      mockList(obj).then(res => {
        let rep = res.data;

        if (rep.code === 200) {
          this.data = rep.data.data;
          this.total = rep.data.total * 1;
        }
      });
    },
    getData1(row) {
      paperQueList({ paper_id: row.id }).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.data0 = rep.data.data;
          this.paperNum.selesall = rep.data.question_num;
          this.paperNum.seles = rep.data.total;
        }
      });
    },
    getAuth(name) {
      userPageRuleList({ menu_name: name }).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.Auth = rep.data;
        }
      });
    },
    delKnow(row) {
      delMockKnow({ mockknow_id: row.id }).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.$Message.success(res.data.msg);
          this.getpurlist();
        }
      });
    },

    getplate() {
      getPlate().then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.formatlate = rep.data;
        }
      });
    },

    getpurlist() {
      mockKnowList({ mock_id: this.mock_id }).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.data1 = rep.data.data;
          this.event = rep.data.mock_info.at_all_number;
        }
      });
    },
    getProMajType() {
      knowThreeLevel().then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.Slist = rep.data;
        }
      });
    },
    publicFun(key, row) {
      switch (key) {
        case "b":
          const route = {
            name: "Put_Composition",
            meta: {
              title: `${row.id}-修改组卷模考`
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
          break;
        case "c":
          this.targetKeys3 = [];
          this.getmocks(row.id);
          this.PaperNum.course_id = row.course_id;
          this.PaperNum.mock_id = row.id;
          this.Manage.course_id = row.course_id;
          this.knobvalueList = [];
          knowNoList(this.Manage).then(res => {
            if (res.data.code === 200) {
              this.courselist = res.data.data;
            }
          });
          this.getknob(row.course_id);
          this.modal3 = true;
          break;
        case "d":
          this.mock_id = row.id;
          this.question_num = row.question_num;
          this.getpurlist();
          this.modal2 = true;
          break;
        case "e":
          statusMock({ id: row.id, status: row.status === 1 ? "2" : "1" }).then(
            res => {
              let rep = res.data;
              if (rep.code === 200) {
                this.$Message.success(res.data.msg);
                this.getData(this.form);
              } else if (res.data.code === 405) {
                this.$Message.warning(res.data.msg);
              }
            }
          );
          break;
        case "f":
          statusMock({ id: row.id, status: row.status === 1 ? "2" : "1" }).then(
            res => {
              let rep = res.data;
              if (rep.code === 200) {
                this.$Message.success(res.data.msg);
                this.getData(this.form);
              } else if (res.data.code === 405) {
                this.$Message.warning(res.data.msg);
              }
            }
          );
          break;
      }
    },
    getknowType() {
      zkProMjorCou3tree().then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.Klist = rep.data;
        }
      });
    }
  },
  mounted() {
    this.getData(this.formValidate);
    this.getProMajList();
    this.getplate();
    this.getknowType();
    this.getAuth(this.$route.name);
  }
};
</script>

<style lang="less">
</style>
