<template>
  <div>
    <Card>
      <p slot="title">试题列表</p>
      <div style="display: flex;flex-wrap: wrap; align-items: center;">
        <Button type="default" shape="circle" icon="md-sync" @click="seach"></Button>
        <Divider type="vertical" />
        <Cascader
          :data="list"
          v-model="valueList"
          style="width:330px; display: inline-block;"
          placeholder="项目/专业/课程"
        ></Cascader>
        <Divider type="vertical" />
        <Cascader
          :data="listKnob"
          v-model="valueListKnob"
          change-on-select
          style="width:230px; display: inline-block;"
          placeholder="知识点章/知识点节"
        ></Cascader>
        <Divider type="vertical" />
        <Select
          v-model="formValidate.question_type"
          clearable
          style="width:90px"
          placeholder="题目类型"
        >
          <Option v-for="item in formatFile" :value="item.id" :key="item.id">
            {{
            item.name
            }}
          </Option>
        </Select>
        <Divider type="vertical" />
        <Input v-model="formValidate.id" placeholder="题目ID" style="width:70px" />
        <Divider type="vertical" />
        <Input v-model="formValidate.remark" placeholder="备注" style="width: 60px" />
        <Divider type="vertical" />
        <Input v-model="formValidate.question_keyword" placeholder="题干内容" style="width: 75px" />
      </div>
      <div>
        <Select
          v-model="formValidate.admin_id"
          clearable
          style="width:90px;margin-top:15px;margin-left:50px"
          placeholder="教研老师"
        >
          <Option v-for="item in teaching" :value="item.id" :key="item.id">
            {{
            item.truename
            }}
          </Option>
        </Select>
        <Divider type="vertical" />
        <Select
          v-model="formValidate.plate_id"
          clearable
          style="width:90px;margin-top:15px"
          placeholder="板块名"
        >
          <Option v-for="item in Plate" :value="item.id" :key="item.id">
            {{
            item.plate_name
            }}
          </Option>
        </Select>
        <Divider type="vertical" />
        <Select
          v-model="formValidate.status"
          clearable
          style="width:90px;margin-top:15px"
          placeholder="有/无效"
        >
          <Option v-for="item in Status" :value="item.id" :key="item.id">
            {{
            item.name
            }}
          </Option>
        </Select>
        <Button type="primary" @click="seachKnow" style="margin-left: 50px;margin-top:15px">搜索</Button>
        <Button
          v-if="Auth.top[0]"
          :type="Auth.top[0].menu_type"
          style="margin-left: 10px;margin-top:15px"
          @click="addKnow"
        >{{ Auth.top[0].menu_title }}</Button>
        <Button
          v-if="Auth.top[1]"
          :type="Auth.top[1].menu_type"
          style="margin-left: 10px;margin-top:15px"
          @click="Export"
        >{{ Auth.top[1].menu_title }}</Button>
      </div>
      <Divider />
      <Table stripe size="small" :columns="columns" :data="data" ref="scrall"></Table>

      <div style="padding: 20px 0; text-align: right;">
        <Page
          :total="total"
          @on-change="onChange"
          @on-page-size-change="onPageSizeChange"
          :current="formValidate.page"
          :page-size="formValidate.limit"
          size="small"
          show-total
          show-elevator
          show-sizer
        />
      </div>
    </Card>
    <!-- 导出弹层 -->
    <Modal v-model="modal0" draggable scrollable title="导出试题" ok-text="导出" @on-ok="exportStu">
      <div>
        <Form ref="daolist" :model="daolist" :rules="ruenDao" :label-width="80">
          <FormItem prop="DvalueList" label="项目课程" :label-width="100">
            <Cascader
              :data="list"
              v-model="daolist.DvalueList"
              style="width:100%; display: inline-block;"
              placeholder="项目/专业/课程"
            ></Cascader>
            <p
              style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;"
            >提示：选择项目/专业/课程</p>
          </FormItem>
          <FormItem label="章节知识点" :label-width="100">
            <Cascader
              :data="listKnob"
              v-model="daolist.Dvalue"
              change-on-select
              style="width:100%; display: inline-block;"
              placeholder="知识点章/知识点节"
            ></Cascader>
            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择章/节</p>
          </FormItem>
          <FormItem label="题目类型" :label-width="100">
            <Select v-model="daolist.question_type" clearable style="width:100%" placeholder="题目类型">
              <Option v-for="item in formatFile" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
            <p
              style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;"
            >提示：选择题目类型</p>
          </FormItem>
          <FormItem label="教研老师" :label-width="100">
            <Select v-model="daolist.admin_id" clearable style="width:100%" placeholder="教研老师">
              <Option v-for="item in teaching" :value="item.id" :key="item.id">{{ item.truename }}</Option>
            </Select>
            <p
              style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;"
            >提示：选择教研老师</p>
          </FormItem>
          <FormItem label="板块名称" :label-width="100">
            <Select v-model="daolist.plate_id" clearable style="width:100%" placeholder="板块名称">
              <Option v-for="item in Plate" :value="item.id" :key="item.id">
                {{
                item.plate_name
                }}
              </Option>
            </Select>
            <p
              style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;"
            >提示：选择教研老师</p>
          </FormItem>
        </Form>
      </div>
    </Modal>
    <!-- 预览弹层 -->
    <Modal v-model="modalA" scrollable title="预览试卷" :width="1000">
      <Card style="width:800px">
        <div>
          <component
            :is="item.component"
            :text="item.text"
            v-for="(item, inde) in items"
            :key="inde"
          ></component>

          <div v-if="Analysis.question_type === 2 ? false : true">
            <br />
            <p
              v-for="(item, index) in Analysis.Option"
              :key="index"
              :style="{
                color: item.id == Analysis.true_options ? 'red' : '#555'
              }"
              style="margin-top:10px"
            >{{ item.id }}: {{ item.item }}</p>

            <br />
          </div>
          <p style="margin-top:10px;color:red">考点：{{ Analysis.know_name }}</p>

          <p
            style="margin-top:10px;color:red"
            v-if="Analysis.question_type === 2 ? false : true"
          >正确答案：{{ Analysis.true_options }}</p>
          <br />

          <div style=" border-top: 1px dashed;">
            <div v-if="Analysis.analysis">
              <p style="margin-top:10px;color:green">解析答案</p>
              <p />
              <p v-html="Analysis.analysis"></p>
            </div>
            <div v-if="Analysis.analysis_img">
              <p style="color:green">解析图片</p>
              <p />
              <img :src="Analysis.analysis_img" style="width:300px;heigth:300px" />
              <img />
            </div>
          </div>
          <div style="  border-top: 1px dashed;">
            <div v-if="Analysis.analysis_one">
              <p style="margin-top:10px;color:green">解析答案2</p>
              <p />
              <p v-html="Analysis.analysis_one"></p>
            </div>
            <div v-if="Analysis.analysis_img_one">
              <p style="color:green">解析图片2</p>
              <p />
              <img :src="Analysis.analysis_img_one" style="width:300px;heigth:300px" />
              <img />
            </div>
          </div>
        </div>
      </Card>
    </Modal>
  </div>
</template>

<script>
import {
  questionList,
  questionExport,
  statusQuestion,
  getQuestion,
  teaching,
  getPlate
} from "@/api/question";
import Fomat from "@/libs/fomat";
import { userPageRuleList } from "@/api/Answer";
import { zkProMjorCou3tree, knob2Tree, knobKnow3Tree } from "@/api/Linkmenu";
import { labelList } from "@/api/tags";
import excel from "@/libs/excel";
import { mapMutations } from "vuex";
import Imagen from "../components/creates/Imagen.vue";
import texts from "../components/creates/texts.vue";
export default {
  data() {
    return {
      data: [],
      listKnob: [],
      valueListKnob: [],
      list: [],
      teaching: [],
      Acolor: "",
      modal0: false,
      starttime: "",
      endtime: "",
      tagsList: [],
      modalA: false,
      Auth: {
        right: [],
        top: []
      },
      Status: [{ id: 1, name: "有效" }, { id: 2, name: "无效" }],
      valueList: [],
      knoblist: [],
      valueList2: [],
      valueList3: [],
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
      total: 0,
      columns: [
        {
          title: "试题ID",
          key: "id",
          minWidth: 80,
          align: "center"
        },

        {
          title: "课程名称",
          key: "course_name",
          minWidth: 100,
          tooltip: true
        },
        {
          title: "题干关键字",
          key: "question_keyword",
          minWidth: 110,
          tooltip: true
        },
        {
          title: "知识点",
          key: "know_name",
          minWidth: 100,
          tooltip: true
        },
        {
          title: "试题类型",
          key: "question_type",
          minWidth: 90,
          tooltip: true,
          render: (h, params) => {
            let text = "";
            let color = "";
            if (params.row.question_type === 1) {
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
              text = "有效";
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
          title: "创建时间",
          key: "create_time",
          minWidth: 140,
          align: "center",
          tooltip: true
        },
        {
          title: "操作人",
          key: "truename",
          minWidth: 80,
          align: "center",
          tooltip: true
        },
        {
          title: "备注",
          key: "remark",
          minWidth: 110,
          tooltip: true
        },
        {
          title: "操作",
          key: "is_addkonw",
          minWidth: 180,
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
            //       type: 'warning',
            //       size: 'small'

            //     },
            //     style: {
            //       marginRight: '10px'
            //     },
            //     on: {
            //       click: () => {
            //         this.analysis(params.row)
            //       }
            //     }
            //   }, '预览'),
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
      modal: false,
      modal2: false,
      modal3: false,
      items: [],
      title: "",
      Plate: [],
      type: 1,
      daolist: {
        project_id: "",
        course_id: "",
        know_id: "",
        major_id: "",
        section_id: "",
        knob_id: "",
        admin_id: "",
        DvalueList: [],
        Dvalue: [],
        question_type: "",
        plate_id: ""
      },
      formValidate: {
        page: 1,
        limit: 10,
        id: "",
        project_id: "",
        course_id: "",
        know_id: "",
        section_id: "",
        knob_id: "",
        admin_id: "",
        class_id: "",
        question_type: "",
        status: "",
        question_stem: "",
        question_keyword: "",
        remark: ""
      },
      Analysis: {
        Option: [],
        know_id: "",
        class_id: "",
        question_type: "",
        status: "",
        question_stem: "",
        question_keyword: "",
        true_options: "",
        analysis: "",
        analysis_img: "",
        analysis_one: "",
        analysis_img_one: ""
      },
      ruenDao: {
        DvalueList: [
          { required: true, validator: Fomat.Rules.Verifiy().Build }
        ],

        Dvalue: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "change"
          }
        ],

        question_type: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "blur"
          }
        ],
        admin_id: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "blur"
          }
        ]
      },
      ruleValidate: {
        video_name: [
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
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "blur"
          }
        ]
      },
      form: {
        page: 1,
        limit: 10,
        project_id: "",
        major_id: "",
        know_id: "",
        question_type: "",
        status: "",
        id: "",
        question_stem: ""
      },
      row: null,
      knowLsit: [],
      targetKeys: [],
      listStyle: {
        width: "300px",
        height: "500px"
      }
    };
  },
  components: {
    Imagen,
    texts
  },
  watch: {
    valueList(newValue, oldValue) {
      if (newValue.length === 1) {
        this.formValidate.project_id = newValue[0];
        this.formValidate.major_id = "";
        this.formValidate.course_id = "";
      } else if (newValue.length === 2) {
        this.formValidate.project_id = newValue[0];
        this.formValidate.major_id = newValue[1];
        this.formValidate.course_id = "";
      } else if (newValue.length === 3) {
        this.formValidate.project_id = newValue[0];
        this.formValidate.major_id = newValue[1];
        this.formValidate.course_id = newValue[2];
        this.formValidate.section_id = "";
        this.formValidate.knob_id = "";
        this.valueListKnob = [];
        this.getProMajLists(newValue[2]);
      }
    },
    "daolist.DvalueList"(newValue, oldValue) {
      if (newValue.length === 1) {
        this.daolist.project_id = newValue[0];
        this.daolist.major_id = "";
        this.daolist.course_id = "";
      } else if (newValue.length === 2) {
        this.daolist.project_id = newValue[0];
        this.daolist.major_id = newValue[1];
        this.daolist.course_id = "";
      } else if (newValue.length === 3) {
        this.daolist.project_id = newValue[0];
        this.daolist.major_id = newValue[1];
        this.daolist.course_id = newValue[2];
        this.daolist.section_id = "";
        this.daolist.knob_id = "";
        this.daolist.know_id = "";
        this.daolist.Dvalue = [];
        this.getProMajLists(newValue[2]);
      }
    },
    "daolist.Dvalue"(newValue, oldValue) {
      if (newValue.length === 0) {
        this.daolist.section_id = "";
        this.daolist.knob_id = "";
      } else if (newValue.length === 1) {
        this.daolist.section_id = newValue[0];
        this.daolist.knob_id = "";
      } else if (newValue.length === 2) {
        this.daolist.section_id = newValue[0];
        this.daolist.knob_id = newValue[1];
      }
    },
    valueList2(newValue, oldValue) {
      if (newValue.length === 0) {
        this.formValidate.project_id = "";
        this.formValidate.major_id = "";
      } else if (newValue.length === 1) {
        this.formValidate.project_id = newValue[0];
        this.formValidate.major_id = "";
      } else {
        this.formValidate.project_id = newValue[0];
        this.formValidate.major_id = newValue[1];
      }
    },
    valueListKnob(newValue, oldValue) {
      if (newValue.length === 0) {
        this.formValidate.section_id = "";
        this.formValidate.knob_id = "";
      } else if (newValue.length === 1) {
        this.formValidate.section_id = newValue[0];
        this.formValidate.knob_id = "";
      } else {
        this.formValidate.section_id = newValue[0];
        this.formValidate.knob_id = newValue[1];
      }
    },
    valueList3(newValue, oldValue) {
      if (newValue.length === 0) {
        this.knowForm.project_id = "";
        this.knowForm.major_id = "";
      } else if (newValue.length === 1) {
        this.knowForm.project_id = newValue[0];
        this.knowForm.major_id = "";
      } else {
        this.knowForm.project_id = newValue[0];
        this.knowForm.major_id = newValue[1];
      }
    }
  },
  methods: {
    ...mapMutations(["addTag", "setquestion"]),
    getProMajList() {
      zkProMjorCou3tree().then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.list = rep.data;
        }
      });
    },
    seachKnow() {
      this.formValidate.page = 1;
      this.getData(this.formValidate);
    },
    Export() {
      this.$refs.daolist.resetFields();
      this.daolist.DvalueList = [];
      this.daolist.Dvalue = [];
      this.modal0 = true;
    },
    addKnow() {
      const route = {
        name: "Add_Question",
        meta: {
          title: "添加题库"
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
      this.formValidate.course_id = "";
      this.formValidate.know_id = "";
      this.formValidate.question_type = "";
      this.formValidate.status = "";
      this.formValidate.id = "";
      this.formValidate.question_stem = "";
      this.valueList = [];
      this.valueListKnob = [];
      this.getData(this.formValidate);
      this.getProMajLists();
    },

    onChange(val) {
      this.formValidate.page = val;
      this.getData(this.formValidate);
    },
    onPageSizeChange(val) {
      this.formValidate.limit = val;
      this.getData(this.formValidate);
    },

    handleReset(name) {
      this.$refs[name].resetFields();
      this.valueList2 = [];
    },
    getProMajLists(id) {
      knob2Tree({ course_id: id || "" }).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.listKnob = rep.data;
        } else if (rep.code === 404) {
          this.listKnob = [];
        }
      });
    },
    getthers() {
      teaching().then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.teaching = rep.data;
        }
      });
    },
    publicFun(key, row) {
      if (key === "c") {
        getQuestion({ id: row.id }).then(res => {
          if (res.data.code === 200) {
            let arr = [];
            let Arr = [];
            let rep = res.data.data;
            // this.valueList = [rep.project_id, rep.major_id]
            this.Analysis.question_type = rep.question_type;
            this.Analysis.difficulty = rep.difficulty;
            this.Analysis.know_name = rep.know_name;
            this.Analysis.true_options = rep.true_options;
            this.Analysis.question_keyword = rep.question_keyword.replace(
              /\n/g,
              "<br>"
            );
            arr.push(
              { id: "A", item: rep.option_a },
              { id: "B", item: rep.option_b },
              { id: "C", item: rep.option_c },
              { id: "D", item: rep.option_d }
            );
            this.Analysis.Option = arr;
            // this.formValidate.queston_source = rep.queston_source
            // this.formValidate.video_explain = rep.video_explain
            this.Analysis.analysis = rep.analysis.replace(/\n/g, "<br>");
            rep.analysis_img
              ? (this.Analysis.analysis_img = rep.analysis_img)
              : (this.Analysis.analysis_img = "");
            rep.analysis_one
              ? (this.Analysis.analysis_one = rep.analysis_one.replace(
                  /\n/g,
                  "<br>"
                ))
              : (this.Analysis.analysis_one = "");
            rep.analysis_img_one
              ? (this.Analysis.analysis_img_one = rep.analysis_img_one)
              : (this.Analysis.analysis_img_one = "");

            rep.question_stem.forEach((item, index) => {
              let reg = /http/;
              if (reg.test(rep.question_stem[index])) {
                Arr.push({
                  component: Imagen,
                  text: item
                });
              } else {
                Arr.push({
                  component: texts,
                  text: item.replace(/\n/g, "<br>")
                });
              }
              this.items = Arr;
            });
          }
        });
        // this.Analysis.true_options === 'A' ? this.Acolor = 'red' : this.Acolor = '#5555'
        // this.Analysis.true_options === 'B' ? this.Acolor = 'red' : this.Acolor = '#5555'
        // this.Analysis.true_options === 'C' ? this.Acolor = 'red' : this.Acolor = '#5555'
        // this.Analysis.true_options === 'D' ? this.Acolor = 'red' : this.Acolor = '#5555'
        // console.log(this.Acolor)
        this.modalA = true;
      }
      if (key === "d") {
        const route = {
          name: "Put_Question",
          meta: {
            title: `${row.id} -修改题库`
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
      if (key === "e") {
        statusQuestion({
          id: row.id,
          status: row.status === 1 ? "2" : "1"
        }).then(res => {
          if (res.data.code === 200) {
            this.$Message.success("该试题作废成功，请查看");
            this.getData(this.formValidate);
          } else if (res.data.code === 405) {
            this.$Message.warning(res.data.msg);
          }
        });
      }
      if (key === "f") {
        statusQuestion({
          id: row.id,
          status: row.status === 1 ? "2" : "1"
        }).then(res => {
          if (res.data.code === 200) {
            this.$Message.success("该试题有效，请查看");
            this.getData(this.formValidate);
          } else if (res.data.code === 405) {
            this.$Message.warning(res.data.msg);
          }
        });
      }
    },
    getList(obj) {
      labelList(obj).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.tagsList = rep.data;
        }
      });
    },
    // 导出信息
    exportStu() {
      questionExport(this.daolist).then(res => {
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
              filename: "题库列表"
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
    },
    getplate() {
      getPlate().then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.Plate = rep.data;
        }
      });
    },
    Qchecked(id) {
      knobKnow3Tree({ course_id: id }).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.knoblist = rep.data;
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
    getData(obj) {
      questionList(obj).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.data = rep.data.data;
          this.total = rep.data.total * 1;
        }
      });
    }
  },

  mounted() {
    this.formValidate = this.$store.state.keepalive.question;
    this.valueList = [
      this.$store.state.keepalive.question.project_id,
      this.$store.state.keepalive.question.major_id,
      this.$store.state.keepalive.question.know_id
    ];
    this.getData(this.formValidate);
    this.getProMajList();
    this.getthers();
    this.getList({ status: "", class_name: "" });
    this.getAuth(this.$route.name);
    this.getplate();
  },
  destroyed() {
    this.setquestion(this.formValidate);
  }
};
</script>

<style lang="less"></style>
