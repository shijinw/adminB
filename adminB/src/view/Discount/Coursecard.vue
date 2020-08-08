<template>
  <div>
    <Card>
      <p  slot="title">课程卡主卡列表</p>
      <Divider type="vertical" />
      <Input v-model="form.name"
             placeholder="课程卡主卡名"
             style="width: 300px; margin: 15px 15px;" />
      <Divider type="vertical" />
      <Button type='primary'
              @click="seach"
              style="margin-right: 10px;">筛选</Button>
      <Button v-for="(val,key) in Auth.top"
              :type='val.menu_type'
              @click="Addcord"
              style="margin-right: 10px;"
              :key='key'>{{val.menu_title}}</Button>

      <Table size="small"
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
    <!-- 添加卡包 -->
    <Modal v-model="modal"
           mask
           title="添加课程卡包"
           :width="450"
           :footer-hide="true">
      <div>
        <Form ref="formValidate"
              :model="formValidate"
              :rules="ruleValidate"
              :label-width="80">

          <FormItem label="课程卡包名"
                    :label-width="90"
                    prop="name">
            <Input v-model="formValidate.name"
                   placeholder="课程卡包名"
                   style="width: 300px" />
          </FormItem>

          <FormItem label="开始时间"
                    :label-width="90"
                    prop="start_time">
            <DatePicker type="datetime"
                        format="yyyy-MM-dd HH:mm"
                        v-model="formValidate.start_time"
                        @on-change="starttime"
                        placeholder="开始时间"
                        style="width: 300px"></DatePicker>
          </FormItem>

          <FormItem label="结束时间"
                    :label-width="90"
                    prop="end_time">
            <DatePicker type="datetime"
                        format="yyyy-MM-dd HH:mm"
                        v-model="formValidate.end_time"
                        @on-change="endtime"
                        placeholder="结束时间"
                        style="width: 300px"></DatePicker>
          </FormItem>

          <FormItem label="创建数量"
                    :label-width="90"
                    prop="create_num">
            <Input type="number"
                   v-model="formValidate.create_num"
                   placeholder="课程卡创建数量"
                   style="width: 300px" />
          </FormItem>

          <FormItem label="课程包ID"
                    :label-width="90"
                    prop="package_id">
            <Input type="number"
                   v-model="formValidate.package_id"
                   disabled
                   style="width: 180px" />
            <Button type='primary'
                    @click="Addproject"
                    style="margin-left: 10px;">选择课程包</Button>
          </FormItem>
          </Col>
        </Form>
        <div style="margin-top:15px;text-align:center">
          <Button v-if="Auth.top[0]"
                  :type='Auth.top[0].menu_type'
                  style="margin-left: 10px;"
                  @click="Okchange">{{Auth.top[0].menu_title}}</Button>
        </div>
      </div>
    </Modal>
    <!-- 选择课程包 -->
    <Modal v-model="modal2"
           mask
           title="选择课程包"
           :width="700"
           :footer-hide="true">
      <div>
        <Cascader :data="ListA"
                  v-model="valueList"
                  change-on-select
                  style="width:200px; display: inline-block;"
                  placeholder="项目/专业"></Cascader>
        <Divider type="vertical" />
        <Input v-model="formProject.name"
               placeholder="课程名"
               style="width: 180px" />
        <Divider type="vertical" />
        <Input v-model="formProject.id"
               placeholder="课程ID"
               style="width: 180px" />
        <Divider type="vertical" />
        <Button type='primary'
                @click="seachQ"
                style="margin-right: 10px;">搜索</Button>

        <Table size="small"
               :columns="columns2"
               :data="data2"
               style="margin-top:15px"></Table>
        <div style="padding: 20px 0; text-align: right;">
          <Page :total="total2"
                @on-change="onChange2"
                @on-page-size-change="onPageSizeChange2"
                :current="formProject.page"
                :page-size="formProject.limit"
                size="small"
                show-total
                show-elevator
                show-sizer />
        </div>
      </div>
    </Modal>
    <Modal v-model="modal0"
           mask
           title="导出课程卡"
           :width="400"
           @on-ok="exportStu">
      <!-- <Select v-model="Export.is_use"
              clearable
              placeholder="是否使用"
              style="width: 100%">
        <Option v-for="item in grade"
                :value="item.id"
                :key="item.id">{{ item.name }}</Option>
      </Select> -->
    </Modal>
    <!-- 查看课程包 -->
    <Modal v-model="modal3"
           mask
           title="查看课程卡"
           :width="1300"
           :footer-hide="true">
      <div>
        <Input v-model="formCourse.type_name"
               placeholder="课程卡名"
               style="width: 150px" />
        <Divider type="vertical" />
        <Select v-model="formCourse.is_use"
                clearable
                placeholder="是否使用"
                style="width: 150px">
          <Option v-for="item in grade"
                  :value="item.id"
                  :key="item.id">{{ item.name }}</Option>
        </Select>
        <Divider type="vertical" />
        <Input v-model="formCourse.mobile"
               placeholder="手机号"
               style="width: 150px" />
        <Divider type="vertical" />
        <DatePicker type="datetime"
                    format="yyyy-MM-dd HH:mm"
                    v-model="formCourse.start_time"
                    @on-change="starttime2"
                    placeholder="开始时间"
                    style="width: 150px"></DatePicker>
        <Divider type="vertical" />
        <DatePicker type="datetime"
                    format="yyyy-MM-dd HH:mm"
                    v-model="formCourse.end_time"
                    @on-change="endtime2"
                    placeholder="结束时间"
                    style="width: 150px"></DatePicker>
        <Divider type="vertical" />
        <Button type='primary'
                @click="seachW"
                style="margin-right: 10px;">搜索</Button>

        <Table size="small"
               :columns="columns3"
               :data="data3"
               style="margin-top:15px"></Table>
        <div style="padding: 20px 0; text-align: right;">
          <Page :total="total3"
                @on-change="CouonChange"
                @on-page-size-change="CouonPageSizeChange2"
                :current="formCourse.page"
                :page-size="formCourse.limit"
                size="small"
                show-total
                show-elevator
                show-sizer />
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import {
  cardList,
  delCard,
  addCard,
  cardDetailList,
  delCardDetail,
  exportCard
} from "@/api/Coupon";
import { packageList } from "@/api/course";
import { proMjor2tree } from "@/api/Linkmenu";
import { userPageRuleList } from "@/api/Answer";
import Fomat from "@/libs/fomat";
import excel from "@/libs/excel";
export default {
  data() {
    return {
      form: {
        name: "",
        limit: 10,
        page: 1
      },
      formValidate: {
        name: "",
        package_id: "",
        start_time: "",
        end_time: "",
        create_num: ""
      },
      Auth: {
        right: [],
        top: []
      },
      ListA: [],
      valueList: [],
      formProject: {
        name: "",
        package_id: "",
        major_id: "",
        limit: 10,
        page: 1,
        id: ""
      },
      grade: [
        {
          id: 1,
          name: "使用"
        },
        {
          id: 2,
          name: "不使用"
        }
      ],
      formCourse: {
        limit: 10,
        page: 1,
        type_id: "",
        type_name: "",
        is_use: "",
        mobile: "",
        start_time: "",
        end_time: ""
      },
      ruleValidate: {
        name: [{ required: true, message: "请输入课程卡包名" }],
        package_id: [{ required: true, message: "请选择课程包名" }],
        start_time: [{ required: true, message: "请选择卡开始时间" }],
        end_time: [{ required: true, message: "请选择卡结束时间" }],
        create_num: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Thousand
          }
        ]
      },
      modal: false,
      modal2: false,
      modal3: false,
      modal0: false,
      Export: {
        type_id: "",
        is_use: "",
        name: ""
      },
      data: [],
      data2: [],
      data3: [],
      total: 1,
      total2: 1,
      total3: 1,
      columns2: [
        {
          title: "单选",
          width: 90,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("Checkbox", {
                props: {
                  value: params.row.checkBox
                },
                on: {
                  "on-change": e => {
                    this.formValidate.package_id = params.row.id;
                    this.data2.forEach(items => {
                      // 先取消所有对象的勾选，checkBox设置为false
                      this.$set(items, "checkBox", false);
                    });
                    this.data2[params.index].checkBox = e; // 再将勾选的对象的checkBox设置为true
                  }
                }
              })
            ]);
          }
        },
        {
          title: "课程包ID",
          key: "id",
          minWidth: 90,
          align: "center"
        },
        {
          title: "课程包名",
          key: "name",
          minWidth: 90,
          tooltip: true
        },
        {
          title: "项目名",
          key: "project_name",
          minWidth: 90,
          tooltip: true
        },
        {
          title: "专业名",
          key: "major_name",
          minWidth: 90,
          tooltip: true
        }
      ],
      columns3: [
        {
          title: "课程卡ID",
          key: "id",
          minWidth: 90,
          align: "center"
        },
        {
          title: "课程卡名",
          key: "type_name",
          minWidth: 90,
          tooltip: true
        },
        {
          title: "秘钥",
          key: "secret_key",
          minWidth: 150,
          tooltip: true
        },
        {
          title: "订单号",
          key: "order_num",
          minWidth: 90,
          tooltip: true
        },
        {
          title: "激活时间",
          key: "activation_time",
          minWidth: 110,
          tooltip: true
        },

        {
          title: "是否作废",
          minWidth: 80,
          tooltip: true,
          render: (h, params) => {
            let text = "";
            let color = "";
            if (params.row.is_del === 1) {
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
          title: "是否使用",
          key: "is_use",
          minWidth: 80,
          tooltip: true,
          render: (h, params) => {
            let text = "";
            let color = "";
            if (params.row.is_use === 1) {
              text = "使用";
              color = "#019beb";
            } else {
              text = "未使用";
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
          title: "电话号码",
          key: "mobile",
          minWidth: 90,
          tooltip: true
        },
        {
          title: "操作",
          key: "action",
          minWidth: 200,
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
                      this.delCourse(params.row);
                    }
                  }
                },
                "作废"
              )
            ]);
          }
        }
      ],
      columns: [
        {
          title: "课程卡包ID",
          key: "id",
          minWidth: 90,
          align: "center"
        },
        {
          title: "课程卡包名",
          key: "name",
          minWidth: 140,
          tooltip: true,
          align: "center"
        },
        {
          title: "卡片数量",
          key: "create_num",
          minWidth: 100,
          tooltip: true,
          align: "center"
        },
        {
          title: "未使用卡片",
          key: "is_use",
          minWidth: 100,
          tooltip: true,
          align: "center"
        },
        {
          title: "开始时间",
          key: "start_time",
          minWidth: 110,
          tooltip: true,
          align: "center"
        },
        {
          title: "结束时间",
          key: "end_time",
          minWidth: 110,
          tooltip: true,
          align: "center"
        },

        // {
        //   title: '课程包名',
        //   key: 'package_name',
        //   minWidth: 90,
        //   tooltip: true
        // },
        {
          title: "是否作废",
          minWidth: 80,
          tooltip: true,
          render: (h, params) => {
            let text = "";
            let color = "";
            if (params.row.is_del === 1) {
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
          key: "action",
          minWidth: 200,
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
                btns.push(obj);
              });
            }
            return h("div", [...btns]);
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
            //         this.lookmove(params.row)
            //       }
            //     }
            //   }, '查看'),
            //   h('Button', {
            //     props: {
            //       type: 'error',
            //       size: 'small'

            //     },
            //     style: {
            //       marginRight: '10px'
            //     },
            //     on: {
            //       click: () => {
            //         this.delCard(params.row)
            //       }
            //     }
            //   }, '作废')
            // ])
          }
        }
      ]
    };
  },
  watch: {
    valueList(newValue, oldValue) {
      if (newValue.length === 0) {
        this.formProject.project_id = "";
        this.formProject.major_id = "";
      } else if (newValue.length === 1) {
        this.formProject.project_id = newValue[0];
        this.formProject.major_id = "";
      } else {
        this.formProject.project_id = newValue[0];
        this.formProject.major_id = newValue[1];
      }
    }
  },
  methods: {
    getData(obj) {
      cardList(obj).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.data = rep.data.data;
          this.total = rep.data.total;
        }
      });
    },
    getproData(obj) {
      packageList(obj).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.data2 = rep.data.data;
          this.total2 = rep.data.total;
        }
      });
    },
    getcourseData(obj) {
      cardDetailList(obj).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.data3 = rep.data.data;
          this.total3 = rep.data.total;
        }
      });
    },
    Okchange() {
      this.$refs.formValidate.validate(valid => {
        if (valid) {
          addCard(this.formValidate).then(res => {
            let rep = res.data;
            if (rep.code === 200) {
              this.getData(this.form);
              this.$Message.success("添加成功，请注意查看");
              this.modal = false;
            }
          });
        }
      });
    },

    delCourse(row) {
      delCardDetail({ id: row.id }).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.getcourseData(this.formCourse);
          this.$Message.warning("作废成功，请注意查看");
        }
      });
    },
    exportStu() {
      exportCard({
        is_use: "",
        type_id: this.Export.type_id
      }).then(res => {
        if (res.data.code === 200) {
          if (res.data.data instanceof Array) {
            const params = {
              title: ["ID", "卡片名称", "秘钥", "开始时间", "结束时间"],
              key: ["id", "type_name", "secret_key", "start_time", "end_time"],
              data: res.data.data,
              autoWidth: true,
              filename: this.Export.name
            };
            excel.export_array_to_excel(params);
            this.starttime = "";
            this.endtime = "";
            this.modal1 = false;
          } else {
            this.$Message.error(res.data.data);
          }
        }
      });
    },
    seach() {
      this.getData(this.form);
    },
    seachW() {
      this.getcourseData(this.formCourse);
    },
    seachQ() {
      this.getproData(this.formProject);
    },
    getproject() {
      proMjor2tree().then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.ListA = rep.data;
        }
      });
    },

    endtime(val) {
      this.formValidate.end_time = val;
    },
    starttime(val) {
      this.formValidate.start_time = val;
    },
    endtime2(val) {
      this.formCourse.end_time = val;
    },
    starttime2(val) {
      this.formCourse.start_time = val;
    },
    Addproject() {
      this.modal2 = true;
    },
    Addcord() {
      this.modal = true;
    },
    onChange(val) {
      this.form.page = val;
      this.getData(this.form);
    },
    onPageSizeChange(val) {
      this.form.limit = val;
      this.getData(this.form);
    },
    onChange2(val) {
      this.formProject.page = val;
      this.getproData(this.formProject);
    },
    onPageSizeChange2(val) {
      this.formProject.limit = val;
      this.getproData(this.formProject);
    },
    CouonChange(val) {
      this.formCourse.page = val;
      this.getcourseData(this.formCourse);
    },
    CouonPageSizeChange2(val) {
      this.formCourse.limit = val;
      this.getcourseData(this.formCourse);
    },
    publicFun(key, row) {
      if (key === "b") {
        this.formCourse.type_id = row.id;
        this.modal3 = true;
        this.getcourseData(this.formCourse);
      }
      if (key === "c") {
        delCard({ id: row.id }).then(res => {
          let rep = res.data;
          if (rep.code === 200) {
            this.getData(this.form);
            this.$Message.warning("移除成功，请注意查看");
          }
        });
      }
      if (key === "Dao") {
        this.modal0 = true;
        this.Export.type_id = row.id;
        this.Export.name = row.name;
      }
    },
    getAuth(name) {
      userPageRuleList({ menu_name: name }).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.Auth = rep.data;
        }
      });
    }
  },
  mounted() {
    this.getData(this.form);
    this.getproject();
    this.getproData(this.formProject);
    this.getAuth(this.$route.name);
  }
};
</script>
