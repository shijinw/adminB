<template>
  <div>
    <Card>
      <p slot="title">优惠卷列表</p>
      <div>

        <Button type="default"
                shape="circle"
                icon="md-sync"
                @click="seachQ"></Button>
        <Divider type="vertical" />
        <Input v-model="form.name"
               placeholder="优惠券name"
               style="width: 100px; margin-right: 10px;" />
        <Divider type="vertical" />
        <Input v-model="form.coupon_price"
               placeholder="优惠金额"
               style="width: 100px; margin-right: 10px;" />
        <Divider type="vertical" />
        <Button type='primary'
                @click="seach"
                style="margin-right: 10px;">搜索</Button>
        <Button type='primary'
                v-if="mmorpg"
                @click="Addcoupon"
                style="margin-right: 10px;">添加</Button>
      </div>
      <Divider />
      <Table size="small"
             :columns="columns"
             :data="data"></Table>
    </Card>
    <!-- 添加项目 -->
    <Modal v-model="modal"
           draggable
           scrollable
           title="添加优惠卷"
           :footer-hide="true">
      <div>
        <Form ref="projectForm"
              :model="projectForm"
              :rules="ruleProject"
              :label-width="80">
          <FormItem label="优惠卷名"
                    prop="name">
            <Input v-model="projectForm.name"
                   placeholder="请输入优惠卷名称"></Input>
          </FormItem>
          <FormItem label="优惠卷类"
                    prop="is_type">
            <Select v-model="projectForm.is_type"
                    clearable
                    placeholder="优惠券类型">
              <Option v-for="item in grade"
                      :value="item.id"
                      :key="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
          <FormItem label="优惠额度"
                    prop="coupon_price"
                    v-if="projectForm.is_type===1?true:false">
            <Input v-model="projectForm.coupon_price"
                   placeholder="请输入优惠额度"></Input>
          </FormItem>
          <FormItem label="打折额度"
                    prop="coupon_price"
                    v-if="projectForm.is_type===1?false:true">
            <Input v-model="projectForm.coupon_price"
                   placeholder="请输入1-9.9的数字"></Input>
          </FormItem>
          <FormItem v-if="projectForm.is_type===1?true:false"
                    label="满减金额"
                    prop="amount_price">
            <Input v-model="projectForm.amount_price"
                   placeholder="请输入满减金额"></Input>
          </FormItem>

          <FormItem label="备注信息"
                    prop="remark">
            <Input type="textarea"
                   v-model="projectForm.remark"
                   placeholder="备注， 预留字段，可以不填"></Input>
          </FormItem>
          <FormItem>
            <div style="text-align: right;">
              <Button @click="handleReset('projectForm')"
                      style="margin-right: 8px">重 置</Button>
              <Button type="primary"
                      @click="handleSubmit">提 交</Button>
            </div>
          </FormItem>
        </Form>
      </div>
    </Modal>
    <!--修改项目 -->
    <Modal v-model="modal1"
           draggable
           scrollable
           title="修改优惠卷"
           :footer-hide="true">
      <div>
        <Form ref="projectform"
              :model="projectform"
              :rules="ruleProject"
              :label-width="80">
          <FormItem label="优惠卷名"
                    prop="name">
            <Input v-model="projectform.name"
                   placeholder="请输入优惠卷名称"></Input>
          </FormItem>
          <FormItem label="优惠卷类"
                    prop="is_type">
            <Select v-model="projectform.is_type"
                    clearable
                    placeholder="优惠券类型">
              <Option v-for="item in grade"
                      :value="item.id"
                      :key="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
          <FormItem label="优惠额度"
                    prop="coupon_price"
                    v-if="projectform.is_type===1?true:false">
            <Input v-model="projectform.coupon_price"
                   placeholder="请输入优惠额度"></Input>
          </FormItem>
          <FormItem label="打折额度"
                    prop="coupon_price"
                    v-if="projectform.is_type===1?false:true">
            <Input v-model="projectform.coupon_price"
                   placeholder="请输入1-9.9的数字"></Input>
          </FormItem>
          <FormItem v-if="projectform.is_type===1?true:false"
                    label="满减金额"
                    prop="amount_price">
            <Input v-model="projectform.amount_price"
                   placeholder="请输入满减金额"></Input>
          </FormItem>
          <FormItem label="备注信息"
                    prop="remark">
            <Input type="textarea"
                   v-model="projectform.remark"
                   placeholder="备注， 预留字段，可以不填"></Input>
          </FormItem>
          <FormItem>
            <div style="text-align: right;">
              <Button @click="handleReset1('projectform')"
                      style="margin-right: 8px">重 置</Button>
              <Button type="primary"
                      @click="handleSubmit1">提 交</Button>
            </div>
          </FormItem>
        </Form>
      </div>
    </Modal>
  </div>
</template>

<script>
import {
  couponList,
  addCoupon,
  getMaxCouponPrice,
  putCoupon,
  deleteCoupon
} from "@/api/Coupon";
import Fomat from "@/libs/fomat";
import { mapMutations } from "vuex";
import { userPageRuleList } from "@/api/control";
export default {
  data() {
    return {
      data: [],
      coupon_price: "",
      mmorpg: false,
      grade: [{ id: 1, name: "满减优惠" }, { id: 2, name: "打折优惠" }],
      authority: [],
      columns: [
        {
          title: "ID",
          key: "id",
          minWidth: 50
        },
        {
          title: "优惠券名",
          key: "name",
          minWidth: 90,
          tooltip: true
        },
        {
          title: "发放数量",
          key: "send_num",
          minWidth: 90,
          tooltip: true
        },
        {
          title: "优惠金额",
          key: "coupon_price",
          minWidth: 90,
          tooltip: true
        },
        {
          title: "满减金额",
          key: "amount_price",
          minWidth: 90,
          tooltip: true
        },
        {
          title: "备注",
          key: "remark",
          minWidth: 90,
          tooltip: true
        },
        {
          title: "创建时间",
          key: "create_time",
          minWidth: 90,
          tooltip: true
        },
        {
          title: "操作人名",
          key: "truename",
          minWidth: 90,
          tooltip: true
        },
        {
          title: "操作",
          key: "action",
          minWidth: 200,
          align: "center",
          render: (h, params) => {
            let btns = [];
            if (this.authority.length > 0) {
              let listBtn = this.authority;

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
                        this.publicFun(v.menu_title, params.row);
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

      modal: false,
      modal1: false,
      data0: {},

      projectForm: {
        name: "",
        coupon_price: "",
        amount_price: "",
        remark: "",
        is_type: 1
      },
      projectform: {
        id: "",
        name: "",
        coupon_price: "",
        amount_price: "",
        remark: "",
        is_type: 1
      },
      ruleProject: {
        is_type: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required
          }
        ],
        name: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "blur"
          }
        ],
        coupon_price: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "blur"
          }
        ],
        amount_price: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "blur"
          }
        ],
        remark: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "blur"
          }
        ]
      },
      form: {
        name: "",
        coupon_price: ""
      }
    };
  },
  components: {},
  watch: {
    "projectForm.coupon_price"(newvalue) {
      if (newvalue * 1 >= this.coupon_price) {
        this.$Message.error(`输入的数字不能大于 ${this.coupon_price}!`);
      }
    },
    "projectform.coupon_price"(newvalue) {
      if (newvalue * 1 >= this.coupon_price) {
        this.$Message.error(`输入的数字不能大于 ${this.coupon_price}!`);
      }
    },
    "projectForm.is_type"(newvalue) {
      this.projectForm.amount_price = "";
      this.projectForm.coupon_price = "";
    }
  },
  methods: {
    ...mapMutations(["addTag"]),
    seachQ() {
      this.form.name = "";
      this.form.coupon_price = "";
      this.getData(this.form);
    },
    seach() {
      this.getData(this.form);
    },
    handleReset(name) {
      this.$refs[name].resetFields();
      this.$Message.success("重置成功，请重新输入");
    },
    handleSubmit() {
      this.$refs.projectForm.validate(valid => {
        if (this.projectForm.coupon_price <= this.coupon_price) {
          addCoupon(this.projectForm).then(res => {
            if (res.data.code === 200) {
              this.$Message.success("操作成功，请核对信息");
              this.modal = false;
              this.getData(this.form);
            }
          });
        } else {
          this.$Message.error("操作失败，请核对优惠卷金额");
        }
      });
    },
    handleReset1(name) {
      this.$refs[name].resetFields();
      this.$Message.success("重置成功，请重新输入");
    },
    handleSubmit1() {
      if (this.projectform.coupon_price <= this.coupon_price) {
        putCoupon(this.projectform).then(res => {
          if (res.data.code === 200) {
            this.$Message.success("操作成功，请核对信息");
            this.modal1 = false;
            this.getData(this.form);
          }
        });
      } else {
        this.$Message.error("操作失败，请核对优惠卷金额");
      }
    },
    publicFun(key, row) {
      if (key === "修改") {
        this.projectform.id = row.id;
        this.projectform.name = row.name;
        this.projectform.is_type = row.is_type;
        this.projectform.coupon_price = row.coupon_price;
        this.projectform.amount_price = row.amount_price;
        this.projectform.remark = row.remark;
        this.modal1 = true;
      } else if (key === "发放优惠卷") {
        const route = {
          name: "Grant_Conpon",
          meta: {
            title: `${row.id} - 发放优惠卷`
          },
          query: {
            id: row.id,
            coupon_price: row.coupon_price,
            amount_price: row.amount_price,
            name: row.name,
            is_type: row.is_type
          }
        };
        this.addTag({
          route: route,
          type: "push"
        });
        this.$router.push(route);
      } else if (key === "删除") {
        deleteCoupon({ id: row.id }).then(res => {
          let rep = res.data;
          if (rep.code === 200) {
            this.$Message.success("删除成功，请核对信息");
            this.getData(this.form);
          }
        });
      }
    },

    Addcoupon() {
      this.$refs.projectForm.resetFields();
      this.modal = true;
    },
    putcoupon(row) {},

    getquan() {
      userPageRuleList(this.$route.name).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.authority = rep.data.right.filter(
            item => item.menu_title != "添加"
          );

          rep.data.right.forEach(item => {
            if (item.menu_title === "添加") {
              this.mmorpg = true;
            }
          });
        }
      });
    },
    getData(obj) {
      couponList(obj).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.data = rep.data;
        }
      });
    }
  },
  mounted() {
    this.getData(this.form);
    this.getquan();
    getMaxCouponPrice().then(res => {
      let rep = res.data;
      if (rep.code === 200) {
        this.coupon_price = rep.data.max_price * 1;
      }
    });
  }
};
</script>

<style lang="less">
</style>
