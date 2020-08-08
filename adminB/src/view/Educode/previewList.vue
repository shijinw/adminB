<template>
  <div>
    <Card>
      <p slot="title">后续教育预售课列表</p>
      <div>
        <Button type="default"
                shape="circle"
                icon="md-sync"
                @click="seachQ"></Button>
        <Divider type="vertical" />
        <Select v-model="form.status"
                style="width:100px;"
                placeholder="是否有效">
          <Option v-for="item in statusList"
                  :value="item.id"
                  :key="item.id">{{ item.value }}</Option>
        </Select>
        <Divider type="vertical" />
        <Input v-model="form.name"
               clearable
               placeholder="预售课程名称"
               style="width: 100px; margin-right: 10px;" />
        <Divider type="vertical" />
        <Button type="primary"
                @click="seach"
                style="margin-right: 10px;">搜索</Button>
        <Button v-if="Auth.top[0]"
                :type='Auth.top[0].menu_type'
                style="margin-right: 10px;"
                @click="addPreview">{{Auth.top[0].menu_title}}</Button>

        <Table stripe
               style="margin-top:20px"
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

      </div>
    </Card>
    <Modal v-model="modals"
           :title="title"
           :width="900"
           :footer-hide="true">
      <div>
        <Button type="default"
                shape="circle"
                icon="md-sync"
                @click="Mseach"></Button>
        <Divider type="vertical" />

        <Select v-model="Manage.status"
                clearable
                style="width:200px"
                placeholder="是否验证状态">
          <Option v-for="item in statusLists"
                  :value="item.id"
                  :key="item.id">{{ item.name }}</Option>
        </Select>
        <Divider type="vertical" />
        <Input v-model="Manage.mobile"
               placeholder="手机号"
               style="width: 200px; margin-right: 10px;" />
        <Divider type="vertical" />
        <Button type='primary'
                @click="seachW"
                style="margin-right: 10px;">搜索</Button>
        <Divider type="vertical" />
        <Button type="success"
                @click="handleSubmit"
                style="margin-left: 8px">审核全通过</Button>
        <Divider type="vertical" />
        <Button type="warning"
                @click="removeSubmit"
                style="margin-left: 8px">审核不通过</Button>
        <div style="text-align: center;">
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
                  @on-change="MonChange"
                  @on-page-size-change="MonPageSizeChange"
                  :current="Manage.page"
                  :page-size="Manage.limit"
                  size="small"
                  show-total
                  show-elevator
                  show-sizer />
          </div>

        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import {
  previewList,
  previewUserList,
  statusPreview,
  statusPreviewUser
} from "@/api/Educode";
import { userPageRuleList } from "@/api/Answer";
import Fomat from "@/libs/fomat";
import { mapMutations } from "vuex";

import Images from "@/view/components/video/image.vue";

export default {
  components: {
    Images,
  },
  data() {
    return {
      form: { limit: 10, page: 1, status: "", name: "" },
      Auth: { top: {}, right: {} },
      modals: false,
      Sele_id: [],
      total1: 1,
      statusLists: [
        { id: 1, name: "通过" },
        { id: 2, name: "未通过" },
        { id: 3, name: "未验证" }
      ],
      data1: [],
      columns1: [
        {
          type: "selection",
          width: 50,
          align: "center"
        },
        {
          title: "ID",
          key: "id",
          minWidth: 60,
          align: "center"
        },
        {
          title: "活动名称",
          key: "preview_name",
          minWidth: 100,
          tooltip: true
        },
        {
          title: "用户名称",
          key: "user_name",
          minWidth: 100,
          tooltip: true
        },
        {
          title: "手机号",
          key: "mobile",
          minWidth: 180,
          tooltip: true,
          align: "center"
        },

        {
          title: "修正状态",
          key: "status",
          minWidth: 80,
          tooltip: true,
          render: (h, params) => {
            let text = "";
            let color = "";
            if (params.row.status === 1) {
              text = "通过";
              color = "#19be6b";
            } else if (params.row.status === 2) {
              text = "未通过";
              color = "red";
            } else {
              text = "未验证";
              color = "#555";
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
          minWidth: 250,
          align: "center",
          render: (h, params) => {
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
                      this.Panalk("succ", params.row);
                    }
                  }
                },
                "通过"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.Panalk("err", params.row);
                    }
                  }
                },
                "未通过"
              )
            ]);
          }
        }
      ],
      Manage: {
        preview_id: "",
        limit: 10,
        page: 1,
        status: "",
        mobile: ""
      },
      type: 1,
      title: "",
      Formlate: {
        name: "",
        pc_img: "",
        app_img: "",
        jump: "",
        start_time: "",
        href_type: 1,
        end_time: "",
        cpe: "",
        activity_address: "",
        people_num: "",
        content: ""
      },
      columns: [
        {
          title: "ID",
          key: "id",
          minWidth: 90
        },
        {
          title: "预售课程名称",
          key: "name",
          minWidth: 110,
          tooltip: true
        },

        {
          title: "开始时间",
          key: "start_time",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "结束时间",
          key: "end_time",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "报名人数",
          key: "people_num",
          minWidth: 90,
          tooltip: true,
          align: "center"
        },

        {
          title: "已报名人数",
          key: "reg_people_num",
          minWidth: 100,
          tooltip: true,
          align: "center"
        },
        {
          title: "是否上架",
          key: "status",
          minWidth: 90,
          tooltip: true,
          render: (h, params) => {
            let text = "";
            let color = "";
            if (params.row.status === 1) {
              text = "上架";
              color = "#019beb";
            } else {
              text = "下架";
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
          minWidth: 250,
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
                if (params.row.status == 1) {
                  if (e.key != "B") btns.push(obj);
                } else {
                  if (e.key != "C") btns.push(obj);
                }
              });
            }
            return h("div", [...btns]);
          }
        }
      ],
      ruleValidate: {
        name: [{ required: true, validator: Fomat.Rules.Verifiy().Required }],
        jump: [{ required: true, validator: Fomat.Rules.Verifiy().Required }],
        start_time: [
          { required: true, validator: Fomat.Rules.Verifiy().Required }
        ],
        activity_address: [
          { required: true, validator: Fomat.Rules.Verifiy().Required }
        ],
        people_num: [
          { required: true, validator: Fomat.Rules.Verifiy().Required }
        ],
        content: [
          { required: true, validator: Fomat.Rules.Verifiy().Required }
        ],
        cpe: [{ required: true, validator: Fomat.Rules.Verifiy().Required }],
        end_time: [
          { required: true, validator: Fomat.Rules.Verifiy().Required }
        ],
        href_type: [
          { required: true, validator: Fomat.Rules.Verifiy().Required }
        ]
      },
      statusList: [{ id: 1, value: "上架" }, { id: 2, value: "下架" }],
      data: [],
      total: 1
    };
  },
  methods: {
    ...mapMutations(["addTag"]),

    seach() {
      this.getData(this.form);
    },
    onChange(val) {
      this.form.page = val;
      this.getData(this.form);
    },
    onPageSizeChange(val) {
      this.form.limit = val;
      this.getData(this.form);
    },
    MonChange(val) {
      this.Manage.page = val;
      this.getData2(this.Manage);
    },
    MonPageSizeChange(val) {
      this.Manage.limit = val;
      this.getData2(this.Manage);
    },
    publicFun(key, row) {
      switch (key) {
        case "B":
          statusPreview({ id: row.id, status: row.status === 1 ? 2 : 1 }).then(
            res => {
              let rep = res.data;
              if (rep.code === 200) {
                this.$Message.success("上架预售课程成功!");
                this.getData(this.form);
              }
            }
          );
          break;
        case "C":
          statusPreview({ id: row.id, status: row.status === 2 ? 1 : 2 }).then(
            res => {
              let rep = res.data;
              if (rep.code === 200) {
                this.$Message.success("下架预售课程成功!");
                this.getData(this.form);
              }
            }
          );
          break;

        case "D":
          const route = {
            name: "EduPreview",
            meta: {
              title: `修改预售课程-${row.id}`
            },
            query: {
              id: row.id,
              title: "修改预售课程"
            }
          };
          this.addTag({
            route: route,
            type: "push"
          });
          this.$router.push(route);

          break;
        case "F":
          this.modals = true;
          this.Manage.preview_id = row.id;
          this.getData2(this.Manage);
          this.Sele_id = [];
          break;
      }
    },
    handleSubmit() {
      let str = this.Sele_id.join(",");
      if (str) {
        statusPreviewUser({ id: str, status: 1 }).then(res => {
          let rep = res.data;
          if (rep.code === 200) {
            this.$Message.success("全部审核成功!请注意查看");
            this.getData2(this.Manage);
          }
        });
      } else {
        this.$Message.error("请注意多选框选择!");
      }
    },
    removeSubmit() {
      let str = this.Sele_id.join(",");
      if (str) {
        statusPreviewUser({ id: str, status: 2 }).then(res => {
          let rep = res.data;
          if (rep.code === 200) {
            this.$Message.error("审核全部不通过!请注意查看!");
            this.getData2(this.Manage);
          }
        });
      } else {
        this.$Message.error("请注意多选框选择!");
      }
    },
    seachW() {
      this.getData2(this.Manage);
    },
    Panalk(staus, row) {
      if (staus === "err") {
        statusPreviewUser({ id: row.id, status: 2 }).then(res => {
          let rep = res.data;
          if (rep.code === 200) {
            this.$Message.error("审核未通过!请注意查看!");
            this.getData2(this.Manage);
          }
        });
      } else {
        statusPreviewUser({ id: row.id, status: 1 }).then(res => {
          let rep = res.data;
          if (rep.code === 200) {
            this.$Message.success("审核通过!请注意查看!");
            this.getData2(this.Manage);
          }
        });
      }
    },
    Mseach() {
      this.Manage.preview_id = "";
      this.Manage.status = "";
      this.Manage.mobile = "";
      this.Manage.limit = 10;
      this.Manage.page = 1;
      this.getData2(this.Manage);
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    starttime(val) {
      this.form.start_time = val;
    },
    end_time(val) {
      this.form.end_time = val;
    },
    seachQ() {
      this.form.limit = 10;
      this.form.page = 1;
      this.form.status = "";
      this.form.name = "";
      this.getData(this.form);
    },
    addPreview() {
      const route = {
        name: "EduPreview",
        meta: {
          title: "添加预售课程"
        },
        query: {
          title: "添加预售课程"
        }
      };
      this.addTag({
        route: route,
        type: "push"
      });
      this.$router.push(route);
    },
    getData2(obj) {
      previewUserList(obj).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.total1 = rep.data.total * 1;
          let arr = rep.data.data;
          // arr.forEach(val => {
          //   if (this.Sele_id.length > 0) {
          //     this.Sele_id.forEach(key => {
          //       if (key == val.id) {
          //         val._checked = true
          //       }
          //     })
          //   }
          // })
          this.data1 = arr;
        }
      });
    },
    // 选中
    selectionStu(arr) {
      let list = arr.map(item => item.id);
      if (list.length > 0) {
        list.forEach(v => {
          this.Sele_id.push(v);
        });
      }
      this.Sele_id = Array.from(new Set(this.Sele_id));
    },
    selectionCancel(arr, row) {
      this.Sele_id.splice(this.Sele_id.findIndex(v => v == row.id), 1);
    },
    CselectionAll(arr, row) {
      let Arr = [];
      this.data1.forEach(val => {
        Arr.push(val.id);
      });
      this.Sele_id = this.Sele_id.filter(item => !Arr.includes(item));
    },
    selectionAll(arr, row) {
      let Arr = [];
      this.data1.forEach(val => {
        Arr.push(val.id);
      });
      let list = arr.map(item => item.id);
      if (list.length > 0) {
        list.forEach(v => {
          this.Sele_id.push(v);
        });
      }
      this.Sele_id = Array.from(new Set(this.Sele_id));
    },
    getData(obj) {
      previewList(obj).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.data = rep.data.data;
          this.total = rep.total;
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
    }
  },
  mounted() {
    this.getData(this.form);
    this.getAuth(this.$route.name);
  }
};
</script>