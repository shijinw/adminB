<template>
  <div>
    <Card>
      <p slot="title">官网报名列表</p>
      <Button type="default" shape="circle" icon="md-sync" @click="seach"></Button>
      <Divider type="vertical" />
      <DatePicker
        type="date"
        @on-change="getStime"
        format="yyyy-MM-dd"
        placeholder="开始时间"
        v-model="Fromlist.start_time"
        style="width: 6.5rem"
      ></DatePicker>
      <Divider type="vertical" />
      <DatePicker
        type="date"
        @on-change="getEtime"
        format="yyyy-MM-dd"
        placeholder="结束时间"
        v-model="Fromlist.end_time"
        style="width: 6.5rem"
      ></DatePicker>
      <Divider type="vertical" />
      <Button type="primary" @click="seachKnow" style="margin-left: 10px;">筛选</Button>
      <Button type="primary" @click="Exports" style="margin-left: 10px;">导出</Button>
      <Table style="margin-top:2rem" stripe size="small" :columns="columns" :data="Data"></Table>
      <div style="padding: 20px 0; text-align: right;">
        <Page
          :total="total"
          @on-change="onChange"
          @on-page-size-change="onPageSizeChange"
          :current="Fromlist.page"
          :page-size="Fromlist.limit"
          size="small"
          show-total
          show-elevator
          show-sizer
        />
      </div>
    </Card>
    <!-- 导出弹层 -->
    <Modal v-model="Modal" draggable scrollable title="官网列表导出" ok-text="导出" @on-ok="exportStu">
      <div>
        <p style="padding-bottom: 10px;">请选择时间段：</p>
        <Row>
          <Col :span="11">
            <DatePicker
              v-model="starttime"
              @on-change="Starttime"
              type="datetime"
              placeholder="开始时间"
              style="width: 100%"
            ></DatePicker>
          </Col>
          <Col :span="2" style="text-align: center; line-height: 32px;">-</Col>
          <Col :span="11">
            <DatePicker
              v-model="endtime"
              @on-change="Endtime"
              type="datetime"
              placeholder="结束时间"
              style="width: 100%"
            ></DatePicker>
          </Col>
        </Row>
      </div>
    </Modal>
  </div>
</template>

<script>
import { bmExport, bmList } from "@/api/Consult";
import moment from "moment";
import excel from "@/libs/excel";
export default {
  data() {
    return {
      total: 1,
      Fromlist: {
        limit: 10,
        page: 1,
        start_time: "",
        end_time: ""
      },
      Modal: false,
      starttime: "",
      endtime: "",
      columns: [
        {
          title: "id",
          key: "主键ID",
          minWidth: 60,
          tooltip: true,
          align: "center"
        },
        {
          title: "课程包名称",
          key: "package_name",
          minWidth: 110,
          tooltip: true,
          align: "center"
        },
        {
          title: "用户姓名",
          key: "username",
          minWidth: 90,
          tooltip: true
        },
        {
          title: "电话号",
          key: "mobile",
          minWidth: 100,
          tooltip: true,
          align: "center"
        },
        {
          title: "邮箱",
          key: "email",
          minWidth: 100,
          tooltip: true
        },
        {
          title: "职业",
          key: "occupation",
          minWidth: 100,
          tooltip: true,
          align: "center"
        },
        {
          title: "详细地址",
          key: "address",
          minWidth: 110,
          tooltip: true,
          align: "center"
        },
        {
          title: "创建时间",
          key: "create_time",
          minWidth: 110,
          tooltip: true,
          align: "center"
        }
      ],
      Data: []
    };
  },
  methods: {
    seach() {
      this.Fromlist.limit = 10;
      this.Fromlist.page = 1;
      this.Fromlist.end_time = "";
      this.Fromlist.start_time = "";
      this.getData(this.Fromlist);
    },
    getStime(val) {
      this.Fromlist.start_time = val;
    },
    getEtime(val) {
      this.Fromlist.end_time = val;
    },
    Starttime(val) {
      this.starttime = val;
    },
    Endtime(val) {
      this.end_time = val;
    },
    seachKnow() {
      this.getData(this.Fromlist);
    },
    exportStu() {
      if (this.starttime == "" || this.endtime == "") {
        this.$Message.error("时间不能为空！");
        return;
      }

      let Start_time = moment(this.starttime).format("YYYY-MM-DD HH:mm:ss");
      let End_time = moment(this.endtime).format("YYYY-MM-DD HH:mm:ss");

      bmExport({ start_time: Start_time, end_time: End_time }).then(res => {
        if (res.data.code === 200) {
          if (res.data.data instanceof Array) {
            const params = {
              title: [
                "主键id",
                "课程包名称",
                "用户姓名",
                "电话号",
                "邮箱",
                "职业",
                "详细地址",
                "提交时间"
              ],
              key: [
                "id",
                "package_name",
                "username",
                "mobile",
                "email",
                "occupation",
                "address",
                "create_time"
              ],
              data: res.data.data,
              autoWidth: true,
              filename: "官网报名列表"
            };
            excel.export_array_to_excel(params);
            this.starttime = "";
            this.endtime = "";
            this.Modal = false;
          } else {
            this.$Message.error(res.data.data);
          }
        } else if (res.data.code === 405) {
          this.$Message.error(res.data.msg);
        }
      });
    },
    Exports() {
      this.Modal = true;
    },
    getData(obj) {
      bmList(obj).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.Data = rep.data.data;
          this.total = rep.data.toatl;
        }
      });
    },
    onPageSizeChange(val) {
      this.Fromlist.limit = val;
      this.getData(this.Fromlist);
    },
    onChange(val) {
      this.Fromlist.page = val;
      this.getData(this.Fromlist);
    }
  },
  mounted() {
    this.getData(this.Fromlist);
  }
};
</script>

<style lang="" scoped>
</style>