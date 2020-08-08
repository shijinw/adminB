<template>
  <div>
    <Card style="width: 1000px;">
      <p slot="title">发放优惠卷</p>
      <Form ref="formValidate"
            :model="formValidate"
            :rules="ruleValidate"
            :label-width="80">
        <Row>
          <Col :span="12">
          <FormItem label="优惠卷名"
                    style="margin-left:20px">
            <Input v-model="formValidate.name"
                   readonly
                   style="width: 100%" />
          </FormItem>

          </Col>

        </Row>
        <Row>

          <Col :span="12"
               v-if="formValidate.is_type===1?true:false">
          <FormItem label="优惠金额"
                    style="margin-left:20px">
            <Input v-model="formValidate.amount_price"
                   readonly
                   style="width: 100%" />
          </FormItem>

          </Col>
          <Col :span="12"
               v-if="formValidate.is_type===1?false:true">
          <FormItem label="打折金额"
                    style="margin-left:20px">
            <Input v-model="formValidate.coupon_price"
                   readonly
                   style="width: 100%" />
          </FormItem>

          </Col>
        </Row>

        <Row v-if="formValidate.is_type===1?true:false">
          <Col :span="12">
          <FormItem label="满减金额"
                    style="margin-left:20px">
            <Input v-model="formValidate.coupon_price"
                   readonly
                   style="width: 100%" />
          </FormItem>
          </Col>
        </Row>
      </Form>
      <Form ref="form"
            :model="form"
            :rules="ruleValidate"
            :label-width="80">
        <Row>
          <Col :span="12">
          <FormItem label="适用情况"
                    prop="range"
                    style="margin-left:20px">
            <Select v-model="form.range"
                    clearable
                    style="width:100px"
                    placeholder="适用类型">
              <Option v-for="item in staList"
                      :value="item.id"
                      :key="item.id">{{ item.value }}</Option>
            </Select>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="12">
          <FormItem label="开始时间"
                    prop="getStime"
                    style="margin-left:20px">
            <DatePicker @on-change="getStime"
                        format="yyyy-MM-dd"
                        type="date"
                        placeholder="发放开始时间"
                        style="width: 140px"></DatePicker>

          </FormItem>
          </Col>
          <Col :span="12">
          <FormItem label="结束时间"
                    prop="getEtime"
                    style="margin-left:20px">
            <DatePicker @on-change="getEtime"
                        format="yyyy-MM-dd"
                        type="date"
                        placeholder="发放结束时间"
                        style="width: 140px"></DatePicker>
          </FormItem>
          </Col>
        </Row>
        <Row>

          <FormItem label="学员手机"
                    prop="user_mobile"
                    style="margin-left:20px">
            <Input v-model="form.user_mobile"
                   type="textarea"
                   :rows="4"
                   style="width: 700px" />
          </FormItem>
          <Button type="primary"
                  @click="addlist"
                  style="margin-left: 30px;width:110px;height:40px">添加学员</Button>
        </Row>
        <div style="text-align: center;">
          <Button @click="resets('formValidate')"
                  style="margin-left: 8px;width:110px;height:40px">重置</Button>
          <Button type="primary"
                  @click="handleSubmit"
                  style="margin-left: 8px;width:110px;height:40px">提 交</Button>
        </div>
        </FormItem>
      </Form>
    </Card>
    <!-- 添加试题 -->
    <Modal v-model="modal1"
           scrollable
           title="添加学员"
           :width="1000"
           :footer-hide="true">
      <div>
        <Button type="default"
                shape="circle"
                icon="md-sync"
                @click="seachQ"></Button>
        <Divider type="vertical" />
        <Select v-model="formitem.status"
                clearable
                style="width:100px"
                placeholder="学员类型">
          <Option v-for="item in statusList"
                  :value="item.id"
                  :key="item.id">{{ item.value }}</Option>
        </Select>
        <Divider type="vertical" />
        <Input v-model="formitem.mobile"
               placeholder="手机号"
               style="width: 100px; margin-right: 10px;" />
        <Button type='primary'
                @click="seachW"
                style="margin-right: 10px;">搜索</Button>

        <Table ref="table"
               size="small"
               :columns="columns1"
               :data="data1"
               @on-selection-change="selectionStu"
               @on-select-cancel="selectionCancel"
               style="margin-top:15px"></Table>
        <div style="padding: 20px 0; text-align: right;">
          <Page :total="total1"
                @on-change="onChange"
                @on-page-size-change="onPageSizeChange"
                :current="formitem.page"
                :page-size="formitem.limit"
                size="small"
                show-total
                show-elevator
                show-sizer />
        </div>
        <Button type='primary'
                @click="ADDsles"
                style="margin-right: 10px;">确认选择</Button>
        <Divider type="vertical" />

      </div>
    </Modal>
    <Modal v-model="modal5"
           title="发放优惠券结果"
           @on-ok="ok"
           @on-cancel="cancel">
      <p>{{textinfo}}</p>
    </Modal>
  </div>

</template>

<script>
import { studentList } from "@/api/student";
import { sendUserCoupon } from "@/api/Coupon";
import Fomat from "@/libs/fomat";
export default {
  data() {
    return {
      data1: [],
      total1: 1,
      modal1: false,
      modal5: false,
      formitem: {
        limit: 10,
        page: 1,
        mobile: "",
        status: ""
      },
      Sele_id: [],
      form: {
        coupon_id: "",
        user_mobile: "",
        start_time: "",
        end_time: "",
        range: 3
      },
      formValidate: {
        name: "",
        coupon_price: "",
        amount_price: "",
        remark: "",
        is_type: ""
      },
      textinfo: "",
      staList: [
        { id: 3, value: "全部" },
        { id: 1, value: "课程" },
        { id: 2, value: "直播" }
      ],
      statusList: [
        { id: 0, value: "全部" },
        { id: 1, value: "正式学员" },
        { id: 2, value: "内购学员" },
        { id: 3, value: "注册学员" },
        { id: 4, value: "优财员工" },
        { id: 5, value: "毕业学员" },
        { id: 6, value: "网络学员" },
        { id: 7, value: "面授学员" }
      ],
      columns1: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "ID",
          key: "id",
          minWidth: 50
        },
        {
          title: "学员身份",
          key: "status",
          minWidth: 90,
          tooltip: true
        },
        {
          title: "电话",
          key: "mobile",
          minWidth: 90,
          tooltip: true
        },
        {
          title: "学员名",
          key: "username",
          minWidth: 90,
          tooltip: true
        }
      ],

      ruleValidate: {
        user_mobile: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "bulr"
          }
        ],
        getStime: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "bulr"
          }
        ],
        getEtime: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "bulr"
          }
        ],
        range: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "change"
          }
        ]
      }
    };
  },

  watch: {},
  methods: {
    ADDsles() {
      let arr = [];
      this.data1.forEach(val => {
        if (this.Sele_id.length > 0) {
          this.Sele_id.forEach(key => {
            if (key == val.id) {
              if (val.mobile) {
                arr.push(val.mobile);
              }
            }
          });
        }
      });
      this.form.user_mobile = arr.join(",");
      this.modal1 = false;
    },
    resets(name) {},
    ok() {
      this.$router.push({ name: "Discount_list" });
    },
    cancel() {
      this.modal5 = false;
    },
    seachW() {
      this.getSData(this.formitem);
    },
    onPageSizeChange(val) {
      this.formitem.limit = val;
      this.getSData(this.formitem);
    },
    onChange(val) {
      this.formitem.page = val;
      this.getSData(this.formitem);
    },
    selectionCancel(row) {
      this.Sele_id.splice(this.Sele_id.findIndex(v => v == row.id), 1);
    },
    selectionStu(arr) {
      let list = arr.map(item => item.id);
      if (list.length > 0) {
        list.forEach(v => {
          this.Sele_id.push(v);
        });
      }

      this.Sele_id = Array.from(new Set(this.Sele_id));
    },
    seachQ() {
      this.formitem.page = 1;
      this.formitem.limit = 10;
      this.formitem.mobile = "";
      this.formitem.status = "";
      this.getSData(this.formitem);
    },
    getStime(val) {
      this.form.start_time = val;
    },
    getEtime(val) {
      this.form.end_time = val;
    },
    addlist() {
      this.modal1 = true;
    },
    handleSubmit() {
      this.form.coupon_id = this.$route.query.id;
      sendUserCoupon(this.form).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.textinfo = rep.data;
          this.$Message.success("发放成功，请注意查看");
          this.modal5 = true;
        } else if (res.data.code === 405) {
          this.textinfo = rep.msg;
          this.$Message.error("添加失败，请注意检查填写格式");
          this.modal5 = true;
        }
      });
    },

    getdata() {
      this.formValidate.name = this.$route.query.name;
      this.formValidate.amount_price = this.$route.query.amount_price;
      this.formValidate.coupon_price = this.$route.query.coupon_price;
      this.formValidate.is_type = this.$route.query.is_type;
    },
    getSData(obj) {
      studentList(obj).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.total1 = rep.data.total;
          let arr = rep.data.data;
          arr.forEach(val => {
            if (this.Sele_id.length > 0) {
              this.Sele_id.forEach(key => {
                if (key == val.id) {
                  val._checked = true;
                }
              });
            }
          });
          this.data1 = arr;
        }
      });
    }
  },
  mounted() {
    this.getdata();
    this.getSData(this.formitem);
  }
};
</script>

<style lang="less" scoped>
</style>
