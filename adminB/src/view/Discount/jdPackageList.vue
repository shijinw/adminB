<template>
  <div>
    <Card>
      <p slot="title">京东支付课程包列表</p>
      <Divider type="vertical" />
      <Cascader
        :data="ListA"
        style="width:200px; display: inline-block;"
        v-model="valueList"
        change-on-select
        placeholder="项目/专业"
      ></Cascader>
      <Divider type="vertical" />
      <Select v-model="formProject.class_id" style="width:120px" placeholder="课程标签" clearable>
        <Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.class_name }}</Option>
      </Select>

      <Divider type="vertical" />
      <Select v-model="formProject.status" style="width:80px" placeholder="状态" clearable>
        <Option v-for="item in Status" :value="item.id" :key="item.id">{{ item.name }}</Option>
      </Select>

      <Divider type="vertical" />
      <Input v-model="formProject.name" style="width:120px" type="text" placeholder="课程包名称"></Input>

      <Divider type="vertical" />
      <Input v-model="formProject.id" type="text" style="width:70px" placeholder="课程包id"></Input>
      <Divider type="vertical" />
      <Select v-model="formProject.audit_status" style="width:90px" placeholder="审核状态" clearable>
        <Option v-for="item in Audit" :value="item.id" :key="item.id">{{ item.name }}</Option>
      </Select>
      <Button type="primary" @click="seach" style="margin-left:20px;">筛选</Button>

      <Table size="small" :columns="columns" :data="data" style="margin-top:15px"></Table>
      <div style="padding: 20px 0; text-align: right;">
        <Page
          :total="total"
          @on-change="onChange"
          @on-page-size-change="onPageSizeChange"
          :current="formProject.page"
          :page-size="formProject.limit"
          size="small"
          show-total
          show-elevator
          show-sizer
        />
      </div>
    </Card>
    <Modal v-model="modal1" mask title="修改价格" :width="250" :footer-hide="true">
      <Input
        v-model="price"
        type="number"
        style="width:200px"
        @on-blur="Changevalue"
        placeholder="京东支付价格(必为正数)"
      ></Input>
      <div style="margin-top:10px;justify-content: center;display: flex;">
        <Button type="primary" @click="addpreice">确认修改</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { jdPackageList, putJdPcakagePrice } from "@/api/Coupon";
import { labelList } from "@/api/tags";
import { proMjor2tree } from "@/api/Linkmenu";
export default {
  data() {
    return {
      formProject: {
        class_id: "",
        limit: 10,
        page: 1,
        project_id: "",
        major_id: "",
        status: "",
        name: "",
        id: "",
        audit_status: "",
        Row: ""
      },
      modal1: false,
      price: "",
      valueList: [],
      Audit: [{ id: 1, name: "审核" }, { id: 2, name: "未审核" }],
      Status: [{ id: 1, name: "有效" }, { id: 2, name: "无效" }],
      total: 1,
      cityList: [],
      ListA: [],
      data: [],
      columns: [
        {
          title: "主ID",
          key: "id",
          minWidth: 70,
          align: "center"
        },
        {
          title: "套餐名称",
          key: "name",
          minWidth: 120,
          tooltip: true,
          align: "center"
        },
        {
          title: "专业名称",
          key: "project_name",
          minWidth: 150,
          tooltip: true,
          align: "center"
        },
        {
          title: "项目名称",
          key: "major_name",
          minWidth: 130,
          tooltip: true,
          align: "center"
        },
        {
          title: "价格",
          key: "price",
          minWidth: 90,
          tooltip: true,
          align: "center"
        },

        {
          title: "创建时间",
          key: "create_time",
          minWidth: 90,
          tooltip: true
        },
        {
          title: "操作",
          key: "action",
          minWidth: 150,
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
                    marginRight: "10px"
                  },
                  on: {
                    click: () => {
                      this.Putprice(params.row);
                    }
                  }
                },
                "修改价格"
              )
            ]);
          }
        }
      ]
    };
  },
  watch: {
    valueList(newValue) {
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
      jdPackageList(obj).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.data = rep.data.data;
          this.total = rep.data.total;
        }
      });
    },
    Changevalue() {
      if (this.price < 0) {
        this.price = "";
      }
    },
    addpreice() {
      if (this.price > 0) {
        putJdPcakagePrice({ id: this.Row.id, price: this.price }).then(res => {
          let rep = res.data;
          if (rep.code === 200) {
            this.getData(this.formProject);
            this.$Message.success("修改成功，请注意查看");
            this.modal1 = false;
          }
        });
      } else {
        this.$Message.error("请注意是否负数，或未输入！");
      }
    },
    seach() {
      this.getData(this.formProject);
    },

    getproData() {
      labelList().then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.cityList = rep.data;
        }
      });
    },

    Putprice(row) {
      this.modal1 = true;
      this.Row = row;
      this.price = row.price;
    },

    getproject() {
      proMjor2tree().then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.ListA = rep.data;
        }
      });
    },
    onChange(val) {
      this.formProject.page = val;
      this.getData(this.formProject);
    },
    onPageSizeChange(val) {
      this.formProject.limit = val;
      this.getData(this.formProject);
    }
  },
  mounted() {
    this.getData(this.formProject);
    this.getproject();
    this.getproData();
  }
};
</script>
