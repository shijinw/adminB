<template>
  <div>
    <Card>
      <div>
        <Button type="default"
                shape="circle"
                icon="md-sync"
                @click="seachQ"></Button>
        <Divider type="vertical" />
        <Select v-model="form.status"
                @on-change="select"
                style="width:200px">
          <Option v-for="item in statusList"
                  :value="item.value"
                  :key="item.value">{{ item.label }}</Option>
        </Select>
        <Divider type="vertical" />
        <Input v-model="form.mobile"
               placeholder="手机号码"
               style="width: 160px; margin-right: 10px;" />
        <Input v-model="form.username"
               placeholder="用户名称"
               style="width: 160px; margin-right: 10px;" />
        <Input v-model="form.id"
               placeholder="用户ID"
               style="width: 160px; margin-right: 10px;" />
        <Button type='primary'
                @click="seach"
                style="margin-right: 10px;">搜索</Button>
        <Button type='primary'
                style="margin-right: 10px;"
                v-for="(val, index) in top"
                :key="index"
                @click="publicFun(val.key)">{{ val.menu_title }}</Button>
      </div>
      <Divider />
      <Table size="small"
             width="100%"
             :columns="columns"
             :data="data" border></Table>
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
    <!-- 导出弹层 -->
    <Modal v-model="modal1"
           mask
           title="导出学员"
           ok-text="导出"
           @on-ok="exportStu">
      <div>
        <p style="padding-bottom: 10px;">请选择时间段：</p>
        <Row>
          <Col :span="11">
          <DatePicker v-model="starttime"
                      type="datetime"
                      placeholder="开始时间"
                      style="width: 100%"></DatePicker>
          </Col>
          <Col :span="2"
               style="text-align: center; line-height: 32px;">
          </Col>
          <Col :span="11">
          <DatePicker v-model="endtime"
                      type="datetime"
                      placeholder="结束时间"
                      style="width: 100%"></DatePicker>
          </Col>
        </Row>
      </div>
    </Modal>
    <!-- 重置密码 -->
    <Modal v-model="modal2"
          mask
           title="重置密码"
           :footer-hide="true">
      <div>
        <Form ref="pasForm"
              :model="pasForm"
              :rules="rulePas"
              :label-width="80">
          <FormItem label="新 密 码"
                    prop="pass">
            <Input v-model="pasForm.pass"
                   type="password"
                   placeholder="请输入密码"></Input>
          </FormItem>
          <FormItem label="确认密码"
                    prop="password">
            <Input v-model="pasForm.password"
                   type="password"
                   placeholder="请再次输入密码"></Input>
          </FormItem>
          <FormItem>
            <div style="text-align: right;">
              <Button @click="handleReset('pasForm')"
                      style="margin-right: 8px">重 置</Button>
              <Button type="primary"
                      @click="handleSubmit('pasForm')">提 交</Button>
            </div>
          </FormItem>
        </Form>
      </div>
    </Modal>
    <!-- 赠送积分 -->
    <Modal v-model="modal3"
           mask
           title="赠送积分"
           :footer-hide="true">
      <div>
        <Form ref="jifenForm"
              :model="jifenForm"
              :rules="ruleJifen"
              :label-width="80">
          <FormItem label="积 分 数"
                    prop="integral">
            <Input v-model="jifenForm.integral"
                   placeholder="请输入积分数"></Input>
          </FormItem>
          <FormItem>
            <div style="text-align: right;">
              <Button @click="handleReset3('jifenForm')"
                      style="margin-right: 8px">重 置</Button>
              <Button type="primary"
                      @click="handleSubmit3('jifenForm')">提 交</Button>
            </div>
          </FormItem>
        </Form>
      </div>
    </Modal>
    <!-- 冻结学员 -->
    <Modal v-model="modal4"
          mask
           title="冻结学员"
           :footer-hide="true">
      <div>
        <Form ref="freezeForm"
              :model="freezeForm"
              :rules="ruleFreeze"
              :label-width="80">
          <FormItem label="冻结天数"
                    prop="days">
            <Select v-model="freezeForm.days"
                    placeholder="请选择天数">
              <Option v-for="item in freelist"
                      :value="item.id"
                      :key="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
          <FormItem>
            <div style="text-align: right;">
              <Button @click="handleReset4('freezeForm')"
                      style="margin-right: 8px">重 置</Button>
              <Button type="primary"
                      @click="handleSubmit4('freezeForm')">提 交</Button>
            </div>
          </FormItem>
        </Form>
      </div>
    </Modal>
    <!-- Cpe积分 -->
    <Modal v-model="Cpemodal"
           mask
          
           title="活动积分课程"
           :footer-hide="true"
           :width="1000">
      <div>
        <div>
          <Button type='primary'
                  @click="addUserCpe"
                  style="margin-right: 10px;">赠送积分课程</Button>
        </div>
        <Divider />
        <Table size="small"
               ref="selection"
               :columns="Cpecolumns"
               :data="Cpedata"
               @on-selection-change="selectionCpeCourse"></Table>
      </div>
    </Modal>
    <!-- 开通课程 -->
    <Modal v-model="modal5"
           mask
           title="开通课程"
           :footer-hide="true"
           :width="1100">
      <div>
        <div>
          <Button type='primary'
                  @click="openCourse"
                  style="margin-right: 10px;">开通课程</Button>
        </div>
        <Divider />
        <Table size="small"
               ref="selection"
               :columns="columns5"
               :data="data5"
               @on-selection-change="selectionOpenCourse"></Table>
      </div>
    </Modal>
      <!-- 开通后期教育课程包 -->
    <Modal v-model="Edumodal"
           mask
           title="开通后期教育课程包"
           :footer-hide="true"
           :width="1100">
      <div>
        <div>
          <Button type='primary'
                  @click="EduopenCourse"
                  style="margin-right: 10px;">开通后期教育课程包</Button>
        </div>
        <Divider />
        <Table size="small"
               ref="Eduselection"
               :columns="Educolumns5"
               :data="Edudata"
               @on-selection-change="EduOpenCourse"></Table>
      </div>
    </Modal>
    <!-- 关闭课程 -->
    <Modal v-model="modal6"
          mask
           title="关闭课程"
           :footer-hide="true"
           :width="650">
      <div>
        <div>
          <Button type='primary'
                  @click="closeCourse"
                  style="margin-right: 10px;">关闭课程</Button>
        </div>
        <Divider />
        <Table size="small"
               ref="selection6"
               :columns="columns6"
               :data="data6"
               @on-selection-change="selectionCourse"></Table>
      </div>
    </Modal>
    <!-- 开通题库 -->
    <Modal v-model="modal7"
           mask
           title="开通题库"
           :footer-hide="true">
      <div>
        <Form ref="tiForm"
              :model="tiForm"
              :rules="ruleTi"
              :label-width="80">
          <FormItem label="选择试题"
                    prop="course_id">
            <Select v-model="tiForm.course_id">
              <Option v-for="item in tiList"
                      :value="item.id"
                      :key="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
          <FormItem label="开通天数"
                    prop="days">
            <Input type="number"
                   v-model="tiForm.days"
                   placeholder="请输入天数"></Input>
          </FormItem>
          <FormItem>
            <div style="text-align: right;">
              <Button @click="handleReset7('tiForm')"
                      style="margin-right: 8px">重 置</Button>
              <Button type="primary"
                      @click="handleSubmit7('tiForm')">提 交</Button>
            </div>
          </FormItem>
        </Form>
      </div>
    </Modal>
    <!-- 关闭题库 -->
    <Modal v-model="modal8"
        mask
           title="关闭题库"
           :footer-hide="true">
      <div>
        <Form ref="closeTiForm"
              :model="closeTiForm"
              :rules="ruleCloseTi"
              :label-width="80">
          <FormItem label="选择试题"
                    prop="course_id">
            <Select v-model="closeTiForm.course_id">
              <Option v-for="item in data8"
                      :value="item.course_id"
                      :key="item.value">{{ item.name }}</Option>
            </Select>
          </FormItem>
          <FormItem>
            <div style="text-align: right;">
              <Button @click="handleReset8('closeTiForm')"
                      style="margin-right: 8px">重 置</Button>
              <Button type="primary"
                      @click="handleSubmit8('closeTiForm')">提 交</Button>
            </div>
          </FormItem>
        </Form>
      </div>
    </Modal>
    <!-- 延期 -->
    <Modal v-model="modal9"
           mask
           title="延期"
           :footer-hide="true">
      <div>
        <Form ref="yanqiForm"
              :model="yanqiForm"
              :rules="ruleYanqi"
              :label-width="80">
          <FormItem label="延续天数"
                    prop="days">
            <Input type="number"
                   v-model="yanqiForm.days"
                   placeholder="请输入延续天数"></Input>
          </FormItem>
          <FormItem>
            <div style="text-align: right;">
              <Button @click="handleReset9('yanqiForm')"
                      style="margin-right: 8px">重 置</Button>
              <Button type="primary"
                      @click="handleSubmit9('yanqiForm')">提 交</Button>
            </div>
          </FormItem>
        </Form>
      </div>
    </Modal>
  </div>
</template>

<script>
import {
  studentList,
  putRemark,
  exportStudent,
  changePassword,
  giveIntegral,
  zhengkeList,
  deleteDev,
  studenFinish,
  setEmployee,
  studenFreeze,
  studenUnfreeze,
  openCourseList,
  openCourse,
  closeCourseList,
  closeCourse,
  openQuestion,
  userQuestionList,
  closeUserQuestion,
  userPostpone,
  deleteStudent,
  addUserCpe,
  addPreviewList,
  openEduCourseList,
  openEduCourse
} from "@/api/student";
import { userPageRuleList } from "@/api/control";
import expandRow from "./table-expand.vue";
import excel from "@/libs/excel";
import moment from "moment";
import Fomat from "@/libs/fomat";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      top: [],
      right: [],
      data: [],
      data5: [],
      Cpedata: [],
      Edudata:[],
      Edumodal:false,
      USerid: "",
      data6: [],
      data8: [],
      total: 0,
      Opencouse:'',
      preview_id: "",
      Edupackage_id:'',
      Cpefrom: {
        limit: 10,
        page: 1,
        user_id: "",
        name: ""
      },
      Cpecolumns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "课程ID",
          key: "id",
          minWidth: 80,
          align: "center"
        },

        {
          title: "课程名称",
          key: "name",
          minWidth: 150,
          tooltip: true,
          align: "center"
        },
        {
          title: "活动地点",
          key: "activity_address",
          minWidth: 150,
          tooltip: true,
          align: "center"
        },
        {
          title: "开始时间",
          key: "start_time",
          minWidth: 140,
          tooltip: true,
          align: "center"
        },
        {
          title: "结束时间",
          key: "end_time",
          minWidth: 140,
          tooltip: true,
          align: "center"
        },
        {
          title: "cpe积分",
          key: "cpe",
          minWidth: 140,
          tooltip: true,
          align: "center"
        }
      ],
      columns: [
        {
          type: "expand",
          width: 50,
          resizable: true,
          render: (h, params) => {
            return h(expandRow, {
              props: {
                row: params.row
              }
            });
          }
        },
        {
          title: "ID",
          key: "id",
          width: 80,
          resizable: true,
        },
        {
          title: "手机号码",
          key: "mobile",
          minWidth: 120,
          resizable: true
        },
        {
          title: "学员名称",
          key: "username",
          minWidth: 100,
          resizable: true
        },
        {
          title: "账号状态",
          key: "status",
          minWidth: 100,
          resizable: true,
          render: (h, params) => {
            let texts = "";
            let color = "";
            if (params.row.status == 1) {
              texts = "正式";
              color = "#19be6b";
            } else if (params.row.status == 2) {
              texts = "内购";
              color = "#EE2C2C";
            } else if (params.row.status == 3) {
              texts = "注册";
              color = "#9A66E4";
            } else if (params.row.status == 4) {
              texts = "员工";
              color = "#2d8cf0";
            } else if (params.row.status == 5) {
              texts = "毕业";
              color = "#ff9900";
            } else if (params.row.status == 6) {
              texts = "网络";
              color = "#00EEEE";
            } else if (params.row.status == 7) {
              texts = "面授";
              color = "#8888";
            }
            return h("div", [
              h("span", {
                props: {},
                style: {
                  marginRight: "5px",
                  borderRadius: "50%",
                  width: "12px",
                  height: "12px",
                  backgroundColor: color,
                  float: "left",
                  marginTop: "3px"
                }
              }),
              h(
                "span",
                {
                  props: {}
                },
                texts
              )
            ]);
          }
        },
        {
          title: "备注",
          key: "remark",
          minWidth: 150,
          resizable: true,
          render: (h, params) => {
            return h("div", [
              h("Input", {
                props: {
                  size: "small",
                  placeholder: "学员备注",
                  value: params.row.remark
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
          key: "action",
          width: 840,
          minWidth: 750,
          align: "center",
          resizable: true,
          render: (h, params) => {
            let btns = [];
            if (this.right.length > 0) {
              let listBtn = this.right;

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
                btns.push(obj);
              });
            }
            return h("div", [...btns]);
          }
        }
      ],
      columns5: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "ID",
          key: "id",
          width: 80
        },
        {
          title: "课程名称",
          key: "name",
          minWidth: 240
        },
        {
          title: "价格",
          key: "price",
          minWidth: 100
        },
        {
          title: "状态",
          key: "status",
          minWidth: 100,
          render: (h, params) => {
            let texts = "";
            if (params.row.status == 2) {
              texts = "下架";
            } else if (params.row.status == 1) {
              texts = "上架";
            }
            return h("div", [
              h(
                "span",
                {
                  props: {}
                },
                texts
              )
            ]);
          }
        },
        {
          title: "参加人数",
          key: "join_num",
          minWidth: 100
        },
        {
          title: "是否正课",
          key: "is_zheng",
          minWidth: 100,
          render: (h, params) => {
            let texts = "";
            if (params.row.is_zheng == 2) {
              texts = "不是正课";
            } else if (params.row.is_zheng == 1) {
              texts = "是正课";
            }
            return h("div", [
              h(
                "span",
                {
                  props: {}
                },
                texts
              )
            ]);
          }
        },
        {
          title: "是否有课",
          key: "is_content",
          minWidth: 150,
          render: (h, params) => {
            let texts = "";
            if (params.row.is_content == 2) {
              texts = "套餐下无课程不可选择";
            } else if (params.row.is_content == 1) {
              texts = "套餐下有课程";
            }
            return h("div", [
              h(
                "span",
                {
                  props: {}
                },
                texts
              )
            ]);
          }
        }
      ],
       Educolumns5: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "ID",
          key: "id",
          width: 80
        },
        {
          title: "课程名称",
          key: "name",
          minWidth: 240
        },
        {
          title: "价格",
          key: "price",
          minWidth: 100
        },
        {
          title: "状态",
          key: "status",
          minWidth: 100,
          render: (h, params) => {
            let texts = "";
            if (params.row.status == 2) {
              texts = "下架";
            } else if (params.row.status == 1) {
              texts = "上架";
            }
            return h("div", [
              h(
                "span",
                {
                  props: {}
                },
                texts
              )
            ]);
          }
        },
        {
          title: "参加人数",
          key: "join_num",
          minWidth: 100
        },
      
      ],
      columns6: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "ID",
          key: "id",
          width: 80
        },

        {
          title: "课程名称",
          key: "package_name",
          minWidth: 220
        },
        {
          title: "课程到期时间",
          key: "expri_time",
          minWidth: 130
        }
      ],
      statusList: [],
      form: {
        mobile: "",
        username: "",
        status: "",
        id: "",
        page: 1,
        limit: 10
      },
      freelist: [
        {
          id: 182,
          name: "半年"
        },
        {
          id: 365,
          name: "一年"
        },
        {
          id: 730,
          name: "两年"
        }
      ],

      modal1: false,
      row: "",
      starttime: "",
      endtime: "",
      modal2: false,
      modal3: false,
      modal4: false,
      modal5: false,
      Cpemodal: false,
      modal6: false,
      modal7: false,
      modal8: false,
      modal9: false,
      pasForm: {
        id: "",
        pass: "",
        password: ""
      },
      rulePas: {
        pass: [{ required: true, message: "请输入密码", trigger: "blur" }],
        password: [
          { required: true, message: "请再次输入密码", trigger: "blur" }
        ]
      },
      jifenForm: {
        id: "",
        integral: ""
      },
      ruleJifen: {
        integral: [{ required: true, message: "请输入积分数", trigger: "blur" }]
      },
      freezeForm: {
        id: "",
        days: ""
      },
      ruleFreeze: {
        days: [{ required: true, message: "请输入冻结天数" }]
      },
      tiForm: {
        id: "",
        course_id: "",
        days: ""
      },
      ruleTi: {
        course_id: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "change"
          }
        ],
        days: [{ required: true, message: "请输入开通天数", trigger: "blur" }]
      },
      closeTiForm: {
        id: "",
        course_id: ""
      },
      ruleCloseTi: {
        course_id: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "change"
          }
        ]
      },
      yanqiForm: {
        id: "",
        days: ""
      },
      ruleYanqi: {
        days: [{ required: true, message: "请输入天数", trigger: "blur" }]
      },
      course_id: "",
      tiList: []
    };
  },
  components: { expandRow },
  methods: {
    ...mapMutations(["addTag", "setstudent"]),
    openCourse() {
      if (this.Opencouse === "") {
        this.$Message.error("请选择您要开通的课程!");
        return;
      }
      openCourse({ id: this.row.id, package_id: this.Opencouse }).then(res => {
        if (res.data.code === 200) {
          this.$Message.success("课程开通成功!");
          this.modal5 = false;
          this.getData(this.form);
        } else if (res.data.code === 404) {
          this.$Message.error(res.data.msg);
        }
      });
    },
    addUserCpe() {
      if (this.preview_id === "") {
        this.$Message.error("请选择您要赠送学员Cpe积分!");
        return;
      }
      addUserCpe({ user_id: this.USerid, preview_id: this.preview_id }).then(
        res => {
          if (res.data.code === 200) {
            this.$Message.success("赠送学员Cpe积分课程成功!");
            this.Cpemodal = false;
            this.getCpedata();
            this.getData(this.form);
          } else if (res.data.code === 404) {
            this.$Message.error(res.data.msg);
          }
        }
      );
    },
    closeCourse() {
      if (this.course_id === "") {
        this.$Message.error("请选择您要关闭的课程!");
        return;
      }
      closeCourse({ id: this.row.id, package_id: this.course_id }).then(res => {
        if (res.data.code === 200) {
          this.$Message.success("课程关闭成功!");
          this.modal6 = false;
          this.getData(this.form);
        }
      });
    },
    EduOpenCourse(arr){
    let arrId = arr.map(item => item.id);
      this.Edupackage_id = arrId.join(",");
    },
  
    selectionOpenCourse(arr){
      let arrId = arr.map(item => item.id);
      this.Opencouse = arrId.join(",");
    },
    // selectionCourse6(arr) {
    //   let arrId = arr.map(item => item.package_id);
    //   this.course_id = arrId.join(",");
    // },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.pasForm.pass != this.pasForm.password) {
            this.$Message.error("两次密码不一致，请重新输入!");
            this.pasForm.pass = "";
            this.pasForm.password = "";
            return;
          }
          this.pasForm.id = this.row.id;
          changePassword(this.pasForm).then(res => {
            if (res.data.code === 200) {
              this.$Message.success("重置密码成功!");
              this.handleReset(name);
              this.modal2 = false;
            }
          });
        } else {
          this.$Message.error("请输入后再提交!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    handleSubmit3(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.jifenForm.integral * 1 < 0) {
            this.$Message.error("积分必须为正整数，请重新输入!");
            this.jifenForm.integral = "";
            return;
          }
          this.jifenForm.id = this.row.id;
          giveIntegral(this.jifenForm).then(res => {
            if (res.data.code === 200) {
              this.$Message.success("积分赠送成功!");
              this.handleReset3(name);
              this.modal3 = false;
            }
          });
        } else {
          this.$Message.error("请输入后再提交!");
        }
      });
    },
    handleReset3(name) {
      this.$refs[name].resetFields();
    },
    handleSubmit4(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.freezeForm.id = this.row.id;
          studenFreeze(this.freezeForm).then(res => {
            if (res.data.code === 200) {
              this.$Message.success("冻结成功!");
              this.handleReset4(name);
              this.modal4 = false;
              this.getData(this.form);
            }
          });
        } else {
          this.$Message.error("请输入后再提交!");
        }
      });
    },
    handleReset4(name) {
      this.$refs[name].resetFields();
    },
    handleSubmit7(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.tiForm.days * 1 < 0) {
            this.$Message.error("天数必须为正整数，请重新输入!");
            this.jifenForm.days = "";
            return;
          }
          this.tiForm.id = this.row.id;
          openQuestion(this.tiForm).then(res => {
            if (res.data.code === 200) {
              this.$Message.success("题库开通成功!");
              this.handleReset7(name);
              this.modal7 = false;
              this.getData(this.form);
            }
          });
        } else {
          this.$Message.error("请输入后再提交!");
        }
      });
    },
    handleReset7(name) {
      this.$refs[name].resetFields();
    },
    handleSubmit8(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.closeTiForm.id = this.row.id;
          closeUserQuestion(this.closeTiForm).then(res => {
            if (res.data.code === 200) {
              this.$Message.success("题库关闭成功!");
              this.handleReset8(name);
              this.modal8 = false;
              this.getData(this.form);
            }
          });
        } else {
          this.$Message.error("请输入后再提交!");
        }
      });
    },
    handleReset8(name) {
      this.$refs[name].resetFields();
    },
    handleSubmit9(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.yanqiForm.id = this.row.id;
          userPostpone(this.yanqiForm).then(res => {
            if (res.data.code === 200) {
              this.$Message.success("延期成功!");
              this.handleReset9(name);
              this.modal9 = false;
              this.getData(this.form);
            }
          });
        } else {
          this.$Message.error("请输入后再提交!");
        }
      });
    },
    handleReset9(name) {
      this.$refs[name].resetFields();
    },
    exportStu() {
      if (this.starttime == "" || this.endtime == "") {
        this.$Message.error("时间不能为空！");
        return;
      }
      let starttime = moment(this.starttime).format("YYYY-MM-DD HH:mm:ss");
      let endtime = moment(this.endtime).format("YYYY-MM-DD HH:mm:ss");

      exportStudent({ starttime: starttime, endtime: endtime }).then(res => {
        if (res.data.code === 200) {
          if (res.data.data.data instanceof Array) {
            const params = {
              title: [
                "学员ID",
                "手机号码",
                "学员名称",
                "学员类型",
                "账号状态",
                "来源",
                "备注",
                "毕业时间",
                "冻结（截至时间）",
                "创建时间",
                "最后登录时间"
              ],
              key: [
                "id",
                "mobile",
                "username",
                "status",
                "user_status",
                "from",
                "remark",
                "finishtime",
                "stop_time",
                "created",
                "last_login"
              ],
              data: res.data.data.data,
              autoWidth: true,
              filename: "学员列表"
            };
            excel.export_array_to_excel(params);
            this.starttime = "";
            this.endtime = "";
            this.modal1 = false;
          } else {
            this.$Message.error(res.data.data.data);
          }
        }
      });
    },
    select(val) {
      this.form.page = 1;
      this.form.status = val;
      this.getData(this.form);
    },
     selectionCourse(arr) {
      let arrId = arr.map(item => item.package_id);
      this.course_id = arrId.join(",");
    },
    selectionCpeCourse(arr) {
      let arrId = arr.map(item => item.id);
      this.preview_id = arrId.join(",");
    },
    putRemark(e, row) {
      let remark = e.target.value;
      if (e.target.value == row.remark) {
        return;
      }
      putRemark({ id: row.id, remark: remark }).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.$Message.success("备注成功!");
        }
      });
      this.getData(this.form);
    },

    seach() {
      this.getData(this.form);
    },
    seachQ() {
      this.form.mobile = "";
      this.form.username = "";
      this.form.status = "";
      this.form.id = "";
      this.getData(this.form);
    },
    EduopenCourse(){
     if (this.Edupackage_id === "") {
        this.$Message.error("请选择您要开通的后期教育课程包!");
        return;
      }
      openEduCourse({ id: this.row.id, package_id: this.Edupackage_id }).then(res => {
        if (res.data.code === 200) {
          this.$Message.success("开通后期教育课程包成功!");
          this.Edumodal = false;
          this.getData(this.form);
        } else if (res.data.code === 404) {
          this.$Message.error(res.data.msg);
        }
      })
    },
    publicFun(key, row) {
      if (key === "a") {
        this.modal1 = true;
      } else if (key === "c") {
        openCourseList({ id: row.id }).then(res => {
          if (res.data.code === 200) {
            let arr = res.data.data.data;
            arr.forEach(val => {
              if (val.is_content == 2) {
                val._disabled = true;
              }
            });
            this.data5 = arr;
            this.course_id = "";
            this.row = row;
            this.modal5 = true;
          } else {
            this.$Message.error("课程列表拉取失败，请重试!");
          }
        });
      } else if (key === "d") {
        this.row = row;
        this.modal7 = true;
      } else if (key === "e") {
        this.row = row;
        this.modal2 = true;
      } else if (key === "f") {
        this.row = row;
        this.modal3 = true;
      } else if (key === "g") {
        this.$Modal.confirm({
          title: "温馨提示",
          content: "是否为该学员解除设备绑定？",
          onOk: () => {
            deleteDev(row.id).then(res => {
              if (res.data.code === 200) {
                this.$Message.success("解除成功!");
              }
            });
          }
        });
      } else if (key === "h") {
        const id = row.id;
        const route = {
          name: "notes",
          query: {
            id
          },
          meta: {
            title: `学员[${id}]的记录`
          }
        };
        this.addTag({
          route: route,
          type: "push"
        });
        this.$router.push(route);
      } else if (key === "i") {
        if (row.user_status == 0) {
          this.row = row;
          this.modal4 = true;
        } else if (row.user_status == 1) {
          this.$Modal.confirm({
            title: "温馨提示",
            content: "是否为该学员解除冻结？",
            onOk: () => {
              studenUnfreeze(row.id).then(res => {
                if (res.data.code === 200) {
                  // this.$Message.success('解冻成功!')
                  // this.getData(this.form)
                }
              });
            }
          });
        }
      } else if (key === "j") {
        this.$Modal.confirm({
          title: "温馨提示",
          content: "是否将该学员设为毕业学员？",
          onOk: () => {
            studenFinish(row.id).then(res => {
              if (res.data.code === 200) {
                this.$Message.success("设置成功!");
                this.getData(this.form);
              }
            });
          }
        });
      } else if (key === "k") {
        this.$Modal.confirm({
          title: "温馨提示",
          content: "是否将该学员设为内部员工？",
          onOk: () => {
            setEmployee(row.id).then(res => {
              if (res.data.code === 200) {
                this.$Message.success("设置成功!");
                this.getData(this.form);
              }
            });
          }
        });
      } else if (key === "l") {
        closeCourseList(row.id).then(res => {
          if (res.data.code === 200) {
            this.data6 = res.data.data.data;
            this.course_id = "";
            this.row = row;
            this.modal6 = true;
          } else {
            this.$Message.error("课程列表拉取失败，请重试!");
          }
        });
      } else if (key === "m") {
        userQuestionList(row.id).then(res => {
          if (res.data.code === 200) {
            if (res.data.data.length === 0) {
              this.$Message.error("该学员还没有题库呢!");
              return;
            }
            this.data8 = res.data.data;
            this.row = row;
            this.modal8 = true;
          } else {
            this.$Message.error("题库列表拉取失败，请重试!");
          }
        });
      } else if (key === "n") {
        this.row = row;
        this.modal9 = true;
      }else if (key === "Q") {
         openEduCourseList({ id: row.id }).then(res => {
          if (res.data.code === 200) {     
            this.Edudata = res.data.data.data;
            this.Edupackage_id = "";
            this.row = row;
            this.Edumodal = true;
          } else {
            this.$Message.error("课程列表拉取失败，请重试!");
          }
        });
      } else if (key === "Y") {
        this.USerid = row.id;
        this.Cpefrom.user_id = row.id;
        this.getCpedata();
        this.Cpemodal = true;
      } else if (key === "Z") {
        const route = {
          name: "notes",
          query: {
            id: row.id
          },
          meta: {
            title: `学员[${row.id}]的记录`
          }
        };
        this.addTag({
          route: route,
          type: "push"
        });
        this.$router.push(route);
      } else if (key === "o") {
        this.$Modal.confirm({
          title: "温馨提示",
          content: "是否删除该学员？",
          onOk: () => {
            deleteStudent(row.id).then(res => {
              if (res.data.code === 200) {
                this.$Message.success("删除成功!");
                this.getData(this.form);
              }
            });
          }
        });
      }
    },
    getCpedata() {
      addPreviewList(this.Cpefrom).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.Cpedata = rep.data.data;
        }
      });
    },
    getzheng() {
      zhengkeList().then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.tiList = rep.data;
        }
      });
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
    getData(p, l) {
      studentList(p, l).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.total = rep.data.total;
          this.data = rep.data.data;
        }
      });
    }
  },
  created() {
    this.statusList = [];
    let groupId = this.$store.state.user.groupId;
    if (groupId == 1 || groupId == 2) {
      this.form.status = "0";
      this.statusList = [
        { value: "0", label: "全部" },
        { value: "1", label: "正式学员" },
        { value: "5", label: "毕业学员" },
        { value: "3", label: "注册学员" },
        { value: "2", label: "内购学员" },
        { value: "4", label: "优财员工" },
        { value: "6", label: "网络学员" },
        { value: "7", label: "面授学员" }
      ];
    } else {
      this.form.status = "1";
      this.statusList = [{ value: "1", label: "正式学员" }];
    }
    userPageRuleList(this.$route.name).then(res => {
      let data = res.data;
      if (data.code === 200) {
        this.top = data.data.top;
        this.right = data.data.right;
      }
    });
  },
  mounted() {
    this.form = this.$store.state.keepalive.students;
    this.getData(this.form);
    this.getzheng();
  },
  destroyed() {
    this.setstudent(this.form);
  }
};
</script>

<style lang="less">
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
